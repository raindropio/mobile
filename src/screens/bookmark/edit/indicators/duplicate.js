import { useContext, useCallback } from 'react';
import t from 't'
import { ThemeContext } from 'styled-components'

import { Form } from 'co/form'
import { Warning } from 'co/alert'
import Button, { Buttons } from 'co/button'

export default function IndicatorDuplicate({ item: { duplicate, link }, navigation }) {
    const { isExtension } = useContext(ThemeContext)

    const onPress = useCallback(()=>{
        navigation.navigate('search', { query: link, autoFocus: false })
    }, [link])

    if (!duplicate || isExtension)
        return null

    return (
        <Form>
            <Warning 
                icon='file-copy'
                message='This bookmark is duplicate'>
                <Button 
                    color='blue'
                    title={t.s('showAll')}
                    onPress={onPress} />
            </Warning>
        </Form>
    )
}