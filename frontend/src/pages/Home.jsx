import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel.jsx';

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="row">
            <div style={{ flex: '1 1 420px' }}>
              <span className="badge">Bangladesh’s first coffee pouch brand</span>
              <h1 style={{ fontSize: 48, margin: '10px 0' }}>Drinkin’ Premium Espresso Pouches</h1>
              <p>We deliver freshly packed espresso pouches. Quality, convenience and flavor in every sip anytime, anywhere.</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <Link to="/shop" className="hero-btn">Order Now</Link>
                <Link to="/about" className="btn secondary">Learn More</Link>
              </div>
            </div>
            <div style={{ flex: '1 1 320px' }}>
              <Carousel
                slides={[
                  "https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/605661354_122150419892960633_4053199004561594415_n.jpg?_nc_cat=103&_nc_cb=99be929b-f3b7c874&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHq0E2d62ydeHuILte0OasykMnpmL78rrGQyemYvvyusSv7r64PfbLLyl37vj2o14mRrAcwBYlIZlUbMV14iWG4&_nc_ohc=BzhPfBUcBNsQ7kNvwGvw9n4&_nc_oc=AdmW3nHBAtj3prQa8c2Jtj10Rr_-oFoRbniFyvtq9zjGOx5kPL3_3SOgF6jWiTM1qxA&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=xLWo7Th4aEHA3Y40RfnL-w&oh=00_AfqH87ZcxdRAHbguFlwD3D4Wp5GpQHMkZBNAb0UhI7Q5Yg&oe=69675655",
                  "https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/588447842_122142032828960633_1877196644081188255_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&_nc_cb=99be929b-f3b7c874&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFB-6c_c8IjOaNDvwcTNtqoJwXV2mu20tAnBdXaa7bS0FQ-S2iMVFLsookM96H8TAAAYqmac01ju36DgjB7mOZe&_nc_ohc=vSlyYqssbzAQ7kNvwFqJTdJ&_nc_oc=Admqpz14hbnnUCxiSLVauxZoVsWKu8li6HzQnOXAYCAXGWYSviLPE897bVxQhYsEqFk&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=K2YCOItrTdfrhafYMZRZbQ&oh=00_AfrYyOjzGh6DZvOZNYrgcc2EM-oVEbQUc_etMVPXBByK9g&oe=69672A39",
                  "https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/587223395_122140005548960633_1576572323034232762_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&_nc_cb=99be929b-f3b7c874&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEhIwBq6ADn5QBnavQWCMApnGeRnl3y0HacZ5GeXfLQdiApksOTMEuhg2aZdXy9xfkZhhSoouzAipx-GwdEodIl&_nc_ohc=C1IsmgxBhTgQ7kNvwG9alfu&_nc_oc=AdlcvMH3IP37EhrDy0P8ZS200MdxdFBhA9xfGgJWGgD_aT_0vlxW78WNEZQquCFEqkE&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=YqMNIPLZMR3VKK1nXcIPTQ&oh=00_AfqwvCE_uQISPjaJCo9yLs38gS13iAIynaOkHQGdneSL3g&oe=69673317",
                  "https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/583944165_122139311042960633_2859059648884688663_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&_nc_cb=99be929b-f3b7c874&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEZBVw9V3fZ1toTspo5G4QB-AALsUhk0Cv4AAuxSGTQK9Nf47Mr6L8IkOdvNupd3VFUVEf2_AIAtt5RritQhp2g&_nc_ohc=8HUy49YuilgQ7kNvwEA0LvN&_nc_oc=AdmpxIbzcljaLDCNrj8UDk7CGUUA_AwMYuFbAuTlhuRyXylKvWgrgccN7WMW8X7iDKI&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=7k5q_tMJ5F_F3ml1Q0Uyvw&oh=00_AfqIC3qu7WOly261gGHsjbv2IzLsfM9cojyz2-zFm6Bx5w&oe=69672AF7",
                  "https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/558869533_122127504944960633_8382824691489250297_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&_nc_cb=99be929b-f3b7c874&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEzSfUsufe7ShF82mU7_dJovQaKmeoz0Ce9BoqZ6jPQJ-bvuUhrNiaLHPAo-qWPzJgnf2OqNwFYl64ZPD7BlKPv&_nc_ohc=FPTVgKUqNhwQ7kNvwG6umWn&_nc_oc=AdmJXq5DsgVmJV5abaYGmVmHNmTWPeQJKaLTnWJfXlBwWl3iIBmqERdceaTYNSWRv_Y&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=OIKEOV1AGHMfPvRd_5aepQ&oh=00_AfpmgRwi5gO0qRrh6e8h7aBo0FNkg9dvp46lH9VquOdpoQ&oe=6967303E"
                ]}
                interval={3500}
                square
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <h2 className="text-center">Featured Items</h2>
        <p className="text-center">Hand-picked best sellers.</p>
        <FeaturedProducts />
      </section>

      <section className="container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <div className="card">
            <h3>How to Drink Drinkin’</h3>
            <ol style={{ paddingLeft: 18 }}>
              <li>Open the pouch — zero prep</li>
              <li>Drink espresso — rich Arabica</li>
              <li>Enjoy anywhere — chill or on-the-go</li>
            </ol>
          </div>
          <div className="card">
            <h3>Why Choose Drinkin’?</h3>
            <ul style={{ paddingLeft: 18 }}>
              <li>100% Arabica coffee beans</li>
              <li>Double shot espresso</li>
              <li>Ready to drink</li>
            </ul>
          </div>
          <div className="card">
            <h3>Skip the Café Lines</h3>
            <p>Keep a pouch in the fridge for busy days, hangouts, or your daily grind. No machine required.</p>
            <Link to="/shop" className="btn">Shop Now</Link>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="cta" style={{ background: 'linear-gradient(90deg,#6b3e2e,#93573e)', color: '#fff', borderRadius: 16, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ margin: '0 0 6px' }}>Fresh. Fast. Fuss‑free.</h3>
            <p style={{ margin: 0 }}>Order today and taste the difference.</p>
          </div>
          <Link to="/shop" className="btn" style={{ background: '#fff', color: '#1f140f' }}>Order Now</Link>
        </div>
      </section>
    </div>
  );
}

