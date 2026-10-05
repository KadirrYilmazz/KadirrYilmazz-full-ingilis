"use client";

import {useState} from "react";
import Link from "next/link";

export default function Settings(){
 const [sound,setSound]=useState(false); const [theme,setTheme]=useState("Açık");
 const reset=()=>{localStorage.removeItem("full-ingilis-learned");localStorage.removeItem("full-ingilis-progress");localStorage.removeItem("full-ingilis-xp");alert("İlerleme sıfırlandı.")};
 return <main className="learn-page"><header className="learn-top"><Link href="/" className="back">← Ana Sayfa</Link><div><b>Ayarlar</b><span>Uygulama tercihleri</span></div><span className="learn-count">FULL İNGİLİŞ</span></header><div className="learn-wrap"><section className="quiz settings-card"><div className="setting-row"><div><b>Arayüz</b><span>Uygulama görünümü</span></div><select value={theme} onChange={e=>setTheme(e.target.value)}><option>Açık</option><option>Koyu</option></select></div><div className="setting-row"><div><b>Sesler</b><span>İlk sürümde ses kullanılmıyor.</span></div><button className={"toggle "+(sound?"on":"")} onClick={()=>setSound(!sound)}>{sound?"Açık":"Kapalı"}</button></div><div className="setting-row"><div><b>İlerlemeyi Sıfırla</b><span>Öğrenilen kelimeler, XP ve test geçmişi silinir.</span></div><button className="danger" onClick={reset}>Sıfırla</button></div></section></div></main>
}
