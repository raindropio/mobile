import { NativeModules } from 'react-native'
import _ from 'lodash-es'
import t from 't'
import Api from 'data/modules/api'
const { InAppUtils } = NativeModules

const getProductTitle = (id, fallback)=>{
	switch (id) {
		case 'io.raindrop.pro.1month': return t.s('oneMonth')
		case 'io.raindrop.pro.3month': return t.s('threeMonth')
		case 'io.raindrop.pro.1year': return _.capitalize(t.s('year'))+' (-20%)'
	}

	return fallback
}

export const getPeriods = ()=>{
	const products = [
		'io.raindrop.pro.1month',
		'io.raindrop.pro.3month',
		'io.raindrop.pro.1year'
	]

	return new Promise((res, rej)=>{
		InAppUtils.canMakePayments((can) => {
			if (!can)
				return rej('This device is not allowed to make purchases. Please check restrictions on device')

			InAppUtils.loadProducts(products, (error, foundProducts) => {
				if (error){
					return rej(error)
				}

				if (!foundProducts.length)
					return res([])

				const periods = foundProducts.map(({identifier, price, priceString, title})=>({
					id: identifier,
					title: getProductTitle(identifier, title),
					priceNumber: price,
					price: priceString
				}))

				return res(_.sortBy(periods, ({priceNumber})=>priceNumber))
			})
		})
	})
}

export const buyId = (productId)=>{
	return new Promise(
		(res, rej)=>{
			InAppUtils.purchaseProduct(productId, (error, response) => {
				if (error){
					return rej(error)
				}

				if(response && response.productIdentifier){
					res(response.transactionReceipt)
				}else
					return rej('No response from Apple server')
			})
		})
		.then((receipt)=>{
			return Api._post('/wallet/ios/result', {receipt})
		})
		.then(({result, errorString})=>{
			if (!result)
				throw new Error(errorString)
			return result
		})
}