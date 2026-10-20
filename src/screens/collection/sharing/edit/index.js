import { useMemo } from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { sharingUpdateUser } from 'data/actions/collections'
import { makeCollection, makeSharingByRole } from 'data/selectors/collections'

import Header from 'co/navigation/header'
import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'

function SharingEdit({ route: { params={} }, navigation }) {
    const dispatch = useDispatch()

    const getCollection = useMemo(()=>makeCollection(), [])
    const getSharingByRole = useMemo(()=>makeSharingByRole(), [])

    const { access } = useSelector(state=>getCollection(state, params._id))
    const users = useSelector(state=>getSharingByRole(state, params._id))

    let user = {}
    let user_role = ''

    for(const role in users){
        const found = users[role].find(({_id}) => _id == params.userId)
        if (found){
            user = found
            user_role = role
            break
        }
    }

    const roles = [
        {id:'member', label: t.s('memberAndInvite')},
        {id:'viewer', label: t.s('role_viewer')},
        {id:'remove', label: t.s('remove')}
    ]

    const onSelect = role=>{
        dispatch(sharingUpdateUser(params._id, params.userId, { role }))
        navigation.goBack()
    }

    return (
        <ScrollForm>
            <Header.Title name={user.name}>
                {user.name}
            </Header.Title>

            <Form>
                <PickFlatList 
                    selected={user_role}
                    options={access.level >= 3 ? roles : roles.slice(1)}
                    onSelect={onSelect} />
            </Form>
        </ScrollForm>
    )
}

SharingEdit.propTypes = {
    route:  PropTypes.shape({
        params: PropTypes.shape({
            _id:    PropTypes.number,
            userId: PropTypes.number
        })
    })
}

export default SharingEdit