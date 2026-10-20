import t from 't'
import { useEffect, useMemo } from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { sharingLoad, sharingUnshare } from 'data/actions/collections'
import { makeDraftItem, makeSharingByRole, getSharingCount } from 'data/selectors/collections'

import { Wrap } from './style'
import SimpleSectionList from 'co/list/sections/simple'
import Avatar from 'co/user/avatar'
import Empty from './empty'
import { Fab } from 'co/button'

const getItemAttribute = (user, key)=>{
    switch(key){
        case 'title': return user.name
        case 'description': return user.me ? t.s('you') : user.email
        case 'icon': return <Avatar {...user} />
    }
    return null
}

function CollectionSharingView({ route: { params={} }, navigation }) {
    const dispatch = useDispatch()

    const getDraftItem = useMemo(()=>makeDraftItem(), [])
    const getSharingByRole = useMemo(()=>makeSharingByRole(), [])

    const collection = useSelector(state=>getDraftItem(state, params._id))
    const users = useSelector(state=>getSharingByRole(state, params._id))
    const count = useSelector(state=>getSharingCount(state, params._id))

    useEffect(()=>{
        dispatch(sharingLoad(params._id))
    }, [dispatch, params._id])

    const sections = [{
        id: 'owner',
        title: t.s('role_owner'),
        getItemAttribute
    }, {
        id: 'member',
        title: t.s('role_members'),
        getItemAttribute
    }, {
        id: 'viewer',
        title: t.s('role_viewer'),
        getItemAttribute
    }, {
        id: 'actions',
        title: t.s('sharing'),
        getItemAttribute: (item, key)=>item[key]
    }]

    const actions = [{
        _id: 'unshare',
        title: t.s('unshareCollection'),
        action:'',
        icon: 'delete-bin'
    }]

    const onItemPress = (item, { id })=>{
        switch (id) {
            case 'actions':
                switch (item._id) {
                    case 'unshare':
                        Alert.alert(t.s('unshareCollection')+'?', '', [
                            {text: t.s('cancel'), style: 'cancel'},
                            {text: 'OK', onPress: ()=>{
                                dispatch(sharingUnshare(params._id))
                                navigation.goBack()
                            }}
                        ])
                    break
                }
            break
        
            case 'member':
            case 'viewer':
                navigation.navigate('collection/sharing/edit', {
                    _id: params._id,
                    userId: item._id
                })
            break
        }
    }

    const onAddTap = ()=>
        navigation.navigate('collection/sharing/add', params)

    return (
        <Wrap>
            <SimpleSectionList 
                sections={sections}
                actions={count && collection.author && actions}
                ListEmptyComponent={<Empty _id={params._id} />}
                onItemPress={onItemPress}
                {...users} />

            <Fab icon='user-add' onPress={onAddTap} />
        </Wrap>
    )
}

CollectionSharingView.propTypes = {
    route:  PropTypes.shape({
        params: PropTypes.shape({
            _id:    PropTypes.number
        })
    })
}

CollectionSharingView.options = {
    title: t.s('members')
}

export default CollectionSharingView