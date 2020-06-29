export default class PromisePathLock {
    static PathUID = new (class {
        _uid = 0;
        _currPath = "";
        get() {
            return `${this._currPath}_$$${this._uid}`;
        }

        generate() {
            if (window.location.pathname !== this._currPath) {
                this._uid++;
                this._currPath = window.location.pathname;
            }
            return this.get();
        }

        isEqual(target) {
            return target === this.get();
        }
    })();

    constructor(promise, path = { id: PromisePathLock.PathUID.generate() }) {
        this.promise = promise;
        this.path = path;
    }

    static lock = (promise) => new PromisePathLock(promise);

    generateCallback = (callback) => (res) => {
        if (callback && PromisePathLock.PathUID.isEqual(this.path.id)) {
            callback(res);
            this.path.id = PromisePathLock.PathUID.generate();
        }
    };

    wrapIt = (funcName, ...arg) => new PromisePathLock(this.promise[funcName](...arg), this.path);

    then = (onSuccess) => this.wrapIt("then", this.generateCallback(onSuccess));

    catch = (onError) => this.wrapIt("catch", this.generateCallback(onError));
    finally = (onFinally) => this.wrapIt("finally", this.generateCallback(onFinally));

    all = (arg) => this.wrapIt("all", arg);
    allSettled = (arg) => this.wrapIt("allSettled", arg);
    race = (arg) => this.wrapIt("race", arg);
    resolve = (arg) => this.wrapIt("resolve", arg);
    reject = (arg) => this.wrapIt("reject", arg);
}
