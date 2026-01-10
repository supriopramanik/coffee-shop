export default function About(){
  return (
    <div className="container">
      <header style={{textAlign:'center',margin:'10px 0 24px'}}>
        <h2 style={{margin:0}}>About Drinkin’</h2>
        <p className="muted" style={{marginTop:8}}>Bangladesh’s first coffee pouch brand — quality, convenience and flavor in every sip.</p>
      </header>

      <section className="grid auto-fit-250" style={{marginBottom:24}}>
        <div className="card lift">
          <div className="icon-circle">☕</div>
          <h3 style={{margin:'8px 0'}}>Quality</h3>
          <p className="muted">100% Arabica beans crafted into rich espresso concentrate.</p>
        </div>
        <div className="card lift">
          <div className="icon-circle">⚡</div>
          <h3 style={{margin:'8px 0'}}>Convenience</h3>
          <p className="muted">No prep, no mess, no waiting — just open and drink.</p>
        </div>
        <div className="card lift">
          <div className="icon-circle">🧊</div>
          <h3 style={{margin:'8px 0'}}>Anywhere</h3>
          <p className="muted">Perfect for home, office, hangouts, or your daily grind.</p>
        </div>
      </section>

      <section className="card" style={{marginBottom:24}}>
        <h3>Our Story</h3>
        <p>We started Drinkin’ to make café-quality espresso accessible without machines or lengthy preparation. Just open the pouch and enjoy.</p>
        <ul className="timeline">
          <li><strong>Idea brewed</strong> — We set out to make premium coffee effortless.</li>
          <li><strong>Recipe perfected</strong> — Double‑shot espresso, no sugar, bold and smooth.</li>
          <li><strong>Drinkin’ launches</strong> — Bringing espresso pouches to Bangladesh.</li>
        </ul>
      </section>

      <section className="grid auto-fit-250">
        <div className="card lift">
          <h3>Mission & Vision</h3>
          <ul>
            <li>Deliver premium coffee with zero hassle.</li>
            <li>Champion coffee culture in Bangladesh.</li>
          </ul>
        </div>
        <div className="card lift">
          <h3>Contact & Social</h3>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <a className="pill" href="mailto:service.drinkin@gmail.com">✉️ service.drinkin@gmail.com</a>
            <a className="pill" href="https://tiktok.com/@drinkin.global" target="_blank" rel="noreferrer">🎵 tiktok.com/@drinkin.global</a>
            <a className="pill" href="https://instagram.com/drinkin.global" target="_blank" rel="noreferrer">📷 instagram.com/drinkin.global</a>
          </div>
        </div>
      </section>
    </div>
  );
}
