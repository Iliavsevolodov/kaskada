import { HiArrowTrendingUp, HiBolt, HiFire, HiOutlineShoppingBag, HiSparkles } from 'react-icons/hi2';
import { getAlgorithmShelves, mayCampaigns, type RankedProduct } from '@/lib/algorithms';

const icons = [HiFire, HiArrowTrendingUp, HiSparkles, HiBolt];

export function MayMarketplace() {
  return (
    <section className="mayMarketplace" id="may">
      <div className="container">
        <div className="mayHero">
          <div>
            <p className="label">майская витрина</p>
            <h2>Май в Каскада Маркет</h2>
            <span>Сезонные показы без ИИ: подарки, дом, уход, уют и товары для выходных получают дополнительный алгоритмический буст.</span>
          </div>
          <a href="#algorithm-shelves">Смотреть алгоритмы</a>
        </div>
        <div className="mayCampaignGrid">
          {mayCampaigns.map((campaign) => (
            <a className={`mayCampaign may-${campaign.tone}`} href={campaign.href} key={campaign.title}>
              <p>{campaign.title}</p>
              <span>{campaign.text}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AlgorithmShelves() {
  const shelves = getAlgorithmShelves();
  return (
    <section className="algorithmShelves" id="algorithm-shelves">
      <div className="container">
        <div className="algorithmExplain">
          <p className="label">алгоритм без ИИ</p>
          <h2>Показы считаются по правилам</h2>
          <span>Платформа учитывает клики, корзины, заказы, рейтинг, новизну, акции, майский буст и качество продавца. Это не ИИ — это прозрачная система баллов.</span>
        </div>
        <div className="algorithmShelfList">
          {shelves.map((shelf, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div className="algorithmShelf" id={shelf.id} key={shelf.id}>
                <div className="algorithmShelfHead">
                  <div>
                    <p><Icon />{shelf.eyebrow}</p>
                    <h3>{shelf.title}</h3>
                    <span>{shelf.text}</span>
                  </div>
                  <b>{shelf.products.length} товаров</b>
                </div>
                <div className="algorithmRail">
                  {shelf.products.map((product, productIndex) => (
                    <AlgorithmProductCard product={product} index={productIndex} key={`${shelf.id}-${product.id}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AlgorithmProductCard({ product, index }: { product: RankedProduct; index: number }) {
  return (
    <article className={index === 0 ? 'algorithmProduct algorithmProductHero' : 'algorithmProduct'}>
      <a className="algorithmProductImage" href={`/kaskada/products/${product.id}/`}>
        <img src={product.image} alt={product.name} />
        <span>{product.promotionLabel}</span>
      </a>
      <div className="algorithmProductBody">
        <a href={`/kaskada/products/${product.id}/`}><h4>{product.name}</h4></a>
        <div className="algorithmMeta"><span>{product.brand}</span><span>★ {product.rating}</span></div>
        <div className="algorithmScore">
          <small>{product.algorithmReason}</small>
          <b>{product.algorithmScore}</b>
        </div>
        <div className="algorithmPrice">
          <p>{product.price}</p>
          <span>{product.oldPrice}</span>
        </div>
        <button type="button"><HiOutlineShoppingBag />В корзину</button>
      </div>
    </article>
  );
}
