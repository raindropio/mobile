import t from 't'
import { useSelector } from 'react-redux'
import { user as getUser } from 'data/selectors/user'

import Avatar from 'co/user/avatar'
import Goto from 'co/goto'

export default function ProfileItem({ last, navigation }){
    const user = useSelector(getUser)

    return (
        <Goto
            last={last}
            label={user.name}
            subLabel={t.s('editMin')}
            icon={<Avatar {...user} />}
            onPress={()=>navigation.navigate('settings/profile')} />
    )
}