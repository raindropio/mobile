import { useState, useCallback } from 'react'
import { Modal, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import t from 't'
import Button from 'co/button'
import { BaseInput } from 'co/form'

//Returns [open, modalElement] — render the modal
//once anywhere in your tree, call open() to show it.
export default function useAddLinkPrompt(onSubmit) {
    const [url, setUrl] = useState(null) //null = closed, '' = open & empty

    const open = useCallback(() => setUrl(''), [])
    const cancel = useCallback(() => setUrl(null), [])
    const submit = useCallback(() => {
        const v = url
        setUrl(null)
        if (v) onSubmit(v)
    }, [url, onSubmit])

    const modal = (
        <Modal
            visible={url !== null}
            transparent
            animationType='fade'
            onRequestClose={cancel}>
            {/* Modal renders into a separate native window — the app-root
                GestureHandlerRootView doesn't reach inside, so gesture-handler-
                based components (like our Button) silently swallow taps without
                this wrapper. */}
            <Backdrop>
                <Box>
                    <Input
                        value={url || ''}
                        onChangeText={setUrl}
                        placeholder='https://'
                        autoFocus
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textContentType='URL'
                        onSubmitEditing={submit}
                        returnKeyType='done'
                    />
                    <Buttons>
                        <Button title={t.s('cancel')} onPress={cancel} />
                        <Button title={t.s('add')} bold onPress={submit} />
                    </Buttons>
                </Box>
            </Backdrop>
        </Modal>
    )

    return [open, modal]
}

const Backdrop = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
    padding: ${({theme})=>theme.padding.large}px;
`

const Box = styled.View`
    width: 100%;
    max-width: 360px;
    background-color: ${({theme})=>theme.background.regular};
    border-radius: ${({theme})=>theme.padding.medium}px;
    padding: ${({theme})=>theme.padding.medium}px;
`

const Input = styled(BaseInput)`
    border-width: ${StyleSheet.hairlineWidth}px;
    border-color: ${({theme})=>theme.color.border};
    border-radius: ${({theme})=>theme.padding.small}px;
    padding-horizontal: ${({theme})=>theme.padding.medium}px;
    padding-vertical: ${({theme})=>theme.padding.small}px;
    margin-bottom: ${({theme})=>theme.padding.medium}px;
`

const Buttons = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    gap: ${({theme})=>theme.padding.small}px;
`