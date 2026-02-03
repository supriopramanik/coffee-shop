import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Cart(){
  const { items, remove, updateQty, total, clear } = useCart();
  const { user, authFetch } = useAuth();
  const nav = useNavigate();

  const checkout = async () => {
    if(!user){ nav('/login', { state:{ from: { pathname:'/cart' } } }); return; }
    const payload = {
      items: items.map(i=>({ product: i._id, qty: i.qty })),
      shippingAddress: user.address || '',
      phone: user.phone || ''
    };
    const res = await authFetch('/api/orders', { method:'POST', body: JSON.stringify(payload) });
    if(res.ok){ clear(); nav('/orders'); }
    else alert('Order failed');
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {items.length===0? (
        <p>No items. <Link to="/shop">Go shopping</Link></p>
      ):(
        <div className="grid">
          <div className="card">
            {items.map(i=> (
              <div key={i._id} style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
                <img src={i.imageUrl} alt={i.name} style={{width:80,height:80,objectFit:'cover',borderRadius:8}}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600}}>{i.name}</div>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginTop:4}}>
                    <button
                      className="btn secondary"
                      style={{padding:'2px 8px',minWidth:0}}
                      onClick={()=>updateQty(i._id, i.qty-1)}
                    >
                      -
                    </button>
                    <span>{i.qty}</span>
                    <button
                      className="btn secondary"
                      style={{padding:'2px 8px',minWidth:0}}
                      onClick={()=>updateQty(i._id, i.qty+1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>৳ {i.price*i.qty}</div>
                <button className="btn secondary" onClick={()=>remove(i._id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="card">
            <h3>Summary</h3>
            <p>Total: <strong>৳ {total}</strong></p>
            <button className="btn" onClick={checkout}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
}
