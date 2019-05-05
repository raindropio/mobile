import t from 't'
import _ from 'lodash'
import * as RNIap from 'react-native-iap'
import { Platform } from 'react-native'
import Api from 'data/modules/api'

export const getProducts = async ()=>{
    if (await RNIap.initConnection() == false)
        throw new Error('This device is not allowed to make purchases. Please check restrictions on device')

    await RNIap.consumeAllItems() //android fix
    await RNIap.clearProducts() //ios fix

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

    if (Platform.OS == 'ios'){
        await RNIap.clearTransaction()
        return await RNIap.buyProductWithoutFinishTransaction(productId)
    }
    else
        return await RNIap.buyProduct(productId)
}

export const validatePurchase = async (purchase)=>{
    console.log('aaa111', 'validate purchase', purchase)

    let res

    switch(Platform.OS) {
        case 'ios':
            res = await Api._post(`/wallet/ios/result`, {productId: purchase.productId, receipt: purchase.transactionReceipt})
            RNIap.finishTransaction()
        break

        case 'android':
            res = await Api._post(`/wallet/android/result`, {
                productId: purchase.productId,
                token: purchase.purchaseToken,
                transactionId: purchase.transactionId
            })
            try{await RNIap.consumePurchase(purchase.purchaseToken)}catch(e){}
        break
    }

    if (res.result)
        return true
    else
        throw new Error('invalid_receipt')
}

export const subscribeToPurchase = (callback)=>
    RNIap.addAdditionalSuccessPurchaseListenerIOS(callback)

export const closeConnection = async()=>{
    await RNIap.endConnection()
}