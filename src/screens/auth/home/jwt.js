import { Linking } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { API_ENDPOINT_URL } from 'data/constants/app'

async function auth(provider) {
    const deeplink = 'rnio://jwt'
    const { type, url } = await InAppBrowser.openAuth(`${API_ENDPOINT_URL}auth/${provider}?redirect=${encodeURIComponent(`${API_ENDPOINT_URL}auth/jwt?done_uri=${deeplink}`)}`, deeplink, {
        ephemeralWebSession: false,
        showTitle: false,
        enableUrlBarHiding: true,
        enableDefaultShare: false
    })

    if (type === 'success' && url)
        Linking.openURL(url.replace(/#.*$/, ''))
}

export default {
    apple: ()=>{
        auth('apple')
    },
    google: ()=>{
        auth('google')
    },
    facebook: ()=>{
        auth('facebook')
    },
    twitter: ()=>{
        auth('twitter')
    },
    vkontakte: ()=>{
        auth('vkontakte')
    },
}