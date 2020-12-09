import {
	EXTENSION_COLLECTIONS_SEARCH_FOCUS
} from '../constants'

export const setExtensionCollectionsSearchFocus = (focus=false)=>({
	type: EXTENSION_COLLECTIONS_SEARCH_FOCUS,
	focus
})