"use client";

import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {allWords,units,Word} from "../../lib/data";

type Result={correct:number;wrong:number;xp:number};
type Progress=Record<string,{correct:number;wrong:number;streak:number;difficulty:number;lastSeen:number}>;

function shuffle<T>(a:T[]){return [...a].sort(()=>Math.random()-.5)}

function makeQuestion(word:Word, type:number){
  const distractors=shuffle(allWords.filter(w=>w.id!==word.id)).slice(0,3);
  if(type===1){
    return {prompt:word.turkish,answer:word.english,options:shuffle([word.english,...distractors.map(w=>w.english)]),label:"Türkçeden İngilizceye"};
  }
  return {prompt:word.english,answer:word.turkish,options:shuffle([word.turkish,...distractors.map(w=>w.turkish)]),label:type===2?"İngilizceden Türkçeye":"Kelimeyi hatırla"};
}

export default function Practice(){
 const [unitId,setUnitId]=useState(0);
 const pool=useMemo(()=>unitId===0?allWords:(units.find(u=>u.id===unitId)?.words||allWords),[unitId]);
 const [questions,setQuestions]=useState<Word[]>([]);
 const [index,setIndex]=useState(0);
 const [selected,setSelected]=useState<string|null>(null);
 const [result,setResult]=useState<Result>({correct:0,wrong:0,xp:0});
 const [done,setDone]=useState(false);

 const start=()=>{setQuestions(shuffle(pool).slice(0,10));setIndex(0);setSelected(null);setResult({correct:0,wrong:0,xp:0});setDone(false)};
 useEffect(()=>{start()},[unitId]);

 const q=questions[index];
 const type=(index%3)+1;
 const current=q?makeQuestion(q,type):null;

 const answer=(option:string)=>{
   if(selected||!q||!current)return;
   const ok=option===current.answer;
   setSelected(option);
   const nextResult={...result,correct:result.correct+(ok?1:0),wrong:result.wrong+(ok?0:1),xp:result.xp+(ok?10:2)};
   setResult(nextResult);
   const saved:Progress=JSON.parse(localStorage.getItem("full-ingilis-progress")||"{}");
   const old=saved[q.id]||{correct:0,wrong:0,streak:0,difficulty:0,lastSeen:0};
   saved[q.id]={correct:old.correct+(ok?1:0),wrong:old.wrong+(ok?0:1),streak:ok?old.streak+1:0,difficulty:Math.max(0,Math.min(5,old.difficulty+(ok?-1:1))),lastSeen:Date.now()};
   localStorage.setItem("full-ingilis-progress",JSON.stringify(saved));
   const xp=Number(localStorage.getItem("full-ingilis-xp")||"0")+ (ok?10:2);
   localStorage.setItem("full-ingilis-xp",String(xp));
   const learned=JSON.parse(localStorage.getItem("full-ingilis-learned")||"[]");
   if(ok&&!learned.includes(q.id)){learned.push(q.id);localStorage.setItem("full-ingilis-learned",JSON.stringify(learned))}
 };

 const next=()=>{if(index+1>=questions.length)setDone(true);else{setIndex(i=>i+1);setSelected(null)}};

 if(done)return <main className="learn-page"><header className="learn-top"><Link href="/" className="back">← Ana Sayfa</Link><div><b>Çalışma / Test</b><span>Oturum tamamlandı</span></div><Link href="/review" className="back">Tekrar Et →</Link></header><div className="learn-wrap"><section className="quiz result-card"><div className="card-tag">TEST TAMAMLANDI</div><div className="big-emoji">🏆</div><div className="english">{result.correct} / {questions.length}</div><p className="example">Doğruluk: %{questions.length?Math.round(result.correct/questions.length*100):0} · Kazanılan XP: {result.xp}</p><div className="hero-buttons"><button className="reveal" onClick={start}>Tekrar Çöz</button><Link href="/review" className="secondary result-link">Zorlandıklarımı Çalış</Link></div></section></div></main>;

 return <main className="learn-page"><header className="learn-top"><Link href="/" className="back">← Ana Sayfa</Link><div><b>Çalışma / Test</b><span>10 soruluk hızlı test</span></div><div className="learn-count">{questions.length?index+1:0} / 10</div></header><div className="learn-wrap">
  <div className="unit-picker"><span>Ünite</span><button className={unitId===0?"selected":""} onClick={()=>setUnitId(0)}>Tümü</button>{units.map(u=><button key={u.id} className={u.id===unitId?"selected":""} onClick={()=>setUnitId(u.id)}>{u.id}</button>)}</div>
  {current&&q?<section className="quiz practice-card"><div className="quiz-head"><span>{current.label}</span><b>{current.prompt}</b></div><div className="answers">{current.options.map(o=><button key={o} className={selected?o===current.answer?"correct":o===selected?"wrong":"dim":""} onClick={()=>answer(o)}>{o}</button>)}</div>{selected&&<div className={selected===current.answer?"feedback good":"feedback bad"}>{selected===current.answer?"Doğru! +10 XP 🎉":"Yanlış. Doğru cevap: "+current.answer}</div>}{selected&&<button className="reveal next-btn" onClick={next}>{index+1===questions.length?"Sonucu Gör":"Sonraki Soru →"}</button>}</section>:<p>Test hazırlanıyor...</p>}
 </div></main>
}
