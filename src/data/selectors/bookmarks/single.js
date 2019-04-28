import { createSelector } from 'reselect'
import {
	normalizeBookmark,
	getBookmarkScreenshotIndex,
	blankBookmark
} from '../../helpers/bookmarks'

import {
	normalizeCoverURL
} from '../../helpers/defaults'

//Single
export const bookmark = ({bookmarks}, _id)=>bookmarks.elements[_id] ? bookmarks.elements[_id] : blankBookmark

export const makeBookmark = ()=>bookmark

export const makeCovers = ()=>createSelector(
	[(cover)=>cover, (cover,domain)=>domain],
	normalizeCoverURL
)

export const makeHaveScreenshot = ()=>createSelector(
	[({bookmarks})=>bookmarks, (state, _id)=>_id],
	(bookmarks, _id)=>getBookmarkScreenshotIndex(bookmarks,_id)!=-1
)