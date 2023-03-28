import t from 't'
import { useEffect, useCallback } from 'react'
import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import * as userActions from 'data/actions/user'

import Flow from './flow'
import { Wrap, Periods } from './style'
import { SectionText } from 'co/style/section'
import { SubInfoText, FormSection } from 'co/form'

function ProPurchase({ navigation }) {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(userActions.load())
        dispatch(userActions.loadSubscription())
    }, [])

    const onSuccess = useCallback(()=>{
        dispatch(userActions.load())
        dispatch(userActions.loadSubscription())

        navigation.goBack()

		Alert.alert(t.s('upgradeToPro'), 'OK')
    }, [navigation])

    const onFail = useCallback(error=>{
        console.error(JSON.stringify(error, null, 4))
        navigation.push('overlay', { screen: 'error', params: { error } })
    }, [])

    return (
        <Wrap><Periods>
            <FormSection><SectionText>{t.s('billingCycle')}</SectionText></FormSection>

            <Flow 
                onSuccess={onSuccess}
                onFail={onFail} />

            <SubInfoText>Auto-renewable. You will get access to all features in all supported platforms.</SubInfoText>
            <SubInfoText>All content you made in PRO remains available in free when subscription end.</SubInfoText>
        </Periods></Wrap>
    )
}

ProPurchase.options = {
    title: t.s('upgradeToPro')
}

export default ProPurchase