import React from 'react'
import { View } from 'react-native'

const _styles = {
    1: {}
}
function getStyle(numColumns=1) {
    if (_styles[numColumns])
        return _styles[numColumns]

    return _styles[numColumns] = {
        flex: 1 / numColumns,
        flexDirection:'column'
    }
}

export default class SortableItem extends React.Component {
    bindRef = ref=>{
        const { setRefs, id } = this.props

        setRefs(refs=>{
            if (refs.has(id) &&
                refs.get(id) == ref)
                return refs

            const changed = new Map(refs)
            changed.set(id, ref)
            return changed
        })
    }

    componentWillUnmount() {
        const { setRefs, id } = this.props

        setRefs(refs=>{
            if (!refs.has(id))
                return refs

            const changed = new Map(refs)
            changed.delete(id)
            return changed
        })
    }

    render() {
        const { children, numColumns } = this.props

        return (
            <View ref={this.bindRef} style={getStyle(numColumns)}>
                {children}
            </View>
        )
    }
}