import _ from 'lodash-es'
import t from 't'
import InAppBilling from 'react-native-billing'
import Api from 'data/modules/api'

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

	var clean = []

	return InAppBilling.close()
		.then(()=>InAppBilling.open())
		.then(()=>InAppBilling.getProductDetailsArray(products))
		.then((items)=>{
			clean = items.map(({productId, title, priceValue, priceText})=>({
				id: productId,
				title: getProductTitle(productId, title),
				priceNumber: priceValue,
				price: priceText
			}))
			clean = _.sortBy(clean, ({priceNumber})=>priceNumber)

			return InAppBilling.close()
		})
		.then(()=>clean)
}

export const buyId = (productId)=>{
	return InAppBilling.close()
		.then(()=>InAppBilling.open())
		.then(()=>InAppBilling.purchase(productId))
		.then(({productId, purchaseToken})=>{
			return Api._post('/wallet/android/result', {productId, token: purchaseToken})
		})
		.then(({result, errorString})=>{
			if (!result)
				throw new Error(errorString)

			return result
		})
}