/**
 * Documentation:
 * This is a TypeScript decorator function that can be used to store data in the browser's local storage. It provides a simple way to sync data between a class property and the local storage without having to manually manage the data persistence.
 *
 * Usage:
 * To use this decorator, you need to pass a key string to it. This key will be used to identify the data in the local storage. Then, you can apply the decorator to a class property like this:
 *
 * typescript
 * class MyClass {
 *   @LocalStorage("localstorageKey")
 *   data: any;
 * }
 */

export function LocalStorage (key: string) {
    return function (proto: any, originalKey: string) {
      Object.defineProperty(proto, originalKey, {
        get() {
            let data = undefined;
            const dataString = localStorage.getItem(key);
            if(!!dataString){
                const {value} = JSON.parse(dataString);
                data = value;
            }

            return data;
        },
        set(this, value) {
            const type  = typeof value;
            const store = {value, type}
            localStorage.setItem(key, JSON.stringify(store));
        }
      })
    };
  }
