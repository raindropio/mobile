import React from 'react'
import t from 't'
import { connect } from 'react-redux'

import Goto from 'co/goto'

function ExtensionModeItem({ last, navigation, add_auto_save }){
    const label = add_auto_save ? t.s('save') + ' ' + t.s('automatically').toLowerCase() : ''

    return (
        <Goto
            last={last}
            label={t.s('newBookmark')}
            subLabel={label}
            icon='folder-shared'
            color='orange'
            onPress={()=>navigation.navigate('extension_mode')} />
    )
}

export default connect(
	(state)=>({
        add_auto_save: state.config.add_auto_save
	})
)(ExtensionModeItem)