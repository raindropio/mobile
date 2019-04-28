import React from 'react'
import LoadingBar from './bar'
import {Wrap} from './style'

export default class LoadingView extends React.PureComponent {
	render() {
		return (
			<Wrap pointerEvents={this.props.pointerEvents}>
				{this.props.loading?<LoadingBar />:null}
				{this.props.children}
			</Wrap>
		)
	}
}