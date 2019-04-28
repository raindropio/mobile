import { Platform } from 'react-native'
import { themed } from 'co/style/colors'

export default ()=> ({
	layout: {
		...Platform.select({
            ios: {
                backgroundColor: themed.mainAlt()
            },
            android: {
                componentBackgroundColor: themed.mainAlt() //performance improvement
            }
        })
	}
})