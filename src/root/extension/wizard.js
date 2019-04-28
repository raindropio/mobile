import { Platform } from 'react-native'
import { stackId } from 'modules/extension'

export default async ()=>{
    return {
        root: {
            stack: {
                id: stackId,
                
                children: [
                    {
                        component: {
                            name: 'extension/init',
                            options: {
                                layout: {
                                    ...Platform.select({
                                        android: {
                                            componentBackgroundColor: 'transparent' //important, otherwise no transparent screens on android
                                        }
                                    })
                                },
                                modalPresentationStyle: 'formSheet'
                            }
                        }
                    }
                ]
            }
        }
    }
}