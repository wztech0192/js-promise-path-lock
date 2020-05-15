# js_promise_path_lock
Block the promise chains from executing if the end path is different from the start path. Good for single page application.

## How to install
`npm install @wztechs.com/js_promise_path_lock`

## How to use

```
import PromisePathLock from '@wztechs.com/js_promise_path_lock'

PromisePathLock.lock(yourPromiseObject)
  .then(...)
  .catch(...)
  .finally(...)
```


