import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { ScrollForm, Form, FormSection } from 'co/style/form'
import { SectionText } from 'co/style/section'

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

                <FormSection><SectionText>{t.s('appearance')}</SectionText></FormSection>
                <Form>
                    <View {...this.props} />
                    <Sort {...this.props} last />
                </Form>
                
                <FormSection><SectionText>{t.s('actions')}</SectionText></FormSection>
                <Form>
                    <SelectMode {...this.props} />
                    <Remove {...this.props} last />
                </Form>
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