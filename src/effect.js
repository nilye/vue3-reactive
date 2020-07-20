const targetMap = new WeakMap()
const effectStack = []
let activeEffect
let uid = 0

function effect(fn, options = {}){
	const _effect = createReactiveEffect(fn, options)
	if (options.immediate){
		_effect()
	}
	return _effect
}

function watchEffect (cb){
	let watcher = effect(cb)
	watcher()

	return ()=>{

	}
}

const watch = watchEffect

function createReactiveEffect(fn, options){
	const effect = function reactiveEffect(){
		try {
			effectStack.push(effect)
			activeEffect = effect
			return fn()
		} finally {
			effectStack.pop()
			activeEffect = effectStack[effectStack.length - 1]
		}
	}
	effect.id = uid++
	effect._isEffect = true
	effect.deps = []
	effect.options = options
	return effect
}

function track(target, key){
	if (!activeEffect){
		return
	}

	let depsMap = targetMap.get(target)
	if (!depsMap){
		depsMap = new Map()
		targetMap.set(target, depsMap)
	}

	let dep = depsMap.get(key)
	if (!dep){
		dep = new Set()
		depsMap.set(key, dep)
	}
	if (!dep.has(activeEffect)){
		dep.add(activeEffect)
		activeEffect.deps.push(dep)
	}
}

function trigger(target, key){
	const depsMap = targetMap.get(target)
	if (!depsMap){
		return
	}

	const effects = new Set()
	const addEffects = effectsToAdd => {
		if (effectsToAdd){
			effectsToAdd.forEach( e => {
				if (e !== activeEffect){
					effects.add(e)
				}
			})
		}
	}

	if (key !== undefined){
		addEffects(depsMap.get(key))
	}
	effects.forEach( effect => effect())
}