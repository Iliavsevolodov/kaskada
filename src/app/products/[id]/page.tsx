import { marketProducts } from '@/lib/catalog';

export function generateStaticParams() {
  return marketProducts.map((product) => ({ id: product.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = marketProducts.find((item) => item.id === params.id) ?? marketProducts[0];
  const related = marketProducts.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);

  return (
    <main className="page">
      <header className="header">
        <div className="container headerInner">
          <a className="logo" href="/kaskada/">
            <span className="logoMark">К</span>
            <div>
              <p className="logoTitle">Каскада Маркет</p>
              <p className="logoText">карточка товара</p>
            </div>
          </a>
          <a className="cartBtn" href="/kaskada/#cart">Корзина</a>
        </div>
      </header>

      <section className="container productPageGrid">
        <div className="productDetailImage">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productDetailCard">
          <p className="label">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="productBrand">{product.brand}</p>
          <div className="priceRow">
            <p className="price">{product.price}</p>
            <p className="oldPrice">{product.oldPrice}</p>
          </div>
          <p>{product.description}</p>
          <p><strong>Рейтинг:</strong> {product.rating}</p>
          <div className="detailActions">
            <button className="likeBtn" type="button">♡</button>
            <button className="buyBtn" type="button">Добавить в корзину</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">похожие товары</p>
              <h2 className="sectionTitle">Можно добавить к заказу</h2>
            </div>
          </div>
          <div className="productGrid">
            {(related.length ? related : marketProducts.slice(0, 4)).map((item) => <SmallProduct product={item} key={item.id} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

function SmallProduct({ product }: { product: (typeof marketProducts)[number] }) {
  return (
    <a className="productCard" href={`/kaskada/products/${product.id}/`}>
      <div className="productImage">
        <img src={product.image} alt={product.name} />
        <span className="badge">{product.badge}</span>
      </div>
      <div className="productBody">
        <p className="productCategory">{product.category}</p>
        <h3 className="productName">{product.name}</h3>
        <p className="productBrand">{product.brand}</p>
        <div className="priceRow"><p className="price">{product.price}</p><p className="oldPrice">{product.oldPrice}</p></div>
      </div>
    </a>
  );
}
