import { HiBolt, HiChartBar, HiFire, HiHeart, HiHome, HiMagnifyingGlass, HiOutlineBuildingStorefront, HiOutlineShieldCheck, HiOutlineShoppingBag, HiOutlineTruck, HiSparkles, HiUserCircle } from 'react-icons/hi2';
import { AccentColorPicker } from '@/components/AccentColorPicker';
import { HeroSlider } from '@/components/HeroSlider';
import { ProductPreviewSlider } from '@/components/ProductPreviewSlider';
import { ProductSearch } from '@/components/ProductSearch';
import { StoryViewer } from '@/components/StoryViewer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getAlgorithmShelves, rankProducts, type RankedProduct } from '@/lib/algorithms';
import { marketProducts } from '@/lib/catalog';
import { brands, categories, collections, heroSlides, stories, videos } from '@/lib/store';

type Product = (typeof marketProducts)[number];
type Brand = (typeof brands)[number];
type ProductLike = Product | RankedProduct;

const algorithmShelves = getAlgorithmShelves();
const topProducts = rankProducts(marketProducts, 'popular', 8);

function getShelfLayout(index: number) {
  return ['craftShelfEditorial', 'craftShelfGallery', 'craftShelfCompact', 'craftShelfMagazine'][index % 4];
}

function getCardLayout(index: number, shelfIndex = 0) {
  const layouts = [
    ['craftCardHero', 'craftCardMini', 'craftCardWide', 'craftCardClean', 'craftCardTall', 'craftCardMini', 'craftCardClean', 'craftCardWide'],
    ['craftCardWide', 'craftCardHero', 'craftCardMini', 'craftCardClean', 'craftCardMini', 'craftCardTall', 'craftCardClean', 'craftCardMini'],
    ['craftCardMini', 'craftCardClean', 'craftCardMini', 'craftCardWide', 'craftCardMini', 'craftCardClean', 'craftCardMini', 'craftCardTall'],
    ['craftCardTall', 'craftCardMini', 'craftCardHero', 'craftCardClean', 'craftCardWide', 'craftCardMini', 'craftCardClean', 'craftCardMini']
  ];

  return layouts[Math.abs(shelfIndex) % layouts.length][index % 8];
}

