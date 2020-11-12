import {Dimensions} from 'react-native'

export const getListViewParams = (itemHeight)=>{
	const screenSize = Math.max(
		Dimensions.get('screen').width, 
		Dimensions.get('screen').height,
		Dimensions.get('window').width, 
		Dimensions.get('window').height,
	)
	const fillRate = Math.max(1, parseInt(screenSize/itemHeight))

	return {
		initialNumToRender: fillRate,
		windowSize: fillRate,
		maxToRenderPerBatch: 1,
		updateCellsBatchingPeriod: 300
	}
}