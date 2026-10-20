import { useState } from 'react'
import { Image, LoadingWrap } from './style'

export default function Cover({ mode='crop', ar='', preloader=false, ...props }) {
	const [loaded, setLoaded] = useState(false)

	const image = (
		<Image 
			key='image'
			{...props}
			mode={mode}
			ar={ar}
			onLoadEnd={preloader ? ()=>setLoaded(true) : undefined} />
	)

	if (preloader && !loaded)
		return [ <LoadingWrap key='loading'/>, image ]
	return image
}