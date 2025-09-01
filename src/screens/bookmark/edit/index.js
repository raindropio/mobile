import { Component } from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { draftLoad, draftCommit } from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus, getDraftError, makeDraftUnsaved } from 'data/selectors/bookmarks'
import t from 't'
import { ThemeContext } from 'styled-components/native'

import { ScrollForm } from 'co/form'

import Actions from './actions'
import Indicators from './indicators'
import Item from './item'
import Date from './date'
import New from './new'
import Header from './header'
import Disabled from './disabled'

class EditBookmarkContainer extends Component {
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

	static options = ({ route: { params } }) => ({
		title: t.s('bookmark'),
		animation: params?.animation
	})

	componentDidMount() {
		this.props.draftLoad(this.props.route.params._id, this.props.route.params.new || {})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.status != this.props.status)
			if (this.props.status == 'error') {
				console.error(this.props.error?.message)
				Alert.alert(t.s('error'), this.props.error?.message)
			}
	}

	componentWillUnmount() {
		if (this.props.status != 'new')
			this.save()

		if (this.props.onClose)
			this.props.onClose()
	}

	save = async()=>{
		const { route: { params={} }, draftCommit } = this.props

		try{
			await new Promise((res,rej)=>
				draftCommit(params._id, res, rej)
			)

			return true
		} catch(error) {
			console.error(error)
			Alert.alert(t.s('error'), error?.message)
			return false
		}
	}

	render() {
		const { route:{ params={} }, ...etc } = this.props

		return (
			<>
				<Header {...params} {...etc} />
				
				<ScrollForm>
					<Indicators {...params} {...etc} />
					<Item {...params} {...etc} />
					<Actions {...params} {...etc} />
					<Date {...params} {...etc} />

					<New {...params} {...etc} save={this.save} />
				</ScrollForm>

				<Disabled {...params} {...etc} />
			</>
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