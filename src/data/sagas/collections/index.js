import { all } from 'redux-saga/effects'
import items from './items'
import groups from './groups'
import single from './single'
import drafts from './drafts'
import colors from './colors'

export default function* () {
	yield all([
		items(),
		groups(),
		single(),
		drafts(),
		colors()
	])
}