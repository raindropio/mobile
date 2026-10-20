import { View } from 'react-native'

export default function SortableItem({ item, setMeasures, itemKeyExtractor, children }) {
    const onLayout = ({ nativeEvent: { layout: { x, y, width, height } } })=>{
        const items = Array.isArray(item) ? item : [item]
        const columnWidth = (width / items.length)
        
        for(const column in items) {
            const id = itemKeyExtractor(items[column])

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

    return (
        <View onLayout={onLayout}>
            {children}
        </View>
    )
}