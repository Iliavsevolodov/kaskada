'use client';

import { useMemo, useState } from 'react';
import { HiHeart, HiMagnifyingGlass, HiOutlineShoppingBag, HiXMark } from 'react-icons/hi2';
import { products } from '@/lib/store';

type Product = (typeof products)[number];

export function ProductSearch() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Все');

  const items = useMemo(() => {
    const text = query.trim().toLowerCase();
    return products.filter((product) => {
      const byFilter = filter === 'Все' || product.category === filter || product.badge === filter;
      const byText = !text || [product.name, product.brand, product.category, product.badge, product.description].join(' ').toLowerCase().includes(text);
      return byFilter && byText;
    });
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
        <p>{items.length} товаров</p>
        {(query || filter !== 'Все') ? <button onClick={() => { setQuery(''); setFilter('Все'); }} type="button">Сбросить</button> : null}
      </div>
      <div className="productGrid compactGrid">
        {items.map((product) => <SearchProductCard product={product} key={product.id} />)}
      </div>
    </div>
  );
}

function SearchProductCard({ product }: { product: Product }) {
  return (
    <article className="productCard compactCard">
      <a className="productImage" href={`/kaskada/products/${product.id}/`}>
        <img src={product.image} alt={product.name} />
        <span className="badge">{product.badge}</span>
      </a>
      <div className="productBody">
        <a href={`/kaskada/products/${product.id}/`}><h3 className="productName">{product.name}</h3></a>
        <div className="productMeta"><span>{product.brand}</span><span>★ {product.rating}</span></div>
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
