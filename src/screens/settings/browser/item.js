import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import browsersList from 'assets/browsers'
import Goto from 'co/goto'

const getBrowserName = (id)=>{
	for(var i in browsersList)
		if (browsersList[i].id == id)
			return browsersList[i].label

	return ''
}

function BrowserItem({ last, navigation, browser }){
    return (
        <Goto
            last={last}
            label={t.s('openInBrowser')}
            subLabel={getBrowserName(browser)}
            icon='safari'
            color='asphalt'
            onPress={()=>navigation.navigate('browser')} />
    )
}

export default connect(
	(state)=>({
		browser: state.local.browser
	})
)(BrowserItem)