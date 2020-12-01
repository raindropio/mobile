import React from 'react'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import Header from 'co/navigation/header'
import { Fade } from 'co/navigation/transition'

import { Wrap } from './style'
import SpaceContext from '../context'
import Field from './field'
import Tabs from './tabs'
import Results from './results'

export default class SearchScreen extends React.Component {
    static contextType = SpaceContext

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

    componentDidMount () {
        this._focus = this.props.navigation.addListener('focus', this.onScreenFocus)
    }

    componentWillUnmount() {
		this._focus && this._focus()
	}

    componentDidUpdate(prevProps) {
        if (prevProps.route.params == this.props.route.params)
            return

        if ((prevProps.route.params||{}).query == (this.props.route.params||{}).query)  
            return

        this.handlers.setQuery(this.props.route.params.query)
    }

    onScreenFocus = ()=>{
		this.context.setSpaceId(null)
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
                    <Header.Buttons>
                        <Header.Cancel onPress={this.props.navigation.goBack} />
                    </Header.Buttons>
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