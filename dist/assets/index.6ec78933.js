var e=Object.defineProperty,t=Object.defineProperties,o=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,i=(t,o,r)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[o]=r;import{q as a,R as s,C as c,$ as p,a as u}from"./vendor.f673e0a0.js";const d=[40,100,300,1200],m={0:{shape:[[0]],color:"0, 0, 0"},I:{shape:[[0,"I",0,0],[0,"I",0,0],[0,"I",0,0],[0,"I",0,0]],color:"80, 227, 230"},J:{shape:[[0,"J",0],[0,"J",0],["J","J",0]],color:"36, 95, 223"},L:{shape:[[0,"L",0],[0,"L",0],[0,"L","L"]],color:"223, 173, 36"},O:{shape:[["O","O"],["O","O"]],color:"223, 217, 36"},S:{shape:[[0,"S","S"],["S","S",0],[0,0,0]],color:"48, 211, 56"},T:{shape:[[0,0,0],["T","T","T"],[0,"T",0]],color:"132, 61, 198"},Z:{shape:[["Z","Z",0],[0,"Z","Z"],[0,0,0]],color:"227, 78, 78"}},x=()=>Array.from(Array(20),(()=>Array(12).fill([0,"clear"]))),f=()=>{const e=["I","J","L","O","S","T","Z"],t=e[Math.floor(Math.random()*e.length)];return m[t]};function g(e,t,{x:o,y:r}){for(let n=0;n<e.tetromino.length;n++)for(let l=0;l<e.tetromino[n].length;l++)if(!(0===e.tetromino[n][l]||t[n+e.position.y+r]&&t[l+e.position.x+o]&&"clear"===t[n+e.position.y+r][l+e.position.x+o][1]))return!0;return!1}const y=a.div`
  width: auto;
  background: rgba(${e=>e.color}, 0.8);
  border: ${e=>0===e.type?"0px solid":"4px solid"};
  border-bottom-color: rgba(${e=>e.color}, 0.1);
  border-right-color: rgba(${e=>e.color}, 1);
  border-top-color: rgba(${e=>e.color}, 1);
  border-left-color: rgba(${e=>e.color}, 0.3);
`;var b=s.memo((({type:e})=>s.createElement(y,{type:e,color:m[e].color})));const v=a.div`
  display: grid;
  grid-template-columns: repeat(${12}, 30px);
  grid-template-rows: repeat(${20}, 30px);
  grid-gap: 1px;
  border: 1px solid #777;
  background: #222;
`,h=({stage:e})=>s.createElement(v,null,e.map((e=>e.map(((e,t)=>s.createElement(b,{key:t,type:e[0]})))))),E=a.div`
  box-sizing: border-box;
  display: flex;
  align-items: space-between;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 2px solid #777;
  min-height: 20px;
  width: 120px;
  border-radius: 10px;
  color: ${e=>e.gameOver?"red":"#999"};
  background: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`,w=({gameOver:e,text:t})=>s.createElement(E,{gameOver:e},t),O=a.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 20px;
  width: 170px;
  border-radius: 10px;
  border: none;
  color: white;
  background: #111;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`,S=({callback:e})=>s.createElement(O,{onClick:e},"Start"),k=a.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  outline: none;
