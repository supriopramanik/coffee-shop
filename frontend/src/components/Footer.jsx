export default function Footer(){
  return (
    <footer className="footer">
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
        <div>© {new Date().getFullYear()} Drinkin’. All rights reserved.</div>
        <div>Built by <a href="https://ekon-portfolio.vercel.app/" target="_blank" rel="noreferrer">Ekon</a></div>
      </div>
    </footer>
  );
}
