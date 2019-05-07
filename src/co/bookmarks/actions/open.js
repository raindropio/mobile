import { openURL } from 'modules/browser'
import { themed } from 'co/style/colors'
import collectionColor from 'co/collections/utils/color'

export default (options, {link, type, collectionId})=>{
	openURL(options, {
		link,
		readerMode: type=='article',
		barColor: themed.main(),
		iconColor: themed._tintColor(collectionColor(collectionId))
	})
}