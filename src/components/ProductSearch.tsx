'use client';

import { useMemo, useState } from 'react';
import { HiHeart, HiMagnifyingGlass, HiOutlineShoppingBag, HiXMark } from 'react-icons/hi2';
import { ProductPreviewSlider } from '@/components/ProductPreviewSlider';
import { rankProducts, type RankedProduct } from '@/lib/algorithms';
import { products } from '@/lib/store';

function getCardSize(index: number) {
  if (index === 0) return 'featuredCard';
  if (index > 0 && index % 11 === 0) return 'wideCard';
  if (index > 0 && index % 7 === 0) return 'tallCard';
  return 'compactCard';
}

export function ProductSearch() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Все');

  const items = useMemo(() => {
    const text = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const byFilter = filter === 'Все' || product.category === filter || product.badge === filter;
      const byText = !text || [product.name, product.brand, product.category, product.badge, product.description].join(' ').toLowerCase().includes(text);
      return byFilter && byText;
    });
    return rankProducts(filtered, filter === 'Новинка' ? 'new' : filter === 'Акция' ? 'sale' : 'default');
  }, [query, filter]);

  return (
    <div className="smartSearch">
      <div className="searchBox searchBoxStrong">
        <div className="searchInputWrap">
          <HiMagnifyingGlass className="searchIcon" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти товар, бренд или категорию" />
          {query ? <button className="clearSearch" onClick={() => setQuery('')} type="button" aria-label="Очистить поиск"><HiXMark /></button> : null}
        </div>
        <div className="searchHints">
          {['Все', 'Новинка', 'Акция', 'Дом', 'Уход', 'Подарок', 'Чай', 'Питомцам'].map((item) => (
            <button className={filter === item ? 'hintActive' : ''} key={item} onClick={() => setFilter(item)} type="button">{item}</button>
          ))}
        </div>
      </div>
      <div className="searchMeta">
        <p>{items.length} товаров · сортировка по алгоритму показов</p>
        {(query || filter !== 'Все') ? <button onClick={() => { setQuery(''); setFilter('Все'); }} type="button">Сбросить</button> : null}
      </div>
      <div className="productGrid mixedProductGrid">
        {items.map((product, index) => <SearchProductCard product={product} size={getCardSize(index)} key={product.id} />)}
      </div>
    </div>
  );
}

function SearchProductCard({ product, size }: { product: RankedProduct; size: string }) {
  return (
    <article className={`productCard ${size}`}>
      <ProductPreviewSlider href={`/kaskada/products/${product.id}/`} image={product.image} title={product.name} category={product.category} badge={product.promotionLabel} />
      <div className="productBody">
        <a href={`/kaskada/products/${product.id}/`}><h3 className="productName">{product.name}</h3></a>
        <div className="productMeta"><span>{product.brand}</span><span>★ {product.rating}</span></div>
        <div className="algorithmTag"><span>{product.algorithmReason}</span><strong>{product.algorithmScore}</strong></div>
        <div className="priceRow">
          <p className="price">{product.price}</p>
          <p className="oldPrice">{product.oldPrice}</p>
        </div>
        <div className="quickActions">
          <button className="likeBtn" type="button" aria-label="В избранное"><HiHeart /></button>
          <button className="buyBtn" type="button"><HiOutlineShoppingBag />В корзину</button>
        </div>
      </div>
    </article>
  );
}
