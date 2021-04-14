import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { user } from 'data/selectors/user'

import Avatar from 'co/user/avatar'
import Goto from 'co/goto'

function ProfileItem({ last, navigation, user }){
    return (
        <Goto
            last={last}
            label={user.name}
            subLabel={t.s('editMin')}
            icon={<Avatar {...user} />}
            onPress={()=>navigation.navigate('profile')} />
    )
}

export default connect(
	(state)=>({
		user: user(state)
	})
)(ProfileItem)