export default function HomePage() {
  return (
    <main className="page">
      <div className="topNotice">Сегодня: алгоритмические подборки, новые бренды и товары для дома в одной витрине</div>
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
            <a href="#algorithm">Алгоритмы</a>
            <a href="#brands">Бренды</a>
          </nav>
          <div className="headerActions">
            <AccentColorPicker />
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

      <section className="section algorithmHero" id="algorithm">
        <div className="container algorithmHeroGrid">
          <div className="algorithmHeroCard craftPanel">
            <p className="label"><HiChartBar /> алгоритмы без ИИ</p>
            <h2>Показы управляются баллами, а не случайностью</h2>
            <p>Каждый товар получает рейтинг по кликам, корзинам, заказам, скидке, новизне, отзывам и качеству продавца. Новинки получают шанс, хиты растут, слабые товары опускаются ниже.</p>
          </div>
          <div className="algorithmStatsGrid craftStatsGrid">
            <div><span>{marketProducts.length}</span><p>товаров в ранжировании</p></div>
            <div><span>10</span><p>сигналов показа</p></div>
            <div><span>{algorithmShelves.length}</span><p>авто-подборки</p></div>
            <div><span>24/7</span><p>логика витрины</p></div>
          </div>
        </div>
      </section>

      <SectionDivider eyebrow="навигация" title="Выбирай быстрее" text="Разделы, подборки и сценарии покупки собраны так, чтобы человек сразу понимал, куда нажать." />

      <section className="section compactSection" id="catalog">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">категории</p>
              <h2 className="sectionTitle">Быстрый вход в покупки</h2>
            </div>
            <a className="sectionLink" href="#products">Открыть каталог</a>
          </div>
          <div className="categoryRail premiumCategoryRail craftCategoryRail">
            {categories.map((category) => <a className="category" href="#products" key={category}><HiSparkles />{category}</a>)}
          </div>
        </div>
      </section>

      <section className="section dealSection craftDealSection">
        <div className="container dealGrid craftDealGrid">
          <a className="dealCard dealHot craftDealHero" href="#products">
            <p><HiFire /> горячее</p>
            <h3>Товары, которые забирают сегодня</h3>
            <span>Смотреть подборку</span>
          </a>
          <a className="dealCard craftDealSoft" href="#brands">
            <p><HiOutlineBuildingStorefront /> бренды</p>
            <h3>Локальные витрины с характером</h3>
            <span>Перейти к брендам</span>
          </a>
          <a className="dealCard craftDealPaper" href="#algorithm">
            <p><HiChartBar /> алгоритм</p>
            <h3>Продвижение по понятным правилам</h3>
            <span>Смотреть логику</span>
          </a>
        </div>
      </section>

      <section className="section fullBannerSection" id="sale">
        <div className="bannerGrid bannerGridFull craftBannerGrid">
          <a className="promoBanner craftPromoPrimary" href="#gifts">
            <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1600&q=80" alt="Подарки" />
            <div className="promoContent">
              <p className="label">подборка</p>
              <h3>Подарки с выгодой</h3>
              <p>Наборы, уход и уютные мелочи для красивого повода.</p>
            </div>
          </a>
          <a className="promoBanner promoBannerBright craftPromoSecondary" href="#home">
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80" alt="Дом" />
            <div className="promoContent">
              <p className="label">дом и уют</p>
              <h3>Товары для дома</h3>
              <p>Чистота, аромат, текстиль и ежедневный комфорт.</p>
            </div>
          </a>
        </div>
      </section>

      <SectionDivider eyebrow="витрина" title="Алгоритмическая выдача" text="Каталог теперь сортируется по баллам: спрос, клики, корзины, рейтинг, новизна, скидка и качество продавца." strong />

      <section className="section compactSection" id="products">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="label">товары</p>
              <h2 className="sectionTitle">Маркетплейс-витрина</h2>
              <p className="sectionText">Поиск, фильтры, рейтинг, бренды, алгоритмические баллы и быстрые действия в плотной товарной сетке.</p>
            </div>
          </div>
          <ProductSearch />
        </div>
      </section>

      <section className="section compactSection craftShelfSection craftTopShelf">
        <div className="container">
          <div className="sectionHead craftShelfHead">
            <div>
              <p className="label">топ алгоритма</p>
              <h2 className="sectionTitle">Лучшие позиции выдачи</h2>
              <p className="sectionText">Эти товары сейчас получают больше показов по rule-based формуле.</p>
            </div>
            <a className="sectionLink" href="#products">В каталог</a>
          </div>
          <div className="productRail algorithmRail craftRail craftShelfEditorial">
            {topProducts.map((product, index) => <ProductCard product={product} featured={index === 0} layout={getCardLayout(index, 0)} key={`top-${product.id}`} />)}
          </div>
        </div>
      </section>

      <SectionDivider eyebrow="авто-подборки" title="Блоки собираются сами" text="Популярное, новинки, выгодные товары и высокий рейтинг — это не ручная витрина, а сортировка по правилам." />

      {algorithmShelves.map((shelf, shelfIndex) => (
        <section className={`section compactSection algorithmShelf craftShelfSection ${getShelfLayout(shelfIndex)}`} id={shelf.id} key={shelf.id}>
          <div className="container">
            <div className="sectionHead craftShelfHead">
              <div>
                <p className="label">{shelf.eyebrow}</p>
                <h2 className="sectionTitle">{shelf.title}</h2>
                <p className="sectionText">{shelf.text}</p>
              </div>
              <a className="sectionLink" href="#products">Все товары</a>
            </div>
            <div className={`productRail algorithmRail craftRail ${getShelfLayout(shelfIndex)}`}>
              {shelf.products.map((product, index) => <ProductCard product={product} featured={index === 0} layout={getCardLayout(index, shelfIndex)} key={`${shelf.id}-${product.id}`} />)}
            </div>
          </div>
        </section>
      ))}

      <SectionDivider eyebrow="контент" title="Обзоры и бренды" text="Видео, распаковки и брендовые витрины помогают покупателю быстрее доверять товару." />

      <section className="section compactSection craftMediaSection" id="videos">
        <div className="container">
          <div className="sectionHead craftShelfHead">
            <div>
              <p className="label">видео</p>
              <h2 className="sectionTitle">Распаковки и обзоры</h2>
            </div>
            <a className="sectionLink" href="#products">К товарам</a>
          </div>
          <div className="videoGrid videoRailMobile craftVideoGrid">
            {videos.map((video) => <VideoCard video={video} key={video.title} />)}
          </div>
        </div>
      </section>

      <section className="section compactSection craftBrandSection" id="brands">
        <div className="container">
          <div className="sectionHead craftShelfHead">
            <div>
              <p className="label">бренды</p>
              <h2 className="sectionTitle">Витрины брендов</h2>
            </div>
            <a className="category" href="/kaskada/brands/"><HiOutlineBuildingStorefront />Все бренды</a>
          </div>
          <div className="brandGrid brandRailMobile craftBrandGrid">
            {brands.map((brand) => <BrandCard brand={brand} key={brand.id} />)}
          </div>
        </div>
      </section>

      <SectionDivider eyebrow="ручные полки" title="Товарные сценарии" text="Горизонтальные полки остаются как витрины внутри маркетплейса: новинки, акции, подарки, уход, дом и питомцы." />

      {collections.map((collection, shelfIndex) => {
        const list = marketProducts.filter((product) => product.badge === collection.filter || product.category === collection.filter).slice(0, 6);
        return (
          <section className={`section compactSection craftShelfSection ${getShelfLayout(shelfIndex + 2)}`} id={collection.title === 'Для дома' ? 'home' : collection.title === 'Подарки' ? 'gifts' : collection.title === 'Для ухода' ? 'beauty' : undefined} key={collection.title}>
            <div className="container">
              <div className="sectionHead craftShelfHead">
                <div>
                  <p className="label">подборка</p>
                  <h2 className="sectionTitle">{collection.title}</h2>
                  <p className="sectionText">{collection.subtitle}</p>
                </div>
                <a className="sectionLink" href="#products">Все товары</a>
              </div>
              <div className={`productRail craftRail ${getShelfLayout(shelfIndex + 2)}`}>
                {list.map((product, index) => <ProductCard product={product} featured={index === 0} layout={getCardLayout(index, shelfIndex + 2)} key={`${collection.title}-${product.id}`} />)}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section compactSection" id="cart">
        <div className="container">
          <div className="cartPreview craftCartPreview">
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

function SectionDivider({ eyebrow, title, text, strong }: { eyebrow: string; title: string; text: string; strong?: boolean }) {
  return (
    <div className={strong ? 'sectionDivider strongDivider craftDivider' : 'sectionDivider craftDivider'}>
      <div className="container dividerInner">
        <div className="dividerLine" />
        <div className="dividerContent">
          <p>{eyebrow}</p>
          <h3>{title}</h3>
          <span>{text}</span>
        </div>
        <div className="dividerLine" />
      </div>
    </div>
  );
}

function ProductCard({ product, featured, layout }: { product: ProductLike; featured?: boolean; layout?: string }) {
  const badge = 'promotionLabel' in product ? product.promotionLabel : product.badge;
  const algorithmReason = 'algorithmReason' in product ? product.algorithmReason : null;
  const algorithmScore = 'algorithmScore' in product ? product.algorithmScore : null;
  const cardClass = ['productCard', featured ? 'railFeaturedCard' : 'compactCard', layout].filter(Boolean).join(' ');

  return (
    <article className={cardClass}>
      <ProductPreviewSlider href={`/kaskada/products/${product.id}/`} image={product.image} title={product.name} category={product.category} badge={badge} gallery={product.gallery} />
      <div className="productBody">
        <a href={`/kaskada/products/${product.id}/`}><h3 className="productName">{product.name}</h3></a>
        <div className="productMeta"><span>{product.brand}</span><span>★ {product.rating}</span></div>
        {algorithmReason ? <div className="algorithmTag"><span>{algorithmReason}</span><strong>{algorithmScore}</strong></div> : null}
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
