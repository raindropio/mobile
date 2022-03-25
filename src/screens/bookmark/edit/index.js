import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { draftLoad, draftCommit } from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus, getDraftError, makeDraftUnsaved } from 'data/selectors/bookmarks'
import t from 't'
import { ThemeContext } from 'styled-components'

import PreventClose from 'co/navigation/preventClose'
import { ScrollForm } from 'co/form'
import Shadow from 'co/list/helpers/shadow'

import { Wrap } from './style'
import Actions from './actions'
import Indicators from './indicators'
import Item from './item'
import Date from './date'
import New from './new'
import Header from './header'
import Disabled from './disabled'

class EditBookmarkContainer extends React.Component {
	static contextType = ThemeContext

	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				_id: 			PropTypes.oneOfType([
								PropTypes.number, //exact id
								PropTypes.string //by link
				]),
				new:			PropTypes.any, //optional, { item: {}, autoCreate: true, preventDuplicate: true }
				spaceId:		PropTypes.any,
				onClose:		PropTypes.func
			})
		})
	}

	static options = {
		title: t.s('bookmark'),
		headerStyle: {
			backgroundColor: 'transparent',
			elevation: 0,
			shadowOpacity: 0
		}
	}

	componentDidMount() {
		this.props.draftLoad(this.props.route.params._id, this.props.route.params.new || {})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.status != this.props.status)
			if (this.props.status == 'error')
				this.props.navigation.replace('overlay', { screen: 'error', params: { error: this.props.error } })
	}

	componentWillUnmount() {
		this.save()

		if (this.props.onClose)
			this.props.onClose()
	}

	save = async(askSaveNew=true)=>{
		const { status, route: { params={} }, navigation, draftCommit } = this.props

		//explicitly ask for save for new bookmark
		if (askSaveNew && status == 'new'){
			const confirm = await new Promise(callback=>
				navigation.navigate('overlay', {
					screen: 'confirm',
					params: {
						type: 'warning',
						message: t.s('unsavedWarning')+'!',
						buttons: [t.s('save'), t.s('remove')],
						callback
					}
				})
			)

			switch(confirm) {
				case 1: return true; //remove
				case -1: return false; //cancel
				//or save
			}
		}

		try{
			await new Promise((res,rej)=>
				draftCommit(params._id, res, rej)
			)

			return true
		} catch(error) {
			navigation.push('overlay', { screen: 'error', params: { error } })
			return false
		}
	}

	render() {
		const { route:{ params={} }, ...etc } = this.props
		const preventClose = (this.context.isExtension && etc.unsaved && etc.status != 'new') 

		return (
			<Wrap>
				{!!preventClose && <PreventClose onBeforeClose={this.save} />}
				
				<Header {...params} {...etc} />
				
				<Shadow>{onScroll=>
					<ScrollForm onScroll={onScroll}>
						<Indicators {...params} {...etc} />
						<Item {...params} {...etc} />
						<Actions {...params} {...etc} />
						<Date {...params} {...etc} />

						<New {...params} {...etc} save={this.save} />
					</ScrollForm>
				}</Shadow>

				<Disabled {...params} {...etc} />
			</Wrap>
		)
	}
}

export default connect(
	() => {
		const getDraftItem = makeDraftItem()
		const getDraftStatus = makeDraftStatus()
		const getDraftUnsaved = makeDraftUnsaved()
	
		return (state, { route: { params={} } })=>({
			status: getDraftStatus(state, params._id),
			item: getDraftItem(state, params._id),
			error: getDraftError(state, params._id),
			unsaved: getDraftUnsaved(state, params._id)
		})
	},
	{ draftLoad, draftCommit }
)(EditBookmarkContainer)