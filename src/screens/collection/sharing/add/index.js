import t from 't'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { sharingSendInvites } from 'data/actions/collections'

import PreventClose from 'co/navigation/preventClose'
import View from './view'

function CollectionSharingAddScreen({ route: { params={} }, ...etc }) {
    const dispatch = useDispatch()

    const onSendInvites = (...args)=>
        dispatch(sharingSendInvites(...args))

    return (
        <>
            <PreventClose
                back={false} />

            <View
                {...params}
                {...etc}
                sharingSendInvites={onSendInvites} />
        </>
    )
}

CollectionSharingAddScreen.propTypes = {
    route:  PropTypes.shape({
        params: PropTypes.shape({
            _id:    PropTypes.number
        })
    })
}

CollectionSharingAddScreen.options = {
    title: t.s('invite')
}

export default CollectionSharingAddScreen