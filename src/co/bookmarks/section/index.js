import React from 'react'
import t from 't'
import _ from 'lodash-es'
import { format as dateFormat } from 'modules/format/date'

import {
	SectionView,
	SectionText
} from 'co/style/section'

const
	todayDate = new Date(),
	formatDate = _.memoize(
		value => {
			switch(value){
				case 'today':
				case 'yesterday':
					return t.s(value)

				case 'week':
					return t.s('this_week')

				default:{
					var format = 'LLLL'
					if (value.getYear()!=todayDate.getYear())
						format+=' yyyy'

					return _.capitalize(dateFormat(value, format))
				}
			}
		}
	)

const Label = ({type, value, collection})=>{
	switch(type) {
		case 'date':
			return <SectionText key='t'>{formatDate(value)}</SectionText>

		case 'score':{
			var text = ''

			if (!collection._id)
				text = t.s('everywhere')
			else
				text = value == 'current' ? `${t.s('found')} ${t.s('in')} "${collection.title}"` : `${t.s('found')} ${t.s('in')} ${t.s('other')} ${t.s('collectionsCount')}`

			return <SectionText key='t'>{text}</SectionText>
		}

		default:
			return <SectionText key='t'>{value}</SectionText>
	}
}

export default (props)=>{
	return (<SectionView>
		<Label {...props} />
	</SectionView>)
}