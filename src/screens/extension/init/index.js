import t from 't'
import React from 'react'
import Navigation from 'modules/navigation'
import { data } from 'modules/extension'

import View from './view'
import URL from './url'
import Image from './image'
import NotSupported from './notSupported'

export default class ExtensionInit extends React.PureComponent {
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

    onNew = ()=>{
        Navigation.replace(this.props, 'collections/picker', {
            title: t.s('newBookmark'),
            subtitle: t.s('selectCollection'),

            hideIds: [-99],
            onSelect: this.onSave,
        })
    }

    onEdit = (_id)=>{
        Navigation.replace(this.props, 'bookmark/edit', {
            _id
        })
    }

    onSave = (collectionId)=>{
        Navigation.replace(this.props, 'extension/save', {
            ...this.state,
            collectionId,
        })

        return true //important
    }

    onClose = ()=>{
        Navigation.close(this.props)
    }

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

            case 'image':
                return (
                    <Image 
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