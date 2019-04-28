import { all } from 'redux-saga/effects'
import common from './common'
import user from './user'
import collections from './collections'
import bookmarks from './bookmarks'
import filters from './filters'
import tags from './tags'
import icons from './icons'

const root = function* () {
	yield all([
		user(),
		collections(),
		bookmarks(),
		filters(),
		tags(),
		icons(),

		common()
	])
}

export default root