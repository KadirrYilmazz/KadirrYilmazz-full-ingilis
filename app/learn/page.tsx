"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {allWords,units,Word} from "../../lib/data";

function shuffle<T>(a:T[]){return [...a].sort(()=>Math.random()-.5)}

export default function Learn(){
 const [unitId,setUnitId]=useState(1); const [index,setIndex]=useState(0); const [show,setShow]=useState(false);
 const [learned,setLearned]=useState<string[]>([]); const [options,setOptions]=useState<string[]>([]);
 const unit=units.find(u=>u.id===unitId)!; const word=unit.words[index%unit.words.length];
 useEffect(()=>{const saved=localStorage.getItem("full-ingilis-learned");if(saved)setLearned(JSON.parse(saved));const requested=Number(new URLSearchParams(window.location.search).get("unit")||0);if(requested>=1&&requested<=units.length)setUnitId(requested)},[]);
 useEffect(()=>{setShow(false);setOptions(shuffle([word.turkish,...shuffle(allWords.filter(w=>w.id!==word.id)).slice(0,3).map(w=>w.turkish)]))},[word.id]);
 const mark=(ok:boolean)=>{if(ok&&!learned.includes(word.id)){const next=[...learned,word.id];setLearned(next);localStorage.setItem("full-ingilis-learned",JSON.stringify(next))}setIndex(i=>i+1);setShow(false)};
 return <main className="learn-page">
  <header className="learn-top"><Link href="/" className="back">← Ana Sayfa</Link><div><b>Kelime Öğren</b><span>{unit.title}</span></div><div className="learn-count">{index+1} / {unit.words.length}</div></header>
  <div className="learn-wrap">
   <div className="unit-picker"><span>Ünite</span>{units.map(u=><button key={u.id} className={u.id===unitId?"selected":""} onClick={()=>{setUnitId(u.id);setIndex(0)}}>{u.id}</button>)}</div>
   <section className="word-card"><div className="card-tag">GÖR • İLİŞKİLENDİR • HATIRLA</div><div className="big-emoji">{word.emoji}</div><div className="english">{word.english}</div><div className="example">{word.example}</div>
    {!show?<button className="reveal" onClick={()=>setShow(true)}>Türkçesini Göster</button>:<div className="meaning">{word.turkish}</div>}
   </section>
   <section className="quiz"><div className="quiz-head"><span>Hızlı Kontrol</span><b>Bu kelime ne demek?</b></div><div className="answers">{options.map(o=><button key={o} onClick={()=>mark(o===word.turkish)}>{o}</button>)}</div></section>
   <div className="learn-foot"><span>Bu oturumda <b>{learned.length}</b> kelime işaretlendi.</span><Link href="/practice">Test moduna geç →</Link></div>
  </div>
 </main>
}
