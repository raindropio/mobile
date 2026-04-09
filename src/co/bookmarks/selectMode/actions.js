import { Component } from 'react'
import t from 't'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { makeSelectMode } from 'data/selectors/bookmarks'
import { importantSelected, screenshotSelected, removeSelected } from 'data/actions/bookmarks'

import { Wrap } from './actions.style'
import Action from './action'

class SelectModeActions extends Component {
    getCountLabel = ()=>
        t.format('bookmarksCount', this.props.all ? t.s('all') : this.props.count)

	onMove = ()=>
		this.props.navigation.navigate('bookmarks/move', { spaceId: this.props.spaceId })

	onTags = ()=>
		this.props.navigation.navigate('bookmarks/tag', { spaceId: this.props.spaceId })

	onRemove = ()=>
		Alert.alert(`${t.s('remove')} ${this.getCountLabel()}?`, '',[
			{
                text: t.s('remove')+' '+this.getCountLabel(), 
                style: 'destructive', 
                onPress:()=>this.props.removeSelected(this.props.spaceId)},
			{
                text: t.s('cancel'), 
                style: 'cancel'
            }
        ])
        
    onMore = ()=>
        Alert.alert(
            this.getCountLabel(),
            null,
            [
                { text: t.s('clickToMakeScreenshot'), onPress: ()=>this.props.screenshotSelected(this.props.spaceId) },
                { text: t.s('addToFavorites'), onPress: ()=>this.props.importantSelected(this.props.spaceId) },
                { text: t.s('removeFromFavorites'), style: 'destructive', onPress: ()=>this.props.importantSelected(this.props.spaceId, false) },
                { text: t.s('cancel'), style: 'cancel' }
            ],
            { cancelable: true }
        )
    
    render() {
        const disabled = !this.props.all && !this.props.count

        return (
            <Wrap>
                <Action 
                    disabled={disabled}
                    icon='folder-transfer'
                    title={t.s('move')}
                    onPress={this.onMove} />

                <Action 
                    disabled={disabled}
                    icon='hashtag' 
                    title={t.s('addTags')}
                    onPress={this.onTags} />

                <Action 
                    disabled={disabled}
                    icon='delete-bin' 
                    title={t.s('remove')}
                    onPress={this.onRemove}/>

                <Action 
                    disabled={disabled}
                    icon='more'
                    title={t.s('more')}
                    onPress={this.onMore} />
            </Wrap>
        )
    }
}

export default connect(
    () => {
        const getSelectMode = makeSelectMode()

        return (state, { spaceId })=>{
            const selectMode = getSelectMode(state, spaceId)
    
            return {
                all: selectMode.all,
                count: selectMode.ids.length
            }
        }
    },
    { importantSelected, screenshotSelected, removeSelected }
)(SelectModeActions)