import { Component } from 'react';
import t from 't'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/bookmarks'
import { makeSuggestedTags } from 'data/selectors/tags'

import TagPicker from 'co/tags/picker'
import Header from 'co/navigation/header'

class BookmarkTagsScreen extends Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				_id:		PropTypes.oneOfType([
							PropTypes.number, //exact id
							PropTypes.string //by link
				]),
				autoCommit:	PropTypes.bool //true by default
			})
		})
	}

	static options = {
		title: t.s('bookmark') + ' ' + t.s('tags').toLowerCase(),
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
    }
	
	componentDidMount() {
		if (this.props.status!='loaded' &&
			this.props.status!='new')
			this.props.actions.bookmarks.draftLoad(this.props.route.params._id)
	}

	async componentWillUnmount() {
		if (this.props.route.params.autoCommit)
			await this.onSave()
	}

	onChange = (tags)=>{
		this.props.actions.bookmarks.draftChange(this.props.route.params._id, { tags })
	}

	onSave = ()=>(
		new Promise((res,rej)=>{
			this.props.actions.bookmarks.draftCommit(
				this.props.route.params._id,
				res,
				rej
			)
		})
	)

	onSubmit = async()=>{
		await this.onSave()
		this.props.navigation.goBack()
	}

	render() {
		const { item, status, suggested } = this.props

		if (status == 'loading')
			return null

		return (
			<>
				<Header.Buttons status={status}>
					<Header.Button 
						bold
						disabled={status=='saving'}
						title={t.s('save')}
						onPress={this.onSubmit} />
				</Header.Buttons>

				<TagPicker
					selected={item.tags}
					suggested={suggested}
					spaceId={item.collectionId}
					onChange={this.onChange}
					onSubmit={this.onSubmit} />
			</>
		)
	}
}

export default connect(
	() => {
		const getDraftItem = makeDraftItem()
		const getDraftStatus = makeDraftStatus()
		const getSuggestedTags = makeSuggestedTags()
    
        return (state, { route: { params={} } })=>({
			status: getDraftStatus(state, params._id),
			item: getDraftItem(state, params._id),
			suggested: getSuggestedTags(state, params._id)
        })
    },
	(dispatch)=>({
		actions: {
			bookmarks: bindActionCreators(bookmarksActions, dispatch)
		}
	})
)(BookmarkTagsScreen)