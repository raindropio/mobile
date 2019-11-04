import { Platform } from 'react-native'

export default {
    rightButtons: ([
        {
            id: 'add',
            ...Platform.select({
                ios: {
                    systemItem: 'add'
                },
                android: {
                    icon: require('assets/images/add.png')
                }
            })
        }
    ])
}