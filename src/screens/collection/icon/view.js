import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as iconsActions from 'data/actions/icons'
import { icons, selectedTheme } from 'data/selectors/icons'

import Form from './form'

class PickIconContainer extends React.PureComponent {
	componentDidMount() {
		this.props.actions.icons.load()	
	}

	render() {
		return <Form {...this.props} />
	}
}

export default connect(
	(state, {cover_path=''})=>({
		icons: 			icons(state),
		selectedTheme: 	selectedTheme(cover_path)
	}),
	(dispatch)=>({
		actions: {
			icons: bindActionCreators(iconsActions, dispatch)
		}
	})
)(PickIconContainer)