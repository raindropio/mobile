import t from 't'
import React from 'react'
import Navigation from 'modules/navigation'
import { ButtonLink } from 'co/common/button'
import { connect } from 'react-redux'

class SystemCollectionTrash extends React.Component {
    onClearTrashPress = ()=>{
        this.props.oneRemove(-99)
        Navigation.close(this.props)
    }
    
    render() {
        if (this.props._id != -99)
            return false;

        return (
            <ButtonLink danger onPress={this.onClearTrashPress}>{t.s('removeIt')} {t.s('all').toLowerCase()} {t.s('in')} {t.s('defaultCollection--99').toLowerCase()}</ButtonLink>
        )
    }
}

export default connect(
	undefined,
	{
        oneRemove: require('data/actions/collections').oneRemove
    }
)(SystemCollectionTrash)