import t from 't'
import React from 'react'
import { Image } from 'react-native'

import Toggle from 'co/common/toggle'

export default class BookmarkEditTagsField extends React.PureComponent {
    static defaultProps = {
        last:       false,
        important:  false,
        onChange:   null
    }

    onChange = (important)=>{
        this.props.onChange({important: !this.props.important})
    }

    renderIconComponent = ()=>{
        if (this.props.important)
            return <Image source={require('assets/images/starFilled.png')} />
        else
            return <Image source={require('assets/images/star.png')} />
    }

    render() {
        const { last, important } = this.props

        return (
            <Toggle 
                last={last}
                value={important}
                iconComponent={this.renderIconComponent()}
                onChange={this.onChange}
                label={t.s('favorites')} />
        )
    }
}