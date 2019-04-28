export const authorize = (provider)=>{
	switch(provider){
		case 'twitter':
			return require('./twitter').default()

		case 'google':
			return require('./google').default()

		case 'facebook':
			return require('./facebook').default()

		case 'vkontakte':
			return require('./vkontakte').default()
	}
}