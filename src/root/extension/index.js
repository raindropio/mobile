import { Platform } from 'react-native'
import Navigation from 'modules/navigation'
import { initCookie } from 'modules/native'
import { show, stackId } from 'modules/extension'

export default async (params = {}, firstRun)=>{
    await initCookie()

    if (firstRun && Platform.OS=='ios') {
        //iOS extension will be showen only after show event
        Navigation.events().registerCommandCompletedListener(() => {
            show()
        })
    }

    let stack
    switch(params.root) {
        case 'auth': 
            stack = await require('./auth').default(params, firstRun)
        break

        default:
            stack = await require('./wizard').default(params, firstRun)
        break
    }

    if (!firstRun && Platform.OS=='ios')
        await Navigation.setStackRoot(stackId, stack.root.stack.children) //Replace previous stack, hack for iOS only
    else
        await Navigation.setRoot(stack)
}