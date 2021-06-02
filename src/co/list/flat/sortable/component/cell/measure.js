import React, { useCallback } from 'react'
import { View } from 'react-native'

export default function SortableCellRenderer({ children, item, parentProps: { context } }) {
    const { enabled, setPosition } = context

    const onLayout = useCallback(({ nativeEvent: { layout: { x, y, width, height } } })=>{
        if (Array.isArray(item)){
            const columns = item.length
            const columnWidth = width / columns

            item.forEach((item, column)=>{
                setPosition(item, {
                    x: column * columnWidth,
                    y,
                    width: columnWidth,
                    height
                })
            })
        }

        setPosition(item, { x, y, width, height })
    }, [setPosition])

    return (
        <View 
            key={enabled}
            onLayout={enabled ? onLayout : undefined}>
            {children}
        </View>
    )
}