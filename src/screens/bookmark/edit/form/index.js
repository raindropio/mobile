import React from 'react'
import t from 't'
import _ from 'lodash-es'
import { ThemeContext } from 'styled-components'
import { ScrollForm, Form, FormSection } from 'co/style/form'
import { SectionText } from 'co/style/section'
import Goto from 'co/common/goto'
import { ShortDate } from 'modules/format/date'

import Cover from './cover'
import Text from './text'
import Path from './path'
import Tags from './tags'
import Important from './important'
import URL from './url'
import Cache from './cache'

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
			onShare,
			onCopyLink,
			onRemove
		} = this.props

		return (
			<ScrollForm>
				<Form horizontal>
					<Text 
						title={item.title}
						excerpt={item.excerpt}
						focus={focus}
						onChange={onChange} />

					<Cover 
						navigation={navigation}
						_id={item._id}
						domain={item.domain}
						link={item.link}
						cover={item.cover} />
				</Form>

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

							<Cache {...this.props} />
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

				<Form>
					<URL 
						link={item.link}
						onChange={onChange} />
				</Form>

				<FormSection><SectionText>{t.s('addSuccess')} <ShortDate date={item.created} /></SectionText></FormSection>
			</ScrollForm>
		)
	}
}