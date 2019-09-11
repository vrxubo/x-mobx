import dependenceManager from './dependenceManager';


const uuid = () => {
  return `${Math.random()}`.replace(/\./, '_');
}
let a;

class ObservableClass {

  value = null;

  id = '';

  constructor(v) {
    this.value = v;
    this.id = uuid();
  }

  getVal() {
    return this.value;
  }

  setVal(val) {
    this.value = val;
  }
}

function autorun(func) {
  dependenceManager.beginCollect(func);
  func();
  dependenceManager.endCollect();
}

function observable(target, propName, descriptor) {
  const v = descriptor.initializer.call(this);
  const o = new ObservableClass(v);
  return {
    get () {
      dependenceManager.collect(o.id, this);
      return o.getVal();
    },
    set (value) {
      o.setVal(value);
      dependenceManager.exec(o.id, this);
    },
  }
}

class A {
  @observable a = 1;

}
a = new A();
autorun(function test() {
  console.log(a.a, '---');
});

a.a = 2;
a.a = 3;
a.a = 4;
const b = new A();
b.a = 5;
b.a = 6;
b.a = 7;
