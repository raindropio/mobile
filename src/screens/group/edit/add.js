import t from 't'
import { PureComponent } from 'react';
import Button, { Buttons } from 'co/button'

class EditGroupAdd extends PureComponent {
	onAddPress = ()=>
		this.props.navigation.replace('add')

	render() {
		return (
			<Buttons vertical>
				<Button 
					onPress={this.onAddPress}
					title={`${t.s('create')} ${t.s('newString')} ${t.s('group').toLowerCase()}`} />
			</Buttons>
		)
	}
}

export default EditGroupAdd