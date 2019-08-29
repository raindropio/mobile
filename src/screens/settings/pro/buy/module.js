import t from 't'
import _ from 'lodash'
import * as RNIap from 'react-native-iap'
import { Platform } from 'react-native'
import Api from 'data/modules/api'
import Config from 'react-native-config'

export const purchaseUpdatedListener = RNIap.purchaseUpdatedListener
export const purchaseErrorListener = RNIap.purchaseErrorListener

export const init = async (userId)=>{
    if (await RNIap.initConnection() == false)
        throw new Error('This device is not allowed to make purchases. Please check restrictions on device')

    //Old not finished puchases (restore like)
    const purchases = await RNIap.getAvailablePurchases()
    for(const purchase of purchases)
        try{
            await validatePurchase(purchase, userId)
        } catch (e) {
            console.log(e, purchase)
        }
}

export const getProducts = async ()=>{
    const products = {
        'io.raindrop.pro.1month': {
            title: t.s('oneMonth'),
            sort: 0
        },
        'io.raindrop.pro.3month': {
            title: t.s('threeMonth'),
            sort: 1
        },
        'io.raindrop.pro.1year': {
            title: _.capitalize(t.s('year'))+' (-20%)',
            sort: 2
        }
    }
    
    let found = await RNIap.getProducts(Object.keys(products))
    found = found.map(product => ({
        ...product,
        sort: products[product.productId].sort,
        localizedTitle: products[product.productId].title
    }))
    found = _.sortBy(found, ({sort})=>sort)

    return found
}

export const buyProduct = async (productId)=>{
    console.log('aaa111', `Try to buy ${productId}`)

    return await RNIap.requestPurchase(productId, false)
}

export const validatePurchase = async (purchase, userId)=>{
    const endpoint = process.env.NODE_ENV == 'production' ? 'https://billing.raindrop.io/v1' : Config.BILLING_DEV_ENDPOINT
    let res

    switch(Platform.OS) {
        case 'ios':
            res = await Api._post(`${endpoint}/apple/inapp`, {
                userId, 
                receipt: purchase.transactionReceipt
            })

            if (res.result)
                RNIap.finishTransactionIOS(purchase.transactionId)
        break

        case 'android':
            res = await Api._post(`${endpoint}/google/inapp`, {
                userId,
                product_id:     purchase.productId,
                token:          purchase.purchaseToken,
                etc:            purchase.dataAndroid
            })

            if (res.result)
                RNIap.consumePurchaseAndroid(purchase.purchaseToken)
        break
    }

    if (res.result)
        return true
    else
        throw new Error('invalid_receipt')
}