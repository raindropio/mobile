import { createSelector } from 'reselect'
import { blankItems } from '../helpers/icons'

export const icons = createSelector(
	[({icons})=>{
		return icons.items || blankItems
	}],
	(items)=>items
)

export const selectedTheme = createSelector(
	[(cover_path)=>cover_path],
	(cover_path)=>{
		var selected = ''
		try{selected = cover_path.match(/(^.*)\//)[1]}catch(e){selected=''}
		return selected
	}
)