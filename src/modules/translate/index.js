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
		case 'ru':
		case 'uk': 		setLocale(require('date-fns/locale/ru')); break;
		case 'ko': 		setLocale(require('date-fns/locale/ko')); break;
		case 'zh-Hans': setLocale(require('date-fns/locale/zh_cn')); break;
		case 'zh-Hant': setLocale(require('date-fns/locale/zh_tw')); break;
	}

	return {
		en: 			cleanLang(require('./languages/en_US.json')),
		ru: 			current == 'ru' ? cleanLang(require('./languages/ru_RU.json')) : {},
		da: 			current == 'da' ? cleanLang(require('./languages/da_DK.json')) : {},
		de: 			current == 'de' ? cleanLang(require('./languages/de_DE.json')) : {},
		es: 			current == 'es' ? cleanLang(require('./languages/es_ES.json')) : {},
		fi: 			current == 'fi' ? cleanLang(require('./languages/fi_FI.json')) : {},
		fr: 			current == 'fr' ? cleanLang(require('./languages/fr_FR.json')) : {},
		hy: 			current == 'hy' ? cleanLang(require('./languages/hy_AM.json')) : {},
		id: 			current == 'id' ? cleanLang(require('./languages/id_ID.json')) : {},
		it: 			current == 'it' ? cleanLang(require('./languages/it_IT.json')) : {},
		kk: 			current == 'kk' ? cleanLang(require('./languages/kk_KZ.json')) : {},
		ko: 			current == 'ko' ? cleanLang(require('./languages/ko_KR.json')) : {},
		nl: 			current == 'nl' ? cleanLang(require('./languages/nl_NL.json')) : {},
		pl: 			current == 'pl' ? cleanLang(require('./languages/pl_PL.json')) : {},
		'pt-BR': 		current == 'pt-BR' ? cleanLang(require('./languages/pt_BR.json')) : {},
		sv: 			current == 'sv' ? cleanLang(require('./languages/sv_SE.json')) : {},
		tr: 			current == 'tr' ? cleanLang(require('./languages/tr_TR.json')) : {},
		uk: 			current == 'uk' ? cleanLang(require('./languages/uk_UA.json')) : {},
		'zh-Hans': 		current == 'zh-Hans' ? cleanLang(require('./languages/zh_CN.json')) : {},
		'zh-Hant': 		current == 'zh-Hant' ? cleanLang(require('./languages/zh_TW.json')) : {}
	}
}

const strings = new LocalizedStrings(getLangs())
strings.setContent(getLangs(strings.getLanguage()))

export default {
	s(key) {
		return strings[key]||''
	}
}