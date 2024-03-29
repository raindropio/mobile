import t from 't'
import { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash-es'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeDraftItem, makeHaveScreenshot } from 'data/selectors/bookmarks'
import prompt from 'react-native-prompt-android'

import {
	CoversView,
	CoverView,
	CoverTap,
	CoverScreenshotView,
	CoverScreenshotText,
	coverHeight
} from './style'
import Cover from 'co/bookmarks/item/view/cover'

const coverStyle = {borderRadius: 2, overflow: 'hidden'}

class BookmarkCoverScreen extends Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				_id:	PropTypes.oneOfType([
						PropTypes.number, //exact id
						PropTypes.string //by link
				])
			})
		})
	}

	static options = {
		title: t.s('cover')
    }

    onClose = ()=>
		this.props.navigation.goBack()

	onLink = (cover)=>{
		let media = [...this.props.item.media]
		let coverId = media.findIndex(item=>item.link == cover)

		if (coverId == -1){
			media = [ ...media, { link: cover } ]
			coverId = media.length - 1
		}

		this.props.actions.bookmarks.draftChange(
			this.props.route.params._id,
			{
				cover,
				coverId,
				media
			}
		)

		this.onClose()
	}
    
    onScreenshot = ()=>{
		this.onLink('<screenshot>')
	}

	onAdd = ()=>{
		prompt(
			t.s('add')+' '+t.s('cover').toLowerCase(),
			t.s('enterLink'),
			[
				{text: t.s('cancel'), style: 'cancel'},
				{text: t.s('add'), onPress: this.onLink},
			],
			{
				placeholder: 'https://'
			}
		)
	}
	
	keyExtractor = (item={}) => String(item._id)

	renderItem = ({item = {} })=>{
		switch(item.type) {
			case 'screenshot':
				return (
					<CoverTap onPress={this.onScreenshot}>
						<CoverScreenshotView>
							<CoverScreenshotText>{_.capitalize(t.s('screenshot'))}</CoverScreenshotText>
						</CoverScreenshotView>
					</CoverTap>
				)

			case 'add':
				return (
					<CoverTap onPress={this.onAdd}>
						<CoverScreenshotView>
							<CoverScreenshotText>+</CoverScreenshotText>
						</CoverScreenshotView>
					</CoverTap>
				)

			default:
				return (
					<CoverTap onPress={()=>this.onLink(item.link)}>
						<CoverView active={item._id==this.props.item.coverId}>
							<Cover
								style={coverStyle}
								src={item.link}
								height={coverHeight}
								preloader={true} />
						</CoverView>
					</CoverTap>
				)
		}
	}

	render() {
		const items = _.map(this.props.item.media, (item,index)=>({...item, type:'image', _id: index, key: 'i'+index}))
		if (!this.props.haveScreenshot)
			items.unshift({
				type: 'screenshot',
				_id: 's',
				key: 's'
			})

		items.push({
			type: 'add',
			_id: 'add',
			key: 'add'
		})

		return (
			<CoversView 
				data={items}
				numColumns={3}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem} />
		)
	}
}

export default connect(
	() => {
        const getDraftItem = makeDraftItem()
        const getHaveScreenshot = makeHaveScreenshot()
    
        return (state, { route: { params={} } })=>({
            item: getDraftItem(state, params._id),
            haveScreenshot: getHaveScreenshot(state, params._id)
        })
    },
	(dispatch)=>({
		actions: {
			bookmarks: bindActionCreators(bookmarksActions, dispatch)
		}
	})
)(BookmarkCoverScreen)