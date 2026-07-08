import { brands, products } from '@/lib/store';

export function generateStaticParams() {
  return brands.map((brand) => ({ id: brand.id }));
}

export default function BrandPage({ params }: { params: { id: string } }) {
  const brand = brands.find((item) => item.id === params.id) ?? brands[0];
  const brandProducts = products.filter((product) => product.brand === brand.name || product.category === brand.category).slice(0, 8);

  return (
    <main className="page">
      <header className="header">
        <div className="container headerInner">
          <a className="logo" href="/kaskada/brands/">
            <span className="logoMark">К</span>
            <div>
              <p className="logoTitle">Каскада Маркет</p>
              <p className="logoText">витрина бренда</p>
            </div>
          </a>
          <a className="cartBtn" href="/kaskada/brands/">Все бренды</a>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="heroCard">
            <img className="heroImage" src={brand.image} alt={brand.name} />
            <div className="heroOverlay" />
            <div className="heroContent">
              <p className="label">{brand.category}</p>
              <h1>{brand.name}</h1>
              <p>{brand.text}</p>
              <div className="heroActions">
                <a className="primaryBtn heroBtn" href="#products">Смотреть товары</a>
                <a className="secondaryBtn" href="/kaskada/brands/">Все бренды</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">товары бренда</p>
              <h2 className="sectionTitle">Подборка {brand.name}</h2>
            </div>
          </div>
          <div className="productGrid">
            {(brandProducts.length ? brandProducts : products.slice(0, 4)).map((product) => (
              <a className="productCard" href={`/kaskada/products/${product.id}/`} key={product.id}>
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
