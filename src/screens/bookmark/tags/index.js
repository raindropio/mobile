import t from 't'
import React from 'react'
import fadeIn from 'co/screen/animations/fadeIn'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/bookmarks'
import { makeSuggestedTags } from 'data/selectors/tags'

import color from 'co/bookmarks/utils/color'
import TagsPickerScreen from 'screens/tags/picker'

class BookmarkTagsScreen extends React.Component {
	static defaultProps = {
		_id: 		0
    }

	static options({ _id }) {
		return {
			tintColor: color(_id),

			...TagsPickerScreen.options(),

			animations: {
				push: {
					waitForRender: true,
					content: fadeIn
				}
			}
		}
	}
	
	componentDidMount() {
		if (this.props.status!='loaded')
			this.props.actions.bookmarks.draftLoad(this.props._id)
	}

	async componentWillUnmount() {
		await this.onSubmit()
	}

	onChange = (tags)=>{
		this.props.actions.bookmarks.draftChange(this.props._id, { tags })
	}

	onSubmit = ()=>{
		return new Promise((res,rej)=>{
			this.props.actions.bookmarks.draftCommit(
				this.props._id,
				res,
				rej
			)
		})
	}

	render() {
		const { item, status, suggested, ...originalProps } = this.props

		if (status == 'loading')
			return null

		return (
			<TagsPickerScreen
				{...originalProps}
				selected={item.tags}
				suggested={suggested}
				onChange={this.onChange}
				onSubmit={this.onSubmit} />
		)
	}
}

export default connect(
	() => {
		const getDraftItem = makeDraftItem()
		const getDraftStatus = makeDraftStatus()
		const getSuggestedTags = makeSuggestedTags()
    
        return (state, {_id})=>({
			status: getDraftStatus(state, {_id}),
			item: getDraftItem(state, {_id}),
			suggested: getSuggestedTags(state, _id)
        })
    },
	(dispatch)=>({
		actions: {
			bookmarks: bindActionCreators(bookmarksActions, dispatch)
		}
	})
)(BookmarkTagsScreen)