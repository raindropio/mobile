import React from 'react'
import t from 't'
import { connect } from 'react-redux'

import themes from './themes'
import Goto from 'co/goto'

function AppearanceItem({ last, navigation, appearance }){
    const label = React.useMemo(()=>{
        const active = themes.find(({id})=>id==appearance)
        if (active)
            return active.label
        return ''
    }, [ appearance ])

    return (
        <Goto
            last={last}
            label={t.s('interfaceStyle')}
            subLabel={label}
            icon='contrast'
            color='asphalt'
            onPress={()=>navigation.navigate('appearance')} />
    )
}

export default connect(
	(state)=>({
		appearance: state.local.appearance
	})
)(AppearanceItem)