import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminCustomers() {
  const { authFetch } = useAuth();
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const loadUsers = () => authFetch('/api/users').then((r) => r.json()).then(setUsers);
  const loadOrders = (id) => authFetch(`/api/users/${id}/orders`).then((r) => r.json()).then(setOrders);

  useEffect(() => {
    loadUsers();

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stats = useMemo(() => {
    if (!orders.length) return { orderCount: 0, productCount: 0 };
    const orderCount = orders.length;
    const productCount = orders.reduce(
      (sum, o) => sum + o.items.reduce((s, i) => s + (i.qty || 1), 0),
      0
    );
    return { orderCount, productCount };
  }, [orders]);

  const primaryAddress = selected
    ? selected.address || (orders[0] && orders[0].shippingAddress) || ''
    : '';
  const primaryPhone = selected
    ? selected.phone || (orders[0] && orders[0].phone) || ''
    : '';

  return (
    <div className="card">
      <h2 style={{ marginTop: 0, marginBottom: 8 }}>Customers</h2>
      <p className="muted" style={{ marginTop: 0, marginBottom: 16 }}>
        Click a customer name to see full profile and purchase history.
      </p>

      {/* Customers table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '8px 6px', fontWeight: 600 }}>#</th>
              <th style={{ padding: '8px 6px', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '8px 6px', fontWeight: 600 }}>Email</th>
              <th style={{ padding: '8px 6px', fontWeight: 600 }}>Role</th>
              <th style={{ padding: '8px 6px', fontWeight: 600 }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => {
              const joined = u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-';
              const isSelected = selected && selected._id === u._id;
              return (
                <tr
                  key={u._id}
                  style={{
                    borderBottom: '1px solid #f0e6dc',
                    background: isSelected ? '#f7ede0' : 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelected(u);
                    loadOrders(u._id);
                  }}
                >
                  <td style={{ padding: '8px 6px' }}>{idx + 1}</td>
                  <td style={{ padding: '8px 6px', fontWeight: 600 }}>{u.name || 'Unnamed'}</td>
                  <td style={{ padding: '8px 6px' }}>{u.email}</td>
                  <td style={{ padding: '8px 6px' }}>{u.isAdmin ? 'Admin' : 'Customer'}</td>
                  <td style={{ padding: '8px 6px', fontSize: 12, opacity: 0.8 }}>{joined}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Details panel */}
      <div
        style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: '1px solid #eee',
          display: 'grid',
          gap: 16,
          gridTemplateColumns: isMobile
            ? 'minmax(0, 1fr)'
            : 'minmax(0, 280px) minmax(0, 1fr)'
        }}
      >
        <div>
          <h3 style={{ marginTop: 0 }}>{selected ? 'Customer Details' : 'Select a customer'}</h3>
          {selected ? (
            <div style={{ display: 'grid', gap: 6, fontSize: 14 }}>
              <div>
                <strong>Name:</strong> {selected.name || 'Unnamed'}
              </div>
              <div>
                <strong>Email:</strong> {selected.email}
              </div>
              <div>
                <strong>Phone:</strong> {primaryPhone || 'Not set'}
              </div>
              <div>
                <strong>Address:</strong> {primaryAddress || 'Not set'}
              </div>
              <div>
                <strong>Role:</strong> {selected.isAdmin ? 'Admin' : 'Customer'}
              </div>
              <div>
                <strong>Joined:</strong>{' '}
                {selected.createdAt
                  ? new Date(selected.createdAt).toLocaleString()
                  : '-'}
              </div>
              <div style={{ marginTop: 8 }}>
                <strong>Total orders:</strong> {stats.orderCount}
              </div>
              <div>
                <strong>Total products purchased:</strong> {stats.productCount}
              </div>
            </div>
          ) : (
            <p className="muted" style={{ fontSize: 14 }}>
              Choose a customer from the table above to see profile and order details.
            </p>
          )}
        </div>

        <div>
          <h3 style={{ marginTop: 0 }}>Purchase history</h3>
          {!selected && (
            <p className="muted" style={{ fontSize: 14 }}>
              No customer selected.
            </p>
          )}
          {selected && !orders.length && (
            <p className="muted" style={{ fontSize: 14 }}>
              This customer has no orders yet.
            </p>
          )}
          {selected && orders.length > 0 && (
            <div style={{ display: 'grid', gap: 10 }}>
              {orders.map((o) => (
                <div
                  key={o._id}
                  style={{
                    border: '1px solid #f0e6dc',
                    borderRadius: 10,
                    padding: 10,
                    background: '#fff'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 6,
                      fontSize: 14
                    }}
                  >
                    <span>
                      #{o._id.slice(-6)} • {o.status}
                    </span>
                    <span>৳ {o.total}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8
                    }}
                  >
                    {o.items.map((i, idx) => {
                      const img = i.imageUrl || i?.product?.imageUrl;
                      return (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: 12
                          }}
                        >
                          {img && (
                            <img
                              src={img}
                              alt={i.name}
                              style={{
                                width: 32,
                                height: 32,
                                objectFit: 'cover',
                                borderRadius: 6
                              }}
                            />
                          )}
                          <div>
                            <div>
                              {i.name} × {i.qty || 1}
                            </div>
                            <div style={{ opacity: 0.8 }}>
                              ৳ {(i.price || 0) * (i.qty || 1)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
