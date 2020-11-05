import { Linking } from 'react-native'
import { openURL } from 'modules/browser'
import Config from 'react-native-config'

import { store } from 'data'
import { loginNative, refresh } from 'data/actions/user'

const onRedirect = ({url})=>{
	var token='';
	try{
		if (url.indexOf('vk')==0)
			token=url.match(/access_token=(.+?)(&|$)/)[1]
	}catch(e){}

	if (token)
		store.dispatch(loginNative({
			provider: 'vkontakte',
			token: '?access_token='+token.toString()
		}))
	else
		store.dispatch(refresh())

	Linking.removeEventListener('url', onRedirect);
}

export default function() {
	Linking.removeEventListener('url', onRedirect);
	Linking.addEventListener('url', onRedirect)

	openURL({
		link: `https://oauth.vk.com/authorize?client_id=${Config.VK_CLIENT_ID}&scope=email,offline&response_type=token&redirect_uri=vk${Config.VK_CLIENT_ID}://authorize`,
		fromBottom: true
	})
}