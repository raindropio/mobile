import Navigation from 'modules/navigation'
import initNavigation from 'modules/navigation/init'
import { isExtension } from 'modules/native'
import { setTheme } from 'co/style/colors'

let firstRun = true

export default async (params = {})=>{
    //Set theme
    params.theme && setTheme(params.theme)
    initNavigation()

    await Navigation.dismissAllModals()

    //Set stack root
    if (await isExtension())
        await require('./extension').default(params, firstRun)
    else
        await require('./app').default(params, firstRun)

    firstRun = false
}