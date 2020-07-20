function reactive(target){
	return createReactiveObject(target, {
		get: getHandler,
		set: setHandler,
		deleteProperty: deletePropertyHandler
	})
}

function createReactiveObject(target, handler){
	if (!isObject(target)){
		console.warn(`Value cannot be made reactive: ${String(target)}`)
		return target
	}

	const observed = new Proxy(target, handler)
	def(target, ReactiveFlag.REACTIVE, observed)
	return observed
}


function getHandler(target, key){
	track(target, key)
	const value =  Reflect.get(target, key)
	if (isObject(value)){
		return reactive(value)
	}
	return value
}

function setHandler(target, key, value){
	const oldValue = Reflect.get(target, key)
	if (isRef(oldValue) && !isRef(value)){
		oldValue.value = value
	}
	Reflect.set(target, key, value)
	trigger(target, key)
}

function deletePropertyHandler(target, key){
	const hasKey = Reflect.hasOwnProperty(target, key)
	Reflect.deleteProperty(target, key)
	if (hasKey){
		trigger(target, key)
	}
}