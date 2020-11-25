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
            shadowOpacity: 0
        },
        gestureEnabled: false
    }
    
    state = {
        query: (this.props.route.params||{}).query ? (this.props.route.params.query||'').trim()+' ' : '',
        submitKey: 0,
        spaceId: 0,
    }

    handlers = {
        setQuery: (_query, submit=true)=>{
            let query = _query||''
            let submitKey = this.state.submitKey

            if (!query)
                submitKey = ''
            else if (submit){
                query = query.trim() + ' '
                submitKey = new Date().getTime()
            }

            this.setState({ query, submitKey })
        },

        submit: ()=>
            this.setState({ submitKey: new Date().getTime() }),

        setSpaceId: (spaceId) =>
            this.setState({ spaceId })
    }

	render() {
		return (
            <Wrap>
                {Platform.OS=='ios' && (
                    <Buttons>
                        <Button 
                            title={t.s('cancel')}
                            onPress={this.props.navigation.goBack} />
                    </Buttons>
                )}

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