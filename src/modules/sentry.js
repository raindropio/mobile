import { Sentry } from 'react-native-sentry'
import Config from 'react-native-config'

class MySentry {
    constructor() {
        if (!Config.SENTRY_ENDPOINT) return
        if (process.env.NODE_ENV!='production') return
            
        Sentry.config(Config.SENTRY_ENDPOINT).install()
        Sentry.setTagsContext({
            environment:    process.env.NODE_ENV,
            version:        Config.APP_VERSION
        })

        this.isEnabled = true
    }

    setUser = (user={})=>{
        if (!this.isEnabled)
            return;

        const { _id=0, email='' } = user

        if (!_id)
            return;

        Sentry.setUserContext({
            userId: String(_id),
            email
        })
    }
}

export default new MySentry()