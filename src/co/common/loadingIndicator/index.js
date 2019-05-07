import React from 'react'
import { ActivityIndicator } from 'react-native'
import { themed } from 'co/style/colors'

const style = {margin: 4}
export default ()=>(
    <ActivityIndicator color={themed.tintColor()} style={style} />
)