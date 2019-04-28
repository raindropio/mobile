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
					'localforage': '@react-native-community/async-storage',
					
					'assets': './src/assets',
					'co': './src/co',
					'containers': './src/containers',
					'data': './src/data',
					'modules': './src/modules',
					'local': './src/local',
					'screens': './src/screens',

					't': './src/modules/translate'
				}
			}
		]
	]
}