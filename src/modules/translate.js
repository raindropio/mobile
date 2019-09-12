import LocalizedStrings from 'react-native-localization'
import { setLocale } from 'modules/format/date'
import _ from 'lodash-es'

const cleanLang = (obj)=>{
	delete obj.language
	return obj
}
const getLangs = (current='')=>{
	switch(current){
		case 'id': 		setLocale(require('date-fns/locale/id')); break;
		case 'de': 		setLocale(require('date-fns/locale/de')); break;
		case 'es': 		setLocale(require('date-fns/locale/es')); break;
		case 'fr': 		setLocale(require('date-fns/locale/fr')); break;
		case 'nl': 		setLocale(require('date-fns/locale/nl')); break;
		case 'pl': 		setLocale(require('date-fns/locale/pl')); break;
		case 'pt': 		setLocale(require('date-fns/locale/pt')); break;
		case 'fi': 		setLocale(require('date-fns/locale/fi')); break;
		case 'tr': 		setLocale(require('date-fns/locale/tr')); break;
		case 'kk':
		case 'ru':
		case 'uk': 		setLocale(require('date-fns/locale/ru')); break;
		case 'ko': 		setLocale(require('date-fns/locale/ko')); break;
		case 'zh-Hans': setLocale(require('date-fns/locale/zh-CN')); break;
		case 'zh-Hant': setLocale(require('date-fns/locale/zh-TW')); break;
	}

	return {
		en: 			cleanLang(require('assets/languages/en_US.json')),
		ru: 			current == 'ru' ? cleanLang(require('assets/languages/ru_RU.json')) : {},
		da: 			current == 'da' ? cleanLang(require('assets/languages/da_DK.json')) : {},
		de: 			current == 'de' ? cleanLang(require('assets/languages/de_DE.json')) : {},
		es: 			current == 'es' ? cleanLang(require('assets/languages/es_ES.json')) : {},
		fi: 			current == 'fi' ? cleanLang(require('assets/languages/fi_FI.json')) : {},
		fr: 			current == 'fr' ? cleanLang(require('assets/languages/fr_FR.json')) : {},
		hy: 			current == 'hy' ? cleanLang(require('assets/languages/hy_AM.json')) : {},
		id: 			current == 'id' ? cleanLang(require('assets/languages/id_ID.json')) : {},
		it: 			current == 'it' ? cleanLang(require('assets/languages/it_IT.json')) : {},
		kk: 			current == 'kk' ? cleanLang(require('assets/languages/kk_KZ.json')) : {},
		ko: 			current == 'ko' ? cleanLang(require('assets/languages/ko_KR.json')) : {},
		nl: 			current == 'nl' ? cleanLang(require('assets/languages/nl_NL.json')) : {},
		pl: 			current == 'pl' ? cleanLang(require('assets/languages/pl_PL.json')) : {},
		'pt-BR': 		current == 'pt-BR' ? cleanLang(require('assets/languages/pt_BR.json')) : {},
		sv: 			current == 'sv' ? cleanLang(require('assets/languages/sv_SE.json')) : {},
		tr: 			current == 'tr' ? cleanLang(require('assets/languages/tr_TR.json')) : {},
		uk: 			current == 'uk' ? cleanLang(require('assets/languages/uk_UA.json')) : {},
		'zh-Hans': 		current == 'zh-Hans' ? cleanLang(require('assets/languages/zh_CN.json')) : {},
		'zh-Hant': 		current == 'zh-Hant' ? cleanLang(require('assets/languages/zh_TW.json')) : {}
	}
}

const strings = new LocalizedStrings(getLangs())
strings.setContent(getLangs(strings.getLanguage()))

export default {
	locale: strings.getLanguage(),
	
	s(key) {
		return strings[key]||''
	}
}