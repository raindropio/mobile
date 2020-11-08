import React from 'react'
import t from 't'
import _ from 'lodash-es'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { makeSelectMode } from 'data/selectors/bookmarks'
import { importantSelected, screenshotSelected, removeSelected } from 'data/actions/bookmarks'

import { connectActionSheet } from '@expo/react-native-action-sheet'
import { ButtonsWrap, Button } from 'co/navigation/header'
import { Wrap } from './actions.style'

class SelectModeActions extends React.Component {
	onMove = ()=>
		this.props.navigation.navigate('bookmarks', {
			screen: 'move', 
			params: {
				spaceId: this.props.spaceId
			}
		})

	onTags = ()=>
		this.props.navigation.navigate('bookmarks', {
			screen: 'tag',
			params: {
				spaceId: this.props.spaceId
			}
		})

	onRemove = ()=>
		Alert.alert(`${t.s('remove')} ${t.s('selected')} ${t.s('bookmarks')}?`, '',[
			{text: t.s('remove'), onPress:()=>this.props.removeSelected(this.props.spaceId)},
			{text: t.s('cancel'), style: 'cancel'}
        ])
        
    onMore = ()=>
        this.props.showActionSheetWithOptions(
            {
                title: `${_.capitalize(t.s('selected'))} ${t.s('bookmarks')}`,
                options: [
                    t.s('clickToMakeScreenshot'),
                    _.capitalize(t.s('to')) + ' ' + t.s('favorites').toLowerCase(),
                    t.s('remove') + ' ' + t.s('from') + ' ' + t.s('favorites').toLowerCase(),

                    t.s('cancel')
                ],
                cancelButtonIndex: 3
            },
            buttonIndex => {
                switch(buttonIndex) {
                    case 0: return this.props.screenshotSelected(this.props.spaceId)
                    case 1: return this.props.importantSelected(this.props.spaceId)
                    case 2: return this.props.importantSelected(this.props.spaceId, false)
                }
            },
        )
    
    render() {
        return (
            <Wrap>
                <ButtonsWrap>
                    <Button 
                        icon='folder-transfer'
                        color='background.regular'
                        onPress={this.onMove} />

                    <Button 
                        icon='hashtag' 
                        color='background.regular'
                        onPress={this.onTags} />

                    <Button 
                        icon='delete-bin' 
                        color='background.regular'
                        onPress={this.onRemove} />

                    <Button 
                        title={t.s('more')+'…'} 
                        color='background.regular'
                        onPress={this.onMore} />
                </ButtonsWrap>
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
)(
    connectActionSheet(
        SelectModeActions
    )
)