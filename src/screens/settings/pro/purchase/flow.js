import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { user, subscription } from 'data/selectors/user'
import { useIAP, requestPurchase, finishTransaction } from 'react-native-iap'
import Api from 'data/modules/api'

import skus from './skus'
import { ActivityIndicator } from 'co/native'
import { Form } from 'co/form'
import Goto from 'co/goto'

function ProPurchaseFlow({ onSuccess, onFail }) {
    const { _id } = useSelector(user)
    const { plan = '', gateway = {} } = useSelector(subscription)
    const [ subscribing, setSubscribing ] = useState(false)

    //v14: useIAP exposes callbacks instead of currentPurchase/currentPurchaseError state
    const onPurchaseSuccess = async purchase=>{
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
            await finishTransaction({
                purchase,
                isConsumable: false,
            })

            setSubscribing(false)
            onSuccess()
        } catch (e) {
            setSubscribing(false)
            onFail(e)
        }
    }

    const onPurchaseError = error=>{
        setSubscribing(false)
        onFail(error?.message || error)
    }

    const onError = error=>{
        onFail(error?.message || error)
    }

    const { connected, subscriptions, fetchProducts } = useIAP({
        onPurchaseSuccess,
        onPurchaseError,
        onError,
    })

    //load plans
    useEffect(()=>{
        if (connected)
            fetchProducts({ skus, type: 'subs' }).catch(onFail)
    }, [connected, fetchProducts, onFail])

    //subscribe
    const subscribe = (productId, offerToken)=>{
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
    }

    return connected && subscriptions.length > 0 && !subscribing ? (
        <Form>
            {subscriptions.map((sub)=>{
                //v16: `subscriptionOfferDetailsAndroid` removed, cross-platform `subscriptionOffers`
                //is now guaranteed to be an array for Android subs (Android fields are *Android-suffixed)
                const offers = sub.subscriptionOffers || []
                const label = sub.nameAndroid || sub.title

                return offers.map((offer)=>{
                    const price = offer.pricingPhasesAndroid?.pricingPhaseList?.[0]?.formattedPrice || offer.displayPrice
                    const offerKey = `${sub.id}-${offer.basePlanIdAndroid}-${offer.id || 'base'}`

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
                            onPress={()=>subscribe(sub.id, offer.offerTokenAndroid)} />
                    )
                })
            })}
        </Form>
    ) : (
        <ActivityIndicator />
    )
}

export default ProPurchaseFlow