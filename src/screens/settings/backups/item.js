import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { user } from 'data/selectors/user'

import Goto from 'co/goto'

function BackupsItem({ navigation, last }){
    return (
        <Goto
            last={last}
            label={t.s('backups')}
            icon='file-cloud'
            color='green'
            onPress={()=>navigation.navigate('backups')} />
    )
}

export default connect(
	(state)=>({
		user: user(state)
	})
)(BackupsItem)