const API = import.meta.env.VITE_API_BASE_URL || 'https://coffee-shop-bs3a.onrender.com';

function FeaturedProducts() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(4);

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((r) => r.json())
      .then(setData)
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    const updatePerPage = () => {
      const w = window.innerWidth;
      if (w < 768) {
        // Show 1 item centered with side space on mobile
        setPerPage(1.2); 
      } else if (w < 1024) {
        setPerPage(3);
      } else {
        setPerPage(4);
      }
    };
    updatePerPage();
    window.addEventListener('resize', updatePerPage);
    return () => window.removeEventListener('resize', updatePerPage);
  }, []);

  const items = Array.isArray(data) ? data : [];
  
  // Calculate max limit to prevent sliding into empty space
  const maxStart = items.length > Math.floor(perPage) ? items.length - Math.floor(perPage) : 0;

  useEffect(() => {
    if (items.length <= perPage) return;
    const t = setInterval(() => {
      setStart((s) => (s >= maxStart ? 0 : s + 1));
    }, 3500);
    return () => clearInterval(t);
  }, [items.length, perPage, maxStart]);

  if (!items.length) return null;

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* Product Slider Container */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            // Center calculation for mobile: Offset for the 1.2 perPage setting
            transform: window.innerWidth < 768 
              ? `translateX(-${start * (100 / perPage)}%) translateX(${((1 - (1/perPage)) * 50)}%)` 
              : `translateX(-${start * (100 / perPage)}%)`
          }}
        >
          {items.map((p) => (
            <div
              key={p._id}
              style={{
                flex: `0 0 ${100 / perPage}%`,
                boxSizing: 'border-box',
                padding: '0 10px' 
              }}
            >
              <div className="card" style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '15px',
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                {/* Image container to maintain perfect square and fit */}
                <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '12px', marginBottom: '12px' }}>
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      display: 'block'
                    }}
                  />
                </div>
                {/* Text Details */}
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: '#1f140f' }}>{p.name}</h3>
                  <p style={{ fontWeight: '600', color: '#6b3e2e', marginBottom: '12px' }}>৳ {p.price}</p>
                </div>
                {/* Action Button */}
                <Link to="/shop" className="btn" style={{ width: '100%', textAlign: 'center', padding: '10px 0' }}>
                  Add to Cart
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {items.length > Math.floor(perPage) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
          <button
            type="button"
            className="btn secondary"
            style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setStart((s) => (s <= 0 ? maxStart : s - 1))}
          >
            ‹
          </button>

          {/* Pagination Indicators */}
          <div style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: maxStart + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStart(i)}
                style={{
                  width: i === start ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '10px',
                  border: 'none',
                  padding: 0,
                  transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: i === start ? '#6b3e2e' : '#d3c3b5',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>

          <button
            type="button"
            className="btn secondary"
            style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setStart((s) => (s >= maxStart ? 0 : s + 1))}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}