import{c as j,j as I,r as h,k as N,R as w,a as C}from"./vendor.898d167f.js";const L=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const l of t)if(l.type==="childList")for(const m of l.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function d(t){const l={};return t.integrity&&(l.integrity=t.integrity),t.referrerpolicy&&(l.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?l.credentials="include":t.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(t){if(t.ep)return;t.ep=!0;const l=d(t);fetch(t.href,l)}};L();const x=j(o=>({todos:[],selectedTodo:{},deletedTodo:{},setTodos:e=>o({todos:e}),addTodo:e=>o(d=>({todos:[...d.todos,e]})),insertTodo:(e,d)=>o(a=>({todos:[...a.todos.slice(0,d),e,...a.todos.slice(d)]})),removeTodo:e=>o(d=>({deletedTodo:d.todos.find(t=>t.id===e),todos:d.todos.filter(t=>t.id!==e)})),selectTodo:e=>o(d=>({selectedTodo:e?d.todos.find(a=>a.id===e):{}})),updateSelectedText:e=>o(d=>d.selectedTodo.text=e)})),i=I.exports.jsx,v=I.exports.jsxs;var B=h.exports.forwardRef(({todo:o,setCompleted:e},d)=>{const a=x(n=>n.selectTodo),[t,l]=h.exports.useState(o.completed_at?new Date(o.completed_at):null),m=t!==null,r=()=>{const n=!m;return o.completed_at=n?new Date:null,e(u=>{const p=u.findIndex(g=>o.id===g.id);return n&&p===-1?[...u,o]:!n&&p!==-1?u.filter(g=>o.id!==g.id):u}),l(o.completed_at)},c=n=>n?`${n.toLocaleString()}`:"",f=n=>{n.preventDefault(),a(o.id)};return i("li",{children:v("div",{className:"todo-item",children:[i("button",{ref:d,tabIndex:"0","data-id":o.id,onClick:r,onContextMenu:f,className:`item-text ${m&&"completed"}`,children:o.text}),i("small",{className:"completed-at",children:c(t)})]})})});function U({input:o,todoRefs:e}){function d(r){return r.target.blur()}function a(r){var c;if(r.target.tagName==="BUTTON"){const f=parseInt((c=r.target.dataset)==null?void 0:c.id,10);return f?(r.preventDefault(),x.setState({selectedTodo:x.getState().todos.find(n=>n.id===f)}),o==null?void 0:o.current.focus()):void 0}if(r.target.tagName!=="INPUT")return r.preventDefault(),o==null?void 0:o.current.focus()}function t(r){var c;if(r.target.tagName==="BUTTON"){r.preventDefault();const f=x.getState().deletedTodo;if(!f.id)return;const n=parseInt((c=r.target.dataset)==null?void 0:c.id,10),u=(x.getState().todos.findIndex(g=>g.id===n)||0)+!r.shiftKey,p=x.getState().todos;return x.setState({deletedTodo:{},todos:[...p.slice(0,u),f,...p.slice(u)]})}}function l(r){var c,f,n,u;if(r.target.tagName==="BUTTON"){r.preventDefault();const p=e.current.findIndex(g=>g===r.target);return(f=(c=e.current)==null?void 0:c[p+1])==null?void 0:f.focus()}if(r.target.tagName!=="INPUT")return r.preventDefault(),(u=(n=e.current)==null?void 0:n[0])==null?void 0:u.focus()}function m(r){var c,f,n,u;if(r.target.tagName==="BUTTON"){r.preventDefault();const p=e.current.findIndex(g=>g===r.target);return(f=(c=e.current)==null?void 0:c[p-1])==null?void 0:f.focus()}if(r.target.tagName!=="INPUT")return r.preventDefault(),(u=(n=e.current)==null?void 0:n[e.current.length-1])==null?void 0:u.focus()}return[()=>{N.bind("esc",d),N.bind("i",a),N.bind(["p","shift + p"],t),N.bind("j",l),N.bind("k",m)},()=>N.reset()]}function M(){const[o,e]=h.exports.useState(""),[d,a]=h.exports.useState([]),t=h.exports.useRef(null),l=h.exports.useRef([]),[m,r,c,f]=x(s=>[s.todos,s.setTodos,s.selectedTodo,s.deletedTodo]),n=()=>localStorage.setItem("todos",JSON.stringify(m)),[u,p,g,b]=x(s=>[s.addTodo,s.removeTodo,s.updateSelectedText,s.selectTodo]),[y,D]=U({input:t,todoRefs:l});h.exports.useEffect(()=>{var T;const s=((T=JSON.parse(localStorage.getItem("todos")))!=null?T:[]).filter(S=>S.id);return r(s),a(s.filter(S=>S.completed_at)),y(),()=>D()},[]),h.exports.useEffect(()=>{e(c.text),t.current.focus()},[c.id]),h.exports.useEffect(n,[m,d]);const O=s=>u({id:Date.now(),text:s,completed_at:null});return v("div",{className:"columns",children:[v("div",{className:"column",children:[i("h1",{children:"TODO List"}),i("form",{onSubmit:s=>{s.preventDefault();const T=o;if(e(""),c.id)return T.length?(g(T),n()):p(c.id),b(null);if(!!T)return t.current.focus(),O(T)},children:i("fieldset",{children:i("div",{children:i("input",{ref:t,className:"input",placeholder:c.id?"Press enter to delete":"New item",onInput:s=>e(s.target.value),value:o||""})})})}),i("ul",{className:"todo-list",children:m.map((s,T)=>i(B,{ref:S=>l.current[T]=S,todo:s,setCompleted:a},s.id))})]}),v("div",{className:"column summary",children:[i("h2",{children:"Summary"}),v("p",{children:["Completed: ",i("strong",{children:d.length})]}),v("p",{children:["Not completed: ",i("strong",{children:m.length-d.length})]})]})]})}function P(){return i(M,{})}w.render(i(C.StrictMode,{children:i(P,{})}),document.getElementById("root"));
