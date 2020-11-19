import React from 'react'
import { Button, Label, IconWrap } from './item.style'
import { getDetails } from 'co/filters/item'
import Icon from 'co/icon'

export default class SuggestionsItem extends React.Component {
    onPress = ()=>
        this.props.onPress(this.props)

    render() {
        const { _id, query } = this.props
        const { label, icon } = query.startsWith('#') ? { label: _id } : getDetails(_id)

        return (
            <Button onPress={this.onPress}>
                {!!icon && (
                    <IconWrap>
                        <Icon 
                            name={icon}
                            color={_id} />
                    </IconWrap>
                )}
                <Label>{label}</Label>
            </Button>
        )
    }
}