import { products } from './store';

export type Product = (typeof products)[number];

export type AlgorithmContext =
  | 'default'
  | 'popular'
  | 'new'
  | 'sale'
  | 'may'
  | 'fair'
  | 'rated';

export type RankedProduct = Product & {
  algorithmScore: number;
  algorithmReason: string;
  promotionLabel: string;
  metrics: {
    views7d: number;
    clicks7d: number;
    cartAdds7d: number;
    orders7d: number;
    returnRate: number;
    sellerScore: number;
    discountPercent: number;
    daysFromLaunch: number;
  };
};

const MAY_PRODUCT_IDS = new Set([
  'gift-love',
  'gift-tea-box',
  'gift-spa-box',
  'gift-candle-card',
  'body-oil',
  'bath-salt',
  'aroma-diffuser',
  'plaid-soft',
  'kids-cream',
  'kids-blanket',
  'coffee-drip',
  'berry-tea',
  'linen-basket',
  'wood-tray',
  'pet-balm',
  'pet-blanket'
]);

export const mayCampaigns = [
  {
    title: 'Майские подарки',
    text: 'Подарочные наборы, чай, свечи и уход для тёплых майских поводов.',
    href: '#may-gifts',
    tone: 'gold'
  },
  {
    title: 'Дом к майским выходным',
    text: 'Уборка, ароматы, текстиль и уютные товары для обновления дома.',
    href: '#may-home',
    tone: 'green'
  },
  {
    title: 'Майский уход',
    text: 'Спа, кремы, масла и ритуалы для себя после долгой зимы.',
    href: '#may-care',
    tone: 'violet'
  }
];

