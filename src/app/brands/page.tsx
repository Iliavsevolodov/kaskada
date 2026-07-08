import { brands } from '@/lib/store';

export default function BrandsPage() {
  return (
    <main className="page">
      <header className="header">
        <div className="container headerInner">
          <a className="logo" href="/kaskada/">
            <span className="logoMark">К</span>
            <div>
              <p className="logoTitle">Каскада Маркет</p>
              <p className="logoText">бренды магазина</p>
            </div>
          </a>
          <a className="cartBtn" href="/kaskada/">В магазин</a>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">бренды</p>
              <h1 className="sectionTitle">Витрины локальных брендов</h1>
            </div>
          </div>
          <div className="brandGrid">
            {brands.map((brand) => (
              <a className="brandCard" href={`/kaskada/brands/${brand.id}/`} key={brand.id}>
                <img src={brand.image} alt={brand.name} />
                <div>
                  <p className="label">{brand.category}</p>
                  <h3>{brand.name}</h3>
                  <p>{brand.text}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
