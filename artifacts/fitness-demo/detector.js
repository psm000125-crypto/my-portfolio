// New demonstration algorithm; not the lost project's original implementation.
(function(){
class RepDetector {
  constructor({threshold = 1.6, cooldown = 0.65, smoothing = 0.28} = {}) {
    Object.assign(this, {threshold, cooldown, smoothing});
    this.reset();
  }
  reset() {
    this.filtered = 0;
    this.count = 0;
    this.candidates = 0;
    this.rawArmed = true;
    this.armed = true;
    this.lastCount = -Infinity;
  }
  sample(value, time) {
    if (!Number.isFinite(value) || !Number.isFinite(time)) return null;
    this.filtered += this.smoothing * (value - this.filtered);
    if (value < this.threshold * 0.35) this.rawArmed = true;
    if (this.filtered < this.threshold * 0.35) this.armed = true;
    if (value >= this.threshold && this.rawArmed) {
      this.candidates++;
      this.rawArmed = false;
    }
    let counted = false;
    if (this.filtered >= this.threshold && this.armed) {
      this.armed = false;
      if (time - this.lastCount >= this.cooldown) {
        this.lastCount = time;
        this.count++;
        counted = true;
      }
    }
    return {raw: value, filtered: this.filtered, counted, count: this.count, candidates: this.candidates};
  }
}

function demoSample(time, fast = false) {
  const period = fast ? 1.4 : 2.4;
  const phase = time % period;
  const pulse = (center, width, height) => height * Math.exp(-(((phase - center) / width) ** 2));
  const primary = pulse(0.38, 0.10, 4.6);
  const vibration = fast ? pulse(0.70, 0.055, 3.2) : pulse(0.76, 0.06, 0.55);
  const noise = 0.10 * Math.sin(time * 39) + 0.06 * Math.sin(time * 67);
  return {value: primary + vibration + noise, lift: (1 - Math.cos(2 * Math.PI * phase / period)) / 2};
}
if(typeof module!=='undefined'&&module.exports)module.exports={RepDetector,demoSample};
else window.FitnessCounter={RepDetector,demoSample};
})();
