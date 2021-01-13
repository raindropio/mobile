import React, { useMemo } from 'react'
import t from 't'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Height from 'co/navigation/height'
import { Form } from 'co/form'
import Goto from 'co/goto'
import size from 'modules/appearance/size'
import { Window } from './style'

const headerHeight = 60

function CustomSheet({ route: { params={} }, navigation }) {
    const { options=[] } = params

    const insets = useSafeAreaInsets()

    const windowHeight = useMemo(()=>
        (options.length + 1) * size.height.item + //items itself
        headerHeight + //header height
        size.padding.medium*3 + //padding top/bottom
        insets.bottom //for bottom notch
    , [options.length])

    return (
        <Window>
            <Height height={windowHeight} />

            <Form>
                {options.map(({ text, onPress }, index)=>(
                    <Goto 
                        last={index == options.length - 1}
                        key={text}
                        label={text}
                        onPress={()=>{onPress(); navigation.goBack();}} />
                ))}
            </Form>
                
            <Form>
                <Goto 
                    last
                    label={t.s('cancel')}
                    action='close'
                    onPress={navigation.goBack} />
            </Form>
        </Window>
    )
}

CustomSheet.options = ({ route: { params={} } })=>({
    title: params.title,
    headerLeft: null,
    headerRight: null,
    headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        height: headerHeight
    }
})

export default CustomSheet