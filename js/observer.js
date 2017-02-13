class Observer {
  constructor (data) {
    this.data = data;
    this.walk();
  }

  walk () {
    let data = this.data;
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }

  defineReactive (data, key, val) {
    let dep = new Dep();
    observe(val);

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get () {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        observe(newVal);
        dep.notify();
      }
    });
  }
}

function observe (val) {
  if (!val || typeof val !== 'object') {
    return;
  }
  return new Observer(val);
}

let uid = 0;

class Dep {
  constructor () {
    this.id = uid++;
    this.subs = [];
  }

  addSub (sub) {
    this.subs.push(sub);
  }

  depend () {
    Dep.target.addDep(this);
  }

  removeSub (sub) {
    let idx = this.subs.indexOf(sub);
    if (idx > -1) {
      this.subs.splice(idx, 1);
    }
  }

  notify () {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}

Dep.target = null;
