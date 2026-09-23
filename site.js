const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

const menu=$('.menu-toggle'),panel=$('.mobile-panel');
if(menu&&panel){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));panel.classList.toggle('open',!open)});$$('a',panel).forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');panel.classList.remove('open')}))}

$$('a[href]').forEach(a=>a.addEventListener('click',e=>{const u=new URL(a.href,location.href);if(!reduce&&u.origin===location.origin&&u.pathname!==location.pathname&&!a.href.startsWith('mailto:')&&!a.href.startsWith('tel:')){e.preventDefault();document.body.classList.add('page-leaving');setTimeout(()=>location.href=a.href,190)}}));

const hero=$('[data-parallax]');
if(hero&&!reduce&&matchMedia('(pointer:fine)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;hero.style.setProperty('--px',`${(x-.5)*-18}px`);hero.style.setProperty('--py',`${(y-.5)*-14}px`);hero.style.setProperty('--lx',`${x*100}%`);hero.style.setProperty('--ly',`${y*100}%`)});hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--px','0px');hero.style.setProperty('--py','0px')})}

const homeScope=[
  {code:'01',title:'CNC 정밀 가공',copy:'밀링과 선반을 중심으로 소재·형상·공차를 도면과 함께 검토합니다.'},
  {code:'02',title:'자동차 부품 시제품',copy:'자동차 부품 시제품 제작 요청에 대응합니다. 생산 품목이나 성공 사례는 임의로 표시하지 않습니다.'},
  {code:'03',title:'소량 다품종 양산',copy:'최소 발주 수량 없이 1개 가공부터 검토합니다. 상세 조건은 도면으로 확인합니다.'}
];
$$('[data-scope-home] .scope-node').forEach((b,i)=>b.addEventListener('click',()=>{const box=$('[data-scope-home]'),d=homeScope[i];$$('.scope-node',box).forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});$('.scope-line i',box).style.transform=`translateX(${i*100}%)`;$('.scope-readout .mono',box).textContent=`SELECT / ${d.code}`;$('.scope-readout h3',box).textContent=d.title;$('.scope-readout p',box).textContent=d.copy}));

const years={
  1998:{tag:'FOUNDATION',title:'너울정밀 설립',copy:'인천 남동공단에서 정밀 가공 기반을 이어왔습니다.'},
  2011:{tag:'CERTIFICATION',title:'ISO 9001 취득',copy:'제공된 취득 연도만 표시하며 인증서 번호·유효기간·범위는 만들지 않습니다.'},
  2019:{tag:'AUTOMOTIVE QUALITY',title:'IATF 16949 취득',copy:'자동차 산업 품질경영시스템 인증 취득 사실을 기록합니다.'}
};
$$('.year-rail button').forEach((b,i)=>b.addEventListener('click',()=>{const d=years[b.dataset.year],rail=b.parentElement;$$('button',rail).forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',String(x===b))});$('i',rail).style.transform=`translateX(${i*100}%)`;const detail=$('.year-detail');$('span',detail).textContent=d.tag;$('h3',detail).textContent=d.title;$('p',detail).textContent=d.copy}));
$$('.industry-tabs button').forEach(b=>b.addEventListener('click',()=>{$$('.industry-tabs button').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))})}));

const equipment={
  machining:{name:'CNC 머시닝센터',meta:'Doosan DNM 시리즈 · 6대',pos:'50% 45%'},
  lathe:{name:'CNC 선반',meta:'4대 · 제조사·모델 미제공',pos:'64% 52%'},
  wire:{name:'와이어 방전기',meta:'2대 · 제조사·모델 미제공',pos:'36% 48%'},
  cmm:{name:'3차원 측정기',meta:'Mitutoyo · 1대',pos:'52% 60%'},
  roughness:{name:'표면조도 측정기',meta:'보유 · 수량·모델 미제공',pos:'70% 42%'}
};
function selectEquipment(key,root){const d=equipment[key],media=$('.equipment-media',root);$$('.equipment-nav button',root).forEach(b=>{const on=b.dataset.eq===key;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on))});media.classList.add('changing');setTimeout(()=>{const img=$('img',media);img.style.objectPosition=d.pos;$('b',media).textContent=d.name;$('small',media).textContent=d.meta;media.classList.remove('changing')},140);try{localStorage.setItem('neoul-equipment',key)}catch{}}
const eqRoot=$('[data-equipment-explorer]');if(eqRoot){$$('.equipment-nav button',eqRoot).forEach(b=>b.addEventListener('click',()=>selectEquipment(b.dataset.eq,eqRoot)));let saved='machining';try{saved=localStorage.getItem('neoul-equipment')||saved}catch{}if(equipment[saved])selectEquipment(saved,eqRoot)}

