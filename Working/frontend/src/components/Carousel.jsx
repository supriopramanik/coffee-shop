import { useEffect, useState } from 'react';

export default function Carousel({ slides = [], height = 280, interval = 4000, square = false }){
  const imgs = slides.length ? slides : [
    'https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/587223395_122140005548960633_1576572323034232762_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&_nc_cb=99be929b-f3b7c874&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEhIwBq6ADn5QBnavQWCMApnGeRnl3y0HacZ5GeXfLQdiApksOTMEuhg2aZdXy9xfkZhhSoouzAipx-GwdEodIl&_nc_ohc=C1IsmgxBhTgQ7kNvwG9alfu&_nc_oc=AdlcvMH3IP37EhrDy0P8ZS200MdxdFBhA9xfGgJWGgD_aT_0vlxW78WNEZQquCFEqkE&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=YqMNIPLZMR3VKK1nXcIPTQ&oh=00_AfqwvCE_uQISPjaJCo9yLs38gS13iAIynaOkHQGdneSL3g&oe=69673317',
    'https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/588447842_122142032828960633_1877196644081188255_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&_nc_cb=99be929b-f3b7c874&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFB-6c_c8IjOaNDvwcTNtqoJwXV2mu20tAnBdXaa7bS0FQ-S2iMVFLsookM96H8TAAAYqmac01ju36DgjB7mOZe&_nc_ohc=vSlyYqssbzAQ7kNvwFqJTdJ&_nc_oc=Admqpz14hbnnUCxiSLVauxZoVsWKu8li6HzQnOXAYCAXGWYSviLPE897bVxQhYsEqFk&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=K2YCOItrTdfrhafYMZRZbQ&oh=00_AfrYyOjzGh6DZvOZNYrgcc2EM-oVEbQUc_etMVPXBByK9g&oe=69672A39',
    'https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/605661354_122150419892960633_4053199004561594415_n.jpg?_nc_cat=103&_nc_cb=99be929b-f3b7c874&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHq0E2d62ydeHuILte0OasykMnpmL78rrGQyemYvvyusSv7r64PfbLLyl37vj2o14mRrAcwBYlIZlUbMV14iWG4&_nc_ohc=BzhPfBUcBNsQ7kNvwGvw9n4&_nc_oc=AdmW3nHBAtj3prQa8c2Jtj10Rr_-oFoRbniFyvtq9zjGOx5kPL3_3SOgF6jWiTM1qxA&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=xLWo7Th4aEHA3Y40RfnL-w&oh=00_AfqH87ZcxdRAHbguFlwD3D4Wp5GpQHMkZBNAb0UhI7Q5Yg&oe=69675655'
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (imgs.length <= 1) return; // no rotation for single image
    const t = setInterval(() => setIdx(i => (i + 1) % imgs.length), interval);
    return () => clearInterval(t);
  }, [imgs.length, interval]);

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 16,
    boxShadow: '0 10px 30px rgba(0,0,0,.15)',
    height: square ? 'auto' : height,
    aspectRatio: square ? '1 / 1' : undefined
  };

  return (
    <div style={containerStyle}>
      {imgs.map((src,i)=>(
        <img key={src} src={src} alt="slide" className="responsive" style={{position:'absolute',inset:0,objectFit:'cover',height:'100%',width:'100%',transition:'opacity .8s',opacity:i===idx?1:0}}/>
      ))}
      {/* reserve layout */}
      <img src={imgs[idx]} alt="current" className="responsive" style={{visibility:'hidden',height: square ? 'auto' : height, width:'100%'}}/>
    </div>
  );
}
