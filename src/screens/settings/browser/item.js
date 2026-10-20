import t from 't'
import { useSelector } from 'react-redux'
import browsersList from 'assets/browsers'
import Goto from 'co/goto'

const getBrowserName = (id)=>{
	for(var i in browsersList)
		if (browsersList[i].id == id)
			return browsersList[i].label

	return ''
}

export default function BrowserItem({ last, navigation }){
    const browser = useSelector(state=>state.local.browser)

    return (
        <Goto
            last={last}
            label={t.s('openInBrowser')}
            subLabel={getBrowserName(browser)}
            icon='safari'
            color='asphalt'
            onPress={()=>navigation.navigate('settings/browser')} />
    )
}