import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { connect } from 'react-redux'
import * as actions from 'data/actions/covers'

import Header from 'co/navigation/header'
import Form from './form'

class PickCoverScreen extends React.Component {
	static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
                onChange: PropTypes.func
            })
        })
    }

	static options = {
		title: t.s('icon'),
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
	}

	componentDidMount() {
		this.props.load(this.props.query)	
	}

	onSelect = (cover)=>{
		this.props.route.params.onChange && this.props.route.params.onChange({ cover: [cover] })
		this.props.navigation.goBack()
	}

	onResetPress = ()=>
		this.onSelect('')

	render() {
		const { route: { params={} }, ...etc } = this.props

		return (
			<>
				<Header.Buttons>
					<Header.Button 
						title={t.s('remove') + ' ' + t.s('icon').toLowerCase()}
						onPress={this.onResetPress} />
				</Header.Buttons>

				<Form
					{...etc}
					{...params}
					onSelect={this.onSelect} />
			</>
		)
	}
}

export default connect(
	(state)=>state.covers,
	actions
)(PickCoverScreen)