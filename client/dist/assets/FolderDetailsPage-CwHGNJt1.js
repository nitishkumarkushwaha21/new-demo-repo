import{j as e,ay as P,az as T,ap as W,aj as L,ao as R,aw as M,aA as A,aB as D,aC as I,aD as z,aE as E,aF as K,aG as J,ag as G,ah as $,aH as H,a9 as O,r as x}from"./vendor-CyKtPqnB.js";import{u as h,f as V}from"./index-BTwl_X4e.js";import"./vendor-clerk-CmbJH4k2.js";const q=({folderName:d,itemCount:s,searchTerm:l,folderInput:m,problemInput:y,activeFilter:g,onBack:j,onResetRevisions:c,onSearchChange:k,onFolderInputKeyDown:p,onProblemInputKeyDown:f,onFolderInputChange:b,onProblemInputChange:u,onCreateFolder:a,onCreateProblem:o,onFilterChange:v})=>{const w=["all","unsolved","unrevised","important"];return e.jsxs("div",{style:n.header,children:[e.jsxs("div",{style:n.left,children:[e.jsx("button",{style:n.iconButton,onClick:j,title:"Back",onMouseEnter:t=>{t.currentTarget.style.background="rgba(255,255,255,0.08)"},onMouseLeave:t=>{t.currentTarget.style.background="rgba(255,255,255,0.04)"},children:e.jsx(P,{size:18,color:"rgba(255,255,255,0.75)"})}),e.jsxs("div",{children:[e.jsxs("h1",{style:n.title,children:[e.jsxs("svg",{width:"22",height:"20",viewBox:"0 0 280 210",style:{marginRight:10,flexShrink:0},children:[e.jsx("rect",{x:"10",y:"0",width:"80",height:"18",rx:"7",fill:"rgba(255,255,255,0.18)"}),e.jsx("rect",{x:"0",y:"14",width:"280",height:"196",rx:"16",fill:"rgba(255,255,255,0.10)"})]}),"/",d]}),e.jsxs("p",{style:n.subtitle,children:[s," items"]})]})]}),e.jsxs("div",{style:n.right,children:[e.jsx("button",{style:n.iconButton,onClick:c,title:"Reset All Revisions",onMouseEnter:t=>{t.currentTarget.style.background="rgba(255,255,255,0.08)"},onMouseLeave:t=>{t.currentTarget.style.background="rgba(255,255,255,0.04)"},children:e.jsx(T,{size:16,color:"rgba(255,255,255,0.55)"})}),e.jsxs("div",{style:n.actionStack,children:[e.jsxs("div",{style:n.actionGroup,children:[e.jsxs("div",{style:n.inputWrap,children:[e.jsx(W,{size:14,color:"rgba(251,146,60,0.9)"}),e.jsx("input",{type:"text",placeholder:"Paste LeetCode problem link...",style:n.actionInput,value:y,onChange:t=>u(t.target.value),onKeyDown:f,onFocus:t=>{t.target.style.borderColor="rgba(255,255,255,0.35)"},onBlur:t=>{t.target.style.borderColor="rgba(255,255,255,0.12)"}})]}),e.jsxs("button",{style:n.actionButton,onClick:o,onMouseEnter:t=>{t.currentTarget.style.background="rgba(255,255,255,0.13)"},onMouseLeave:t=>{t.currentTarget.style.background="rgba(255,255,255,0.07)"},children:[e.jsx(L,{size:14}),"Add Problem"]})]}),e.jsxs("div",{style:n.actionGroup,children:[e.jsxs("div",{style:n.inputWrap,children:[e.jsx(R,{size:14,color:"rgba(96,165,250,0.95)"}),e.jsx("input",{type:"text",placeholder:"Add folder...",style:n.actionInput,value:m,onChange:t=>b(t.target.value),onKeyDown:p,onFocus:t=>{t.target.style.borderColor="rgba(255,255,255,0.35)"},onBlur:t=>{t.target.style.borderColor="rgba(255,255,255,0.12)"}})]}),e.jsxs("button",{style:n.actionButton,onClick:a,onMouseEnter:t=>{t.currentTarget.style.background="rgba(255,255,255,0.13)"},onMouseLeave:t=>{t.currentTarget.style.background="rgba(255,255,255,0.07)"},children:[e.jsx(R,{size:14}),"Add Folder"]})]}),e.jsxs("div",{style:n.searchWrap,children:[e.jsx(M,{size:14,color:"rgba(255,255,255,0.45)"}),e.jsx("input",{type:"text",placeholder:"Search items...",style:n.actionInput,value:l,onChange:t=>k(t.target.value),onFocus:t=>{t.target.style.borderColor="rgba(255,255,255,0.35)"},onBlur:t=>{t.target.style.borderColor="rgba(255,255,255,0.12)"}})]}),e.jsx("div",{style:n.filterWrap,children:w.map(t=>e.jsx("button",{style:{...n.filterButton,...g===t?n.filterButtonActive:{}},onClick:()=>v(t),children:t},t))})]})]})]})},n={header:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 24px",borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(0,0,0,0.65)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",gap:16,flexWrap:"wrap",fontFamily:"'Inter', sans-serif"},left:{display:"flex",alignItems:"center",gap:14},title:{display:"flex",alignItems:"center",fontSize:19,fontWeight:600,color:"rgba(255,255,255,0.92)",fontFamily:"'JetBrains Mono', monospace",margin:0},subtitle:{fontSize:12,color:"rgba(255,255,255,0.28)",fontFamily:"'Inter', sans-serif",marginTop:3},right:{display:"flex",alignItems:"stretch",gap:12,flex:1,justifyContent:"flex-end",flexWrap:"wrap"},actionStack:{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:10,flexWrap:"wrap",flex:1},actionGroup:{display:"flex",alignItems:"center",gap:8,minWidth:0},inputWrap:{height:38,minWidth:230,display:"flex",alignItems:"center",gap:8,padding:"0 12px",borderRadius:12,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)"},searchWrap:{height:38,minWidth:220,display:"flex",alignItems:"center",gap:8,padding:"0 12px",borderRadius:12,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)"},filterWrap:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},filterButton:{height:34,padding:"0 12px",borderRadius:999,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.62)",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",cursor:"pointer"},filterButtonActive:{border:"1px solid rgba(96,165,250,0.32)",background:"rgba(96,165,250,0.16)",color:"rgba(191,219,254,0.96)"},actionInput:{height:"100%",width:"100%",border:"none",background:"transparent",color:"rgba(255,255,255,0.86)",fontSize:13,fontFamily:"'Inter', sans-serif",outline:"none"},actionButton:{height:38,padding:"0 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.18)",background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.88)",fontSize:13,fontWeight:500,fontFamily:"'Inter', sans-serif",cursor:"pointer",transition:"background .15s",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:8},iconButton:{width:36,height:36,borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"background .15s",flexShrink:0}},U=({items:d,renamingId:s,renameValue:l,onNavigate:m,onRenameStart:y,onRenameChange:g,onRenameKeyDown:j,onRenameBlur:c,onToggleRevision:k,onToggleSolved:p,onToggleImportant:f,onOpenLink:b,onDelete:u})=>e.jsxs(e.Fragment,{children:[e.jsx("style",{children:_}),e.jsxs("table",{className:"fit-table",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"fit-head-row",children:[e.jsx("th",{className:"fit-th fit-th-pl",children:"Name"}),e.jsx("th",{className:"fit-th",children:"State"}),e.jsx("th",{className:"fit-th",children:"Last Revised"}),e.jsx("th",{className:"fit-th fit-th-right",children:"Actions"})]})}),e.jsx("tbody",{children:d.map(a=>e.jsxs("tr",{className:"fit-row",onClick:()=>m(a),children:[e.jsx("td",{className:"fit-td fit-td-pl",children:e.jsxs("div",{className:"fit-name-cell",children:[a.type==="folder"?e.jsx(A,{size:16,className:"fit-icon-folder"}):e.jsx(D,{size:16,className:"fit-icon-file"}),s===a.id?e.jsx("input",{autoFocus:!0,type:"text",value:l,onChange:o=>g(o.target.value),onKeyDown:j,onClick:o=>o.stopPropagation(),onBlur:c,className:"fit-rename-input"}):e.jsxs("div",{className:"fit-name-block",children:[e.jsx("span",{className:"fit-item-name",children:a.name}),a.type==="file"&&e.jsxs("div",{className:"fit-meta-row",children:[a.difficulty&&e.jsx("span",{className:I("fit-chip",`fit-chip-${a.difficulty.toLowerCase()}`),children:a.difficulty}),a.tags?.[0]?.name&&e.jsx("span",{className:"fit-chip fit-chip-tag",children:a.tags[0].name}),a.isImportant&&e.jsx("span",{className:"fit-chip fit-chip-important",children:"Important"})]})]})]})}),e.jsx("td",{className:"fit-td",children:a.type==="file"&&e.jsxs("div",{className:"fit-state-group",children:[e.jsxs("button",{onClick:o=>p(o,a),className:I("fit-toggle",a.isSolved?"fit-toggle-solved":""),title:a.isSolved?"Solved":"Mark solved",children:[e.jsx(z,{size:12}),e.jsx("span",{children:"Solved"})]}),e.jsxs("button",{onClick:o=>k(o,a),className:I("fit-toggle",a.isRevised?"fit-toggle-revised":""),title:a.isRevised?"Revised":"Mark revised",children:[a.isRevised?e.jsx(z,{size:12}):e.jsx(E,{size:12}),e.jsx("span",{children:"Rev"})]}),e.jsx("button",{onClick:o=>f(o,a),className:I("fit-toggle fit-toggle-icon",a.isImportant?"fit-toggle-important":""),title:a.isImportant?"Important":"Mark important",children:e.jsx(K,{size:12})})]})}),e.jsx("td",{className:"fit-td fit-td-date",children:a.type==="file"?new Date(a.updatedAt||Date.now()).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}):"—"}),e.jsx("td",{className:"fit-td fit-td-actions",children:e.jsxs("div",{className:"fit-actions",children:[a.type==="file"&&a.link&&e.jsx("button",{onClick:o=>b(o,a),className:"fit-action-btn fit-action-link",title:"Open LeetCode",children:e.jsx(J,{size:13})}),e.jsx("button",{onClick:o=>y(o,a),className:"fit-action-btn",title:"Rename",children:e.jsx(G,{size:13})}),e.jsx("button",{onClick:o=>u(o,a.id),className:"fit-action-btn fit-action-del",title:"Delete",children:e.jsx($,{size:13})})]})})]},a.id))})]})]}),_=`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600&display=swap');

  .fit-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-family: 'Inter', sans-serif;
  }

  .fit-head-row { border-bottom: 1px solid rgba(255,255,255,0.07); }

  .fit-th {
    padding: 11px 12px;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.28);
    letter-spacing: .08em;
    text-transform: uppercase;
    font-family: 'JetBrains Mono', monospace;
  }
  .fit-th-pl { padding-left: 20px; }
  .fit-th-right { text-align: right; padding-right: 20px; }

  .fit-row {
    border-bottom: 1px solid rgba(255,255,255,0.04);
    cursor: pointer;
    transition: background .13s;
  }
  .fit-row:hover { background: rgba(255,255,255,0.03); }
  .fit-row:hover .fit-actions { opacity: 1; }

  .fit-td {
    padding: 12px;
    font-size: 13px;
    color: rgba(255,255,255,0.75);
    vertical-align: middle;
  }
  .fit-td-pl { padding-left: 20px; }
  .fit-td-date {
    color: rgba(255,255,255,0.28);
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
  }
  .fit-td-actions { text-align: right; padding-right: 20px; }

  .fit-name-cell { display: flex; align-items: center; gap: 10px; }
  .fit-name-block { min-width: 0; }
  .fit-icon-folder { color: #7ab8f0; flex-shrink: 0; }
  .fit-icon-file { color: #f0c97a; flex-shrink: 0; }
  .fit-item-name { font-weight: 500; color: rgba(255,255,255,0.85); }
  .fit-meta-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
    flex-wrap: wrap;
  }
  .fit-chip {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 3px 8px;
    font-size: 10px;
    letter-spacing: .04em;
    text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.10);
    color: rgba(255,255,255,0.62);
    background: rgba(255,255,255,0.04);
  }
  .fit-chip-easy { color: #4ade80; border-color: rgba(74,222,128,0.22); background: rgba(74,222,128,0.10); }
  .fit-chip-medium { color: #fbbf24; border-color: rgba(251,191,36,0.22); background: rgba(251,191,36,0.10); }
  .fit-chip-hard { color: #f87171; border-color: rgba(248,113,113,0.22); background: rgba(248,113,113,0.10); }
  .fit-chip-tag { color: #93c5fd; border-color: rgba(96,165,250,0.20); background: rgba(96,165,250,0.10); }
  .fit-chip-important { color: #facc15; border-color: rgba(250,204,21,0.22); background: rgba(250,204,21,0.10); }

  .fit-rename-input {
    max-width: 200px;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.05);
    padding: 3px 8px;
    color: #fff;
    font-size: 13px;
    font-family: 'JetBrains Mono', monospace;
    outline: none;
  }

  .fit-state-group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .fit-toggle {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 9px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.42);
    background: rgba(255,255,255,0.04);
    font-family: 'Inter', sans-serif;
    transition: opacity .15s, background .15s, color .15s, border-color .15s;
  }
  .fit-toggle:hover { border-color: rgba(255,255,255,0.22); color: rgba(255,255,255,0.86); }
  .fit-toggle-solved {
    background: rgba(74,197,120,0.10);
    border-color: rgba(74,197,120,0.25);
    color: #4ac578;
  }
  .fit-toggle-revised {
    background: rgba(74,197,120,0.10);
    border-color: rgba(74,197,120,0.25);
    color: #4ac578;
  }
  .fit-toggle-important {
    color: #facc15;
    border-color: rgba(250,204,21,0.25);
    background: rgba(250,204,21,0.10);
  }
  .fit-toggle-icon { padding-inline: 8px; }

  .fit-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    opacity: 0;
    transition: opacity .15s;
  }
  .fit-action-btn {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    color: rgba(255,255,255,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .13s, color .13s;
  }
  .fit-action-btn:hover {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.85);
  }
  .fit-action-del:hover {
    background: rgba(226,75,74,0.15);
    color: #e24b4a;
    border-color: rgba(226,75,74,0.25);
  }
  .fit-action-link:hover {
    background: rgba(249,115,22,0.14);
    color: #fb923c;
    border-color: rgba(249,115,22,0.25);
  }
`,Q=d=>{if(!d)return"";const s=d.match(/leetcode\.com\/problems\/([^/]+)\/description/i);return s?.[1]?s[1].split("-").filter(Boolean).map(l=>l.charAt(0).toUpperCase()+l.slice(1)).join(" "):""},ee=()=>{const{id:d}=H(),s=O(),{addItem:l,deleteItem:m,fileSystem:y}=h(),[g,j]=x.useState(""),[c,k]=x.useState("all"),[p,f]=x.useState(""),[b,u]=x.useState(""),[a,o]=x.useState(null),[v,w]=x.useState(""),t=V(y,d);if(!t)return e.jsx("div",{className:"p-8 text-white",children:"Folder not found"});const S=t.children?.filter(r=>r.name.toLowerCase().includes(g.toLowerCase())?r.type!=="file"?c==="all":c==="unsolved"?!r.isSolved:c==="unrevised"?!r.isRevised:c==="important"?r.isImportant:!0:!1)||[],N=async()=>{const r=p.trim();if(r)try{await l(t.id,r,"folder"),f("")}catch(i){console.error("Failed to create folder",i)}},F=async()=>{const r=b.trim(),i=Q(r);if(!r||!i){window.alert("Paste a valid LeetCode problem link.");return}try{const C=await l(t.id,i,"file",r);u(""),C?.id&&s(`/problem/${C.id}`)}catch(C){console.error("Failed to create problem",C)}},B=async()=>{if(window.confirm("Are you sure you want to reset all revision status in this folder?"))for(const r of t.children||[])r.type==="file"&&r.isRevised&&await h.getState().toggleFileRevision(r.id)};return e.jsxs("div",{className:"relative flex h-full flex-col bg-neutral-900 text-gray-200",children:[e.jsx(q,{folderName:t.name,itemCount:S.length,searchTerm:g,folderInput:p,problemInput:b,activeFilter:c,onBack:()=>s(-1),onResetRevisions:B,onSearchChange:j,onFolderInputKeyDown:r=>{r.key==="Enter"&&N()},onProblemInputKeyDown:r=>{r.key==="Enter"&&F()},onFolderInputChange:f,onProblemInputChange:u,onCreateFolder:N,onCreateProblem:F,onFilterChange:k}),e.jsx("div",{className:"flex-1 overflow-auto p-6",children:e.jsx(U,{items:S,renamingId:a,renameValue:v,onNavigate:r=>s(r.type==="folder"?`/folder/${r.id}`:`/problem/${r.id}`),onRenameStart:(r,i)=>{r.stopPropagation(),o(i.id),w(i.name)},onRenameChange:w,onRenameKeyDown:async r=>{if(r.key==="Enter"){if(r.stopPropagation(),a&&v.trim())try{await h.getState().renameItem(a,v)}catch(i){console.error("Rename failed",i)}o(null)}else r.key==="Escape"&&o(null)},onRenameBlur:()=>o(null),onToggleRevision:async(r,i)=>{r.stopPropagation(),await h.getState().toggleFileRevision(i.id)},onToggleSolved:async(r,i)=>{r.stopPropagation(),await h.getState().toggleFileSolved(i.id)},onToggleImportant:async(r,i)=>{r.stopPropagation(),await h.getState().toggleFileImportant(i.id)},onOpenLink:(r,i)=>{r.stopPropagation(),i.link&&window.open(i.link,"_blank","noopener,noreferrer")},onDelete:(r,i)=>{r.stopPropagation(),m(i)}})})]})};export{ee as default};
