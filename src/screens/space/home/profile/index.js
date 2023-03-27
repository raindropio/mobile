import { connect } from 'react-redux'
import { user } from 'data/selectors/user'

import { Wrap, Text } from './style'
import Avatar from 'co/user/avatar'

function UserProfile({ user }) {
    return (
        <Wrap>
            <Avatar
                {...user}
                width={26} />

            <Text>
                {user.name}
            </Text>
        </Wrap>
    )
}

export default connect(
	(state)=>({
        user: user(state)
	})
)(UserProfile)