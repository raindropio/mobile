import t from 't'
import { PureComponent } from 'react';
import { connect } from 'react-redux'
import { toggle } from 'data/actions/collections'

import Goto from 'co/goto'

class EditGroupCollapse extends PureComponent {
	onPress = ()=>{
		this.props.toggle()
		this.props.navigation.goBack()
	}
	
	render() {
		return (
			<Goto 
				last
				icon='node-tree'
				label={`${t.s('collapseAll')} ${t.s('collectionsCount')}`}
				onPress={this.onPress} />
		)
	}
}

export default connect(
	undefined,
	{ toggle }
)(EditGroupCollapse)