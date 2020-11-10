import {Dimensions} from 'react-native'

export const getListViewParams = (itemHeight)=>{
	const screenSize = Math.max(Dimensions.get('window').width, Dimensions.get('window').height)
	const sectionHeight = 40
	var fillRate = parseInt((screenSize/itemHeight) + (screenSize/sectionHeight/5));

	return {
		initialNumToRender: fillRate,
		windowSize: fillRate*2+1,
		maxToRenderPerBatch: fillRate*2+1,
		updateCellsBatchingPeriod: 150
	}
}