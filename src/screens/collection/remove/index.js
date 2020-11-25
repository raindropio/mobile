import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'

import { Buttons, Cancel } from 'co/navigation/header'
import { ScrollForm } from 'co/style/form'
import { ButtonLink } from 'co/common/button'
import Warning from 'co/common/alert/warning'

class CollectionsRemoveScreen extends React.PureComponent {
    static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
                _id:    PropTypes.number
            })
        })
    }

    static options = {
        title: '',
        headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0
        }
    }

    componentDidMount() {
        if (this.props.route.params._id == -99) {
            this.props.actions.oneEmptyTrash()
            this.props.navigation.goBack()
        }
    }

    onRemovePress = ()=>{
        this.props.actions.oneRemove(this.props.route.params._id, this.props.navigation.goBack)
    }

    render() {
        if (this.props.route.params._id <= 0)
            return null
            
        return (
            <ScrollForm centerContent={true}>
                <Buttons left>
                    <Cancel onPress={this.props.navigation.goBack} />
                </Buttons>
                <Buttons />

                <Warning message={t.s('collectionDeleteConfirm')} />
                <ButtonLink danger onPress={this.onRemovePress}>{t.s('removeCollectionForever')}</ButtonLink>
            </ScrollForm>
        )
    }
}

export default connect(
	()=>({}),
	(dispatch)=>({
		actions: bindActionCreators(collectionsActions, dispatch)
	})
)(CollectionsRemoveScreen)