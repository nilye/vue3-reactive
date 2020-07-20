# Vue 3 Notes

> All problems in computer science can be solved by another level of indirection!   
> \- Butler Lampson


# `ref`

1. Approached by `createRef(rawValue, shallow)` 
2. Check if param `shallow` is true, otherwise use `convert(rawValue)`
    > `convert` is same as `walk` in Vue 2 which recursively create reactive objects of `rawValue`'s descendants.
                                                                          >
3. return an object which has `__v_isRef` *(isRef Flag)*, the value and its `get` and `set`. 

4. `get`: returns the value and invoke `track()` function 
    > `track()` is the alternative of Vue2's `Dep.target.depend()` that collects the subscription of value mutations.
                                                              >
5. `set`: assigns the value and invoke `trigger()` function
    > `trigger()` is the alternative of Vue2's' `dep.notify()` that trigger the dom changes.
6. 

```javascript

function createRef(rawValue, shallow){
  //...
    return {
      value: rawValue,
      __v_isRef: true,
      get value(){
        track() 
        return value
      },
      set value(newValue){
        rawValue = newValue
        trigger()
      } 
    }
}
```