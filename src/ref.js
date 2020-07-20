function isRef(r){
	return r ? r[ReactiveFlag.IS_REF] === true : false
}

function createRef(rawValue, shallow = false){
	let value = rawValue
	const ref = {
		[ReactiveFlag.IS_REF]: true,
		get value(){
			track(ref, 'value')
			return value
		},
		set value(newVal){
			if (newVal !== rawValue){
				rawValue = newVal
				value = newVal
				trigger(ref, 'value')
			}
		}
	}

	return ref
}

function ref(value){
	return createRef(value, true)
}