import React from 'react'
import t from 't'
import {
	ActivityIndicator
} from 'react-native'

import {
	FooterView,
	FooterText
} from './style'

import {
	ButtonLink
} from 'co/common/button'

const SpaceFooter = ({status, count, onNextPage})=>{
	var content;

	switch(status){
		case 'error': content = <ButtonLink onPress={onNextPage}>{t.s('tryAgain')}</ButtonLink>; break;
		case 'noMore': if (count) content = <FooterText>{count} {t.s('bookmarks')}</FooterText>; break;
		default:
			if (count>0 || status=='loading')
				content = <ActivityIndicator />;
		break;
	}

	return (
		<FooterView line={count?true:false}>
			{content}
		</FooterView>
	)
}

export default SpaceFooter