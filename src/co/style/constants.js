import { Platform } from 'react-native'

export const
	paddingHorizontal = 16,
	fontSize = {
		topBar: (p)=>(Platform.OS == 'android' ? 21 : 18)*fontSizeInc(p),
		title: (p)=>19*fontSizeInc(p),
		normal: (p)=>18*fontSizeInc(p),
		sub: (p)=>17*fontSizeInc(p),
		micro: (p)=>16*fontSizeInc(p)
	}

const fontSizeInc = (p)=>{
	var inc;
	try{inc=p.theme.fontSize}catch(e){}
	
	switch(inc) {
		case 'small': return 0.9
		case 'big': return 1.1
		default: return 1
	}
}