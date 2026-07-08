const categories = ['Все', 'Новинки', 'Акции', 'Дом', 'Уход', 'Подарки', 'Чай', 'Детям'];

const products = [
  { name: 'Крем для рук Северное сияние', brand: 'Северная Лаборатория', category: 'Уход', price: '890 ₽', oldPrice: '1 190 ₽', badge: 'Новинка', image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=900&q=80' },
  { name: 'Набор для безопасной уборки', brand: 'Чистый Дом', category: 'Дом', price: '2 490 ₽', oldPrice: '2 990 ₽', badge: 'Акция', image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=900&q=80' },
  { name: 'Свеча Таёжный вечер', brand: 'Мастерская Тепла', category: 'Уют', price: '1 290 ₽', oldPrice: '1 590 ₽', badge: 'Хит', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80' },
  { name: 'Травяной чай Баланс', brand: 'Травы Севера', category: 'Чай', price: '690 ₽', oldPrice: '790 ₽', badge: 'Каждый день', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80' },
  { name: 'Подарочный набор Любовь рядом', brand: 'Подарки Рядом', category: 'Подарки', price: '3 490 ₽', oldPrice: '4 290 ₽', badge: 'Подарок', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=80' },
  { name: 'Сыворотка Сияние', brand: 'Аурум Скин', category: 'Уход', price: '1 790 ₽', oldPrice: '2 290 ₽', badge: 'Новинка', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=80' },
  { name: 'Аромаспрей для дома Лён', brand: 'Дом Ароматов', category: 'Уют', price: '990 ₽', oldPrice: '1 290 ₽', badge: 'Дом', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80' },
  { name: 'Детский защитный бальзам', brand: 'Мамин Выбор', category: 'Детям', price: '690 ₽', oldPrice: '890 ₽', badge: 'Детям', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80' }
];

const stories = [
  { title: 'Новинки', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
  { title: 'Дом', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=300&q=80' },
  { title: 'Уход', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80' },
  { title: 'Подарки', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=300&q=80' },
  { title: 'Чай', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80' }
];

export default function HomePage() {
  return (
    <main className="page">
      <header className="header">
        <div className="container headerInner">
          <a className="logo" href="/kaskada/">
            <span className="logoMark">К</span>
            <div>
              <p className="logoTitle">Каскада Маркет</p>
              <p className="logoText">магазин для покупателей</p>
            </div>
          </a>
          <nav className="nav">
            <a href="#catalog">Каталог</a>
            <a href="#sale">Акции</a>
            <a href="#brands">Бренды</a>
          </nav>
          <a className="cartBtn" href="#cart">Корзина</a>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="heroCard">
            <img className="heroImage" src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1600&q=80" alt="Витрина магазина" />
            <div className="heroOverlay" />
            <div className="heroContent">
              <p className="label">тёплый онлайн-магазин</p>
              <h1>Покупки у локальных брендов в одном месте</h1>
              <p>Уход, дом, уют, подарки, чай и товары для семьи. Простая витрина, понятные категории и быстрые покупки.</p>
              <div className="heroActions">
                <a className="primaryBtn heroBtn" href="#catalog">Смотреть товары</a>
                <a className="secondaryBtn" href="#sale">Акции недели</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stories">
        <div className="container storyRail">
          {stories.map((story) => (
            <a className="story" href="#catalog" key={story.title}>
              <span className="storyRing"><span><img src={story.image} alt={story.title} /></span></span>
              <span className="storyTitle">{story.title}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="searchBlock">
        <div className="container">
          <div className="searchBox">
            <input placeholder="Найти товар или бренд" />
          </div>
        </div>
      </section>

      <section className="section" id="catalog">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">категории</p>
              <h2 className="sectionTitle">Что ищем сегодня?</h2>
            </div>
          </div>
          <div className="categoryRail">
            {categories.map((category) => <a className="category" href="#products" key={category}>{category}</a>)}
          </div>
        </div>
      </section>

      <section className="section" id="sale">
        <div className="container bannerGrid">
          <a className="promoBanner" href="#products">
            <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80" alt="Подарки" />
            <div className="promoContent">
              <p className="label">подборка</p>
              <h3>Подарки с выгодой</h3>
              <p>Наборы, уход и уютные мелочи для красивого повода.</p>
            </div>
          </a>
          <a className="promoBanner" href="#products">
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80" alt="Дом" />
            <div className="promoContent">
              <p className="label">дом и уют</p>
              <h3>Товары для дома</h3>
              <p>Чистота, аромат, текстиль и ежедневный комфорт.</p>
            </div>
          </a>
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">товары</p>
              <h2 className="sectionTitle">Популярное сейчас</h2>
            </div>
            <a className="category" href="#catalog">Все категории</a>
          </div>
          <div className="productGrid">
            {products.map((product) => <ProductCard product={product} key={product.name} />)}
          </div>
        </div>
      </section>

      <section className="section" id="brands">
        <div className="container">
          <div className="infoBox">
            <p className="label">бренды</p>
            <h2 className="sectionTitle">Бренды появятся отдельным разделом</h2>
            <p>Следующим шагом добавим страницы брендов, отзывы, витрины и фильтры. Сейчас главная задача — стабильный покупательский магазин.</p>
          </div>
        </div>
      </section>

      <section className="section" id="cart">
        <div className="container">
          <div className="darkBox">
            <p className="label">корзина</p>
            <h2 className="sectionTitle">Корзина будет следующим модулем</h2>
            <p>Сейчас кнопки товаров уже готовы. Далее подключим количество, итоговую сумму и оформление заказа.</p>
          </div>
        </div>
      </section>

      <nav className="bottomNav">
        <div className="bottomNavInner">
          <a href="/kaskada/">Главная</a>
          <a href="#catalog">Каталог</a>
          <a href="#products">Товары</a>
          <a href="#cart">Корзина</a>
        </div>
      </nav>
    </main>
  );
}

function ProductCard({ product }: { product: { name: string; brand: string; category: string; price: string; oldPrice: string; badge: string; image: string } }) {
  return (
    <article className="productCard">
      <div className="productImage">
        <img src={product.image} alt={product.name} />
        <span className="badge">{product.badge}</span>
      </div>
      <div className="productBody">
        <p className="productCategory">{product.category}</p>
        <h3 className="productName">{product.name}</h3>
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
