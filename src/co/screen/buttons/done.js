import t from 't'
import { Platform } from 'react-native'

export default {
    ...Platform.select({
        ios: {
            leftButtons: [] //remove Cancel button
        }
    }),

    rightButtons: [{
        id: 'done',
        text: t.s('done'),
        systemItem: 'done'
    }]
}