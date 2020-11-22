import React from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import { Buttons, Button } from 'co/navigation/header'
import { Fade } from 'co/navigation/transition'

import { Wrap } from './style'
import Field from './field'
import Tabs from './tabs'
import Results from './results'

export default class SearchScreen extends React.Component {
    static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
                query:      PropTypes.string,
				spaceId:    PropTypes.number
			})
		})
    }
    
	static options = {
        ...Fade,
		...(Platform.OS=='ios' ? {
            headerTitleAlign: 'left',
            headerLeft: null,
			headerTitleContainerStyle: {
                marginLeft: -16,
                padding: 0
			}
		} : {
            headerTitleContainerStyle: {
                padding: 0,
                margin: 0,
                right: 0
            }
        }),
		headerStyle: {
            shadowOpacity: -16
        },
        gestureEnabled: false
    }
    
    state = {
        query: (this.props.route.params||{}).query ? (this.props.route.params.query||'').trim()+' ' : '',
        submitKey: 0,
        spaceId: 0,
    }

    handlers = {
        setQuery: (query, submit=true)=>
            this.setState({
                ...(submit ? {
                    submitKey: new Date().getTime(),
                    query: query ? ((query||'').trim()+' ') : ''
                } : {
                    query
                })
            }),

        setSpaceId: (spaceId) =>
            this.setState({ spaceId })
    }

	render() {
		return (
            <Wrap>
                <Buttons>
                    {Platform.OS=='ios' && (
                        <Button 
                            title={t.s('cancel')}
                            onPress={this.props.navigation.goBack} />
                    )}
                </Buttons>

                <Tabs 
                    {...this.props}
                    {...this.state}
                    {...this.handlers} />

                <Results 
                    {...this.props}
                    {...this.state}
                    {...this.handlers} />

                <Field 
                    {...this.props}
                    {...this.state}
                    {...this.handlers} />
            </Wrap>
        )
	}
}