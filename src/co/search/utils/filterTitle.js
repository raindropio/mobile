import t from 't'

export default (key, val)=>{
	switch(key){
		case 'important': return t.s('favorites')
		case 'type': return t.s(val+'s')
		case 'broken': return t.s(key)
		default: return val
	}
}