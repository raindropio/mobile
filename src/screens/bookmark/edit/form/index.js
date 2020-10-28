import React from 'react'
import t from 't'
import _ from 'lodash-es'
import { isExtension } from 'modules/native'
import { ScrollForm, Form, FormSection } from 'co/style/form'
import { ButtonLink } from 'co/common/button'
import { SectionText } from 'co/style/section'

import Cover from './cover'
import Text from './text'
import Path from './path'
import Tags from './tags'
import Important from './important'
import URL from './url'

export default class EditBookmark extends React.Component {
	cacheTitle = t.s('open') + ' ' + t.s('permanentCopy').toLowerCase()
	removeTitle = _.capitalize(t.s('move'))+' '+t.s('to')+' '+t.s('defaultCollection--99').toLowerCase()

	state = {extension: false}

	async componentDidMount() {
		this.setState({
			extension: await isExtension() ? true : false
		})
	}

	render() {
		const {
			componentId,
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
					componentId={componentId}
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
						componentId={componentId}
						collectionId={item.collectionId}
						onChange={onChange} />
					
					<Tags 
						componentId={componentId}
						_id={item._id}
						tags={item.tags}
						onChange={onChange} />

					<Important 
						last
						componentId={componentId}
						important={item.important}
						onChange={onChange} />
				</Form>

				<Form>
					<URL 
						link={item.link}
						onChange={onChange}
						onEndEditing={onSubmit} />
				</Form>

				{item.cache == 'ready' && <ButtonLink onPress={onOpenCache} disabled={this.state.extension}>{this.cacheTitle}</ButtonLink>}
				<ButtonLink danger onPress={onRemove}>{this.removeTitle}</ButtonLink>
			</ScrollForm>
		)
	}
}