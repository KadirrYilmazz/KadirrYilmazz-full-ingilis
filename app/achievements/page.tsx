"use client";

import {useEffect,useState} from "react";
import Link from "next/link";

export default function Achievements(){
 const [learned,setLearned]=useState(0); const [xp,setXp]=useState(0);
 useEffect(()=>{setLearned(JSON.parse(localStorage.getItem("full-ingilis-learned")||"[]").length);setXp(Number(localStorage.getItem("full-ingilis-xp")||"0"))},[]);
 const items=[["🌱","İlk Adım","İlk kelimeyi öğren",learned>=1],["🔥","10 Kelime","10 kelime öğren",learned>=10],["💯","Yüzlük","50 kelime öğren",learned>=50],["⚡","XP Avcısı","500 XP kazan",xp>=500],["🏆","Test Ustası","1000 XP kazan",xp>=1000]];
 return <main className="learn-page"><header className="learn-top"><Link href="/" className="back">← Ana Sayfa</Link><div><b>Başarılar</b><span>İlerlemeni ödüllendir</span></div><Link href="/progress" className="back">İlerlemem →</Link></header><div className="learn-wrap"><section className="quiz"><div className="quiz-head"><span>ROZETLER</span><b>{items.filter(x=>x[3]).length} / {items.length} kazanıldı</b></div><div className="achievement-grid">{items.map(x=><div className={"achievement "+(x[3]?"earned":"")} key={String(x[1])}><div>{x[0]}</div><b>{x[1]}</b><span>{x[2]}</span></div>)}</div></section></div></main>
}
