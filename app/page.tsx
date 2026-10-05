"use client";
import {useMemo,useState} from "react";
import Link from "next/link";

const units=[
["01","Friendship","Arkadaşlık","👥","64"],["02","Teen Life","Gençlik Hayatı","🎧","58"],
["03","In The Kitchen","Mutfakta","🍳","72"],["04","On The Phone","Telefonda","📱","55"],
["05","The Internet","İnternet","🌐","61"],["06","Adventures","Macera","🧭","67"],
["07","Tourism","Turizm","✈️","63"],["08","Chores","Ev İşleri","🧹","49"],
["09","Science","Bilim","🔬","60"],["10","Natural Forces","Doğal Kuvvetler","🌪️","56"]];

const nav=[["⌂","Ana Sayfa","/"],["✦","Kelime Öğren","/learn"],["✓","Çalışma / Test","/practice"],["↻","Tekrar Et","/review"],["⚡","Zorlandıklarım","/review"],["◔","İlerlemem","/progress"],["🏆","Başarılar","/achievements"]];

export default function Home(){
 const [lang,setLang]=useState("TR"); const [query,setQuery]=useState("");
 const filtered=useMemo(()=>units.filter(u=>(u[1]+" "+u[2]).toLowerCase().includes(query.toLowerCase())),[query]);
 return <main className="app">
  <aside className="sidebar">
   <Link href="/" className="brand"><div className="brand-mark">F</div><div><strong>FULL</strong><span>İNGİLİŞ</span></div></div>
   <div className="side-label">MENÜ</div>
   {nav.map(n=><Link key={n[1]} href={n[2]} className={"nav "+(n[1]==="Ana Sayfa"?"active":"")}><span>{n[0]}</span>{n[1]}</Link>)}
   <div className="side-bottom"><div className="side-label">HEDEF</div><div className="goal-mini"><div className="goal-row"><span>Bugünkü hedef</span><b>18 / 20</b></div><div className="bar"><i style={{width:"90%"}}/></div><small>2 kelime daha, seri bozulmasın! 🔥</small></div><Link href="/settings" className="settings">⚙ Ayarlar</Link></div>
  </aside>
  <section className="content">
   <header className="topbar"><div className="crumb"><span>FULL İNGİLİŞ</span><b>/</b><strong>Ana Sayfa</strong></div><div className="actions"><div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Kelime veya ünite ara..." /></div><button className="lang" onClick={()=>setLang(lang==="TR"?"EN":"TR")}>{lang} <span>⌄</span></button><div className="avatar">K</div></div></header>
   <div className="page">
    <section className="hero"><div><div className="eyebrow">LGS İNGİLİZCE • BUGÜN</div><h1>Bugün de kelimeleri <em>full’le.</em> 🚀</h1><p>Gör, ilişkilendir, hatırla, test et. Zorlandığın kelimeler sana tekrar gelsin.</p><div className="hero-buttons"><Link href="/learn" className="primary">▶ Çalışmaya Başla</Link><Link href="/learn" className="secondary">↻ Tekrar Et</Link></div></div><div className="hero-art"><div className="orbit one"/><div className="orbit two"/><div className="book">📚</div><div className="float f1">friendly</div><div className="float f2">macera 🧭</div><div className="float f3">success ✨</div></div></section>
    <section className="stats">
     <Stat icon="🔥" cls="orange" label="Günlük Seri" value="7 gün" note="En iyi: 12 gün"/><Stat icon="✦" cls="purple" label="Öğrenilen" value="142" note="Bu hafta +36"/><Stat icon="⚡" cls="blue" label="Toplam XP" value="2.480" note="Sonraki seviye: 520 XP"/><Stat icon="✓" cls="green" label="Doğruluk" value="%87" note="Son test: %92"/>
    </section>
    <div className="section-head"><div><h2>LGS Üniteleri</h2><p>Üniteleri sırayla tamamla, kelime haritanı doldur.</p></div><Link href="/learn" className="link-btn">Tümünü Gör →</Link></div>
    <section className="units">{filtered.map((u,i)=><article className="unit" key={u[0]}><div className="unit-top"><span className="unit-no">UNIT {u[0]}</span><span className="unit-emoji">{u[3]}</span></div><h3>{u[1]}</h3><p>{u[2]}</p><div className="progress-row"><span>{i<3?40+i*9:i===3?27:12}% tamamlandı</span><b>{i<3?28+i*5:0}/{u[4]}</b></div><div className="bar unit-bar"><i style={{width:(i<3?40+i*9:i===3?27:12)+"%"}}/></div><Link href={"/learn?unit="+Number(u[0])} className="unit-btn">Üniteye Git <span>→</span></Link></article>)}</section>
    <section className="lower"><div className="panel"><div className="panel-head"><div><h2>Son Çalışmalar</h2><p>En son kaldığın yerden devam et.</p></div><Link href="/progress" className="link-btn">Geçmiş →</Link></div>{[["FRIENDLY","arkadaş canlısı","👋","100%"],["CROWDED","kalabalık","👥","80%"],["ADVENTURE","macera","🧭","60%"]].map(x=><Link href="/learn" className="word-row" key={x[0]}><div className="word-pic">{x[2]}</div><div className="word"><b>{x[0]}</b><span>{x[1]}</span></div><div className="tiny-progress"><i style={{width:x[3]}}/></div><span className="chev">→</span></div>)}</div>
    <div className="panel daily"><div className="panel-head"><div><h2>Bugünkü Hedef</h2><p>Seriyi korumaya devam et.</p></div><span className="target">90%</span></div><div className="ring"><div><strong>18</strong><span>/ 20 kelime</span></div></div><div className="daily-note">2 kelime kaldı. <b>5 dakikada</b> bitirebilirsin.</div><Link href="/learn" className="primary full">Hedefi Tamamla →</Link></div></section>
   </div>
  </section>
 </main>;
}
function Stat({icon,cls,label,value,note}:{icon:string;cls:string;label:string;value:string;note:string}){return <div className="stat"><div className={"stat-icon "+cls}>{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></div>}
