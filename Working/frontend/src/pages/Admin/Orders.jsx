import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminOrders(){
  const { authFetch } = useAuth();
  const [orders,setOrders]=useState([]);
  const load=()=> authFetch('/api/orders').then(r=>r.json()).then(setOrders);
  useEffect(()=>{ load(); },[]);
  const update=async(id,status)=>{ const r=await authFetch(`/api/orders/${id}/status`,{method:'PUT',body:JSON.stringify({status})}); if(r.ok) load(); };

  const generateInvoice = async (order) => {
    const doc = new jsPDF();
    let y = 20;

    // Try to draw logo centered at the top, keeping aspect ratio
    try {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = '/logo.png';

      await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });

      const pageWidth = doc.internal.pageSize.getWidth();

      const maxLogoWidth = 50;
      const maxLogoHeight = 30;
      const imgRatio = img.width / img.height || 1;

      let logoWidth = maxLogoWidth;
      let logoHeight = logoWidth / imgRatio;
      if (logoHeight > maxLogoHeight) {
        logoHeight = maxLogoHeight;
        logoWidth = logoHeight * imgRatio;
      }

      const x = (pageWidth - logoWidth) / 2;

      doc.addImage(img, 'PNG', x, 10, logoWidth, logoHeight);
      y = 10 + logoHeight + 10; // below logo
    } catch (e) {
      y = 20; // fallback if logo fails
    }

    // Header text under logo
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text("Order Invoice", 14, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.text(`Order ID: ${order._id}`, 14, y); y += 6;
    doc.text(`Status: ${order.status}`, 14, y); y += 6;
    if (order.user) {
      doc.text(`Customer: ${order.user.name || ''} (${order.user.email || ''})`, 14, y);
      y += 6;
    }
    const addr = order.shippingAddress || (order.user && order.user.address) || '';
    doc.text(`Address: ${addr || 'N/A'}`, 14, y);
    y += 6;
    const phone = order.phone || (order.user && order.user.phone) || '';
    doc.text(`Phone: ${phone || 'N/A'}`, 14, y);
    y += 6;
    doc.text(`Total: Tk ${order.total}`, 14, y); y += 10;

    // Items table
    const body = order.items.map((item) => {
      const qty = item.qty || 1;
      const price = item.price || 0;
      const lineTotal = price * qty;
      return [item.name, String(qty), `Tk ${price}`, `Tk ${lineTotal}`];
    });

    autoTable(doc, {
      head: [[ 'Item', 'Qty', 'Price', 'Total' ]],
      body,
      startY: y,
      styles: { fontSize: 10, textColor: [0, 0, 0] },
      headStyles: { fillColor: [221, 184, 146], textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [250, 243, 236], textColor: [0, 0, 0] }
    });

    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : y;

    // Thank-you note
    doc.setFontSize(11);
    doc.setFont(undefined, 'italic');
    doc.text(
      'Thank you for your order! We hope you enjoy your Drinkin\' coffee.',
      14,
      finalY + 12
    );
    // Thank-you note
    doc.setFontSize(11);
    doc.setFont(undefined, 'italic');
    doc.text(
      'Software developed by Ekon - ekon-portfolio.vercel.app',
      14,
      finalY + 18
    );

    doc.save(`invoice-${order._id.slice(-6)}.pdf`);
  };

  return (
    <div className="grid">
      {orders.map(o=> (
        <div className="card" key={o._id}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <div>#{o._id.slice(-6)} — <strong>{o.status}</strong></div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span>৳ {o.total}</span>
              <button className="btn secondary" onClick={()=>generateInvoice(o)}>Download Invoice</button>
            </div>
          </div>
          <ul>
            {o.items.map((i,idx)=>{
              const img = i.imageUrl || i?.product?.imageUrl;
              return (
                <li key={idx} style={{display:'flex',alignItems:'center',gap:10,margin:'6px 0'}}>
                  {img && <img src={img} alt={i.name} style={{width:40,height:40,objectFit:'cover',borderRadius:6}}/>}
                  <div style={{display:'flex',flexDirection:'column'}}>
                    <span>{i.name} x {i.qty}</span>
                    <span style={{opacity:.8,fontSize:12}}>৳ {i.price*i.qty}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {['Pending','Preparing','Completed','Cancelled'].map(s=> <button key={s} className="btn" onClick={()=>update(o._id,s)}>{s}</button>)}
          </div>
        </div>
      ))}
    </div>
  );
}
