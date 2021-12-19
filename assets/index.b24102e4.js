var D=Object.defineProperty,b=Object.defineProperties;var E=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var w=(t,n,e)=>n in t?D(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,p=(t,n)=>{for(var e in n||(n={}))j.call(n,e)&&w(t,e,n[e]);if(S)for(var e of S(n))O.call(n,e)&&w(t,e,n[e]);return t},h=(t,n)=>b(t,E(n));import{j as C,r as d,R,a as k}from"./vendor.12b85a50.js";const A=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}};A();function M({todoInput:t}){const n=e=>{if(e.key==="Escape")return e.preventDefault(),t==null?void 0:t.current.blur();if(e.originalTarget.tagName!=="INPUT"&&e.key==="i")return e.preventDefault(),t==null?void 0:t.current.focus()};return()=>(document.body.addEventListener("keydown",n),function(){window.removeEventListener("keydown",n)})}const l=C.exports.jsx,f=C.exports.jsxs;function P({todo:t,editTodo:n,setCompleted:e}){const[c,r]=d.exports.useState(t.text),[s,u]=d.exports.useState(t.isCompleted),[g,x]=d.exports.useState(null),v=m=>{const o=!s;return t.completed_at=new Date,e(i=>{const a=i.findIndex(N=>t.id===N.id);return o&&a===-1?[...i,t]:!o&&a!==-1?i.filter(N=>t.id!==N.id):i}),x(o?new Date:null),u(o)},y=m=>m?`${m.toLocaleString()}`:"";return l("li",{children:f("div",{className:"todo-item",children:[l("button",{tabIndex:"0",onClick:v,onContextMenu:m=>(m.preventDefault(),n({setText:r,text:c,id:t.id})),className:`item-text ${s&&"completed"}`,children:c}),l("small",{className:"completed-at",children:y(g)})]})})}function I(){const t=d.exports.useRef(null),n=d.exports.useRef([]),[e,c]=d.exports.useState(null),[r,s]=d.exports.useState([]),[u,g]=d.exports.useState([]),x=M({todoInput:t});d.exports.useEffect(x,[]);const v=o=>{if(!o)return;const i={id:Date.now(),text:o,completed:!1,editing:!1};s(a=>[i,...a])},y=o=>{s(i=>i.filter(a=>a.id!==o)),c({fn:null,id:null,text:null})},L=o=>{o.preventDefault();const i=(e==null?void 0:e.text)||"";return t.current.focus(),(e==null?void 0:e.fn)?(i==null?void 0:i.length)?(e.fn(i),c(h(p({},e),{text:""}))):y(e.id):(c(h(p({},e),{text:""})),v(i))},m=({setText:o,text:i,id:a})=>{c({fn:o,text:i,id:a}),t.current.focus()};return f("div",{className:"columns",children:[f("div",{className:"column",children:[l("h1",{children:"TODO List"}),l("form",{onSubmit:L,children:l("fieldset",{children:l("div",{children:l("input",{className:"input",ref:t,id:"todo-input",type:"text",placeholder:(e==null?void 0:e.fn)?"Press enter to delete":"New item",onInput:o=>c(h(p({},e),{text:o.target.value})),value:(e==null?void 0:e.text)||""})})})}),l("ul",{className:"todo-list",children:r.map(o=>l(P,{ref:n,todo:o,editTodo:m,setCompleted:g},o.id))})]}),f("div",{className:"column summary",children:[l("h2",{children:"Summary"}),f("p",{children:["Completed: ",l("strong",{children:u.length})]}),f("p",{children:["Not completed: ",l("strong",{children:r.length-u.length})]})]})]})}function T(){return l(I,{})}R.render(l(k.StrictMode,{children:l(T,{})}),document.getElementById("root"));