const drawing=$('.drawing-path');if(drawing){if(reduce)drawing.classList.add('is-drawn');else new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('is-drawn')),{threshold:.45}).observe(drawing)}

const storySteps=$$('[data-story-step]');if(storySteps.length){const meter=$('.story-meter i');const setStory=el=>{storySteps.forEach(x=>x.classList.toggle('active',x===el));const i=Number(el.dataset.storyStep);meter.style.setProperty('--story-progress',`${(i+1)*25}%`)};storySteps.forEach(s=>{s.addEventListener('focus',()=>setStory(s));s.addEventListener('click',()=>setStory(s))});if(!reduce)new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setStory(e.target)),{rootMargin:'-35% 0px -45%',threshold:0}).observe(storySteps[0]);if(!reduce){const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setStory(e.target)),{rootMargin:'-35% 0px -45%',threshold:0});storySteps.forEach(s=>io.observe(s))}else storySteps.forEach(s=>s.classList.add('active'));setStory(storySteps[0])}

const history=[
  {tag:'FOUNDATION / 1998',title:'너울정밀 설립',copy:'인천 남동공단에서 정밀 가공 기반을 이어온 출발점입니다.'},
  {tag:'CERTIFICATION / 2011',title:'ISO 9001 취득',copy:'품질경영시스템 인증 취득 사실입니다. 인증서 상세는 원본 확인 후 반영해야 합니다.'},
  {tag:'AUTOMOTIVE QUALITY / 2019',title:'IATF 16949 취득',copy:'자동차 산업 품질경영시스템 인증 취득 사실입니다.'}
];
$$('[data-history]').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.history),p=$('.history-panel'),d=history[i];$$('[data-history]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',String(x===b))});$('span',p).textContent=d.tag;$('h3',p).textContent=d.title;$('p',p).textContent=d.copy}));
const industries=[
  {tag:'SECTOR / AUTOMOTIVE',title:'국내 완성차 1차 협력사',num:'3곳'},
  {tag:'SECTOR / MEDICAL DEVICE',title:'의료기기 업체',num:'2곳'},
  {tag:'SECTOR / AEROSPACE',title:'항공 부품사',num:'1곳'}
];
$$('[data-company-industry]').forEach(b=>b.addEventListener('click',()=>{const d=industries[Number(b.dataset.companyIndustry)],p=$('.industry-readout');$$('[data-company-industry]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',String(x===b))});$('span',p).textContent=d.tag;$('h3',p).textContent=d.title;$('strong',p).textContent=d.num}));

const scopeData=[
  {tag:'MILLING / TURNING',title:'밀링과 선반을 중심으로',copy:'도면의 형상, 소재, 공차를 기준으로 CNC 정밀 가공 가능 여부를 검토합니다.',items:['CNC 밀링','CNC 선반','가공 정밀도 ±0.005mm'],img:'assets/lathe.jpg',alt:'금속을 절삭하는 CNC 장비'},
  {tag:'AUTOMOTIVE PROTOTYPE',title:'도면 기반 자동차 부품 시제품',copy:'자동차 부품 시제품 제작 요청에 대응합니다. 제공되지 않은 생산 품목이나 성공 사례는 표시하지 않습니다.',items:['도면 기준 검토','시제품 제작 요청','소재·공차 확인'],img:'assets/metal-part.jpg',alt:'가공된 금속 부품'},
  {tag:'SMALL LOT / HIGH MIX',title:'1개부터 소량 다품종 양산',copy:'최소 발주 수량 없이 1개 가공부터 검토합니다. 생산 조건은 도면을 기준으로 확인합니다.',items:['최소 발주 수량 없음','1개 가공 가능','도면 접수 후 견적'],img:'assets/cnc-machine.jpg',alt:'정밀 가공 장비의 작업 장면'}
];
$$('[data-cap-scope]').forEach(b=>b.addEventListener('click',()=>{const d=scopeData[Number(b.dataset.capScope)],s=$('.scope-screen');$$('[data-cap-scope]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',String(x===b))});s.classList.add('changing');setTimeout(()=>{const img=$('img',s);img.src=d.img;img.alt=d.alt;$('article>span',s).textContent=d.tag;$('h3',s).textContent=d.title;$('p',s).textContent=d.copy;$('ul',s).innerHTML=d.items.map(x=>`<li>${x}</li>`).join('');s.classList.remove('changing')},170)}));

