import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import { connect } from 'react-redux'

import Goto from 'co/goto'

function ExtensionModeItem({ last, navigation, mobile_add_auto_save }){
    const label = mobile_add_auto_save ? t.s('save') + ' ' + t.s('automatically').toLowerCase() : ''

    return (
        <Goto
            last={last}
            label={t.s('shareExtension')}
            subLabel={label}
            icon={Platform.select({ default: 'upload-2', android: 'share' })}
            color='asphalt'
            onPress={()=>navigation.navigate('share_extension')} />
    )
}

export default connect(
	(state)=>({
        mobile_add_auto_save: state.config.mobile_add_auto_save
	})
)(ExtensionModeItem)