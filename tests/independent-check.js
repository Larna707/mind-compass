// Independent re-implementation of the classic Destiny Matrix (written separately from the site code)
const {chromium}=require('playwright');
function red(n){while(n>22){n=String(n).split('').reduce((a,b)=>a+ +b,0)}return n}
function dsum(n){return String(n).split('').reduce((a,b)=>a+ +b,0)}
function ref(y,m,d){const A=red(d),B=red(m),C=red(dsum(y)),D=red(A+B+C),X=red(A+B+C+D);
 const F=red(A+B),G=red(B+C),H=red(C+D),I=red(D+A);
 const two=v=>red(v+X),one=v=>red(v+two(v));
 const C2=two(C),D2=two(D),cross=red(C2+D2);
 const sky=red(B+D),earth=red(A+C),personal=red(sky+earth),male=red(F+H),female=red(G+I),social=red(male+female),spirit=red(personal+social);
 return {A,B,C,D,X,F,G,H,I,A2:two(A),A1:one(A),B2:two(B),B1:one(B),C2,C1:one(C),D2,D1:one(D),money:red(C2+cross),love:red(D2+cross),cross,personal,social,spirit,tail:`${D2}-${one(D)}-${D}`}}
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('http://localhost:'+(process.argv[2]||8805)+'/#home');await p.waitForTimeout(400);
let bad=0,n=0;const start=new Date(Date.UTC(1930,0,1));
for(let t=0;t<36500;t+=7){const dt=new Date(start.getTime()+t*864e5);const y=dt.getUTCFullYear(),m=dt.getUTCMonth()+1,d=dt.getUTCDate();
 const iso=`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
 const s=await p.evaluate(i=>{const M=calc(i);return {A:M.A,B:M.B,C:M.C,D:M.D,X:M.X,F:M.F,G:M.G,H:M.H,I:M.I,A2:M.ch.A.two,A1:M.ch.A.one,B2:M.ch.B.two,B1:M.ch.B.one,C2:M.ch.C.two,C1:M.ch.C.one,D2:M.ch.D.two,D1:M.ch.D.one,money:M.money,love:M.love,cross:M.cross,personal:M.personal,social:M.social,spirit:M.spirit,tail:M.tailKey}},iso);
 const r=ref(y,m,d);n++;for(const k in r)if(r[k]!==s[k]){bad++;if(bad<5)console.log('MISMATCH',iso,k,r[k],s[k])}}
console.log('dates checked',n,'mismatches',bad);
// known worked example 05.06.1973: tail must be 4-16-12 (D2-D1-D)? print
console.log('05.06.1973',JSON.stringify(ref(1973,6,5)));
await b.close()})();
