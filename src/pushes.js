import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { user } from 'data/selectors/user'
import * as pushes from 'modules/pushes'
import Api from 'data/modules/api'

export default function Pushes({ children }) {
    const { _id, pro } = useSelector(user)

    useEffect(()=>{
        if (pro && _id)
            Api._get('user/pusher/auth')
                .then(({ token })=>
                    pushes.setUserId(String(_id), token)
                )
        else
            pushes.clear()
    }, [_id, pro])

    return children
}