import t from 't'
import { useDispatch } from 'react-redux'
import { logout } from 'data/actions/user'

import Goto from 'co/goto'

export default function LogoutItem({ last }){
    const dispatch = useDispatch()

    return (
        <Goto
            last={last}
            label={t.s('logOut')}
            icon='logout-box'
            onPress={()=>dispatch(logout())} />
    )
}