const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [,,port,out]=process.argv;const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(`http://localhost:${port}/#home`);await p.waitForTimeout(500);
const dates=[];for(let i=0;i<50;i++){const y=1940+((i*7)%80),m=1+((i*5)%12),d=1+((i*11)%28);dates.push(`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`)}
dates.push('1973-06-05','2000-02-29','1999-12-31');
const calcs=await p.evaluate(ds=>ds.map(d=>JSON.stringify(calc(d))),dates);
const texts={};
for(const lang of ['bg','en']){await p.evaluate(l=>setLang(l),lang);
 for(const d of ['1973-06-05','1990-04-12']){await p.evaluate(d=>{showMain('T',d,'person')},d);await p.waitForTimeout(150);
  for(const v of ['pt','sy','zn','km','ch','fc']){await p.evaluate(v=>show(v,false),v);await p.waitForTimeout(80);texts[`${lang}|${d}|${v}`]=await p.evaluate(v=>document.getElementById('v-'+v).innerText,v)}}}
fs.writeFileSync(out,JSON.stringify({calcs,texts,errs},null,1));console.log('ok',calcs.length,Object.keys(texts).length,errs);await b.close()})();
