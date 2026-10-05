"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import {allWords,Word} from "../../lib/data";

type Progress=Record<string,{correct:number;wrong:number;streak:number;difficulty:number;lastSeen:number}>;

export default function Review(){
 const [items,setItems]=useState<Word[]>([]);
 useEffect(()=>{const p:Progress=JSON.parse(localStorage.getItem("full-ingilis-progress")||"{}");setItems(allWords.filter(w=>(p[w.id]?.difficulty||0)>=2||(p[w.id]?.wrong||0)>0).sort((a,b)=>(p[b.id]?.difficulty||0)-(p[a.id]?.difficulty||0)).slice(0,30))},[]);
 return <main className="learn-page"><header className="learn-top"><Link href="/" className="back">← Ana Sayfa</Link><div><b>Tekrar Et</b><span>Zorlandığın kelimeleri güçlendir</span></div><Link href="/practice" className="back">Test →</Link></header><div className="learn-wrap"><section className="quiz"><div className="quiz-head"><span>AKILLI TEKRAR</span><b>{items.length?items.length+" kelime tekrar bekliyor":"Henüz zorlandığın kelime yok 🎉"}</b></div>{items.length?<div className="review-list">{items.map(w=><div className="word-row" key={w.id}><div className="word-pic">{w.emoji}</div><div className="word"><b>{w.english}</b><span>{w.turkish}</span></div><span className="difficulty">Zorluk {JSON.parse(localStorage.getItem("full-ingilis-progress")||"{}")[w.id]?.difficulty||0}/5</span></div>)}</div>:<p className="example">Bir test çöz; yanlış yaptığın kelimeler burada otomatik toplanacak.</p>}<Link href="/practice" className="reveal review-action">Tekrar Testine Başla →</Link></section></div></main>
}
