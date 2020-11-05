import React from 'react'
import t from 't'
import { connect } from 'react-redux'

import { Image } from 'react-native'
import Goto from 'co/common/goto'
import { getBrowserName } from 'modules/browser'

function BrowserItem({ last, navigation, browser }){
    return (
        <Goto
            last={last}
            label={t.s('openInBrowser')}
            subLabel={getBrowserName(browser)}
            iconComponent={<Image source={require('assets/images/browser.png')} />}
            onPress={()=>navigation.navigate('browser')} />
    )
}

export default connect(
	(state)=>({
		browser: state.local.browser
	})
)(BrowserItem)