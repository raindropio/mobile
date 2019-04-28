import React from 'react'
import t from 't'
import { Wrap, Message } from './style'

export default ({status, collection})=>{
	var content
	switch(status){
		case 'loaded': content = <Message>{t.s('noTags')} {collection._id ? t.s('in') + ' ' + collection.title : ''}</Message>; break
		case 'error': content = <Message>{t.s('server')}</Message>; break
	}
	
	return (
		<Wrap>
			{content}
		</Wrap>
	)
}