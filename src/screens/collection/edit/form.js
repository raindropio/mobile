import { useCallback, useMemo } from 'react'
import { useTheme } from 'styled-components/native'
import PropTypes from 'prop-types'
import t from 't'
import _ from 'lodash-es'
import { links } from 'config'

import { useSelector, shallowEqual } from 'react-redux'
import { makeCollectionPath } from 'data/selectors/collections'
import { user as userSelector } from 'data/selectors/user'

import { ScrollForm, Form, Input } from 'co/form'
import Icon from 'co/collections/item/icon'
import Goto from 'co/goto'
import Toggle from 'co/form/toggle'
import Remove from './remove'

function CollectionForm({
	_id,
	title,
	cover = [],
	color,
	public: isPublic,
	parentId,
	focus = '',
	onChange,
	onSave,
	navigation,
	children,
	access = {},
	collaborators,
	slug,
}) {
	const { isExtension } = useTheme()

	const getCollectionPath = useMemo(() => makeCollectionPath(), [])
	const pathOptions = useMemo(() => ({ group: true, self: !_id }), [_id])
	const path = useSelector(state => getCollectionPath(state, _id || parentId, pathOptions), shallowEqual)
	const user = useSelector(userSelector, shallowEqual)

	const onMoveTap = useCallback(() => {
		const parent = _.last(path) || {}

		navigation.navigate('collection/path', {
			_id,
			parentId: parent._id,
			onSelect: (newParentId) => {
				onChange({ parentId: newParentId })
			}
		})
	}, [_id, path, navigation, onChange])

	const onCoverTap = useCallback(() => {
		navigation.navigate('collection/cover', {
			color,
			onChange
		})
	}, [color, navigation, onChange])

	const onPublicTap = useCallback(() =>
		onChange({ public: !isPublic })
	, [isPublic, onChange])

	const onShareTap = useCallback(() => {
		const url = `${links.site.index}/${user.name}/${slug}-${_id}`

		require('react-native-share').default.open({
			title,
			url,
			failOnCancel: false
		})
	}, [_id, slug, user, title])

	const onSharingTap = useCallback(() =>
		navigation.navigate('collection/sharing', { _id })
	, [_id, navigation])

	const onChangeTitle = useCallback((text) =>
		onChange({ title: text })
	, [onChange])

	let pathText = ''
	if (path.length)
		pathText = path.map((p) => p.title).join(' / ')

	return (
		<ScrollForm>
			{/*Title and description*/}
			<Form>
				<Input
					heading
					autoFocus={focus == 'title'}
					value={title}
					placeholder={t.s('name')}
					returnKeyType='done'
					onChangeText={onChangeTitle}
					onSubmitEditing={onSave} />

				<Goto
					last
					icon={<Icon collectionId={_id} src={cover[0]} size={24} color='accent' />}
					label={t.s('icon')}
					onPress={onCoverTap} />
			</Form>

			<Form>
				<Goto
					onPress={onMoveTap}
					icon='menu'
					label={t.s('location')}
					subLabel={pathText} />

				<Toggle
					last={!isPublic}
					icon={isPublic ? 'lock-unlock' : 'lock'}
					label={t.s('private')}
					value={!isPublic}
					onChange={onPublicTap} />

				{isPublic && _id && (
					<Goto
						last
						onPress={onShareTap}
						icon='global'
						label={t.s('share')}
						subLabel={t.s('access') + ' ' + t.s('accessViaLink').toLowerCase()} />
				)}
			</Form>

			{!isExtension && (
				<Form>
					<Goto
						last
						icon={collaborators ? 'group-2' : 'user-add'}
						variant={collaborators ? 'fill' : 'line'}
						label={t.s('members')}
						onPress={onSharingTap} />
				</Form>
			)}

			{children}

			{access.level >= 3 && (
				<Form>
					<Remove _id={_id} navigation={navigation} last />
				</Form>
			)}
		</ScrollForm>
	)
}

CollectionForm.propTypes = {
	_id: 		PropTypes.number,
	title: 		PropTypes.string,
	cover:		PropTypes.array,
	color:		PropTypes.string,
	public:		PropTypes.bool,
	parentId:	PropTypes.any,

	focus:		PropTypes.string,

	onChange: 	PropTypes.func,
	onSave:		PropTypes.func
}

export default CollectionForm