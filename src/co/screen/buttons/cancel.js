import t from 't'
import { Platform } from 'react-native'

export default Platform.select({
    ios: {
        leftButtons: [{
            id: 'cancel',
            text: t.s('cancel')
        }]
    },
    android: {
        leftButtons: [{
            id: 'cancel',
            icon: require('assets/images/backButton.png')
        }]
    }
})