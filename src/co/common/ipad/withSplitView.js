import React from 'react'
import { View } from 'react-native'
import { windowWidth } from 'modules/native'

const style = { flex:1 }

export default (Component) => class WithSplitViewWrap extends React.Component {
    narrow = false

    static options = Component.options

    onLayout = async({nativeEvent})=>{
        this.narrow = nativeEvent.layout.width == await windowWidth()
    }
    
    isNarrow = ()=>{
        return this.narrow
    }

    render() {
        const { children, ...etc } = this.props

        return (
            <View style={style} {...etc} onLayout={this.onLayout}>
                <Component {...etc} isNarrow={this.isNarrow} />
            </View>
        )
    }
}