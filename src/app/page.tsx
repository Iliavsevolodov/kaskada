import { HiHeart, HiOutlineBuildingStorefront, HiOutlineShoppingBag } from 'react-icons/hi2';
import { HeroSlider } from '@/components/HeroSlider';
import { ProductSearch } from '@/components/ProductSearch';
import { brands, categories, collections, heroSlides, products, stories, videos } from '@/lib/store';

type Product = (typeof products)[number];
type Brand = (typeof brands)[number];

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
            <a href="#products">Товары</a>
            <a href="#videos">Обзоры</a>
            <a href="#brands">Бренды</a>
          </nav>
          <a className="cartBtn" href="#cart"><HiOutlineShoppingBag />Корзина</a>
        </div>
      </header>

      <HeroSlider slides={heroSlides} />

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

      <section className="section fullBannerSection" id="sale">
        <div className="bannerGrid bannerGridFull">
          <a className="promoBanner" href="#gifts">
            <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1600&q=80" alt="Подарки" />
            <div className="promoContent">
              <p className="label">подборка</p>
              <h3>Подарки с выгодой</h3>
              <p>Наборы, уход и уютные мелочи для красивого повода.</p>
            </div>
          </a>
          <a className="promoBanner promoBannerBright" href="#home">
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80" alt="Дом" />
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
              <h2 className="sectionTitle">Найди и добавь в корзину</h2>
              <p className="sectionText">Поиск работает по названию, бренду, категории, описанию и бейджам.</p>
            </div>
          </div>
          <ProductSearch />
        </div>
      </section>

      <section className="section" id="videos">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">видео</p>
              <h2 className="sectionTitle">Распаковки и обзоры</h2>
            </div>
          </div>
          <div className="videoGrid">
            {videos.map((video) => <VideoCard video={video} key={video.title} />)}
          </div>
        </div>
      </section>

      <section className="section" id="brands">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">бренды</p>
              <h2 className="sectionTitle">Витрины брендов</h2>
            </div>
            <a className="category" href="/kaskada/brands/"><HiOutlineBuildingStorefront />Все бренды</a>
          </div>
          <div className="brandGrid">
            {brands.map((brand) => <BrandCard brand={brand} key={brand.id} />)}
          </div>
        </div>
      </section>

      {collections.map((collection) => {
        const list = products.filter((product) => product.badge === collection.filter || product.category === collection.filter).slice(0, 6);
        return (
          <section className="section" id={collection.title === 'Для дома' ? 'home' : collection.title === 'Подарки' ? 'gifts' : collection.title === 'Для ухода' ? 'beauty' : undefined} key={collection.title}>
            <div className="container">
              <div className="sectionHead">
                <div>
                  <p className="label">подборка</p>
                  <h2 className="sectionTitle">{collection.title}</h2>
                  <p className="sectionText">{collection.subtitle}</p>
                </div>
              </div>
              <div className="productRail">
                {list.map((product) => <ProductCard product={product} key={`${collection.title}-${product.id}`} />)}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section" id="cart">
        <div className="container">
          <div className="darkBox">
            <p className="label">корзина</p>
            <h2 className="sectionTitle">Корзина будет следующим модулем</h2>
            <p>Кнопки товаров готовы. Далее подключим количество, итоговую сумму и оформление заказа.</p>
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

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="productCard compactCard">
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
          <button className="likeBtn" type="button" aria-label="В избранное"><HiHeart /></button>
          <button className="buyBtn" type="button"><HiOutlineShoppingBag />В корзину</button>
        </div>
      </div>
    </article>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <a className="brandCard" href={`/kaskada/brands/${brand.id}/`}>
      <img src={brand.image} alt={brand.name} />
      <div>
        <p className="label">{brand.category}</p>
        <h3>{brand.name}</h3>
        <p>{brand.text}</p>
      </div>
    </a>
  );
}

function VideoCard({ video }: { video: (typeof videos)[number] }) {
  return (
    <article className="videoCard">
      <img src={video.image} alt={video.title} />
      <span className="playButton">▶</span>
      <span className="duration">{video.duration}</span>
      <div className="videoBody">
        <p>{video.brand}</p>
        <h3>{video.title}</h3>
      </div>
    </article>
  );
}
