import LocalizedStrings from 'react-native-localization'
import { setLocale } from 'modules/format/date'
import _ from 'lodash-es'

const getLangs = (current='')=>{
	switch(current){
		case 'en': 		setLocale(require('date-fns/locale/en-US')); break;
		case 'de': 		setLocale(require('date-fns/locale/de')); break;
		case 'es': 		setLocale(require('date-fns/locale/es')); break;
		case 'fi': 		setLocale(require('date-fns/locale/fi')); break;
		case 'fr': 		setLocale(require('date-fns/locale/fr')); break;
		case 'it': 		setLocale(require('date-fns/locale/it')); break;
		case 'nl': 		setLocale(require('date-fns/locale/nl')); break;
		case 'pl': 		setLocale(require('date-fns/locale/pl')); break;
		case 'pt': 		setLocale(require('date-fns/locale/pt')); break;
		case 'sv': 		setLocale(require('date-fns/locale/sv')); break;
		case 'tr': 		setLocale(require('date-fns/locale/tr')); break;
		case 'zh-Hans': setLocale(require('date-fns/locale/zh-CN')); break;

		case 'kk':
		case 'ru':
		case 'uk': 		setLocale(require('date-fns/locale/ru')); break;
	}

	return {
		en: 			require('assets/languages/en.json'),
		de: 			current == 'de' ? require('assets/languages/de.json') : {},
		es: 			current == 'es' ? require('assets/languages/es.json') : {},
		fi: 			current == 'fi' ? require('assets/languages/fi.json') : {},
		fr: 			current == 'fr' ? require('assets/languages/fr.json') : {},
		it: 			current == 'it' ? require('assets/languages/it.json') : {},
		nl: 			current == 'nl' ? require('assets/languages/nl.json') : {},
		pl: 			current == 'pl' ? require('assets/languages/pl.json') : {},
		'pt-BR': 		current == 'pt-BR' ? require('assets/languages/pt.json') : {},
		sv: 			current == 'sv' ? require('assets/languages/sv.json') : {},
		tr: 			current == 'tr' ? require('assets/languages/tr.json') : {},
		'zh-Hans': 		current == 'zh-Hans' ? require('assets/languages/zh.json') : {},

		ru: 			current == 'ru' ? require('assets/languages/ru.json') : {},
		kk: 			current == 'kk' ? require('assets/languages/ru.json') : {},
		uk: 			current == 'uk' ? require('assets/languages/ru.json') : {},
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