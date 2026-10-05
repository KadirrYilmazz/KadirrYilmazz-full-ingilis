"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import {allWords,units} from "../../lib/data";

type Row={learned:number;correct:number;wrong:number};
export default function Progress(){
 const [stats,setStats]=useState({learned:0,xp:0,correct:0,wrong:0});
 const [unitStats,setUnitStats]=useState<Record<number,Row>>({});
 useEffect(()=>{
   const learnedIds:string[]=JSON.parse(localStorage.getItem("full-ingilis-learned")||"[]");
   const p=JSON.parse(localStorage.getItem("full-ingilis-progress")||"{}");
   const vals=Object.values(p) as any[];
   setStats({learned:learnedIds.length,xp:Number(localStorage.getItem("full-ingilis-xp")||"0"),correct:vals.reduce((s,x)=>s+x.correct,0),wrong:vals.reduce((s,x)=>s+x.wrong,0)});
   const byUnit:Record<number,Row>={};
   units.forEach(u=>{const ids=new Set(u.words.map(w=>w.id));const rows=u.words.map(w=>p[w.id]).filter(Boolean);byUnit[u.id]={learned:learnedIds.filter(id=>ids.has(id)).length,correct:rows.reduce((s:any,x:any)=>s+x.correct,0),wrong:rows.reduce((s:any,x:any)=>s+x.wrong,0)}});
   setUnitStats(byUnit);
 },[]);
 const accuracy=stats.correct+stats.wrong?Math.round(stats.correct/(stats.correct+stats.wrong)*100):0;
 return <main className="learn-page"><header className="learn-top"><Link href="/" className="back">← Ana Sayfa</Link><div><b>İlerlemem</b><span>Öğrenme performansın</span></div><Link href="/achievements" className="back">Başarılar →</Link></header><div className="learn-wrap"><div className="stats progress-stats"><div className="stat"><div className="stat-icon purple">✦</div><div><span>Öğrenilen</span><strong>{stats.learned}</strong><small>/ {allWords.length} başlangıç kelimesi</small></div></div><div className="stat"><div className="stat-icon blue">⚡</div><div><span>Toplam XP</span><strong>{stats.xp}</strong><small>Testlerden kazanıldı</small></div></div><div className="stat"><div className="stat-icon green">✓</div><div><span>Doğruluk</span><strong>%{accuracy}</strong><small>{stats.correct} doğru · {stats.wrong} yanlış</small></div></div></div><section className="quiz"><div className="quiz-head"><span>ÜNİTE DURUMU</span><b>10 ünite</b></div>{units.map(u=>{const s=unitStats[u.id]||{learned:0,correct:0,wrong:0};const pct=Math.round(s.learned/u.words.length*100);return <div className="progress-unit" key={u.id}><span>{u.id}. {u.title}</span><b>%{pct}</b><div className="bar"><i style={{width:pct+"%"}}/></div></div>})}</section></div></main>
}