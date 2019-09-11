

let curHandler = null;

export default {
  handlers: {},
  beginCollect(handler) {
    curHandler = handler;
  },
  collect(id, target) {
    this.handlers[id] = this.handlers[id] || [];
    if (curHandler) {
      this.handlers[id].push({ handler: curHandler, target });
    }
  },
  endCollect() {
    curHandler = null;
  },
  exec(id, curTarget) {
    const handlers = this.handlers[id];
    if (handlers && handlers.length) {
      handlers.forEach(({handler, target}) => {
        curTarget === target && handler();
      });
    }
  },
}
