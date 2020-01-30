import t from 't'
import _ from 'lodash'
import React from 'react'
import { Platform } from 'react-native'
import Navigation from 'modules/navigation'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'

import Form from '../edit/form'

class EditGroupScreen extends React.PureComponent {
	static options() {
		return {
			style: 'form',

			topBar: {
				title: {
					text: t.s('newString') + ' ' + t.s('group').toLowerCase()
				},
			},

			animations: {
				push: {
                    waitForRender: !Platform.isPad, //on iPad glitches layout size
				}
			}
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			title: ''
		}

		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'create':
				this.onSave()
			break
		}
	}

	componentWillUnmount() {
		this._navigationEvents && this._navigationEvents.remove()
	}

	onSave = ()=>{
		this.props.actions.collections.groupCreate(
			this.state.title
		)

		this.onClose()
	}

	onChange = (changed)=>{
		this.setState({
			...this.state,
			...changed
		}, () => {
            Navigation.mergeOptions(this.props, {
                topBar: {
                    rightButtons: (this.state.title||'').trim() ? [
                        {
                            id: 'create',
                            text: t.s('create')
                        }
                    ] : []
                }
            })
        })
	}

	onClose = ()=>{
		Navigation.close(this.props)
	}

	render() {
		return (
			<Form 
				title={this.state.title}
				onSave={this.onSave}
				onChange={this.onChange}
				onRemove={this.onRemove} />
		)
	}
}

export default connect(
	()=>({}),
	(dispatch)=>({
		actions: {
			collections: bindActionCreators(collectionsActions, dispatch)
		}
	})
)(EditGroupScreen)