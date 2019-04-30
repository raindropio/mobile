import Immutable from 'seamless-immutable'
import _ from 'lodash-es'
import { createSelector } from 'reselect'
import {
	blankSpace
} from '../helpers/filters'
import {getSearch} from './bookmarks/space'

//Filters by collection id
export const getFilters = ({filters}, spaceId)=>filters.spaces[spaceId] || blankSpace

export const makeSuggestedList = ()=> createSelector(
	[getFilters, getSearch],
	(filters, search)=>{
		var suggested = []

		if (filters.important)
			suggested.push(singleToSuggestedItem('important'))

		if (filters.tags)
			suggested = suggested.concat(arrayToSuggestedItems('tag', filters.tags))

		if (filters.types)
			suggested = suggested.concat(arrayToSuggestedItems('type', filters.types))
		
		if (filters.broken)
			suggested.push(singleToSuggestedItem('broken'))

		return Immutable(_.differenceBy(suggested, search, ({key})=>key));
	}
)

const singleToSuggestedItem = (key)=>({key, val:1, type: 'suggested'})
const arrayToSuggestedItems = (type, a)=>a.map((item)=>({
	key: type,
	val: item.name,
	count: item.count,
	type: 'suggested'
}))