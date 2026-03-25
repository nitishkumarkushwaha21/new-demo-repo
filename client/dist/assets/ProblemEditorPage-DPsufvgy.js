import{j as e,aL as q,aG as U,aK as z,aT as G,r as h,aC as X,aU as Y,aV as J,ac as Z,ah as ee,al as te,aH as ae,a9 as se,aW as ne,aX as R,aY as re}from"./vendor-CyKtPqnB.js";import{F as oe}from"./vendor-monaco-Cw8qrzki.js";import{u as w,f as ie,b as L}from"./index-BTwl_X4e.js";import"./vendor-clerk-CmbJH4k2.js";const le=({code:a,language:i="javascript",onChange:r})=>{const l=b=>{r(b)},c=(b,f)=>{f.languages.typescript.javascriptDefaults.setDiagnosticsOptions({noSemanticValidation:!0,noSyntaxValidation:!0,noSuggestionDiagnostics:!0}),f.languages.typescript.typescriptDefaults.setDiagnosticsOptions({noSemanticValidation:!0,noSyntaxValidation:!0,noSuggestionDiagnostics:!0})};return e.jsx(oe,{height:"100%",theme:"vs-dark",language:i,value:a,onChange:l,onMount:c,options:{minimap:{enabled:!1},fontSize:14,padding:{top:16},scrollBeyondLastLine:!1,automaticLayout:!0,scrollbar:{vertical:"auto",horizontal:"auto",verticalScrollbarSize:8,horizontalScrollbarSize:8},wordWrap:"off",renderValidationDecorations:"off",overviewRulerLanes:0}})},de=["O(1)","O(log N)","O(N)","O(N log N)","O(N^2)","O(N^3)","O(2^N)","O(N!)"],A=({label:a,value:i,onChange:r})=>e.jsxs("div",{className:"flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-neutral-950 px-3 py-2",children:[e.jsx("span",{className:"whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300/80",children:a}),e.jsxs("select",{value:i||"",onChange:r,className:"w-full cursor-pointer appearance-none border-none bg-transparent font-mono text-xs text-white focus:outline-none",style:{WebkitAppearance:"none",MozAppearance:"none"},children:[e.jsx("option",{value:"",disabled:!0,className:"bg-neutral-900 text-gray-500",children:"Select..."}),de.map(l=>e.jsx("option",{value:l,className:"bg-neutral-900 text-white",children:l},l))]})]}),ce=({timeValue:a,spaceValue:i,onTimeChange:r,onSpaceChange:l,onNext:c,hasNext:b})=>e.jsx("div",{className:"border-t border-neutral-800 bg-neutral-900 px-3 py-2.5",children:e.jsxs("div",{className:"flex w-full items-center gap-3",children:[e.jsx(A,{label:"Time",value:a,onChange:r}),e.jsx(A,{label:"Space",value:i,onChange:l}),e.jsxs("button",{type:"button",onClick:c,disabled:!b,className:`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${b?"border-blue-500/25 bg-blue-500/15 text-blue-300 hover:bg-blue-500/25":"cursor-not-allowed border-white/10 bg-white/[0.03] text-white/35"}`,children:["Next",e.jsx(q,{size:13})]})]})}),M={Easy:"border-green-500/20 bg-green-500/10 text-green-400",Medium:"border-yellow-500/20 bg-yellow-500/10 text-yellow-400",Hard:"border-red-500/20 bg-red-500/10 text-red-400"},ue=({activeFile:a,isImporting:i,localLink:r,onLinkChange:l,onLinkBlur:c,onImportClick:b})=>{const f=r&&r.includes("leetcode.com/problems/")&&!a.description&&!i;return e.jsxs("div",{className:"h-full overflow-y-auto bg-[#0f141d] p-6",children:[e.jsx("style",{children:`
        .problem-statement {
          color: rgb(209 213 219);
          font-size: 0.95rem;
          line-height: 1.8;
        }

        .problem-statement > *:first-child {
          margin-top: 0;
        }

        .problem-statement h1,
        .problem-statement h2,
        .problem-statement h3,
        .problem-statement h4 {
          color: #ffffff;
          font-weight: 700;
          line-height: 1.35;
          margin-top: 1.5rem;
          margin-bottom: 0.8rem;
        }

        .problem-statement p,
        .problem-statement ul,
        .problem-statement ol,
        .problem-statement blockquote {
          margin-top: 0.9rem;
          margin-bottom: 0.9rem;
        }

        .problem-statement ul,
        .problem-statement ol {
          padding-left: 1.25rem;
        }

        .problem-statement li {
          margin: 0.4rem 0;
        }

        .problem-statement pre {
          white-space: pre-wrap;
          word-break: break-word;
          overflow-wrap: anywhere;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          padding: 14px 16px;
          color: #e5e7eb;
          font-size: 0.84rem;
          line-height: 1.65;
          overflow-x: auto;
        }

        .problem-statement code {
          white-space: pre-wrap;
          word-break: break-word;
          overflow-wrap: anywhere;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          padding: 0.14rem 0.38rem;
          color: #f8fafc;
          font-size: 0.84rem;
        }

        .problem-statement pre code {
          background: transparent;
          padding: 0;
          border-radius: 0;
        }

        .problem-statement strong {
          color: #fff;
          font-weight: 700;
        }

        .problem-statement table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }

        .problem-statement td,
        .problem-statement th {
          border: 1px solid rgba(255,255,255,0.08);
          padding: 0.7rem;
          vertical-align: top;
          text-align: left;
        }

        .problem-statement * {
          max-width: 100%;
        }
      `}),e.jsxs("div",{className:"mb-6 rounded-3xl border border-white/8 bg-white/[0.03] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]",children:[e.jsx("h1",{className:"mb-2 text-3xl font-bold text-white",children:a.title||a.name}),e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{className:"flex gap-2",children:[a.difficulty&&e.jsx("span",{className:`rounded-full border px-2 py-0.5 text-xs font-medium ${M[a.difficulty]||M.Hard}`,children:a.difficulty}),a.tags?.map(x=>e.jsx("span",{className:"rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400",children:x.name},x.name))]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"text",placeholder:"Paste LeetCode Link here...",className:`flex-1 rounded border px-3 py-1 text-xs outline-none transition-colors ${i?"animate-pulse border-yellow-500 text-yellow-400":"border-neutral-800 bg-neutral-950 text-gray-400 focus:border-blue-500 focus:text-white"}`,value:r,disabled:i,onChange:x=>l(x.target.value),onKeyDown:x=>{x.key==="Enter"&&x.target.blur()},onBlur:c},`link-${a.id}`),r&&r.includes("leetcode.com")&&e.jsxs("a",{href:r,target:"_blank",rel:"noopener noreferrer",className:"flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded border border-orange-500/20 bg-orange-500/15 px-3 py-1 text-xs font-medium text-orange-400 transition-colors hover:bg-orange-500/25",title:"Open on LeetCode",children:[e.jsx(U,{size:11}),"LeetCode"]}),e.jsxs("button",{type:"button",onClick:b,disabled:!f,className:`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded border px-3 py-1 text-xs font-medium transition-colors ${f?"border-blue-500/25 bg-blue-500/15 text-blue-300 hover:bg-blue-500/25":"cursor-not-allowed border-neutral-800 bg-neutral-900 text-gray-500"}`,title:"Import and save question",children:[i?e.jsx(z,{size:11,className:"animate-spin"}):e.jsx(G,{size:11}),"Import Question"]})]})]})]}),e.jsx("div",{className:"rounded-3xl border border-white/8 bg-white/[0.03] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]",children:i?e.jsxs("div",{className:"flex items-center justify-center py-8",children:[e.jsx(z,{className:"mr-2 animate-spin",size:20}),e.jsx("span",{className:"text-yellow-400",children:"Importing LeetCode problem..."})]}):a.description?e.jsx("div",{className:"problem-statement",dangerouslySetInnerHTML:{__html:a.description}}):e.jsx("div",{className:"italic text-gray-500",children:"No description available yet. Paste a LeetCode link above and use Import Question to save the statement for future fast opens."})})]})},pe=({activeTab:a,solutions:i,onAdd:r,onChange:l,onDelete:c,onMoveLeft:b,onMoveRight:f,onRename:x})=>{const[k,N]=h.useState(null),[g,v]=h.useState("");return e.jsxs("div",{className:"flex items-center justify-between gap-3 border-b border-neutral-800 bg-neutral-950 px-3 py-2",children:[e.jsx("div",{className:"flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1",children:i.map((u,j)=>e.jsxs("div",{className:X("mb-[-1px] flex shrink-0 items-center gap-1 rounded-t-xl border px-3 py-2 text-sm transition-colors",a===u.id?"border-neutral-800 border-b-neutral-900 bg-neutral-900 text-blue-300":"border-transparent bg-transparent text-gray-500 hover:bg-neutral-900/50 hover:text-gray-300"),children:[e.jsx("div",{onClick:()=>{k!==u.id&&l(u.id)},className:"max-w-40 cursor-pointer truncate",children:k===u.id?e.jsx("input",{autoFocus:!0,value:g,onChange:d=>v(d.target.value),onBlur:()=>{g.trim()&&x(u.id,g.trim()),N(null)},onKeyDown:d=>{d.key==="Enter"&&d.currentTarget.blur(),d.key==="Escape"&&N(null)},className:"w-28 rounded bg-transparent text-sm text-white outline-none"}):u.label}),e.jsxs("div",{className:"flex items-center gap-0.5",children:[e.jsx("button",{type:"button",onClick:()=>{N(u.id),v(u.label)},className:"rounded p-1 text-gray-500 transition hover:bg-white/5 hover:text-white",title:"Rename solution",children:e.jsx(Y,{size:11})}),e.jsx("button",{type:"button",onClick:()=>b(j),disabled:j===0,className:"rounded p-1 text-gray-500 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30",title:"Move left",children:e.jsx(J,{size:12})}),e.jsx("button",{type:"button",onClick:()=>f(j),disabled:j===i.length-1,className:"rounded p-1 text-gray-500 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30",title:"Move right",children:e.jsx(Z,{size:12})}),e.jsx("button",{type:"button",onClick:()=>c(u.id),disabled:i.length===1,className:"rounded p-1 text-gray-500 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-30",title:"Delete solution",children:e.jsx(ee,{size:11})})]})]},u.id))}),e.jsxs("button",{type:"button",onClick:r,className:"flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white",children:[e.jsx(te,{size:14}),"Add Solution"]})]})},I=(a,i,r=null)=>{for(const l of a){if(String(l.id)===String(i))return r;if(l.children?.length){const c=I(l.children,i,l);if(c)return c}}return null},me=a=>({title:a.title,slug:a.slug,difficulty:a.difficulty,description:a.description||a.descriptionText||"",tags:a.tags||[],exampleTestcases:a.exampleTestcases||"",codeSnippets:a.codeSnippets||[]}),ye=()=>{const{id:a}=ae(),i=se(),{activeFileId:r,fileSystem:l,setActiveFile:c,updateFileAnalysis:b,updateFileContent:f,updateSolutionEntries:x}=w(),{fileSystem:k,isLoading:N}=w(),[g,v]=h.useState("optimal"),[u,j]=h.useState(!1),[d,S]=h.useState(null),n=a?ie(l,a):null,[C,T]=h.useState(n?.link||""),p=n?{...n,...d,title:d?.title??n.title,slug:d?.slug??n.slug,difficulty:d?.difficulty??n.difficulty,description:d?.description??n.description,exampleTestcases:d?.exampleTestcases??n.exampleTestcases,codeSnippets:d?.codeSnippets??n.codeSnippets,tags:d?.tags??n.tags,notes:d?.notes??n.notes,solutionEntries:d?.solutionEntries??n.solutionEntries??[{id:"optimal",label:"Optimal",code:""}],solutions:d?.solutions??n.solutions,analysis:d?.analysis??n.analysis}:null,m=p?.solutionEntries?.length?p.solutionEntries:[{id:"optimal",label:"Optimal",code:""}],F=((a?I(l,a):null)?.children||[]).filter(t=>t.type==="file").sort((t,s)=>String(t.id).localeCompare(String(s.id),void 0,{numeric:!0})),O=F.findIndex(t=>String(t.id)===String(a)),E=O>=0?F[O+1]:null;if(h.useEffect(()=>{n&&n.link!==C&&!u&&T(n.link||"")},[n,u,C]),h.useEffect(()=>{m.some(t=>t.id===g)||v(m[0]?.id||"optimal")},[g,m]),h.useEffect(()=>{a&&(!r||String(r)!==String(a))&&(c(a),w.getState().clearExpandedFolders())},[r,a,c]),h.useEffect(()=>{if(!a){S(null);return}let t=!1;return(async()=>{try{const{data:o}=await L.getProblem(a);t||S(o)}catch(o){t||console.error("Failed to load problem record",o)}})(),()=>{t=!0}},[a]),N||k.length===0&&a)return e.jsxs("div",{className:"flex h-full flex-col items-center justify-center bg-neutral-900 text-gray-500",children:[e.jsx(z,{className:"mb-4 animate-spin",size:32}),"Loading workspace..."]});if(!n)return e.jsx("div",{className:"flex h-full items-center justify-center bg-neutral-900 text-gray-500",children:"Problem not found."});const _=t=>{S(s=>({...s||{},analysis:{time:t.target.value,space:p?.analysis?.space||"",explanation:p?.analysis?.explanation||""}})),b(r,{time:t.target.value,space:p?.analysis?.space||"",explanation:p?.analysis?.explanation||""})},$=t=>{S(s=>({...s||{},analysis:{time:p?.analysis?.time||"",space:t.target.value,explanation:p?.analysis?.explanation||""}})),b(r,{time:p?.analysis?.time||"",space:t.target.value,explanation:p?.analysis?.explanation||""})},V=async t=>{const s=t.target.value.trim();s!==n.link&&await w.getState().updateFileLink(n.id,s)},B=async()=>{const t=C.trim();if(!t||!t.includes("leetcode.com/problems/")){window.alert("Paste a valid LeetCode problem link first.");return}j(!0);try{t!==n.link&&await w.getState().updateFileLink(n.id,t);const{data:s}=await L.importProblem(t),o=s.description||s.descriptionText||"";try{await L.createProblem(n.id)}catch{console.log("Problem entry might already exist")}await L.updateProblem(n.id,{title:s.title,slug:s.slug,difficulty:s.difficulty,description:o,exampleTestcases:s.exampleTestcases,codeSnippets:s.codeSnippets,tags:s.tags}),S(y=>({...y,...me({...s,description:o})})),w.getState().mergeProblemDetails(n.id,{title:s.title,slug:s.slug,difficulty:s.difficulty,description:o,exampleTestcases:s.exampleTestcases,codeSnippets:s.codeSnippets,tags:s.tags}),await w.getState().renameItem(n.id,s.title),await w.getState().setActiveFile(n.id)}catch(s){console.error("Failed to import problem:",s),window.alert(`Failed to import problem: ${s.message||"Unknown error"}`)}finally{j(!1)}},P=async t=>{S(s=>({...s||{},solutionEntries:t})),await x(n.id,t)},H=async()=>{const t=[...m,{id:`solution-${Date.now()}`,label:`Solution ${m.length+1}`,code:""}];await P(t),v(t[t.length-1].id)},K=async(t,s)=>{const o=m.map(y=>y.id===t?{...y,label:s}:y);await P(o)},Q=async t=>{if(m.length===1)return;const s=m.filter(o=>o.id!==t);await P(s),g===t&&v(s[0].id)},D=async(t,s)=>{if(s<0||s>=m.length)return;const o=[...m],[y]=o.splice(t,1);o.splice(s,0,y),await P(o)},W=async()=>{E&&(await c(E.id),i(`/problem/${E.id}`))};return e.jsxs(ne,{direction:"horizontal",className:"group h-full",children:[e.jsx(R,{defaultSize:40,minSize:20,className:"border-r border-neutral-800 bg-neutral-900",children:e.jsx(ue,{activeFile:p,isImporting:u,localLink:C,onLinkChange:T,onLinkBlur:V,onImportClick:B})}),e.jsx(re,{className:"w-1 bg-neutral-800 transition-colors group-hover:bg-blue-600"}),e.jsx(R,{defaultSize:60,minSize:20,className:"bg-neutral-900",children:e.jsxs("div",{className:"flex h-full flex-col",children:[e.jsx(pe,{activeTab:g,solutions:m,onAdd:H,onChange:v,onDelete:Q,onMoveLeft:t=>D(t,t-1),onMoveRight:t=>D(t,t+1),onRename:K}),e.jsx("div",{className:"min-h-0 flex-1",children:e.jsx(le,{code:m.find(t=>t.id===g)?.code||"",language:"javascript",onChange:t=>{const s=m.map(o=>o.id===g?{...o,code:t}:o);S(o=>({...o||{},solutionEntries:s})),f(r,g,t)}})}),e.jsx(ce,{timeValue:p?.analysis?.time,spaceValue:p?.analysis?.space,onTimeChange:_,onSpaceChange:$,onNext:W,hasNext:!!E})]})})]})};export{ye as default};
