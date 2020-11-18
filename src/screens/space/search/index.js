import React from 'react'
import t from 't'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { makeStatus } from 'data/selectors/bookmarks'
import { load } from 'data/actions/bookmarks'

import { Buttons, Button } from 'co/navigation/header'
import { Fade } from 'co/navigation/transition'
import Field from './field'
import Bookmarks from 'co/bookmarks/items'

class SearchScreen extends React.Component {
    static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				spaceId: PropTypes.number
			})
		})
    }
    
	static options = {
        ...Fade,
        gestureDirection: 'vertical',
		...(Platform.OS=='ios' ? {
            headerTitleAlign: 'left',
            headerLeft: null,
			headerTitleContainerStyle: {
                marginLeft: -16,
                marginRight: 60,
                padding: 0
			}
		} : {}),
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
        },
    }
    
    state = {
        query: this.props.query||''
    }

    componentDidMount() {
        this.handlers.onSubmit()
        this.handlers.onSubmitBounced = _.debounce(this.handlers.onSubmit, 350, { maxWait: 1000 })
    }

    handlers = {
        onQueryChange: query=>
            this.setState({ query }, ()=>{
                if (!this.state.value)
                    return this.handlers.onSubmit()
                else
                    return this.events.onSubmitBounced()
            }),

        onSubmit: ()=>{
            if (this.state.query)
                this.props.load(this.props.spaceId, { sort: 'score', search: this.state.query })
        },

        onCollectionPress: spaceId=>
            this.props.navigation.push('browse', { spaceId })
    }

    onMoreTap = ()=>
        this.props.navigation.navigate('collection', { screen: 'menu', params: { _id: this.props.spaceId } })

	render() {
		return (
            <>
                <Buttons>
                    <Button 
                        icon='more' 
                        onPress={this.onMoreTap} />

                    {Platform.OS=='ios' && (
                        <Button 
                            title={t.s('cancel')}
                            onPress={this.props.navigation.goBack} />
                    )}
                </Buttons>

                <Field 
                    {...this.props}
                    {...this.state}
                    {...this.handlers} />

                {this.state.query ? (
                    <Bookmarks 
                        {...this.handlers}
                        key={this.props.spaceId}
                        spaceId={this.props.spaceId} />
                ) : null}
            </>
        )
	}
}

export default connect(
	() => {
        const getStatus = makeStatus()
    
        return (state, { route: { params={} } })=>{
            const spaceId = (parseInt(params.spaceId)||0)+'s'

            return {
                ...params,
                spaceId,
                status: getStatus(state, spaceId)
            }
        }
    },
	{ load }
)(SearchScreen)