import React from 'react'
import t from 't'
import _ from 'lodash-es'
import { ThemeContext } from 'styled-components'
import { ScrollForm, Form, FormSection } from 'co/style/form'
import { SectionText } from 'co/style/section'
import Goto from 'co/common/goto'
import Shadow from 'co/list/helpers/shadow'
import { ShortDate } from 'modules/format/date'

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
			spaceId,
			focus,
			onSelect,
			onChange,
			onOpenCache,
			onShare,
			onCopyLink,
			onRemove
		} = this.props

		return (
			<Shadow>{onScroll=><ScrollForm onScroll={onScroll}>
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
					onChange={onChange} />

				<FormSection><SectionText>{t.s('properties')}</SectionText></FormSection>
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

				<FormSection><SectionText>{t.s('actions')}</SectionText></FormSection>
				<Form>
					{!this.context.isExtension && (
						<>
							{!!spaceId && (<Goto 
								label={t.s('select')}
								icon='checkbox-multiple'
								onPress={onSelect} />)}
								
							<Goto 
								label={t.s('share')}
								icon='upload-2'
								onPress={onShare} />

							{item.cache == 'ready' && (
								<Goto 
									icon='file-history'
									onPress={onOpenCache}
									label={this.cacheTitle} />
							)}
						</>
					)}

					<Goto 
						label={t.s('copyLinkToClipboard')}
						icon='link'
						onPress={onCopyLink} />

					<Goto 
						last
						label={this.removeTitle}
						action=''
						icon='delete-bin'
						color='danger'
						onPress={onRemove} />
				</Form>

				<FormSection><SectionText>URL</SectionText></FormSection>
				<Form>
					<URL 
						link={item.link}
						onChange={onChange} />
				</Form>

				<FormSection><SectionText>{t.s('addSuccess')} <ShortDate date={item.created} /></SectionText></FormSection>
			</ScrollForm>}</Shadow>
		)
	}
}