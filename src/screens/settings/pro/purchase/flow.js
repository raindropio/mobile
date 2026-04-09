import { useRef, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { user, subscription } from 'data/selectors/user'
import { useIAP, requestPurchase } from 'react-native-iap'
import Api from 'data/modules/api'

import skus from './skus'
import { ActivityIndicator } from 'co/native'
import { Form } from 'co/form'
import Goto from 'co/goto'

function ProPurchaseFlow({ onSuccess, onFail }) {
    const { _id } = useSelector(user)
    const { plan = '', gateway = {} } = useSelector(subscription)
    const [ subscribing, setSubscribing ] = useState(false)

    //ref to access useIAP methods from callbacks defined before the hook
    const iapRef = useRef(null)

    //v14: useIAP exposes callbacks instead of currentPurchase/currentPurchaseError state
    const onPurchaseSuccess = useCallback(async (purchase)=>{
        try {
            //v14: send receipt as object — backend accepts { productId, purchaseToken }.
            //v12 used to send originalJson string here, but v14 removed transactionReceipt.
            const res = await Api._post('user/subscription/google_restore', {
                receipt: {
                    productId: purchase.productId,
                    purchaseToken: purchase.purchaseToken,
                }
            })

            if (!res.valid)
                throw new Error('invalid_receipt')

            //v14: finishTransaction takes { purchase, isConsumable }
            await iapRef.current?.finishTransaction({
                purchase,
                isConsumable: false,
            })

            setSubscribing(false)
            onSuccess()
        } catch (e) {
            setSubscribing(false)
            onFail(e)
        }
    }, [onSuccess, onFail])

    const onPurchaseError = useCallback((error)=>{
        setSubscribing(false)
        onFail(error?.message || error)
    }, [onFail])

    const onError = useCallback((error)=>{
        onFail(error?.message || error)
    }, [onFail])

    const iap = useIAP({
        onPurchaseSuccess,
        onPurchaseError,
        onError,
    })
    iapRef.current = iap

    const { connected, subscriptions, fetchProducts } = iap

    //load plans
    useEffect(()=>{
        if (connected)
            fetchProducts({ skus, type: 'subs' }).catch(onFail)
    }, [connected, fetchProducts, onFail])

    //subscribe
    const subscribe = useCallback((productId, offerToken)=>{
        setSubscribing(true)

        //v14: requestPurchase takes { type, request: { google|apple } }
        requestPurchase({
            type: 'subs',
            request: {
                google: {
                    skus: [productId],
                    subscriptionOffers: [{ sku: productId, offerToken }],
                    //upgrade/downgrade — token from user's existing subscription
                    purchaseToken: gateway.referenceId,
                    //bind purchase to our user (replaces developerPayloadAndroid from v12.x)
                    obfuscatedAccountId: String(_id),
                },
            },
        }).catch(e=>{
            setSubscribing(false)
            onFail(e)
        })
    }, [_id, gateway, onFail])

    return connected && subscriptions.length > 0 && !subscribing ? (
        <Form>
            {subscriptions.map((sub)=>{
                //Android: subscriptionOfferDetailsAndroid is the reliably populated source per docs.
                //The cross-platform `subscriptionOffers` field is conditional and not guaranteed.
                const offers = sub.subscriptionOfferDetailsAndroid || []
                const label = sub.nameAndroid || sub.title

                return offers.map((offer)=>{
                    const price = offer.pricingPhases?.pricingPhaseList?.[0]?.formattedPrice
                    const offerKey = `${sub.id}-${offer.basePlanId}-${offer.offerId || 'base'}`

                    return plan == sub.id ? (
                        <Goto
                            key={offerKey}
                            label={label}
                            icon='checkbox-circle'
                            variant='fill'
                            color='accent'
                            subLabel={price}
                            action='' />
                    ) : (
                        <Goto
                            key={offerKey}
                            label={label}
                            icon='vip-diamond'
                            subLabel={price}
                            onPress={()=>subscribe(sub.id, offer.offerToken)} />
                    )
                })
            })}
        </Form>
    ) : (
        <ActivityIndicator />
    )
}

export default ProPurchaseFlow