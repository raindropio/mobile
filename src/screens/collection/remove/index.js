import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'

import Header from 'co/navigation/header'
import { ScrollForm } from 'co/style/form'
import Button from 'co/button'
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
                <Header.Buttons left>
                    <Header.Cancel onPress={this.props.navigation.goBack} />
                </Header.Buttons>
                <Header.Buttons />

                <Warning message={t.s('collectionDeleteConfirm')} />

                <Button 
                    danger 
                    onPress={this.onRemovePress}
                    title={t.s('removeCollectionForever')} />
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