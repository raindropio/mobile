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
				label={t.s('collapseAllCollections')}
				onPress={this.onPress} />
		)
	}
}

export default connect(
	undefined,
	{ toggle }
)(EditGroupCollapse)