function hashString(value: string) {
  return value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function moneyToNumber(value: string) {
  return Number(value.replace(/[^0-9]/g, '')) || 0;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getDiscountPercent(product: Product) {
  const price = moneyToNumber(product.price);
  const oldPrice = moneyToNumber(product.oldPrice);
  if (!price || !oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function getMetrics(product: Product) {
  const hash = hashString(product.id);
  const views7d = 160 + (hash % 980);
  const clickRate = 0.045 + ((hash % 9) / 100);
  const cartRate = 0.018 + ((hash % 6) / 100);
  const orderRate = 0.006 + ((hash % 5) / 100);
  const clicks7d = Math.round(views7d * clickRate);
  const cartAdds7d = Math.max(2, Math.round(views7d * cartRate));
  const orders7d = Math.max(1, Math.round(views7d * orderRate));
  const returnRate = Number((0.01 + ((hash % 7) / 100)).toFixed(2));
  const sellerScore = Number((4.4 + ((hash % 6) / 10)).toFixed(1));
  const daysFromLaunch = product.badge === 'Новинка' ? (hash % 12) + 1 : (hash % 70) + 15;
  const discountPercent = getDiscountPercent(product);

  return { views7d, clicks7d, cartAdds7d, orders7d, returnRate, sellerScore, discountPercent, daysFromLaunch };
}

function baseScore(product: Product) {
  const metrics = getMetrics(product);
  const rating = Number(product.rating) || 4.5;
  const ctr = metrics.clicks7d / metrics.views7d;
  const conversion = metrics.orders7d / metrics.views7d;
  const freshness = clamp(30 - metrics.daysFromLaunch, 0, 30);
  const mayBoost = MAY_PRODUCT_IDS.has(product.id) ? 28 : 0;
  const promoBoost = product.badge === 'Акция' || product.badge === 'Скидка' ? 18 : 0;
  const newBoost = product.badge === 'Новинка' ? 22 : 0;
  const hitBoost = product.badge === 'Хит' ? 18 : 0;

  const score =
    18 +
    metrics.orders7d * 3.2 +
    metrics.cartAdds7d * 1.45 +
    ctr * 140 +
    conversion * 420 +
    rating * 7 +
    metrics.sellerScore * 5 +
    metrics.discountPercent * 0.55 +
    freshness * 0.8 +
    promoBoost +
    newBoost +
    hitBoost +
    mayBoost -
    metrics.returnRate * 90;

  return { score, metrics };
}

function contextScore(product: Product, context: AlgorithmContext) {
  const { score, metrics } = baseScore(product);
  const rating = Number(product.rating) || 4.5;

  const modifiers: Record<AlgorithmContext, number> = {
    default: 0,
    popular: metrics.orders7d * 2 + metrics.cartAdds7d * 1.4,
    new: clamp(30 - metrics.daysFromLaunch, 0, 30) * 3 + (product.badge === 'Новинка' ? 35 : 0),
    sale: metrics.discountPercent * 2 + (product.badge === 'Акция' || product.badge === 'Скидка' ? 35 : 0),
    may: MAY_PRODUCT_IDS.has(product.id) ? 60 : product.category === 'Подарки' || product.category === 'Дом' || product.category === 'Уход' ? 18 : 0,
    fair: metrics.views7d < 500 ? 48 : product.badge === 'Новинка' ? 28 : 0,
    rated: rating * 18 + metrics.returnRate * -60
  };

  return score + modifiers[context];
}

function reasonFor(product: Product, context: AlgorithmContext) {
  if (context === 'may') return MAY_PRODUCT_IDS.has(product.id) ? 'Майский буст' : 'Подходит к майскому сезону';
  if (context === 'popular') return 'Высокие клики и корзины';
  if (context === 'new') return 'Стартовый буст новинки';
  if (context === 'sale') return 'Выгода и промо-буст';
  if (context === 'fair') return 'Fair-показы для роста';
  if (context === 'rated') return 'Высокий рейтинг';
  if (product.badge === 'Акция' || product.badge === 'Скидка') return 'Продвигается в акции';
  if (product.badge === 'Новинка') return 'Новинка получает показы';
  if (product.badge === 'Хит') return 'Хорошо покупают';
  return 'Релевантный товар';
}

function promotionLabelFor(product: Product, context: AlgorithmContext) {
  if (context === 'may' && MAY_PRODUCT_IDS.has(product.id)) return 'Май';
  if (context === 'fair') return 'Шанс';
  if (product.badge === 'Акция' || product.badge === 'Скидка') return 'Промо';
  if (product.badge === 'Новинка') return 'Новый';
  if (product.badge === 'Хит') return 'Хит';
  return product.badge;
}

export function rankProducts(source: Product[] = products, context: AlgorithmContext = 'default', limit?: number): RankedProduct[] {
  const ranked = source
    .map((product) => ({
      ...product,
      algorithmScore: Math.round(contextScore(product, context)),
      algorithmReason: reasonFor(product, context),
      promotionLabel: promotionLabelFor(product, context),
      metrics: getMetrics(product)
    }))
    .sort((a, b) => b.algorithmScore - a.algorithmScore);

  return typeof limit === 'number' ? ranked.slice(0, limit) : ranked;
}

export function getAlgorithmShelves() {
  return [
    {
      id: 'may-gifts',
      eyebrow: 'май',
      title: 'Майские показы',
      text: 'Подарки, дом, уход и уют получают сезонный буст на май.',
      products: rankProducts(products, 'may', 8)
    },
    {
      id: 'popular-now',
      eyebrow: 'алгоритм',
      title: 'Популярное сейчас',
      text: 'Сортировка по кликам, корзинам, заказам и рейтингу.',
      products: rankProducts(products, 'popular', 8)
    },
    {
      id: 'new-boost',
      eyebrow: 'fair старт',
      title: 'Новинки получают шанс',
      text: 'Новые товары не тонут в каталоге, а получают стартовые показы.',
      products: rankProducts(products, 'new', 8)
    },
    {
      id: 'value-deals',
      eyebrow: 'выгода',
      title: 'Лучшие предложения',
      text: 'В подборку попадают товары с выгодой, рейтингом и нормальными метриками.',
      products: rankProducts(products, 'sale', 8)
    }
  ];
}
