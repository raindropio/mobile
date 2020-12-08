import { Platform } from 'react-native'
import { isTablet } from 'modules/native'

/*
    On iPad use drawer style navigation
    and fallback to default stack navigator
    Android doesnt work
*/
export default (isTablet && Platform.OS=='ios') ? 
    require('./tablet').default : 
    require('./phone').default