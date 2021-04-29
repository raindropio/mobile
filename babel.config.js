module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	env: {
		production: {
			plugins: [
				'lodash',
				'transform-remove-console',
				'@babel/transform-react-constant-elements'
			]
		}
	},
	plugins: [
		[
			'transform-define', {
				'RAINDROP_ENVIRONMENT': 'react-native'
			}
		],
		[
			'module-resolver', {
				alias: {
					'localforage': 'react-native',
					
					'assets': './src/assets',
					'co': './src/co',
					'config': './src/config',
					'data': './src/data',
					'local': './src/local',
					'modules': './src/modules',
					'screens': './src/screens',

					't': './src/modules/translate'
				}
			}
		],
		'react-native-reanimated/plugin' //should be last!
	]
}