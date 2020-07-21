let currentContext

function createContext(){
	currentContext = {
		preset: 10,
		mixin: {
			width: { width: 100 },
			margin: { margin: 10}
		}
	}
}

function getContext(){
	return currentContext
}