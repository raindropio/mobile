import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userStatus } from 'data/selectors/user'
import { refresh } from 'data/actions/user'

export default function useAuth() {
    const dispatch = useDispatch()

    useEffect(()=>{ dispatch(refresh()) }, [])

    return useSelector(state=>userStatus(state).authorized)
}