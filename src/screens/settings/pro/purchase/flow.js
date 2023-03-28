import { useState, useEffect, useCallback } from 'react'
import { Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { user, subscription } from 'data/selectors/user'
import { withIAPContext, requestSubscription, useIAP } from 'react-native-iap'
import Api from 'data/modules/api'

import skus from './skus'
import { ActivityIndicator } from 'co/native'
import { Form } from 'co/form'
import Goto from 'co/goto'

function ProPurchaseFlow({ onSuccess, onFail }) {
    const { _id } = useSelector(user)
    const { plan = '', gateway = {} } = useSelector(subscription)
    const { connected, subscriptions, getSubscriptions, currentPurchase, currentPurchaseError, initConnectionError, finishTransaction } = useIAP()
    const [ subscribing, setSubscribing ] = useState(false)

    //load plans
    useEffect(()=>{
        if (connected)
            getSubscriptions({ skus }).catch(onFail)
    }, [connected, getSubscriptions, onFail])

    //errors
    useEffect(() => {
        if (currentPurchaseError?.message) {
            setSubscribing(false)
            onFail(currentPurchaseError.message)
        }
    }, [currentPurchaseError, onFail, setSubscribing])

    useEffect(() => {
        if (initConnectionError?.message)
            onFail(initConnectionError.message)
    }, [initConnectionError, onFail])

    //subscribe
    const subscribe = useCallback((productId, offerToken)=>{
        setSubscribing(true)

        requestSubscription({
            sku: productId,
            subscriptionOffers: [{sku: productId, offerToken}],

            //upgrade/downgrade
            purchaseTokenAndroid: gateway.referenceId
        }).then(e=>{
            setSubscribing(false)
        })
        .catch(e=>{
            setSubscribing(false)
            onFail(e)
        })
    }, [gateway, setSubscribing, onFail])

    //apply
    useEffect(() => {
        async function finish() {
            if (!currentPurchase?.productId) return

            console.info(JSON.stringify(currentPurchase, null, 4))

            //bind subscription to current userId
            const res = await Api._post(`user/subscription/${Platform.OS=='ios' ? 'apple' : 'google'}_restore`, {
                receipt: currentPurchase.transactionReceipt
            })

            console.info(JSON.stringify(res, null, 4))

            if (!res.valid)
                throw new Error('invalid_receipt')

            await finishTransaction({
                purchase: currentPurchase,
                isConsumable: false,
                developerPayloadAndroid: JSON.stringify({ userId: _id })
            })

            onSuccess()
        }

        finish()
            .then(()=>(setSubscribing(false)))
            .catch(e=>{
                setSubscribing(false)
                onFail(e)
            })
    }, [_id, setSubscribing, onSuccess, onFail, currentPurchase, finishTransaction])

    return connected && subscriptions.length > 0 && !subscribing ? (
        <Form>
            {subscriptions.map(({ productId, name, subscriptionOfferDetails })=>
                subscriptionOfferDetails.map(({ offerToken, pricingPhases })=>
                    plan == productId ? (
                        <Goto
                            key={productId}
                            label={name}
                            icon='checkbox-circle'
                            variant='fill'
                            color='accent'
                            subLabel={pricingPhases.pricingPhaseList[0].formattedPrice}
                            action='' />
                    ) : (
                        <Goto 
                            key={productId}
                            label={name}
                            icon='vip-diamond'
                            subLabel={pricingPhases.pricingPhaseList[0].formattedPrice}
                            onPress={()=>subscribe(productId, offerToken)} />
                    )
                )
            )}
        </Form>
    ) : (
        <ActivityIndicator />
    )
}

export default withIAPContext(ProPurchaseFlow)