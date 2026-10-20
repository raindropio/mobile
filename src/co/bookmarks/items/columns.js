import { useState } from 'react'
import { Dimensions, LayoutAnimation } from 'react-native'
import { Wrap } from './style'

let _cachedWidth = Dimensions.get('window').width

function getColumns(view, width) {
    switch(view) {
        case 'grid':
        case 'masonry':
            return Math.max(2, parseInt(width / 240))
        default:
            return 1
    }
}

export default function SpaceItemsColumns({ view, children }) {
    const [width, setWidth] = useState(_cachedWidth)
    const numColumns = getColumns(view, width)

    const onLayout = ({ nativeEvent: { layout } })=>{
        _cachedWidth = layout.width
        if (getColumns(view, layout.width) != numColumns)
            LayoutAnimation.spring()
        setWidth(layout.width)
    }

    return (
        <Wrap onLayout={onLayout}>
            {children(numColumns)}
        </Wrap>
    )
}