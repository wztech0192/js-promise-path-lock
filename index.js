export default class PromisePathLock {
  construcotr(promise, pathname = window.location.pathname) {
    this.promise = promise;
    this.pathname = pathname;
  }

  static lock = promise => new PromisePathLock(promise);

  generateCallback = callback => res => {
    if (this.pathname !== window.location.pathname) {
      console.debug(
        `Path start in ${this.pathname}, but ended in ${window.location.pathname}`
      );
      return res;
    }
    return callback(res);
  };

  wrapIt = (funcName, ...arg) =>
    new PromisePathLock(this.promise[funcName], this.pathname);

  then = (onSuccess, onError) =>
    this.wrapIt(
      'then',
      this.generateCallback(onSuccess),
      this.generateCallback(onError)
    );

  catch = onError => this.wrapIt('catch', this.generateCallback(onError));
  finally = onFinally =>
    this.wrapIt('finally', this.generateCallback(onFinally));

  all = arg => this.wrapIt('all', arg);
  allSettled = arg => this.wrapIt('allSettled', arg);
  race = arg => this.wrapIt('race', arg);
  resolve = arg => this.wrapIt('resolve', arg);
  reject = arg => this.wrapIt('reject', arg);
}
