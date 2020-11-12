import t from 't'
import React from 'react'
import { ButtonLink } from 'co/common/button'

class EditGroupAdd extends React.PureComponent {
	onAddPress = ()=>
		this.props.navigation.replace('add')

	render() {
		return (
			<ButtonLink onPress={this.onAddPress}>
                {t.s('create')} {t.s('newString')} {t.s('group').toLowerCase()}
            </ButtonLink>
		)
	}
}

export default EditGroupAdd