const measure=$('[data-measure-stage]');if(measure){const update=()=>{const r=measure.getBoundingClientRect(),vh=innerHeight;const p=Math.max(0,Math.min(1,(vh-r.top)/(vh+r.height*.35)));measure.style.setProperty('--measure-close',`${p*25}%`)};addEventListener('scroll',update,{passive:true});update();if(!reduce&&matchMedia('(pointer:fine)').matches)measure.addEventListener('pointermove',e=>{const r=measure.getBoundingClientRect();measure.style.setProperty('--mx',`${(e.clientX-r.left)/r.width*100}%`);measure.style.setProperty('--my',`${(e.clientY-r.top)/r.height*100}%`)})}

const matrixData={
  machining:{title:'CNC 머시닝센터',copy:'Doosan DNM 시리즈 6대를 보유합니다. 세부 모델과 가공 범위는 제공되지 않았습니다.',img:'assets/cnc-machine.jpg',alt:'정밀 가공 장비의 작업 장면'},
  lathe:{title:'CNC 선반',copy:'CNC 선반 4대를 보유합니다. 제조사와 세부 모델은 제공되지 않았습니다.',img:'assets/lathe.jpg',alt:'금속을 절삭하는 CNC 장비'},
  wire:{title:'와이어 방전기',copy:'와이어 방전기 2대를 보유합니다. 제조사와 세부 모델은 제공되지 않았습니다.',img:'assets/metal-part.jpg',alt:'가공된 금속 부품'},
  cmm:{title:'3차원 측정기',copy:'Mitutoyo 3차원 측정기 1대를 보유합니다. 세부 모델과 측정 범위는 제공되지 않았습니다.',img:'assets/measurement.jpg',alt:'측정 프로브가 금속 가공물을 측정하는 장면'},
  roughness:{title:'표면조도 측정기',copy:'표면조도 측정기를 보유합니다. 수량과 세부 모델은 제공되지 않았습니다.',img:'assets/caliper.jpg',alt:'금속 부품의 치수를 측정하는 장면'}
};
$$('[data-matrix]').forEach((b,i)=>b.addEventListener('click',()=>{const d=matrixData[b.dataset.matrix],v=$('.matrix-visual');$$('[data-matrix]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',String(x===b))});v.classList.add('changing');setTimeout(()=>{const img=$('img',v);img.src=d.img;img.alt=d.alt;$('article span',v).textContent=`SELECTED / 0${i+1}`;$('article h3',v).textContent=d.title;$('article p',v).textContent=d.copy;v.classList.remove('changing')},170)}));

const materials={
  al:{cls:'al',tag:'MATERIAL / ALUMINUM',code:'AL',copy:'알루미늄 가공 요청을 검토합니다. 세부 합금 등급은 도면 또는 요청사항에 적어주세요.'},
  sus:{cls:'sus',tag:'MATERIAL / STAINLESS STEEL',code:'SUS',copy:'SUS 가공 요청을 검토합니다. 세부 강종과 표면 조건은 도면에 적어주세요.'},
  ti:{cls:'ti',tag:'MATERIAL / TITANIUM',code:'TI',copy:'티타늄 가공 요청을 검토합니다. 합금 등급과 요구 공차를 함께 알려주세요.'},
  ep:{cls:'ep',tag:'MATERIAL / ENGINEERING PLASTIC',code:'EP',copy:'엔지니어링 플라스틱 가공 요청을 검토합니다. 수지 종류와 규격을 도면에 적어주세요.'}
};
$$('[data-material]').forEach(b=>b.addEventListener('click',()=>{const d=materials[b.dataset.material],v=$('.material-surface');$$('[data-material]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',String(x===b))});v.className=`material-surface ${d.cls}`;$('span',v).textContent=d.tag;$('h3',v).textContent=d.code;$('p',v).textContent=d.copy}));

