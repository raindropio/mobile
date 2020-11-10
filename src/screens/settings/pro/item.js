import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { subscription } from 'data/selectors/user'
import { plan } from 'modules/format/subscription'

import Goto from 'co/common/goto'

function ProItem({ last, navigation }){
    return (
        <Goto
            last={last}
            label={t.s('upgradeAccount')}
            subLabel={plan(subscription)}
            icon='vip-diamond'
            color='danger'
            onPress={()=>navigation.navigate('pro')} />
    )
}

export default connect(
	(state)=>({
		subscription: subscription(state)
	})
)(ProItem)