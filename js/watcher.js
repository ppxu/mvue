class Watcher {
  constructor (vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.depIds = {};
    this.value = this.get();
  }

  update () {
    this.run();
  }

  run () {
    let value = this.get();
    let oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }

  addDep (dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this);
      this.depIds[dep.id] = dep;
    }
  }

  get () {
    Dep.target = this;
    let value = this.getVMVal();
    Dep.target = null;
    return value;
  }

  getVMVal () {
    let exp = this.exp.split('.');
    let val = this.vm._data;
    exp.forEach(k => {
      val = val[k];
    });
    return val;
  }
}
