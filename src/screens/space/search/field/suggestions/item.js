import React from 'react'
import { Button, Label, IconWrap } from './item.style'
import { getDetails } from 'co/filters/item'
import Icon from 'co/icon'

export default class SuggestionsItem extends React.Component {
    onPress = ()=>
        this.props.onPress(this.props)

    render() {
        const { _id, query, count, cloud } = this.props
        const { label, icon, color } = query.startsWith('#') ? { label: query } : getDetails(_id)

        return (
            <Button onPress={this.onPress}>
                {!!icon && (
                    <IconWrap>
                        <Icon 
                            name={icon}
                            color={color} />
                    </IconWrap>
                )}

                <Label 
                    cloud={cloud} 
                    count={count}>
                    {label}
                </Label>
            </Button>
        )
    }
}