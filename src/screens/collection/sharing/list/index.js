import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import color from 'co/collections/utils/color'
import addButton from 'co/screen/buttons/add'
import { connect } from 'react-redux'
import { sharingLoad, sharingUpdateUser, sharingRemoveUser, sharingUnshare } from 'data/actions/collections'
import { makeDraftItem, makeSharingByRole, getSharingStatus, getSharingCount } from 'data/selectors/collections'
import View from './view'

class CollectionSharingListScreen extends React.Component {
    static propTypes = {
        _id:    PropTypes.number
    }

    static options({_id}) {
        return {
            tintColor: color(_id),
            
            topBar: {
                title: {
                    text: t.s('members')
                }
            }
        }
    }

    componentDidMount() {
        this.renderButtons()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.collection.author != this.props.collection.author)
            this.renderButtons()
    }

    renderButtons = ()=>{
        Navigation.mergeOptions(this.props, {
            topBar: this.props.collection.author ? addButton : {
                rightButtons: []
            }
        })
    }

    render() {
        return <View {...this.props} />
    }
}

export default connect(
    () => {
        const getDraftItem = makeDraftItem()
        const getSharingByRole = makeSharingByRole()
    
        return (state, { _id })=>({
            collection: getDraftItem(state, _id),
            users: getSharingByRole(state, _id),
            count: getSharingCount(state, _id),
            status: getSharingStatus(state, _id)
        })
    },
	{
        load: sharingLoad,
        updateUser: sharingUpdateUser,
        removeUser: sharingRemoveUser,
        unshare: sharingUnshare
    }
)(CollectionSharingListScreen)