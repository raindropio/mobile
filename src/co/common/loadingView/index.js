import React from 'react'
import LoadingBar from './bar'
import {Wrap} from './style'

export default class LoadingView extends React.PureComponent {
	render() {
		const { loading, children, ...original } = this.props

		return (
			<Wrap {...original}>
				{this.props.loading?<LoadingBar />:null}
				{this.props.children}
			</Wrap>
		)
	}
}