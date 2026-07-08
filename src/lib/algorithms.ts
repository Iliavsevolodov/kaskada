import { marketProducts, mayCampaign, type MarketProduct } from './catalog';

export type Product = MarketProduct;

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

export const mayCampaigns = [
  {
    title: mayCampaign.title,
    text: mayCampaign.subtitle,
    href: '#may-season',
    tone: 'gold'
  },
  {
    title: 'Майские подарки',
    text: 'Подарки маме, учителю, семье и друзьям в одной сезонной витрине.',
    href: '#may-gifts',
    tone: 'violet'
  },
  {
    title: 'Дом и дача',
    text: 'Уборка, пикник, текстиль, ароматы и уют для майских выходных.',
    href: '#may-home',
    tone: 'green'
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
  const hash = hashString(product.id + product.brand + product.category);
  const views7d = 180 + (hash % 1800);
  const clickRate = 0.05 + ((hash % 10) / 100);
  const cartRate = 0.02 + ((hash % 7) / 100);
  const orderRate = 0.007 + ((hash % 5) / 100);
  const clicks7d = Math.round(views7d * clickRate);
  const cartAdds7d = Math.max(2, Math.round(views7d * cartRate));
  const orders7d = Math.max(1, Math.round(views7d * orderRate));
  const returnRate = Number((0.01 + ((hash % 7) / 100)).toFixed(2));
  const sellerScore = Number(((product.sellerScore ?? 82) / 20).toFixed(1));
  const daysFromLaunch = product.campaign === 'may' ? (hash % 10) + 1 : product.badge === 'Новинка' ? (hash % 12) + 1 : (hash % 70) + 15;
  const discountPercent = getDiscountPercent(product);

  return { views7d, clicks7d, cartAdds7d, orders7d, returnRate, sellerScore, discountPercent, daysFromLaunch };
}

function baseScore(product: Product) {
  const metrics = getMetrics(product);
  const rating = Number(product.rating) || 4.5;
  const ctr = metrics.clicks7d / metrics.views7d;
  const conversion = metrics.orders7d / metrics.views7d;
  const freshness = clamp(32 - metrics.daysFromLaunch, 0, 32);
  const mayBoost = product.campaign === 'may' ? 38 : 0;
  const paidPromoBoost = product.promotion === 'paid' ? 24 : product.promotion === 'editorial' ? 16 : 6;
  const promoBoost = product.badge === 'Акция' || product.badge === 'Скидка' ? 18 : 0;
  const newBoost = product.badge === 'Новинка' ? 22 : 0;
  const hitBoost = product.badge === 'Хит' ? 18 : 0;
  const stockScore = Math.min(product.stock ?? 0, 100) * 0.22;

  const score =
    18 +
    metrics.orders7d * 3.2 +
    metrics.cartAdds7d * 1.45 +
    ctr * 140 +
    conversion * 420 +
    rating * 7 +
    metrics.sellerScore * 5 +
    metrics.discountPercent * 0.55 +
    stockScore +
    freshness * 0.8 +
    paidPromoBoost +
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
    new: clamp(32 - metrics.daysFromLaunch, 0, 32) * 3 + (product.badge === 'Новинка' || product.campaign === 'may' ? 35 : 0),
    sale: metrics.discountPercent * 2 + (product.badge === 'Акция' || product.badge === 'Скидка' ? 35 : 0),
    may: product.campaign === 'may' ? 95 : product.category === 'Подарки' || product.category === 'Дом' || product.category === 'Уход' ? 22 : 0,
    fair: metrics.views7d < 650 ? 52 : product.badge === 'Новинка' ? 28 : 0,
    rated: rating * 18 + metrics.returnRate * -60
  };

  return score + modifiers[context];
}

function reasonFor(product: Product, context: AlgorithmContext) {
  if (context === 'may') return product.campaign === 'may' ? 'Майский буст' : 'Подходит к маю';
  if (context === 'popular') return 'Высокие клики и корзины';
  if (context === 'new') return 'Стартовый буст новинки';
  if (context === 'sale') return 'Выгода и промо-буст';
  if (context === 'fair') return 'Fair-показы для роста';
  if (context === 'rated') return 'Высокий рейтинг';
  if (product.promotion === 'paid') return 'Продвигается';
  if (product.badge === 'Акция' || product.badge === 'Скидка') return 'Продвигается в акции';
  if (product.badge === 'Новинка') return 'Новинка получает показы';
  if (product.badge === 'Хит') return 'Хорошо покупают';
  return 'Релевантный товар';
}

function promotionLabelFor(product: Product, context: AlgorithmContext) {
  if (context === 'may' && product.campaign === 'may') return 'Май';
  if (context === 'fair') return 'Шанс';
  if (product.promotion === 'paid') return 'Промо';
  if (product.badge === 'Акция' || product.badge === 'Скидка') return 'Промо';
  if (product.badge === 'Новинка') return 'Новый';
  if (product.badge === 'Хит') return 'Хит';
  return product.badge;
}

function diversify(list: RankedProduct[], limit?: number) {
  const target = typeof limit === 'number' ? limit : list.length;
  const brandCount = new Map<string, number>();
  const result: RankedProduct[] = [];

  for (const product of list) {
    const count = brandCount.get(product.brand) ?? 0;
    const canUse = count < 2 || result.length > Math.floor(target * 0.7);
    if (canUse) {
      result.push(product);
      brandCount.set(product.brand, count + 1);
    }
    if (result.length >= target) break;
  }

  return result;
}

export function rankProducts(source: Product[] = marketProducts, context: AlgorithmContext = 'default', limit?: number): RankedProduct[] {
  const ranked = source
    .map((product) => ({
      ...product,
      algorithmScore: Math.round(contextScore(product, context)),
      algorithmReason: reasonFor(product, context),
      promotionLabel: promotionLabelFor(product, context),
      metrics: getMetrics(product)
    }))
    .sort((a, b) => b.algorithmScore - a.algorithmScore);

  return diversify(ranked, limit);
}

export function getAlgorithmShelves() {
  return [
    {
      id: 'may-season',
      eyebrow: 'май',
      title: 'Майские показы',
      text: 'Сезонные товары получают майский буст: подарки, прогулки, дом, уход, дети и питомцы.',
      products: rankProducts(marketProducts, 'may', 10)
    },
    {
      id: 'popular-now',
      eyebrow: 'алгоритм',
      title: 'Популярное сейчас',
      text: 'Сортировка по кликам, корзинам, заказам, рейтингу, наличию и качеству продавца.',
      products: rankProducts(marketProducts, 'popular', 10)
    },
    {
      id: 'new-boost',
      eyebrow: 'fair старт',
      title: 'Новинки получают шанс',
      text: 'Новые товары не тонут в каталоге, а получают стартовые показы без ИИ.',
      products: rankProducts(marketProducts, 'new', 10)
    },
    {
      id: 'value-deals',
      eyebrow: 'выгода',
      title: 'Лучшие предложения',
      text: 'В подборку попадают товары с выгодой, рейтингом, спросом и нормальными метриками.',
      products: rankProducts(marketProducts, 'sale', 10)
    }
  ];
}
