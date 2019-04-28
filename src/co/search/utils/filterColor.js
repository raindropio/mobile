import t from 't'
import colors from 'co/style/colors'

export default (key, val)=>{
	switch(key){
		case 'important': return colors.red
		case 'type':
			switch(val){
				case 'article': return colors.orange
				case 'image': return colors.green
				case 'video': return colors.purple
			}
			break
		case 'broken': return colors.asphalt
		default: return ''
	}
}