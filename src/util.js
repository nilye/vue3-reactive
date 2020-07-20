const ReactiveFlag = {
	IS_REF: '__v_isRef',
	IS_REACTIVE: '__v_isReactive',
	READONLY: '__v_isReadonly',
	REACTIVE: '__v_isReactive'
}


function isObject(val){
	return val !== null && val !== undefined && typeof val == 'object'
}

function def(target, key, value){
	Object.defineProperty(target, key, {
		value,
		configurable: true,
		enumerable: false
	})
}