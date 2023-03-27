import t from 't'
import { connect } from 'react-redux'
import { logout } from 'data/actions/user'

import Goto from 'co/goto'

function LogoutItem({ last, logout }){
    return (
        <Goto
            last={last}
            label={t.s('logOut')}
            icon='logout-box'
            onPress={logout} />
    )
}

export default connect(
	undefined,
	{ logout }
)(LogoutItem)