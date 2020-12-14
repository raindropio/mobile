import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { draftLoad, draftCommit } from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus, getDraftError, makeDraftUnsaved } from 'data/selectors/bookmarks'
import t from 't'

import PreventClose from 'co/navigation/preventClose'
import { Error } from 'co/overlay'
import { ScrollForm } from 'co/form'
import Shadow from 'co/list/helpers/shadow'

import Actions from './actions'
import Indicators from './indicators'
import Item from './item'
import Date from './date'
import Header from './header'

class EditBookmarkContainer extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				_id: 			PropTypes.number,
				spaceId:		PropTypes.any,
				onClose:		PropTypes.func,
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
		this.props.draftLoad(this.props.route.params._id)
	}

	async componentWillUnmount() {
		await this.onClose()
	}

	onClose = async()=>{
		await new Promise((res,rej)=>{
			this.props.draftCommit(this.props.route.params._id, res, e=>{ Error(e); rej(e) })
		})

		if (this.props.onClose)
			this.props.onClose()

		return true
	}

	render() {
		const { route:{ params={} }, ...etc } = this.props

		return (<>
			{etc.unsaved && <PreventClose onBeforeClose={this.onClose} />}

			<Header {...params} {...etc} />
			
			<Shadow>{onScroll=>
				<ScrollForm onScroll={onScroll}>
					<Indicators {...params} {...etc} />
					<Item {...params} {...etc} />
					<Actions {...params} {...etc} />
					<Date {...params} {...etc} />
				</ScrollForm>
			}</Shadow>
		</>)
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