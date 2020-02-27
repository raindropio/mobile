import * as Sentry from '@sentry/react-native'
import { Platform } from 'react-native'
import Config from 'react-native-config'

class MySentry {
    constructor() {
        if (!Config.SENTRY_ENDPOINT) return
        if (process.env.NODE_ENV!='production') return
            
        Sentry.init({
            dsn: Config.SENTRY_ENDPOINT,
            environment: `${Platform.OS}-${process.env.NODE_ENV}`
        })
        Sentry.setTag('version', Config.APP_VERSION)

        this.isEnabled = true
    }

    setUser = (user={})=>{
        if (!this.isEnabled)
            return;

        const { _id=0, email='' } = user

        if (!_id)
            return;

        Sentry.setUser({
            id: String(_id),
            email
        })
    }
}

export default new MySentry()