import React from 'react'
import t from 't'
import _ from 'lodash-es'
import { ThemeContext } from 'styled-components'
import { ScrollForm, Form, FormSection } from 'co/style/form'
import { ButtonLink } from 'co/common/button'

import Cover from './cover'
import Text from './text'
import Path from './path'
import Tags from './tags'
import Important from './important'
import URL from './url'

export default class EditBookmark extends React.Component {
	static contextType = ThemeContext

	cacheTitle = t.s('open') + ' ' + t.s('permanentCopy').toLowerCase()
	removeTitle = _.capitalize(t.s('move'))+' '+t.s('to')+' '+t.s('defaultCollection--99').toLowerCase()

	render() {
		const {
			navigation,
			item,
			focus,
			onSubmit,
			onChange,
			onOpenCache,
			onRemove
		} = this.props

		return (
			<ScrollForm>
				<Cover 
					navigation={navigation}
					_id={item._id}
					domain={item.domain}
					link={item.link}
					cover={item.cover} />

				<Text 
					title={item.title}
					excerpt={item.excerpt}
					focus={focus}
					onChange={onChange}
					onSubmit={onSubmit} />

				<Form>
					<Path 
						navigation={navigation}
						_id={item._id}
						collectionId={item.collectionId}
						onChange={onChange} />
					
					<Tags 
						navigation={navigation}
						_id={item._id}
						tags={item.tags}
						onChange={onChange} />

					<Important 
						last
						navigation={navigation}
						important={item.important}
						onChange={onChange} />
				</Form>

				<Form>
					<URL 
						link={item.link}
						onChange={onChange}
						onEndEditing={onSubmit} />
				</Form>

				{item.cache == 'ready' && <ButtonLink onPress={onOpenCache} disabled={this.context.isExtension}>{this.cacheTitle}</ButtonLink>}
				<ButtonLink danger onPress={onRemove}>{this.removeTitle}</ButtonLink>
			</ScrollForm>
		)
	}
}