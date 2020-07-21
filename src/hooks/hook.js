createContext()

function createHook(hook, targetContext = getContext()){
	return (...args) => {
		return targetContext && hook.apply(targetContext, args)
	}
}


function mixinHook(name){

	return this.mixin[name]
}

const mixin = createHook(mixinHook)
