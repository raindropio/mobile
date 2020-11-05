import React from 'react'
import t from 't'
import Settings from 'screens/collection/edit/settings'
import { ScrollForm } from 'co/style/form'
import Trash from './trash'

class SystemCollection extends React.PureComponent {
	static options = {
		title: t.s('collection')
	}

	render() {
		const { route, ...etc } = this.props

		return (
			<ScrollForm>
				<Settings 
					{...etc}
					{...route.params} />

				<Trash
					{...etc}
					{...route.params} />
			</ScrollForm>
		)
	}
}

export default SystemCollection