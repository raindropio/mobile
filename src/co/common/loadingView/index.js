import React from 'react'
import { View } from 'react-native'
import LoadingBar from './bar'
import { styles } from './style'

export default class LoadingView extends React.PureComponent {
	render() {
		const { loading, children, ...original } = this.props

		return (
			<View style={styles.wrap} pointerEvents='box-none' {...original}>
				{this.props.loading?<LoadingBar />:null}
				{this.props.children}
			</View>
		)
	}
}