`,$=a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  margin: 0 auto;

  .display {
    display: flex;
    justify-content: space-between;
    width: 380px;
  }
`;function I(){const[e,a]=c.exports.useState({});const s=c.exports.useCallback((()=>{a({position:{x:4,y:0},tetromino:f().shape,collision:!1})}),[]);return{player:e,updateLayerPosition:function({x:e,y:s,collision:c}){a((a=>{return p=((e,t)=>{for(var o in t||(t={}))n.call(t,o)&&i(e,o,t[o]);if(r)for(var o of r(t))l.call(t,o)&&i(e,o,t[o]);return e})({},a),u={position:{x:a.position.x+=e,y:a.position.y+=s},collision:c},t(p,o(u));var p,u}))},resetPlayer:s,playerRotationHandler:function(t){const o=JSON.parse(JSON.stringify(e));var r;o.tetromino=(r=o.tetromino).map(((e,t)=>r.map((e=>e[t])))).map((e=>e.reverse()));const n=o.position.x;let l=1;for(;g(o,t,{x:0,y:0});)if(o.position.x+=l,l=-(l+(l>0?1:-1)),l>o.tetromino[0].length)return void(o.position.x=n);a(o)}}}function L(e,t){var o,r;const[n,l]=c.exports.useState(x),[i,a]=c.exports.useState(0);return c.exports.useEffect((()=>{function o(o){const r=o.map((e=>e.map((e=>"clear"===e[1]?[0,"clear"]:e))));return e.tetromino.forEach(((t,o)=>{t.forEach(((t,n)=>{0!==t&&(r[o+e.position.y][n+e.position.x]=[t,""+(e.collision?"merged":"clear")])}))})),e.collision?(t(),function(e){return e.reduce(((t,o)=>-1===o.findIndex((e=>0===e[0]))?(a((e=>e+1)),t.unshift(new Array(e[0].length).fill([0,"clear"])),t):(t.push(o),t)),[])}(r)):r}e.position&&(a(0),l((e=>o(e))))}),[null==(o=e.position)?void 0:o.x,e.collision,null==(r=e.position)?void 0:r.y,e.tetromino]),{stage:n,setStage:l,clearedRows:i}}const R=()=>{const[e,t]=c.exports.useState(null),[o,r]=c.exports.useState(!0),n=c.exports.useRef(null),{player:l,updateLayerPosition:i,resetPlayer:a,playerRotationHandler:p}=I(),{stage:u,setStage:m,clearedRows:f}=L(l,a),{score:y,setScore:b,row:v,setRow:E,level:O,setLevel:R}=function(e){const[t,o]=c.exports.useState(0),[r,n]=c.exports.useState(0),[l,i]=c.exports.useState(1);return c.exports.useEffect((()=>{e>0&&(o((t=>t+d[e-1]*l)),n((t=>t+e)))}),[e]),{score:t,setScore:o,row:r,setRow:n,level:l,setLevel:i}}(f);function j(e){g(l,u,{x:e,y:0})||i({x:e,y:0,collision:!1})}return function(e,t){const o=c.exports.useRef(e);c.exports.useEffect((()=>{o.current=e}),[e]),c.exports.useEffect((()=>{if(null===t)return;const e=setInterval((()=>o.current()),t);return()=>clearInterval(e)}),[t])}((()=>{v>10*O&&(R((e=>e+1)),t(1e3/O+200)),g(l,u,{x:0,y:1})?(l.position.y<1&&(console.log("Game Over."),r(!0),t(null)),i({x:0,y:0,collision:!0})):i({x:0,y:1,collision:!1})}),e),s.createElement(k,{role:"button",tabIndex:0,onKeyDown:function({keyCode:e,repeat:r}){if(!o)if(37===e)j(-1);else if(39===e)j(1);else if(40===e){if(r)return;t(30)}else 38===e&&p(u)},onKeyUp:function({keyCode:e}){o||40===e&&t(1e3/O+200)},ref:n},s.createElement($,null,s.createElement("div",{className:"display"},o?s.createElement(c.exports.Fragment,null,s.createElement(w,{gameOver:o,text:"Game Over"}),s.createElement(S,{callback:()=>{n.current&&n.current.focus(),m(x()),t(1e3),a(),b(0),R(1),E(0),r(!1)}})):s.createElement(c.exports.Fragment,null,s.createElement(w,{text:`Score: ${y}`}),s.createElement(w,{text:`Row: ${v}`}),s.createElement(w,{text:`Level: ${O}`}))),s.createElement(h,{stage:u})))};const j=p`
  body {
    margin: 0;
    padding: 0;
    background: url(${"/assets/bg.e45b93e7.jpg"}) #000;
    background-size: cover;
    background-position: center;
  }
`;u.render(s.createElement(s.Fragment,null,s.createElement(j,null),s.createElement(R,null)),document.getElementById("root"));
