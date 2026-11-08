// Generate crawlable, script-independent pages using the same view functions.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const base='https://msn5272005-sketch.github.io/bayt-murattab';
const template=fs.readFileSync('scripts/template.html','utf8');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const elements=new Map();const el=id=>{if(!elements.has(id))elements.set(id,{innerHTML:'',value:id==='sort'?'default':'',textContent:'',focus(){},setAttribute(){},removeAttribute(){}});return elements.get(id)};
const context={URL,URLSearchParams,console,location:{hash:'#/'},history:{replaceState(){}},document:{title:'',getElementById:el,querySelectorAll(){return []}},window:{scrollTo(){},addEventListener(){}}};
vm.createContext(context);vm.runInContext(fs.readFileSync('products.js','utf8'),context);context.PRODUCTS=context.window.PRODUCTS;vm.runInContext(fs.readFileSync('app.js','utf8'),context);
const routes=['/','/products','/guide','/about','/privacy','/disclosure',...context.PRODUCTS.map(p=>'/product/'+p.id)];
for(const route of routes){context.location.hash='#'+route;vm.runInContext('route()',context);let body=el('main').innerHTML;
 if(route==='/products')body=body.replace('<div class="grid" id="results"></div>','<div class="grid" id="results">'+el('results').innerHTML+'</div>').replace('<div class="count" id="count" role="status" aria-live="polite"></div>','<div class="count" id="count" role="status" aria-live="polite">'+el('count').textContent+'</div>');
 const product=context.PRODUCTS.find(p=>route==='/product/'+p.id);const description=product?product.intro+' '+product.limit:'بيت مرتب: أفكار وأدوات لتنظيم المنزل والمطبخ مع مصادر واضحة ودليل اختيار وإفصاح روابط العمولة.';
 const url=base+(route==='/'?'/':route+'/');
 const schema=product?{'@context':'https://schema.org','@type':'WebPage',name:product.name,description,url,mainEntity:{'@type':'Product',name:product.name,sku:product.asin,brand:{'@type':'Brand',name:product.brand},description:product.intro}}:{'@context':'https://schema.org','@type':'WebSite',name:'بيت مرتب',url:base+'/',inLanguage:'ar'};
 const meta=`<link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:locale" content="ar_SA"><meta property="og:site_name" content="بيت مرتب"><meta property="og:title" content="${escape(context.document.title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta name="twitter:card" content="summary"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>`;
 let html=template.replace(/<title>.*?<\/title>/,'<title>'+escape(context.document.title)+'</title>').replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+escape(description)+'">').replace('</head>',meta+'</head>').replace('<body>','<body data-route="'+route+'">').replace('<main id="main" tabindex="-1"></main>','<main id="main" tabindex="-1">'+body+'</main>').replace('<span id="year"></span>','<span id="year">2026</span>');
 html=vm.runInContext('localLinks',context)(html);
 const filename=route==='/'?'index.html':route.slice(1)+'/index.html';fs.mkdirSync(path.dirname(filename),{recursive:true});fs.writeFileSync(filename,html);
}
fs.writeFileSync('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(r=>'<url><loc>'+base+(r==='/'?'/':r+'/')+'</loc></url>').join('')+'</urlset>\n');
fs.writeFileSync('404.html',vm.runInContext('localLinks',context)(template.replace('<main id="main" tabindex="-1"></main>','<main id="main" tabindex="-1"><section class="article"><h1>الصفحة غير موجودة</h1><a href="/bayt-murattab/">العودة إلى بيت مرتب</a></section></main>').replace('<script defer src="/bayt-murattab/app.js?v=20261108b"></script>','').replace('</head>','<meta name="robots" content="noindex"></head>').replaceAll('href="#/"','href="/bayt-murattab/"')));
console.log('Built '+routes.length+' static pages and a 404 page.');
