const fs=require('node:fs'),assert=require('node:assert/strict');
let count=0;const check=(value,message)=>{assert.ok(value,message);count++};
const urls=[...fs.readFileSync('sitemap.xml','utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
check(urls.length===12,'all twelve public routes in sitemap');
for(const url of urls){const local=new URL(url).pathname.replace('/bayt-murattab/','')+'index.html';const html=fs.readFileSync(local,'utf8');
 check(html.includes('lang="ar" dir="rtl"'),'RTL '+local);
 check(/<main[^>]*>[\s\S]+?<\/main>/.test(html),'rendered body '+local);
 check(html.includes('<link rel="canonical" href="'+url+'">'),'canonical '+local);
 check(html.includes('property="og:url" content="'+url+'"'),'share URL '+local);
 check((html.match(/<h1>/g)||[]).length===1,'one heading '+local);
 for(const match of html.matchAll(/(?:href|src)="(\/bayt-murattab[^"#]*)[^\"]*"/g)){const target=match[1].replace('/bayt-murattab/','').split('?')[0];check(fs.existsSync(target.endsWith('/')?target+'index.html':target||'index.html'),'local target '+target)}
 if(local.startsWith('product/')){const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);check(schema.mainEntity.sku.length===10,'product identity');check(!html.includes('aggregateRating'),'no fabricated rating');check(html.includes('rel="sponsored noopener noreferrer"'),'affiliate disclosure link');}
}
check(!fs.readFileSync('style.css','utf8').includes('@import'),'no font request');
check(fs.readFileSync('product/drawer/index.html','utf8').includes('href="https://amzn.to/4eG4oAD"'),'approved SiteStripe');
console.log('Passed '+count+' static checks. No browser/layout assertions were performed.');
