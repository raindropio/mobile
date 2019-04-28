import { openURL } from 'modules/browser'
import { themed } from 'co/style/colors'

export default ()=>{
	openURL({
		readerMode: true,
		link: Platform.OS == 'ios' ? 
				'https://raindrop.helpscoutdocs.com/article/25-add-bookmark-ios' :
				'https://raindrop.helpscoutdocs.com/article/26-add-bookmark-android',
		barColor: themed.main(),
		iconColor: themed.tintColor()
	})
}