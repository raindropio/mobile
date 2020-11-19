import React from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import { Title, Buttons, Button } from 'co/navigation/header'
import { Fade } from 'co/navigation/transition'

import Field from './field'
import Tabs from './tabs'
import Content from './content'

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
		} : {}),
		headerStyle: {
			elevation: 0,
            shadowOpacity: 0
        },
        gestureEnabled: false
    }
    
    state = {
        query: (this.props.route.params||{}).query ? (this.props.route.params.query||'').trim()+' ' : '',
        spaceId: 0,
    }

    handlers = {
        onQueryChange: (query='') =>
            this.setState({ query }),

        onSubmit: ()=>
            this.setState({ query: (this.state.query||'').trim()+' ' }),

        onChangeSpaceId: (spaceId) =>
            this.setState({ spaceId })
    }

	render() {
		return (
            <>
                <Buttons>
                    {Platform.OS=='ios' && (
                        <Button 
                            title={t.s('cancel')}
                            onPress={this.props.navigation.goBack} />
                    )}
                </Buttons>

                <Title a={1}>
                    <Field 
                        {...this.props}
                        {...this.state}
                        {...this.handlers} />
                </Title>

                <Tabs 
                    {...this.props}
                    {...this.state}
                    {...this.handlers} />

                <Content 
                    {...this.props}
                    {...this.state}
                    {...this.handlers} />
            </>
        )
	}
}