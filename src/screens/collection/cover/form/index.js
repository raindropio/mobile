import React from 'react'
import { Wrap } from './style'
import Items from './items'
import Search from './search'

export default class PickCoverForm extends React.PureComponent {
	render() {
		const { query, load, ...etc } = this.props

		return (
			<Wrap>
				<Search 
					query={query}
					load={load} />

				<Items 
					key={query}
					{...etc} />
			</Wrap>
		)
	}
}