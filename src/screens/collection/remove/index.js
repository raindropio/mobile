import t from 't'
import { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'

import Height from 'co/navigation/height'
import Header from 'co/navigation/header'
import { ScrollForm, Form } from 'co/form'
import Button, { Buttons } from 'co/button'
import Warning from 'co/alert/warning'

class CollectionsRemoveScreen extends PureComponent {
    static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
                _id:    PropTypes.number
            })
        })
    }

    static options = {
        title: '',
        headerShown: false
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
                <Header.Buttons a left />
                <Header.Buttons a />
                <Height height={300} />

                <Form>
                    <Warning message={t.s('collectionDeleteConfirm')} />
                </Form>

                <Buttons vertical>
                    <Button 
                        bold
                        background='color.danger' 
                        onPress={this.onRemovePress}
                        title={t.s('removeCollectionForever')} />
                </Buttons>

                <Buttons vertical>
                    <Button 
                        title={t.s('cancel')}
                        color='text.secondary'
                        onPress={this.props.navigation.goBack} />
                </Buttons>
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