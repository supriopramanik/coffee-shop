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
                  "/slides/1.jpg",
                  "/slides/2.jpg",
                  "/slides/3.jpg",
                  "/slides/4.jpg"
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