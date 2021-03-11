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
				onClose:		PropTypes.func,

				//private
				cancel:			PropTypes.bool
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

	componentWillUnmount() {
		this.save()

		if (this.props.onClose)
			this.props.onClose()
	}

	save = ()=>(
		new Promise(res=>{
			//ignore unsaved changes
			if (this.props.route.params.cancel)
				return res(true)

			this.props.draftCommit(
				this.props.route.params._id, 
				()=>res(true), 
				e=>{
					this.props.navigation.push('overlay', { screen: 'error', params: e })
					return res(false)
				}
			)
		})
	)

	render() {
		const { route:{ params={} }, ...etc } = this.props

		return (
			<Wrap>
				{/* prevent close until saved in extension only */}
				{this.context.isExtension && etc.unsaved && <PreventClose onBeforeClose={this.save} />}
				
				<Header {...params} {...etc} />
				
				<Shadow>{onScroll=>
					<ScrollForm onScroll={onScroll}>
						<Indicators {...params} {...etc} />
						<Item {...params} {...etc} />
						<Actions {...params} {...etc} />
						<Date {...params} {...etc} />

						<New {...params} {...etc} />
					</ScrollForm>
				}</Shadow>
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