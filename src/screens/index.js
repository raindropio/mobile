import Navigation from 'modules/navigation'
import base from 'co/screen'

const screens = {
	//auth
	'auth/home':	 	()=>require(`./auth/home`).default,
	'auth/email': 		()=>require(`./auth/email`).default,

	//collections
	'collections/home/phone':()=>require(`./collections/home/phone`).default,
	'collections/home/ipad':()=>require(`./collections/home/ipad`).default,
	'collections/picker':()=>require(`./collections/picker`).default,
	'collections/reorder':()=>require(`./collections/reorder`).default,

	'collections/group/add':()=>require(`./collections/group/add`).default,
	'collections/group/edit':()=>require(`./collections/group/edit`).default,
	'collections/group/notEmpty':()=>require(`./collections/group/notEmpty`).default,

	'collection/add':	()=>require(`./collection/add`).default,
	'collection/edit': 	()=>require(`./collection/edit`).default,
	'collection/system':()=>require(`./collection/system`).default,
	'collection/remove':()=>require(`./collection/remove`).default,
	'collection/icon': 	()=>require(`./collection/icon`).default,

	//bookmarks
	'bookmarks/recent': ()=>require(`./bookmarks/recent`).default,
	'bookmarks/home': 	()=>require(`./bookmarks/home`).default,
	'bookmarks/search': ()=>require(`./bookmarks/search`).default,
	'bookmarks/title':	()=>require(`./bookmarks/title`).default,

	'bookmark/edit': 	()=>require(`./bookmark/edit`).default,
	'bookmark/cover': 	()=>require(`./bookmark/cover`).default,
	'bookmark/tags': 	()=>require(`./bookmark/tags`).default,

	//settings
	'settings/home': 	()=>require(`./settings/home`).default,
	'settings/pro/status':()=>require(`./settings/pro/status`).default,
	'settings/pro/buy': ()=>require(`./settings/pro/buy`).default,

	//tags
	'tags/select': 		()=>require(`./tags/select`).default,
	'tags/edit': 		()=>require(`./tags/edit`).default,

	//extension
	'extension/auth': 	()=>require(`./extension/auth`).default,
	'extension/init': 	()=>require(`./extension/init`).default,
	'extension/save': 	()=>require(`./extension/save`).default,

	//misc
	'misc/browser': 	()=>require(`./misc/browser`).default,
	'misc/picker': 		()=>require(`./misc/picker`).default,

	//Custom components
	'component/logoText':()=>require('co/common/logoText').default,
	'component/loading':()=>require('co/common/loadingIndicator').default
}

export function registerScreens() {
	Object.keys(screens).forEach(name=>{
		Navigation.registerComponent(
			name,
			()=>base(screens[name]())
		)
	})
}

export const getTabIndex = (name)=>{
	switch(name){
		case 'bookmarks/recent': return 1;
		case 'bookmarks/search': return 2;
		case 'settings/home': return 3;
		default: return 0;
	}
}