const form=$('#quote-form');
if(form){const input=$('#drawings'),drop=$('.dropzone'),list=$('.file-list');let files=[];const maxFiles=5,maxSize=20*1024*1024;
  function renderFiles(){list.innerHTML='';files.forEach((f,i)=>{const row=document.createElement('div');row.className='file-item';row.innerHTML=`<strong>${escapeHTML(f.name)}</strong><span>${formatSize(f.size)}</span><button type="button" data-remove="${i}" aria-label="${escapeHTML(f.name)} 삭제">삭제</button>`;list.append(row)});$('[data-file-error]').textContent=files.length?'':'도면 파일을 1개 이상 선택해 주세요.'}
  function acceptFiles(incoming){const picked=[...incoming],error=$('[data-file-error]');error.textContent='';if(files.length+picked.length>maxFiles){error.textContent='현재 화면 검토 기준은 파일 5개까지입니다.';return}const tooBig=picked.find(f=>f.size>maxSize);if(tooBig){error.textContent='현재 화면 검토 기준은 파일당 20MB까지입니다.';return}const keys=new Set(files.map(f=>f.name+f.size));picked.forEach(f=>{if(!keys.has(f.name+f.size))files.push(f)});renderFiles()}
  input.addEventListener('change',e=>acceptFiles(e.target.files));list.addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;files.splice(Number(b.dataset.remove),1);input.value='';renderFiles()});['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('drag')}));['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('drag')}));drop.addEventListener('drop',e=>acceptFiles(e.dataTransfer.files));drop.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();input.click()}});$('.file-pick').addEventListener('click',e=>{e.stopPropagation();input.click()});
  const required=['company','name','phone','email','process','material','quantity'];
  function validate(){let ok=true;required.forEach(id=>{const el=$('#'+id),er=$(`[data-error="${id}"]`);let msg='';if(!el.value.trim())msg='필수 항목입니다.';if(id==='email'&&el.value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value))msg='이메일 형식을 확인해 주세요.';if(id==='phone'&&el.value&&!/^[0-9+()\-\s]{8,}$/.test(el.value))msg='연락처 형식을 확인해 주세요.';er.textContent=msg;el.setAttribute('aria-invalid',String(!!msg));if(msg)ok=false});if(!files.length){$('[data-file-error]').textContent='도면 파일을 1개 이상 선택해 주세요.';ok=false}const agree=$('#agree'),agreeErr=$('[data-error="agree"]');agreeErr.textContent=agree.checked?'':'검토 화면 표시와 메일 작성 동선을 확인해 주세요.';if(!agree.checked)ok=false;const first=$('[aria-invalid="true"]');if(first)first.focus();return ok}
  const value=id=>$('#'+id).value.trim()||'미입력';
  function showReview(){const entries=[['회사명',value('company')],['담당자명',value('name')],['연락처',value('phone')],['이메일',value('email')],['가공 유형',value('process')],['소재',value('material')],['수량',value('quantity')],['요구 정밀도·공차',value('tolerance')],['희망 납기',value('due')],['도면 파일',files.map(f=>`${f.name} (${formatSize(f.size)})`).join('\n')],['추가 요청사항',value('message')]];$('.review-table').innerHTML=entries.map(([k,v])=>`<div class="review-row"><dt>${k}</dt><dd>${escapeHTML(v)}</dd></div>`).join('');$('.form-step').classList.add('hidden');$('.review').classList.add('active');$$('.form-progress>div').forEach((x,i)=>x.classList.toggle('active',i===1));$('.review').focus();const subject=`[너울정밀 견적 요청] ${value('company')} / ${value('name')}`;const body=entries.filter(([k])=>k!=='도면 파일').map(([k,v])=>`${k}: ${v}`).join('\n')+`\n\n선택한 도면 파일: ${files.map(f=>f.name).join(', ')}\n※ 파일은 자동 첨부되지 않습니다. 메일 화면에서 직접 첨부해 주세요.`;$('#mailto-review').href=`mailto:sales@neoul-p.co.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;scrollTo({top:form.getBoundingClientRect().top+scrollY-100,behavior:reduce?'auto':'smooth'})}
  form.addEventListener('submit',e=>{e.preventDefault();if(validate())showReview()});$('#edit-form').addEventListener('click',()=>{$('.form-step').classList.remove('hidden');$('.review').classList.remove('active');$$('.form-progress>div').forEach((x,i)=>x.classList.toggle('active',i===0))})}
function formatSize(n){return n<1024*1024?`${Math.max(1,Math.round(n/1024))} KB`:`${(n/1024/1024).toFixed(1)} MB`}
function escapeHTML(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
