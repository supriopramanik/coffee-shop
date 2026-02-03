import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

const API = import.meta.env.VITE_API_BASE_URL || 'https://coffee-shop-bs3a.onrender.com';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { add } = useCart();
  const [selected, setSelected] = useState(null);
  const [modalQty, setModalQty] = useState(1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    console.log('Shop API base URL:', API);
    fetch(`${API}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setProducts(Array.isArray(data) ? data : []);
        setError('');
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Error loading products:', err);
        setError('Products could not be loaded. Please try again later.');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Shop</h1>
      <p className="text-center">Browse our full range of Drinkin espresso pouches.</p>

      {loading && <p>Loading products from our free API... Please wait a moment...</p>}
      {error && !loading && <p>{error}</p>}

      {!loading && !error && (
        <div className="grid products shop-grid">
          {products.map((p) => (
            <div
              key={p._id}
              className="card product-card lift"
              onClick={() => { setSelected(p); setModalQty(1); }}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="product-img"
              />
              <div className="product-body" onClick={(e) => e.stopPropagation()}>
                <h3>{p.name}</h3>
                <p style={{ margin: '4px 0 8px', fontWeight: 600 }}>
                  ৳ {p.price}
                </p>
                {p.description && (
                  <p
                    style={{
                      margin: '0 0 10px',
                      fontSize: 14,
                      opacity: 0.8,
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {p.description}
                  </p>
                )}
                <button
                  className="btn"
                  onClick={() => add(p)}
                  style={{ marginTop: 'auto' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              style={{ alignSelf: 'flex-end', marginBottom: 8, border: 'none', background: 'transparent', fontSize: 20, cursor: 'pointer' }}
            >
              ×
            </button>
            <img
              src={selected.imageUrl}
              alt={selected.name}
              className="modal-img"
            />
            <h2 style={{ margin: '4px 0 8px' }}>{selected.name}</h2>
            <p style={{ margin: '0 0 12px', fontWeight: 600 }}>
              ৳ {selected.price}
            </p>
            {selected.description && (
              <p style={{ margin: '0 0 16px', lineHeight: 1.5 }}>
                {selected.description}
              </p>
            )}
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
              <button
                className="btn secondary"
                style={{padding:'4px 10px',minWidth:0}}
                onClick={() => setModalQty(q => Math.max(1, q-1))}
              >
                -
              </button>
              <span>{modalQty}</span>
              <button
                className="btn secondary"
                style={{padding:'4px 10px',minWidth:0}}
                onClick={() => setModalQty(q => q+1)}
              >
                +
              </button>
            </div>
            <button
              className="btn"
              onClick={() => {
                add(selected, modalQty);
                setSelected(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
