import React from 'react'
import { data } from 'modules/extension'

import View from './view'
import URL from './url'
import File from './file'
import NotSupported from './notSupported'

export default class ExtensionInit extends React.PureComponent {
    static options = {
        title: '',
        animationEnabled: false,
    }

    state = {
        type: 'loading'
    }
    
    async componentDidMount() {
        try{
            const { type, values } = await data()
            this.setState({ type: type||'', values: values||[] })
        } catch (e) {
            this.setState({
                type: 'error',
                message: e.message.toString()
            })
        }
    }

    onNew = (overrideTitle)=>
        this.props.navigation.replace('location', {
            ...this.state,
            overrideTitle
        })

    onEdit = (_id)=>
        this.props.navigation.replace('bookmark', { _id })

    onClose = ()=>
        this.props.navigation.goBack()

    render() {
        switch(this.state.type) {
            case 'loading':
                return (
                    <View 
                        onClose={this.onClose} />
                )

            case 'url':
                return (
                    <URL 
                        {...this.state}
                        onNew={this.onNew}
                        onEdit={this.onEdit}
                        onClose={this.onClose} />
                )

            case 'file':
                return (
                    <File 
                        {...this.state}
                        onNew={this.onNew}
                        onClose={this.onClose} />
                )

            default:
                return (
                    <NotSupported
                        {...this.state}
                        onClose={this.onClose} />
                )
        }
    }
}