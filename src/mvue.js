class MVUE {
  constructor (options) {
    this.$options = options;
    let data = this._data = this.$options.data;

    Object.keys(data).forEach(key => {
      this._proxy(key);
    });

    observe(data);

    this.$compile = new Compile(options.el || document.body, this);
  }

  $watch (key, cb) {
    new Watcher(this, key, cb);
  }

  _proxy (key) {
    Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get () {
        return this._data[key];
      },
      set (newVal) {
        this._data[key] = newVal;
      }
    });
  }
}
