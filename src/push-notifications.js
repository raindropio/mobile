import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { user } from 'data/selectors/user'
import * as fcm from 'modules/fcm'
import Api from 'data/modules/api'

export default function PushNotifications({ children }) {
    const { _id } = useSelector(user)

    useEffect(()=>{
        if (!_id) return

        fcm.getToken()
            .then(token=>
                Api._post('user/connect/fcm_device', { token })
            )
    }, [_id])

    return children
}