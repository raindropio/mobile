import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { user } from 'data/selectors/user'

import { Image } from 'react-native'
import Goto from 'co/common/goto'

function BackupsItem({ navigation, last }){
    return (
        <Goto
            last={last}
            label={t.s('backups')}
            iconComponent={<Image source={require('assets/images/backup.png')} />}
            onPress={()=>navigation.navigate('backups')} />
    )
}

export default connect(
	(state)=>({
		user: user(state)
	})
)(BackupsItem)