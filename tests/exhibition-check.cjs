const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = vm.createContext({
 document: {addEventListener() {}},
 alloyMetricCharts: () => '<div>charts</div>',
 experiences: [{id:'fitness',title:'운동 횟수 측정 앱',category:'PROTOTYPE',shortDate:'2026'}]
});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../showcase.js'),'utf8'), context);
const home = context.portfolioHomeMarkup();
assert.ok(!home.includes('현장에서 관찰한 것과 분석으로 확인한 것을'), 'Remove the requested profile sentence');
assert.ok(!home.includes('href="tel:'), 'Contact text must not launch external apps');
for (const id of ['fitness','sejong']) {
 const detail = context.portfolioProjectVisual(id);
 assert.ok(!detail.includes(context.labArchiveVisual(id)), `${id} detail must not repeat its archive thumbnail`);
 assert.match(detail, /href="#(?:fitness|sejong)\/work-/, 'Detail must lead to its interactive artifact');
}
console.log('Profile and distinct project overview checks passed.');
