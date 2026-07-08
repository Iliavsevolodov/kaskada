'use client';

import { useMemo, useState } from 'react';
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
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти товар, бренд или категорию" />
        <div className="searchHints">
          {['Все', 'Новинка', 'Акция', 'Дом', 'Уход', 'Подарок', 'Чай', 'Питомцам'].map((item) => (
            <button className={filter === item ? 'hintActive' : ''} key={item} onClick={() => setFilter(item)} type="button">{item}</button>
          ))}
        </div>
      </div>
      <div className="searchMeta">
        <p>{items.length} товаров найдено</p>
        {(query || filter !== 'Все') ? <button onClick={() => { setQuery(''); setFilter('Все'); }} type="button">Сбросить</button> : null}
      </div>
      <div className="productGrid">
        {items.map((product) => <SearchProductCard product={product} key={product.id} />)}
      </div>
    </div>
  );
}

function SearchProductCard({ product }: { product: Product }) {
  return (
    <article className="productCard">
      <a className="productImage" href={`/kaskada/products/${product.id}/`}>
        <img src={product.image} alt={product.name} />
        <span className="badge">{product.badge}</span>
      </a>
      <div className="productBody">
        <p className="productCategory">{product.category}</p>
        <a href={`/kaskada/products/${product.id}/`}><h3 className="productName">{product.name}</h3></a>
        <p className="productBrand">{product.brand}</p>
        <div className="priceRow">
          <p className="price">{product.price}</p>
          <p className="oldPrice">{product.oldPrice}</p>
        </div>
        <div className="quickActions">
          <button className="likeBtn" type="button">♡</button>
          <button className="buyBtn" type="button">В корзину</button>
        </div>
      </div>
    </article>
  );
}
