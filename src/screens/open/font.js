import React, { useCallback } from 'react'
import { Platform } from 'react-native'
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { set } from 'data/actions/config'

import { Form, ScrollForm, FormSection, formElementHeight } from 'co/form'
import { SectionText } from 'co/style/section'
import PickFlatList from 'co/list/flat/pick'
import Button from 'co/button'

const fonts = [
    {id: '', label: Platform.select({ios: 'San Francisco', default: 'Roboto'})},
    {id: 'serif', label: 'Serif', labelFontFamily: Platform.select({ios: 'Times', default: 'serif'})},
    {id: 'monospace', label: 'Monospace', labelFontFamily: Platform.select({ios:'Courier New', default: 'monospace'})},
    {id: 'Palatino', label: 'Palatino', labelFontFamily: 'palatino'},
    {id: 'georgia', label: 'Georgia', labelFontFamily: 'georgia'},

    ...Platform.select({
        ios: [
            {id: 'Trebuchet MS', label: 'Trebuchet MS', labelFontFamily: 'trebuchet ms'},
        ],
        default: []
    })
]

function OpenFont() {
    const dispatch = useDispatch()
    const { font_size, font_family } = useSelector(state=>state.config)

    const onChangeFontFamily = useCallback(font_family=>{
        dispatch(set('font_family', font_family))
    }, [dispatch])

    const onFontSizeDecrease = useCallback(()=>{
        dispatch(set('font_size', Math.max(font_size-1, 0)))
    }, [font_size])

    const onFontSizeIncrease = useCallback(()=>{
        dispatch(set('font_size', font_size+1))
    }, [font_size])

    return (
        <ScrollForm>
            <FormSection><SectionText>{t.s('fontSize')}</SectionText></FormSection>
            <Form horizontal>
                <Button 
                    disabled={font_size<=1} 
                    icon='subtract' 
                    style={{flex:1, height: formElementHeight}}
                    onPress={onFontSizeDecrease} />
                <Button 
                    disabled={font_size>=5} 
                    icon='add' 
                    style={{flex:1, height: formElementHeight}}
                    onPress={onFontSizeIncrease} />
            </Form>

            <FormSection><SectionText>{t.s('fontFamily')}</SectionText></FormSection>
            <Form>
                <PickFlatList
                    options={fonts}
                    selected={font_family}
                    onSelect={onChangeFontFamily} />
            </Form>
        </ScrollForm>
    )
}

OpenFont.options = {
    title: t.s('appearance'),
    headerStyle: {
        backgroundColor: 'transparent',
		elevation: 0,
		shadowOpacity: 0
	}
}

export default OpenFont