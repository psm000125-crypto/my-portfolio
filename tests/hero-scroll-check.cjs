const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const base = path.resolve(__dirname, '..');
const frames = [], events = new Map(), messages = [];
let top = 650;
const properties = new Map();
const frame = {contentWindow: {postMessage: message => messages.push(message)}, addEventListener() {}};
const hero = {isConnected: true, querySelector: () => frame, style: {setProperty: (key,value) => properties.set(key,value)}, getBoundingClientRect: () => ({top, bottom: top + 900, height: 900})};
const root = {querySelector: () => hero, querySelectorAll: () => [], style: {setProperty() {}}};
const context = vm.createContext({
 matchMedia: () => ({matches: false, addEventListener() {}, removeEventListener() {}}),
 window: {addEventListener: (key,fn) => events.set(key,fn), removeEventListener() {}},
 document: {addEventListener() {}, documentElement: {scrollHeight: 5000}},
 innerHeight: 720, scrollY: 0, location: {origin: 'http://localhost'},
 requestAnimationFrame: fn => (frames.push(fn), frames.length), cancelAnimationFrame() {}
});
vm.runInContext(fs.readFileSync(path.join(base,'lab-motion.js'),'utf8'),context);
context.bindPortfolioMotion(root);
frames.shift()();
const entering = messages.at(-1).progress;
top = 400;
events.get('scroll')();
frames.shift()();
assert.ok(messages.at(-1).progress > entering, 'The model must rotate while the hero enters from below the profile');
top = 650;
events.get('scroll')();
frames.shift()();
assert.equal(messages.at(-1).progress, entering, 'Scrolling back must restore the same orientation');
const markup = fs.readFileSync(path.join(base,'showcase.js'),'utf8');
assert.ok(!markup.includes('<small>사진 기반 형상 재구성 · 실제 CAD 및 치수와 다름</small>'), 'Remove the requested hero caption');
console.log('Hero entry scroll and caption checks passed.');
messages.length = 0;
frames.length = 0;
const reducedContext = vm.createContext({...context,
 matchMedia: () => ({matches:true,addEventListener(){},removeEventListener(){}})
});
vm.runInContext(fs.readFileSync(path.join(base,'lab-motion.js'),'utf8'), reducedContext);
reducedContext.bindPortfolioMotion(root);
frames.shift()();
assert.equal(messages.length, 0, 'Reduced motion must not send scroll rotation commands');
assert.equal(properties.get('--hero-progress'), '0', 'Reduced motion must disable hero parallax');
console.log('Reduced-motion checks passed.');
