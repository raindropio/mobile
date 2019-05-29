import React from 'react'
import FastImage from 'react-native-fast-image'
import { IconImage, DefaultIconImage } from './style'

export default React.memo(({collectionId, src, size})=>{
	if (!src){
		var source;

		switch(collectionId){
			case 0: 	source = require('assets/images/all.png'); break;
			case -1: 	source = require('assets/images/inbox.png'); break;
			case -99: 	source = require('assets/images/trash.png'); break;
			default: 	source = require('assets/images/collection.png'); break;
		}

		return <DefaultIconImage source={source} size={size} />
	}

	return <IconImage source={{
		uri: src,
		priority: FastImage.priority.high
	}} size={size} />
})