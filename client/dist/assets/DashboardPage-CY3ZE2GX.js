import{j as e,aw as k,ax as C,r as a,a9 as S}from"./vendor-CyKtPqnB.js";import{A as F,m as D}from"./vendor-motion-CR6M_UAm.js";import{U as z}from"./vendor-clerk-CmbJH4k2.js";import{u as I}from"./index-BTwl_X4e.js";const R=({isOpen:r,value:o,onChange:d,onClose:p,onSubmit:n})=>e.jsx(F,{children:r&&e.jsx("div",{className:"absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",children:e.jsxs(D.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},className:"w-96 rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl",children:[e.jsx("h2",{className:"mb-4 text-xl font-bold text-white",children:"New Root Folder"}),e.jsxs("form",{onSubmit:n,children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"mb-2 block text-xs font-bold uppercase text-gray-500",children:"Name"}),e.jsx("input",{autoFocus:!0,type:"text",value:o,onChange:i=>d(i.target.value),placeholder:"e.g. Dynamic Programming",className:"w-full rounded-lg border-none bg-neutral-800 px-4 py-2 text-white outline-none focus:ring-1 focus:ring-blue-500"})]}),e.jsxs("div",{className:"flex justify-end gap-3",children:[e.jsx("button",{type:"button",onClick:p,className:"px-4 py-2 text-gray-400 transition-colors hover:text-white",children:"Cancel"}),e.jsx("button",{type:"submit",disabled:!o.trim(),className:"rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50",children:"Create"})]})]})]})})}),M=({searchValue:r,filterValue:o,onSearchChange:d,onFilterChange:p})=>e.jsxs("div",{className:"mb-8 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black px-5 py-3",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsx("h1",{className:"text-xl font-semibold tracking-tight text-white",children:"Dashboard"}),e.jsx("p",{className:"text-sm text-neutral-400",children:"Search fast, filter folders, and jump into work."})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"relative hidden w-72 md:block",children:[e.jsx(k,{size:15,className:"pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500"}),e.jsx("input",{type:"text",value:r,onChange:n=>d(n.target.value),placeholder:"Search folders...",className:"h-10 w-full rounded-xl border border-white/10 bg-neutral-950 pr-3 pl-9 text-sm text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-500"})]}),e.jsxs("div",{className:"relative",children:[e.jsx(C,{size:14,className:"pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500"}),e.jsxs("select",{value:o,onChange:n=>p(n.target.value),className:"h-10 appearance-none rounded-xl border border-white/10 bg-neutral-950 pr-8 pl-9 text-sm text-white outline-none transition-colors focus:border-neutral-500",children:[e.jsx("option",{value:"all",children:"All folders"}),e.jsx("option",{value:"with-items",children:"With items"}),e.jsx("option",{value:"empty",children:"Empty"})]})]}),e.jsx("div",{className:"flex h-10 items-center rounded-xl border border-blue-500/20 bg-blue-500/10 px-2.5",children:e.jsx(z,{afterSignOutUrl:"/sign-in",appearance:{elements:{avatarBox:"h-7 w-7 ring-1 ring-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.18)]"}}})})]})]}),E=`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Inter:wght@400;500;600&display=swap');

  .sfc-card {
    position: relative;
    border-radius: 16px;
    border: 1px solid rgba(148,163,184,0.14);
    background:
      radial-gradient(circle at top right, rgba(59,130,246,0.08), transparent 34%),
      linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0.012)),
      #182230;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.04),
      0 18px 36px rgba(2,6,23,0.28);
    cursor: pointer;
    transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
  }

  .sfc-card:hover {
    transform: translateY(-3px);
    border-color: rgba(96,165,250,0.24);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.05),
      0 22px 42px rgba(2,6,23,0.34);
  }

  .sfc-shell {
    position: relative;
    min-height: 138px;
    padding: 15px 16px 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
  }

  .sfc-shell::after {
    content: "";
    position: absolute;
    inset: auto 18px 14px 18px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    pointer-events: none;
  }

  .sfc-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .sfc-folder {
    position: relative;
    width: 76px;
    height: 58px;
    flex-shrink: 0;
    border-radius: 10px;
    background:
      linear-gradient(180deg, rgba(147,197,253,0.26) 0%, rgba(59,130,246,0.18) 100%),
      rgba(30,64,175,0.18);
    border: 1px solid rgba(96,165,250,0.26);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.16),
      0 10px 24px rgba(30,64,175,0.16);
    overflow: hidden;
  }

  .sfc-folder::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 9px;
    width: 24px;
    height: 9px;
    border-radius: 8px 8px 0 0;
    background: rgba(219,234,254,0.90);
  }

  .sfc-folder::after {
    content: "";
    position: absolute;
    inset: 16px 7px 7px;
    border-radius: 8px;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.05)),
      linear-gradient(180deg, rgba(59,130,246,0.54), rgba(37,99,235,0.76));
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.16);
  }

  .sfc-folder-glow {
    position: absolute;
    inset: auto 10px 10px 10px;
    height: 22px;
    border-radius: 999px;
    background: rgba(255,255,255,0.12);
    filter: blur(12px);
    pointer-events: none;
    z-index: 2;
  }

  .sfc-copy {
    min-width: 0;
    flex: 1;
  }

  .sfc-title {
    margin: 0;
    color: rgba(248,250,252,0.98);
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sfc-count {
    margin-top: 8px;
    color: rgba(191,219,254,0.92);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: 'Inter', sans-serif;
  }

  .sfc-menu-wrap {
    position: relative;
    z-index: 4;
    flex-shrink: 0;
  }

  .sfc-menu-btn {
    width: 30px;
    height: 24px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 0;
    cursor: pointer;
    transition: background .16s ease, border-color .16s ease;
  }

  .sfc-menu-btn:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.18);
  }

  .sfc-dot {
    width: 3px;
    height: 3px;
    border-radius: 999px;
    background: rgba(255,255,255,0.75);
  }

  .sfc-dropdown {
    position: absolute;
    top: 30px;
    right: 0;
    min-width: 144px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(15,23,42,0.98);
    padding: 6px;
    box-shadow: 0 18px 46px rgba(2,6,23,0.48);
    z-index: 20;
  }

  .sfc-dd-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    background: transparent;
    color: rgba(226,232,240,0.82);
    padding: 9px 10px;
    border-radius: 8px;
    font-size: 13px;
    text-align: left;
    cursor: pointer;
    transition: background .14s ease, color .14s ease;
  }

  .sfc-dd-item:hover {
    background: rgba(255,255,255,0.06);
    color: #fff;
  }

  .sfc-dd-item.danger {
    color: #fca5a5;
  }

  .sfc-dd-item.danger:hover {
    background: rgba(239,68,68,0.12);
    color: #fecaca;
  }

  .sfc-sep {
    height: 1px;
    margin: 5px 0;
    background: rgba(255,255,255,0.08);
  }

  .sfc-rename {
    position: relative;
    z-index: 3;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 0 18px 14px;
  }

  .sfc-rename-input {
    flex: 1;
    height: 38px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.04);
    color: #fff;
    padding: 0 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    outline: none;
  }

  .sfc-rename-input:focus {
    border-color: rgba(96,165,250,0.34);
  }

  .sfc-rename-btn {
    height: 38px;
    border-radius: 10px;
    border: 1px solid rgba(96,165,250,0.24);
    background: rgba(59,130,246,0.12);
    color: #bfdbfe;
    padding: 0 14px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .sfc-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .sfc-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    border-radius: 999px;
    border: 1px solid rgba(96,165,250,0.18);
    background: rgba(59,130,246,0.10);
    color: #bfdbfe;
    padding: 6px 10px;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
  }

  .sfc-tag-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #60a5fa;
    box-shadow: 0 0 0 4px rgba(96,165,250,0.12);
  }

  .sfc-meta {
    color: rgba(191,219,254,0.76);
    font-size: 11px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  .sfc-date {
    color: rgba(148,163,184,0.68);
    font-size: 11px;
    white-space: nowrap;
    font-family: 'JetBrains Mono', monospace;
  }

  .sfc-confirm {
    position: absolute;
    inset: 0;
    z-index: 6;
    background: rgba(15,23,42,0.95);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 22px;
  }

  .sfc-confirm-text {
    margin: 0;
    text-align: center;
    color: rgba(226,232,240,0.78);
    line-height: 1.6;
    font-size: 13px;
  }

  .sfc-confirm-text strong {
    color: #fff;
  }

  .sfc-confirm-actions {
    display: flex;
    gap: 8px;
  }

  .sfc-confirm-btn {
    height: 36px;
    padding: 0 14px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    color: rgba(226,232,240,0.84);
    cursor: pointer;
  }

  .sfc-confirm-btn.danger {
    border-color: rgba(239,68,68,0.20);
    background: rgba(239,68,68,0.12);
    color: #fecaca;
  }
`,B=r=>new Date(r).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}),P=({folder:r,onDelete:o,onOpen:d,onRename:p})=>{const[n,i]=a.useState(!1),[l,c]=a.useState(!1),[m,g]=a.useState(!1),[j,x]=a.useState(r.name),u=a.useRef(null),v=a.useRef(null);a.useEffect(()=>{if(!n)return;const t=h=>{u.current&&!u.current.contains(h.target)&&i(!1)};return document.addEventListener("mousedown",t),()=>document.removeEventListener("mousedown",t)},[n]),a.useEffect(()=>{l&&(v.current?.focus(),v.current?.select())},[l]);const b=()=>{const t=j.trim();if(!t){x(r.name),c(!1);return}t!==r.name&&p?.(r.id,t),c(!1)};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:E}),e.jsxs("div",{className:"sfc-card",onClick:()=>{!l&&!m&&d?.(r)},children:[m&&e.jsxs("div",{className:"sfc-confirm",children:[e.jsxs("p",{className:"sfc-confirm-text",children:["Delete ",e.jsxs("strong",{children:["/",r.name]}),"?"]}),e.jsxs("div",{className:"sfc-confirm-actions",children:[e.jsx("button",{type:"button",className:"sfc-confirm-btn",onClick:t=>{t.stopPropagation(),g(!1)},children:"Cancel"}),e.jsx("button",{type:"button",className:"sfc-confirm-btn danger",onClick:t=>{t.stopPropagation(),o?.(r)},children:"Delete"})]})]}),e.jsxs("div",{className:"sfc-shell",children:[e.jsxs("div",{className:"sfc-top",children:[e.jsx("div",{className:"sfc-folder","aria-hidden":"true",children:e.jsx("div",{className:"sfc-folder-glow"})}),e.jsxs("div",{className:"sfc-copy",children:[e.jsxs("h3",{className:"sfc-title",children:["/",r.name]}),e.jsxs("div",{className:"sfc-count",children:[r.files," ",r.files===1?"FILE":"FILES"]})]}),e.jsxs("div",{className:"sfc-menu-wrap",ref:u,children:[e.jsxs("button",{type:"button",className:"sfc-menu-btn",onClick:t=>{t.stopPropagation(),i(h=>!h)},title:"More",children:[e.jsx("span",{className:"sfc-dot"}),e.jsx("span",{className:"sfc-dot"}),e.jsx("span",{className:"sfc-dot"})]}),n&&e.jsxs("div",{className:"sfc-dropdown",children:[e.jsx("button",{type:"button",className:"sfc-dd-item",onClick:t=>{t.stopPropagation(),i(!1),c(!0)},children:"Rename"}),e.jsx("div",{className:"sfc-sep"}),e.jsx("button",{type:"button",className:"sfc-dd-item danger",onClick:t=>{t.stopPropagation(),i(!1),g(!0)},children:"Delete"})]})]})]}),e.jsxs("div",{className:"sfc-bottom",children:[e.jsxs("div",{className:"sfc-meta",children:[r.files," ",r.files===1?"problem":"problems"]}),e.jsx("div",{className:"sfc-date",children:B(r.created||Date.now())})]})]}),l&&e.jsxs("div",{className:"sfc-rename",onClick:t=>t.stopPropagation(),children:[e.jsx("input",{ref:v,className:"sfc-rename-input",value:j,onChange:t=>x(t.target.value),onBlur:b,onKeyDown:t=>{t.key==="Enter"&&b(),t.key==="Escape"&&(x(r.name),c(!1))}}),e.jsx("button",{type:"button",className:"sfc-rename-btn",onMouseDown:t=>{t.preventDefault(),b()},children:"Save"})]})]})]})},O=P,_=()=>{const r=S(),{addItem:o,deleteItem:d,fileSystem:p,renameItem:n}=I(),[i,l]=a.useState(!1),[c,m]=a.useState(""),[g,j]=a.useState(""),[x,u]=a.useState("all"),b=p.filter(s=>s.type==="folder").filter(s=>s.name.toLowerCase().includes(g.trim().toLowerCase())?x==="with-items"?(s.children||[]).length>0:x==="empty"?(s.children||[]).length===0:!0:!1),t=async s=>{if(s.preventDefault(),!!c.trim())try{await o(null,c,"folder"),l(!1),m("")}catch(f){console.error("Failed to create folder",f)}},h=async(s,f)=>{const w=f?.trim();if(!(!w||w===s.name))try{await n(s.id,w)}catch(N){console.error("Failed to rename folder",N)}},y=async s=>{if(window.confirm(`Delete folder "${s.name}" and its contents?`))try{await d(s.id)}catch(f){console.error("Failed to delete folder",f)}};return e.jsxs("div",{className:"relative h-full overflow-y-auto p-8",children:[e.jsx(R,{isOpen:i,value:c,onChange:m,onClose:()=>l(!1),onSubmit:t}),e.jsx(M,{searchValue:g,filterValue:x,onSearchChange:j,onFilterChange:u}),e.jsxs("div",{className:"grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4",children:[b.map(s=>e.jsx(O,{folder:{...s,files:(s.children||[]).length,created:s.createdAt||Date.now()},onOpen:()=>r(`/folder/${s.id}`),onRename:(f,w)=>h(s,w),onDelete:()=>y(s)},s.id)),e.jsxs("div",{onClick:()=>l(!0),className:"flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 p-6 text-gray-500 transition-colors hover:border-gray-600 hover:text-gray-300",children:[e.jsx("span",{className:"mb-2 text-4xl",children:"+"}),e.jsx("span",{className:"font-medium",children:"New Folder"})]})]})]})};export{_ as default};
