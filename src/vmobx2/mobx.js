
const handlers = {};
let handler = null;

function uuid() {
  return Math.random().toString(16);
}


function autorun(func) {
  handler = func;
  func();
  handler = null;
}


function registerHandler(id, target) {
  handlers[id] = handlers[id] || [];
  if (handler) {
    handlers[id].push({ handler, target });
  }
}

function tiggerhandler(id, o) {
  const funcs = handlers[id] || [];
  funcs.forEach(({target, handler: func}) => {
    o === target && func();
  });
}

function observable(target, propName, descriptor) {
  let val = descriptor.initializer.call(this);
  const id = uuid();

  return {
    get () {
      registerHandler(id, this);
      return val;
    },
    set (v) {
      val = v;
      tiggerhandler(id, this);
    },
  }
}

function observable() {

}

const mobxObject = observable({
  a: 1,
  b: 2,
  c: 3,
})


// observer


class Mobx{
  @observable a = 1;

  @observable b = 2;
}

const m = new Mobx();
function listerner() {
  console.log(m.a, 'a');
  console.log(m.b, 'b');
}

autorun(listerner);


m.a = 2;
m.a = 3;
m.a = 4;


m.b = 3;

// const m2 = new Mobx();
// autorun(() => console.log(m2.a));
// m2.a = 5;
// m2.a = 6;
// console.log(m.a, '--====');

