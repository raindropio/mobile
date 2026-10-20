import { useContext } from 'react'
import t from 't'
import { ThemeContext } from 'styled-components/native'

import { Form } from 'co/form'
import { Warning } from 'co/alert'
import Button from 'co/button'

export default function IndicatorDuplicate({ item: { duplicate }, navigation }) {
    const { isExtension } = useContext(ThemeContext)

    const onPress = ()=>
        navigation.navigate('space/search', { query: `_id:${duplicate} duplicate:${duplicate} match:OR`, autoFocus: false })

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