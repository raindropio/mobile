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
					var format = 'MMMM'
					if (value.getYear()!=todayDate.getYear())
						format+=' YYYY'

					return _.capitalize(dateFormat(value, format))
				}
			}
		}
	),
	
	getLabel = ({type, value})=>{
		switch(type) {
			case 'date':
				return <SectionText key='t'>{formatDate(value)}</SectionText>

			default:
				return <SectionText key='t'>{value}</SectionText>
		}
	}

export default ({
	type, value
})=>(<SectionView>
{getLabel({type, value})}
</SectionView>)