const colors = {
	theme: '#1988E0',
	theme_dark: '#387FD1',
	darkTheme: '#F5D6A5',
	red: '#F44336',
	orange: '#FC9D46',
	green: '#7CB342',
	purple: '#625AC3',
	asphalt: '#8791A1',
	asphaltWhite: '#4A4D52',
	warning: '#FFF6DB',
	error: '#F7E6E6',

	whiteBackground: '#ffffff',
	whiteBackgroundAlt: '#F7F7F7',
	darkBackground: '#2C2E31',
	darkBackgroundAlt: '#27292C',

	spaceGray: '#636c72',
	textGray: '#646464',
	textGrayWhite: '#9C9D9F',
	iconGray: '#999999',
	touchFeedback: '#00000013',//'#EFEFEF',
	touchFeedbackWhite: '#323438'
}

export default colors


//Themes
export var currentTheme = 'default'

export const setTheme = (name)=>{
	currentTheme = name
}

export const themes = {
	default: {
		name: 				'Day',
		dark: 				false,
		main: 				'#ffffff',
		mainAlt: 			'#F2F2F2',
		tintColor: 			'#1988E0',
		inverted: 			'#000000',
		invertedExtraLight: '#00000015',
		invertedLight: 		'#00000030',
		invertedMedium: 	'#00000070',
		invertedDark: 		'#00000095'
	},
	night: {
		name: 				'Night (Dark)',
		dark: 				true,
		main: 				'#2C2E31',
		mainAlt: 			'#27292C',
		tintColor: 			'#F5D6A5',
		inverted: 			'#ffffff',
		invertedExtraLight: '#ffffff15',
		invertedLight: 		'#ffffff30',
		invertedMedium: 	'#ffffff70',
		invertedDark: 		'#ffffff95'
	},
	highContrast: {
		name: 				'High Contrast',
		dark: 				false,
		main: 				'#ffffff',
		mainAlt: 			'#F0F0F0',
		tintColor: 			'#1988E0',
		inverted: 			'#000000',
		invertedExtraLight: '#00000020',
		invertedLight: 		'#00000055',
		invertedMedium: 	'#00000085',
		invertedDark: 		'#000000'
	},
	solarized: {
		name: 				'Solarized',
		dark: 				false,
		main: 				'#FFFAED',
		mainAlt: 			'#FAF3E0',
		tintColor: 			'#B99532',
		inverted: 			'#000000',
		invertedExtraLight: '#00000015',
		invertedLight: 		'#00000030',
		invertedMedium: 	'#00000070',
		invertedDark: 		'#00000095'
	},
}

export const themeIsDark = ()=>themes[currentTheme].dark
export const getCurrentTheme = (p)=>{
	const tname = p && p.theme && p.theme.name ? p.theme.name : currentTheme
	return themes[tname] ? themes[tname] : themes['default']
}

const tintColor = (p)=>{
	const t = getCurrentTheme(p)
	const fallbackItemTintColor = p && p.tintColor ?p.tintColor:null
	const fallbackThemeTintColor = p && p.theme && p.theme.tintColor ?p.theme.tintColor:null
	return t.dark ? t.tintColor : (fallbackItemTintColor||fallbackThemeTintColor||t.tintColor)
}
const main = (p)=>getCurrentTheme(p).main
const mainAlt = (p)=>getCurrentTheme(p).mainAlt
const inverted = (p)=>getCurrentTheme(p).inverted

export const themed = {
	tintColor,
	_tintColor: (c)=>tintColor({theme: {tintColor: c}}),

	main,
	mainAlt,

	inverted,
	invertedLight: 		(p)=>getCurrentTheme(p).invertedLight,
	invertedExtraLight: (p)=>getCurrentTheme(p).invertedExtraLight,
	invertedMedium: 	(p)=>getCurrentTheme(p).invertedMedium,
	invertedDark: 		(p)=>getCurrentTheme(p).invertedDark
}