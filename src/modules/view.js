import {Dimensions} from 'react-native'

export const getListViewParams = (itemHeight)=>{
	const screenSize = Math.max(Dimensions.get('window').width, Dimensions.get('window').height)
	const sectionHeight = 40
	var fillRate = parseInt((screenSize/itemHeight) + (screenSize/sectionHeight/5));

	return {
		initialNumToRender: fillRate*2,
		windowSize: fillRate*3+1,
		maxToRenderPerBatch: fillRate*3+1,
		updateCellsBatchingPeriod: 150
	}
}