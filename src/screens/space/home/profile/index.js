import React from 'react'
import { connect } from 'react-redux'
import { user } from 'data/selectors/user'

import { Wrap, Text } from './style'
import Avatar from 'co/user/avatar'

function UserProfile({ user }) {
    return (
        <Wrap>
            <Avatar
                email_MD5={user.email_MD5}
                width={26} />

            <Text>
                {user.fullName}
            </Text>
        </Wrap>
    )
}

export default connect(
	(state)=>({
        user: user(state)
	})
)(UserProfile)