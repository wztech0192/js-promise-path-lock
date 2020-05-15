# js-promise-path-lock

Block the promise chains from executing if the end path is different from the start path. Good for single page application.

## How to install

`npm install js-promise-path-lock`

## How to use

```
import PromisePathLock from 'js-promise-path-lock'

PromisePathLock.lock(yourPromiseObject)
  .then(...)
  .catch(...)
  .finally(...)
```
