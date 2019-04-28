import _ from 'lodash-es'
import Immutable from 'seamless-immutable'
import { normalizeURL } from './defaults'

export const normalizeIcons = (items=[], path='')=>(
	_.map(items, (item)=>({
		path: item,
		src: normalizeURL(path+item+'.png')
	}))
)

export const normalizeReq = (items=[], pro=[], path='')=>{
	var result = {
		'': normalizeIcons(items, path)
	}
	_.forEach(pro, (arr,name)=>{
		result[name] = normalizeIcons(arr, path)
	})

	return result
}

export const blankItems = Immutable({})