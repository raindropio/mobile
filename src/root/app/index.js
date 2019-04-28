import { Platform } from 'react-native'
import Navigation from 'modules/navigation'
import { store } from 'data'
import { saveCookie } from 'modules/native'

export default async(params = {}, firstRun)=>{
    //Cookies
    await saveCookie()

    let stack
    switch(params.root) {
        case 'auth': 
            stack = await require('./auth').default(params, firstRun)
        break

        default:
            //State
            const state = {
                lastTabIndex:   ((store.getState().local||{}).lastTabIndex),
                lastCollection: ((store.getState().config||{}).lastCollection)
            }

            if (Platform.isPad)
                stack = await require('./ipad').default({...params, ...state}, firstRun)
            else
                stack = await require('./phone').default({...params, ...state}, firstRun)
        break
    }

    await Navigation.setRoot(stack)
}