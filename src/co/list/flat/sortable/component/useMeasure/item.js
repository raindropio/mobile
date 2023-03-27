import { Component } from 'react';
import { View } from 'react-native'

export default class SortableItem extends Component {
    onLayout = ({ nativeEvent: { layout: { x, y, width, height } } })=>{
        const { setMeasures, itemKeyExtractor } = this.props
        const items = Array.isArray(this.props.item) ? this.props.item : [this.props.item]
        const columnWidth = (width / items.length)
        
        for(const column in items) {
            const item = items[column]
            const id = itemKeyExtractor(item)

            setMeasures(measures=>{
                const changed = new Map(measures)

                changed.set(id, {
                    width: columnWidth, 
                    height,
                    y,
                    x: x + columnWidth * column
                })
                return changed
            })
        }
    }

    render() {
        const { children } = this.props

        return (
            <View onLayout={this.onLayout}>
                {children}
            </View>
        )
    }
}