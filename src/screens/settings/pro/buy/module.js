import t from 't'
import _ from 'lodash-es'
import * as RNIap from 'react-native-iap'
import { Platform } from 'react-native'
import Api from 'data/modules/api'

export const purchaseUpdatedListener = RNIap.purchaseUpdatedListener
export const purchaseErrorListener = RNIap.purchaseErrorListener

const products = {
    'promonthly1': {
        title: t.s('monthly'),
        sort: 0
    },
    'proannual1': {
        title: t.s('yearly')+' (-20%)',
        sort: 1
    }
}

export const init = async ()=>{
    if (await RNIap.initConnection() == false)
        throw new Error('This device is not allowed to make purchases. Please check restrictions on device')
}

export const getProducts = async ()=>{
    let found = await RNIap.getSubscriptions(Object.keys(products))
    found = found.map(product => ({
        ...product,
        sort: products[product.productId].sort,
        localizedTitle: products[product.productId].title
    }))
    found = _.sortBy(found, ({sort})=>sort)

    return found
}

export const subscribe = async(productId, { plan })=>{
    //upgrade/downgrade for android; ios supports this by default
    //only do this if user have active subscription
    let oldSub = (plan||'')

    return await RNIap.requestSubscription(productId, false, oldSub, 1)
}

export const finish = async (purchase, userId, withPause=true)=>{
    if (withPause)
        await new Promise(res=>setTimeout(res, 3000))

    //ios need to bind subscription to current userId
    if (Platform.OS=='ios'){
        const res = await Api._post(`user/subscription/apple_restore`, {
            receipt: purchase.transactionReceipt
        })

        if (!res.valid)
            throw new Error('invalid_receipt')
    }

    //android support custom payload with userId
    await RNIap.finishTransaction(purchase, false, JSON.stringify({ userId }))

    return true
}

export const restore = async(userId)=>{
    let restored = false

    //Old not finished puchases (restore like)
    const purchases = await RNIap.getAvailablePurchases()
    for(const purchase of purchases)
        if (products[purchase.productId])
            try{
                await finish(purchase, userId, false)
                restored = true
            } catch (e) {
                console.log(e, purchase)
            }

    return restored
}