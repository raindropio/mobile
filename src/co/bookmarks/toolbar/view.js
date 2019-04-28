import React from 'react'
import {
	Toolbar,
	Actions,
	Action,
	ActionImage,
	Separator,
	SeparatorBorder,
	Count
} from './style'

const 
	close = require('assets/images/close.png'),
	star = require('assets/images/star.png'),
	move = require('assets/images/move.png'),
	remove = require('assets/images/remove.png'),
	addTags = require('assets/images/addTags.png'),
	selectAllIcon = require('assets/images/selectAll.png'),
	screenshot = require('assets/images/screenshot.png')

export default class SpaceToolbar extends React.Component {
	render() {
		const {
			ids,

			onImportant,
			onScreenshot,
			onMove,
			onTags,
			onRemove,

			onCancel,
			onSelectAll
		} = this.props
		const selectedCount = ids.length;

		return (
			<Toolbar>
				<Actions>
					

					{/*<Separator><SeparatorBorder/></Separator>*/}
					

					<Action onPress={selectedCount?onScreenshot:undefined} disabled={!selectedCount}><ActionImage source={screenshot} /></Action>
					<Action onPress={selectedCount?onImportant:undefined} disabled={!selectedCount}><ActionImage source={star} /></Action>
					<Action onPress={selectedCount?onTags:undefined} disabled={!selectedCount}><ActionImage source={addTags} /></Action>
					<Action onPress={selectedCount?onMove:undefined} disabled={!selectedCount}><ActionImage source={move} /></Action>
					<Action onPress={selectedCount?onRemove:undefined} disabled={!selectedCount}><ActionImage source={remove} /></Action>
					
					{/*<Separator><Count>{selectedCount}</Count></Separator>*/}

					<Action onPress={onSelectAll} dark><ActionImage source={selectAllIcon} /></Action>
					<Action onPress={onCancel} dark><ActionImage source={close} /></Action>
				</Actions>
			</Toolbar>
		)
	}
}