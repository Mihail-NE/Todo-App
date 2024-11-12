(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))n(c);new MutationObserver(c=>{for(const r of c)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(c){const r={};return c.integrity&&(r.integrity=c.integrity),c.referrerPolicy&&(r.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?r.credentials="include":c.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(c){if(c.ep)return;c.ep=!0;const r=t(c);fetch(c.href,r)}})();const g={ALL:"all",ACTIVE:"active",COMPLETED:"completed"},v="todos",d={ADD:"ADD",DELETE:"DELETE",TOGGLE:"TOGGLE",EDIT:"EDIT",TOGGLE_ALL:"TOGGLE_ALL",CLEAR_COMPLETED:"CLEAR_COMPLETED"},h=()=>{try{return JSON.parse(localStorage.getItem(v))||[]}catch{return[]}},E=e=>{try{return localStorage.setItem(v,JSON.stringify(e)),!0}catch{return!1}},L=(e,o)=>{switch(o.type){case d.ADD:return[...e,{text:o.payload,completed:!1}];case d.DELETE:return e.filter((t,n)=>n!==o.payload);case d.TOGGLE:return e.map((t,n)=>n===o.payload?{...t,completed:!t.completed}:t);case d.EDIT:return e.map((t,n)=>n===o.payload.index?{...t,text:o.payload.text}:t);case d.TOGGLE_ALL:{const t=e.every(n=>n.completed);return e.map(n=>({...n,completed:!t}))}case d.CLEAR_COMPLETED:return e.filter(t=>!t.completed);default:return e}},O=(e,o)=>{const t=L(e,{type:d.ADD,payload:o});return E(t),t},D=(e,o)=>{const t=L(e,{type:d.DELETE,payload:o});return E(t),t},I=(e,o)=>{const t=L(e,{type:d.TOGGLE,payload:o});return E(t),t},A=(e,o,t)=>{const n=L(e,{type:d.EDIT,payload:{index:o,text:t}});return E(n),n},G=e=>{const o=L(e,{type:d.TOGGLE_ALL});return E(o),o},b=e=>{const o=L(e,{type:d.CLEAR_COMPLETED});return E(o),o},x=({text:e,completed:o},t,{onToggle:n,onDelete:c,onEdit:r})=>{const l=document.createElement("li");l.innerHTML=`
      <div class="todo-text">
          <div class="todo-wrap">
              <input type="checkbox" class="custom-checkbox" ${o?"checked":""}>
              <span class="todo-value ${o?"completed":""}">${e}</span>
          </div>
          <i class="ri-delete-bin-line"></i>
      </div>
  `;const a=l.querySelector(".custom-checkbox"),m=l.querySelector(".ri-delete-bin-line"),u=l.querySelector(".todo-value");return a.addEventListener("change",()=>n(t)),m.addEventListener("click",()=>c(t)),u.addEventListener("dblclick",()=>{const i=document.createElement("input");i.type="text",i.value=e,i.className="edit-input";const T=()=>{const y=i.value.trim();y&&r(t,y)};i.addEventListener("blur",T),i.addEventListener("keypress",y=>{y.key==="Enter"&&T()}),u.replaceWith(i),i.focus()}),l},S=e=>e&&e.trim().length>0,_=(e,o)=>`${e} ${o}${e!==1?"s":""}`,w=e=>{const o=document.getElementById("form"),t=document.getElementById("input"),n=document.getElementById("toggle-icon");return o.addEventListener("submit",c=>{c.preventDefault();const r=t.value.trim();S(r)&&(e(r),t.value="")}),{form:o,input:t,toggleIcon:n}},B=({onFilterChange:e,onClearCompleted:o})=>{const t=document.querySelectorAll(".filter-btn"),n=document.getElementById("clear-completed"),c=document.getElementById("todo-count");return t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(m=>m.classList.remove("active")),a.classList.add("active"),e(a.dataset.filter)})}),n.addEventListener("click",o),{updateCount:a=>{c.textContent=_(a,"item")+" left"},toggleClearCompleted:()=>{const a=s.some(m=>m.completed);n.classList.toggle("hide",!a)}}};let s=h(),f=g.ALL;const C=B({onFilterChange:e=>{f=e,p()},onClearCompleted:()=>{s=b(s),p()}}),p=()=>{const e=document.getElementById("list"),o=document.getElementById("todo-filters"),t=document.getElementById("toggle-icon"),n=s.length>0;o.style.display=n?"flex":"none",t.style.display=n?"block":"none",e.style.display=n?"flex":"none";const c=s.every(l=>l.completed);t.classList.toggle("all-completed",c),e.innerHTML="",s.filter(l=>f===g.ACTIVE?!l.completed:f===g.COMPLETED?l.completed:!0).forEach((l,a)=>{const m=x(l,a,{onToggle:u=>{s=I(s,u),p()},onDelete:u=>{s=D(s,u),p()},onEdit:(u,i)=>{s=A(s,u,i),p()}});e.appendChild(m)});const r=s.filter(l=>!l.completed).length;C.updateCount(r),C.toggleClearCompleted()},{toggleIcon:P}=w(e=>{s=O(s,e),p()});P.addEventListener("click",()=>{s=G(s),p()});p();
