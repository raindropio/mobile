import { findBestAvailableLanguage } from 'react-native-localize'

function getStrings(current='') {
	return {
		en: 			require('assets/languages/en.json'),
		de: 			current == 'de' ? require('assets/languages/de.json') : {},
		es: 			current == 'es' ? require('assets/languages/es.json') : {},
		fi: 			current == 'fi' ? require('assets/languages/fi.json') : {},
		fr: 			current == 'fr' ? require('assets/languages/fr.json') : {},
		hi: 			current == 'hi' ? require('assets/languages/hi.json') : {},
		it: 			current == 'it' ? require('assets/languages/it.json') : {},
		ja: 			current == 'ja' ? require('assets/languages/ja.json') : {},
		ko: 			current == 'ko' ? require('assets/languages/ko.json') : {},
		nl: 			current == 'nl' ? require('assets/languages/nl.json') : {},
		pl: 			current == 'pl' ? require('assets/languages/pl.json') : {},
		'pt-BR': 		current == 'pt-BR' ? require('assets/languages/pt_BR.json') : {},
		sv: 			current == 'sv' ? require('assets/languages/sv.json') : {},
		tr: 			current == 'tr' ? require('assets/languages/tr.json') : {},
		'zh-Hans': 		current == 'zh-Hans' ? require('assets/languages/zh-Hans.json') : {},
		'zh-Hant': 		current == 'zh-Hant' ? require('assets/languages/zh-Hant.json') : {},

		ru: 			current == 'ru' ? require('assets/languages/ru.json') : {},
		kk: 			current == 'kk' ? require('assets/languages/ru.json') : {},
		uk: 			current == 'uk' ? require('assets/languages/ru.json') : {},
	}
}

const locale = findBestAvailableLanguage(Object.keys(getStrings())).languageTag
const strings = getStrings(locale)

export default {
	locale,
	strings,
	
	s(key) {
		return strings[locale][key] || strings.en[key] || key || ''
	}
}