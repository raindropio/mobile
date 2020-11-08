import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { ScrollForm, Form } from 'co/style/form'

import Edit from '../edit/view'
import View from './view'
import Sort from './sort'
import SelectMode from './selectMode'
import Remove from './remove'

class CollectionMenu extends React.PureComponent {
	static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
                _id:    PropTypes.number
            })
        })
    }

	static options = {
		title: t.s('collection')
    }
    
    onEditPress = ()=>
        this.props.navigation.navigate('edit', { _id: this.props.collection._id })

	render() {
        const { collection } = this.props

		return (
            <ScrollForm>
                {collection._id > 0 && (
                    <Edit 
                        _id={collection._id}
                        navigation={this.props.navigation} />
                )}

                <Form>
                    <View {...this.props} />
                    <Sort {...this.props} />
                    <SelectMode {...this.props} last />
                </Form>

                <Remove {...this.props} />
            </ScrollForm>
        )
	}
}

export default connect(
	()=>{
        const getCollection = makeCollection()

        return (state, { route: { params={} } })=>({
            collection: getCollection(state, params._id)
        })
    }
)(CollectionMenu)