import t from 't'
import React from 'react'
import { connect } from 'react-redux'

import Goto from 'co/common/goto'

class EditGroupCollapse extends React.PureComponent {
	render() {
		return (
			<Goto 
                last
                label={`${t.s('collapseAll')} ${t.s('collectionsCount')}`} />
		)
	}
}

export default connect(
	
)(EditGroupCollapse)