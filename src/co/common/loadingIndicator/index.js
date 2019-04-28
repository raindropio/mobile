import React from 'react'
import { ActivityIndicator } from 'react-native'
import { themed } from 'co/style/colors'

export default ()=>(
    <ActivityIndicator color={themed.tintColor()} />
)