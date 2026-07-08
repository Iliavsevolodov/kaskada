import { products } from './store';

export type BaseProduct = (typeof products)[number];

export type MarketProduct = BaseProduct & {
  campaign?: 'may' | 'spring' | 'premium';
  promotion?: 'paid' | 'organic' | 'editorial';
  stock?: number;
  sellerScore?: number;
  gallery?: string[];
};

const mayImages = {
  beauty: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
  home: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80',
  gifts: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80',
  tea: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
  kids: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
  pets: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80',
  outdoor: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
};

export const mayProducts: MarketProduct[] = [
  { id: 'may-spf-face', name: 'SPF-крем Майское солнце', brand: 'Аурум Скин', category: 'Уход', price: '1 590 ₽', oldPrice: '1 990 ₽', badge: 'Май', rating: '4.9', image: mayImages.beauty, campaign: 'may', promotion: 'editorial', stock: 42, sellerScore: 95, description: 'Лёгкий крем для городского майского солнца и ежедневного ухода.' },
  { id: 'may-body-mist', name: 'Мист для тела Цветущий сад', brand: 'Дом Ароматов', category: 'Уход', price: '990 ₽', oldPrice: '1 290 ₽', badge: 'Новинка', rating: '4.8', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80', campaign: 'may', promotion: 'organic', stock: 68, sellerScore: 91, description: 'Свежий аромат для тёплых прогулок, сумки и ежедневного настроения.' },
  { id: 'may-picnic-set', name: 'Набор для пикника Майский день', brand: 'Глина и Дом', category: 'Дом', price: '2 990 ₽', oldPrice: '3 590 ₽', badge: 'Май', rating: '4.7', image: mayImages.outdoor, campaign: 'may', promotion: 'paid', stock: 31, sellerScore: 88, description: 'Лёгкая подборка для пикника, дачи и выходных на природе.' },
  { id: 'may-clean-start', name: 'Весенний набор уборки', brand: 'Чистый Дом', category: 'Дом', price: '1 890 ₽', oldPrice: '2 490 ₽', badge: 'Акция', rating: '4.8', image: mayImages.home, campaign: 'may', promotion: 'editorial', stock: 75, sellerScore: 93, description: 'Комплект для майского обновления дома, кухни и ванной.' },
  { id: 'may-mom-gift', name: 'Подарок маме Нежный май', brand: 'Подарки Рядом', category: 'Подарки', price: '2 690 ₽', oldPrice: '3 290 ₽', badge: 'Подарок', rating: '4.9', image: mayImages.gifts, campaign: 'may', promotion: 'paid', stock: 27, sellerScore: 96, description: 'Готовый подарок с уходом, ароматом и красивой упаковкой.' },
  { id: 'may-teacher-box', name: 'Набор Благодарность учителю', brand: 'Подарки Рядом', category: 'Подарки', price: '1 890 ₽', oldPrice: '2 390 ₽', badge: 'Май', rating: '4.8', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=80', campaign: 'may', promotion: 'editorial', stock: 54, sellerScore: 90, description: 'Аккуратный майский подарок для благодарности и тёплого жеста.' },
  { id: 'may-berry-tea', name: 'Чай Майская ягода', brand: 'Травы Севера', category: 'Чай', price: '790 ₽', oldPrice: '990 ₽', badge: 'Новинка', rating: '4.9', image: mayImages.tea, campaign: 'may', promotion: 'organic', stock: 83, sellerScore: 92, description: 'Ягодный чай для майских вечеров, подарков и уютных завтраков.' },
  { id: 'may-cold-coffee', name: 'Кофе для холодного латте', brand: 'Обжарочная', category: 'Чай', price: '1 290 ₽', oldPrice: '1 590 ₽', badge: 'Хит', rating: '4.8', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', campaign: 'may', promotion: 'organic', stock: 48, sellerScore: 89, description: 'Кофе для холодных напитков, майских прогулок и утренней бодрости.' },
  { id: 'may-kids-sun', name: 'Детский крем для прогулок', brand: 'Мамин Выбор', category: 'Детям', price: '890 ₽', oldPrice: '1 190 ₽', badge: 'Детям', rating: '4.8', image: mayImages.kids, campaign: 'may', promotion: 'editorial', stock: 61, sellerScore: 94, description: 'Мягкий уход перед прогулкой, дачей и активным майским днём.' },
  { id: 'may-pet-walk', name: 'Набор После прогулки', brand: 'Лапки Дома', category: 'Питомцам', price: '1 490 ₽', oldPrice: '1 890 ₽', badge: 'Питомцам', rating: '4.7', image: mayImages.pets, campaign: 'may', promotion: 'paid', stock: 39, sellerScore: 87, description: 'Уход за лапками и шерстью после майских прогулок.' },
  { id: 'may-candle-lilac', name: 'Свеча Майская сирень', brand: 'Мастерская Тепла', category: 'Уют', price: '1 190 ₽', oldPrice: '1 490 ₽', badge: 'Май', rating: '4.9', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80', campaign: 'may', promotion: 'editorial', stock: 46, sellerScore: 97, description: 'Свеча с весенним настроением для спальни, гостиной и подарка.' },
  { id: 'may-table-textile', name: 'Текстиль для майского стола', brand: 'Домашний Текстиль', category: 'Дом', price: '1 690 ₽', oldPrice: '2 090 ₽', badge: 'Сезон', rating: '4.8', image: 'https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?auto=format&fit=crop&w=900&q=80', campaign: 'may', promotion: 'organic', stock: 58, sellerScore: 92, description: 'Салфетки и текстиль для праздничного майского стола.' },
  { id: 'may-spa-evening', name: 'Спа-набор Майский вечер', brand: 'Домашний Спа', category: 'Уход', price: '2 290 ₽', oldPrice: '2 890 ₽', badge: 'Подарок', rating: '4.9', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80', campaign: 'may', promotion: 'paid', stock: 34, sellerScore: 93, description: 'Соль, уход и аксессуары для спокойного вечера после майского дня.' },
  { id: 'may-notebook', name: 'Планер Майские планы', brand: 'Бумажное Настроение', category: 'Подарки', price: '690 ₽', oldPrice: '890 ₽', badge: 'Новинка', rating: '4.7', image: 'https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?auto=format&fit=crop&w=900&q=80', campaign: 'may', promotion: 'organic', stock: 79, sellerScore: 88, description: 'Планер для майских задач, поездок, покупок и идей.' },
  { id: 'may-diffuser-grass', name: 'Диффузор Свежая трава', brand: 'Дом Ароматов', category: 'Уют', price: '1 590 ₽', oldPrice: '1 990 ₽', badge: 'Сезон', rating: '4.8', image: 'https://images.unsplash.com/photo-1617832357756-0529fa5b7f92?auto=format&fit=crop&w=900&q=80', campaign: 'may', promotion: 'editorial', stock: 51, sellerScore: 91, description: 'Весенний аромат для прихожей, гостиной и спальни.' }
];

const sourceProducts: MarketProduct[] = [...(products as MarketProduct[]), ...mayProducts];

export const marketProducts = sourceProducts.map((product, index) => ({
  ...product,
  stock: product.stock ?? 20 + ((index * 13) % 80),
  sellerScore: product.sellerScore ?? 72 + ((index * 7) % 27),
  promotion: product.promotion ?? (index % 9 === 0 ? 'paid' : index % 5 === 0 ? 'editorial' : 'organic')
}));

function numberFromText(text: string) {
  return [...text].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function moneyToNumber(value: string) {
  return Number(value.replace(/[^0-9]/g, '')) || 0;
}

function productStats(product: MarketProduct) {
  const seed = numberFromText(product.id + product.name + product.brand);
  const views = 300 + (seed % 9000);
  const clicks = 20 + (seed % 520);
  const cartAdds = 6 + (seed % 170);
  const orders = 2 + (seed % 84);
  const returns = seed % 12;
  const ctr = clicks / views;
  const conversion = orders / Math.max(clicks, 1);
  return { views, clicks, cartAdds, orders, returns, ctr, conversion };
}

export function scoreProduct(product: MarketProduct, context: 'default' | 'popular' | 'new' | 'may' | 'deals' = 'default') {
  const stats = productStats(product);
  const rating = Number(product.rating) || 4.5;
  const price = moneyToNumber(product.price);
  const oldPrice = moneyToNumber(product.oldPrice);
  const discountPercent = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const stockScore = Math.min(product.stock ?? 0, 100) * 0.18;
  const sellerScore = (product.sellerScore ?? 80) * 0.16;
  const salesScore = stats.orders * 0.72;
  const cartScore = stats.cartAdds * 0.34;
  const clickScore = stats.clicks * 0.035;
  const ratingScore = rating * 9;
  const freshnessScore = ['Новинка', 'Май', 'Сезон'].includes(product.badge) ? 20 : 4;
  const promoScore = product.promotion === 'paid' ? 18 : product.promotion === 'editorial' ? 13 : 5;
  const discountScore = discountPercent * 0.55;
  const returnPenalty = stats.returns * 2.3;
  const mayBoost = product.campaign === 'may' ? 28 : 0;
  const contextBoost =
    context === 'popular' ? salesScore + cartScore :
    context === 'new' ? freshnessScore * 1.8 :
    context === 'may' ? mayBoost * 1.7 :
    context === 'deals' ? discountScore * 2 : 0;

  return Math.round(stockScore + sellerScore + salesScore + cartScore + clickScore + ratingScore + freshnessScore + promoScore + discountScore + mayBoost + contextBoost - returnPenalty);
}

function diversify(list: MarketProduct[], limit: number) {
  const brandCount = new Map<string, number>();
  const result: MarketProduct[] = [];
  for (const product of list) {
    const count = brandCount.get(product.brand) ?? 0;
    if (count < 2 || result.length >= Math.floor(limit * 0.65)) {
      result.push(product);
      brandCount.set(product.brand, count + 1);
    }
    if (result.length >= limit) break;
  }
  return result;
}

export function rankedProducts(context: 'default' | 'popular' | 'new' | 'may' | 'deals' = 'default', limit = marketProducts.length) {
  return diversify(
    [...marketProducts].sort((a, b) => scoreProduct(b, context) - scoreProduct(a, context)),
    limit
  );
}

export const algorithmShelves = [
  { id: 'may', title: 'Майская витрина', subtitle: 'Сезонные товары, подарки и товары для прогулок', products: rankedProducts('may', 10) },
  { id: 'popular', title: 'Популярное по алгоритму', subtitle: 'Продажи, корзины, клики, рейтинг и качество продавца', products: rankedProducts('popular', 10) },
  { id: 'deals', title: 'Выгодно сейчас', subtitle: 'Скидка + спрос + рейтинг, без мусорных товаров', products: rankedProducts('deals', 10) },
  { id: 'new', title: 'Лучшие новинки', subtitle: 'Новым товарам даём стартовые показы', products: rankedProducts('new', 10) }
];

export const mayCampaign = {
  title: 'Майский сезон покупок',
  subtitle: 'Подарки, пикники, уход, дом, дети и питомцы — всё для майских выходных.',
  tags: ['Подарки к маю', 'Дача и пикник', 'Весенний уход', 'Дом после зимы', 'Прогулки с детьми']
};
