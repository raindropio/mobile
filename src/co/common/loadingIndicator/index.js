import React from 'react'
import { useContext } from 'react';
import { ThemeContext } from 'styled-components'
import { ActivityIndicator } from 'react-native'

const style = {margin: 4}
export default ()=>{
    const { color } = useContext(ThemeContext);

    return <ActivityIndicator color={color.accent} style={style} />
}