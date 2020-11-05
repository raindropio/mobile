import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { user } from 'data/selectors/user'

import Avatar from 'co/common/avatar'
import Goto from 'co/common/goto'

function ProfileItem({ last, navigation, user }){
    return (
        <Goto
            last={last}
            label={user.fullName}
            subLabel={t.s('editMin')}
            iconComponent={<Avatar {...user} />}
            onPress={()=>navigation.navigate('profile')} />
    )
}

export default connect(
	(state)=>({
		user: user(state)
	})
)(ProfileItem)