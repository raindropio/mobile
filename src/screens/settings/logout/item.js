import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { logout } from 'data/actions/user'

import { Image } from 'react-native'
import Goto from 'co/common/goto'

function LogoutItem({ last, logout }){
    return (
        <Goto
            last={last}
            label={t.s('logOut')}
            iconComponent={<Image source={require('assets/images/support.png')} />}
            onPress={logout} />
    )
}

export default connect(
	undefined,
	{ logout }
)(LogoutItem)