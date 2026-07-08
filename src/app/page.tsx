import { HiBolt, HiFire, HiHeart, HiHome, HiMagnifyingGlass, HiOutlineBuildingStorefront, HiOutlineShieldCheck, HiOutlineShoppingBag, HiOutlineTruck, HiSparkles, HiUserCircle } from 'react-icons/hi2';
import { HeroSlider } from '@/components/HeroSlider';
import { ProductSearch } from '@/components/ProductSearch';
import { StoryViewer } from '@/components/StoryViewer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { brands, categories, collections, heroSlides, products, stories, videos } from '@/lib/store';

type Product = (typeof products)[number];
type Brand = (typeof brands)[number];

export default function HomePage() {
  return (
    <main className="page">
      <div className="topNotice">Сегодня: горячие подборки, новые бренды и товары для дома в одной витрине</div>
      <header className="header">
        <div className="container headerInner">
          <a className="logo" href="/kaskada/">
            <span className="logoMark">К</span>
            <div>
              <p className="logoTitle">Каскада Маркет</p>
              <p className="logoText">покупки у локальных брендов</p>
            </div>
          </a>
          <a className="desktopSearch" href="#products"><HiMagnifyingGlass /> Найти товар или бренд</a>
          <nav className="nav">
            <a href="#catalog">Каталог</a>
            <a href="#products">Товары</a>
            <a href="#videos">Обзоры</a>
            <a href="#brands">Бренды</a>
          </nav>
          <div className="headerActions">
            <ThemeToggle />
            <a className="cartBtn" href="#cart"><HiOutlineShoppingBag />Корзина</a>
          </div>
        </div>
      </header>

      <HeroSlider slides={heroSlides} />

      <section className="stories">
        <div className="container">
          <StoryViewer stories={stories} />
        </div>
      </section>

      <section className="marketTrust">
        <div className="container trustGrid">
          <div><HiOutlineTruck /><span>Доставка</span><strong>до дома и ПВЗ</strong></div>
          <div><HiOutlineShieldCheck /><span>Заказ</span><strong>под защитой</strong></div>
          <div><HiSparkles /><span>Бренды</span><strong>локальные витрины</strong></div>
          <div><HiBolt /><span>Покупка</span><strong>быстрые действия</strong></div>
        </div>
      </section>

      <section className="section compactSection" id="catalog">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">категории</p>
              <h2 className="sectionTitle">Быстрый вход в покупки</h2>
            </div>
            <a className="sectionLink" href="#products">Открыть каталог</a>
          </div>
          <div className="categoryRail premiumCategoryRail">
            {categories.map((category) => <a className="category" href="#products" key={category}><HiSparkles />{category}</a>)}
          </div>
        </div>
      </section>

      <section className="section dealSection">
        <div className="container dealGrid">
          <a className="dealCard dealHot" href="#products">
            <p><HiFire /> горячее</p>
            <h3>Товары, которые забирают сегодня</h3>
            <span>Смотреть подборку</span>
          </a>
          <a className="dealCard" href="#brands">
            <p><HiOutlineBuildingStorefront /> бренды</p>
            <h3>Локальные витрины с характером</h3>
            <span>Перейти к брендам</span>
          </a>
          <a className="dealCard" href="#videos">
            <p><HiSparkles /> обзоры</p>
            <h3>Распаковки, которые продают товар</h3>
            <span>Смотреть видео</span>
          </a>
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

      <section className="section compactSection" id="products">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">товары</p>
              <h2 className="sectionTitle">Маркетплейс-витрина</h2>
              <p className="sectionText">Поиск, фильтры, рейтинг, бренды и быстрые действия в плотной товарной сетке.</p>
            </div>
          </div>
          <ProductSearch />
        </div>
      </section>

      <section className="section compactSection" id="videos">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">видео</p>
              <h2 className="sectionTitle">Распаковки и обзоры</h2>
            </div>
            <a className="sectionLink" href="#products">К товарам</a>
          </div>
          <div className="videoGrid videoRailMobile">
            {videos.map((video) => <VideoCard video={video} key={video.title} />)}
          </div>
        </div>
      </section>

      <section className="section compactSection" id="brands">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">бренды</p>
              <h2 className="sectionTitle">Витрины брендов</h2>
            </div>
            <a className="category" href="/kaskada/brands/"><HiOutlineBuildingStorefront />Все бренды</a>
          </div>
          <div className="brandGrid brandRailMobile">
            {brands.map((brand) => <BrandCard brand={brand} key={brand.id} />)}
          </div>
        </div>
      </section>

      {collections.map((collection) => {
        const list = products.filter((product) => product.badge === collection.filter || product.category === collection.filter).slice(0, 6);
        return (
          <section className="section compactSection" id={collection.title === 'Для дома' ? 'home' : collection.title === 'Подарки' ? 'gifts' : collection.title === 'Для ухода' ? 'beauty' : undefined} key={collection.title}>
            <div className="container">
              <div className="sectionHead">
                <div>
                  <p className="label">подборка</p>
                  <h2 className="sectionTitle">{collection.title}</h2>
                  <p className="sectionText">{collection.subtitle}</p>
                </div>
                <a className="sectionLink" href="#products">Все товары</a>
              </div>
              <div className="productRail">
                {list.map((product) => <ProductCard product={product} key={`${collection.title}-${product.id}`} />)}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section compactSection" id="cart">
        <div className="container">
          <div className="cartPreview">
            <div>
              <p className="label">следующий модуль</p>
              <h2 className="sectionTitle">Корзина и оформление заказа</h2>
              <p>Следующим шагом подключим количество, итоговую сумму, доставку и оформление заказа.</p>
            </div>
            <a className="cartPreviewButton" href="#products"><HiOutlineShoppingBag />Продолжить покупки</a>
          </div>
        </div>
      </section>

      <nav className="bottomNav">
        <div className="bottomNavInner">
          <a href="/kaskada/"><HiHome /><span>Главная</span></a>
          <a href="#products"><HiMagnifyingGlass /><span>Поиск</span></a>
          <a href="#cart"><HiOutlineShoppingBag /><span>Корзина</span></a>
          <a href="#profile"><HiUserCircle /><span>Кабинет</span></a>
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
