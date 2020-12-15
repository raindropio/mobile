import React, { useMemo, useCallback, useState } from 'react'
import t from 't'
import { useDispatch, useSelector } from 'react-redux'
import { set } from 'data/actions/config'
import Browser from 'modules/browser'

import { Info } from 'co/alert'
import Button, { Buttons } from 'co/button'
import { Form } from 'co/form'

export default function SearchIntro() {
    const dispatch = useDispatch()

    //hide
    const acknowledge = useSelector(state=>state.config.acknowledge)
    const hide = useMemo(()=>acknowledge.includes('full_text_search'), [acknowledge])

    const onHidePress = useCallback(()=>{
        dispatch(set('acknowledge', [...new Set([...acknowledge, 'full_text_search'])]))
    }, [dispatch])

    //help
    const [showBrowser, setShowBrowser] = useState(false)
    const onHelpPress = useCallback(()=>{
        setShowBrowser(true)
    }, [])
    const onHelpClose = useCallback(()=>{
        setShowBrowser(false)
    }, [])

    if (hide)
        return null

    return (
        <Form>
            <Info 
                icon='file-search'
                message={t.s('searchD')}>
                <Buttons>
                    <Button 
                        title={t.s('howToUse')}
                        color='info'
                        bold
                        onPress={onHelpPress} />

                    <Button 
                        title={t.s('close')}
                        color='info'
                        onPress={onHidePress} />
                </Buttons>
            </Info>

            {showBrowser && (
                <Browser 
                    link='http://help.raindrop.io/search'
                    onClose={onHelpClose} />
            )}
        </Form>
    )
}