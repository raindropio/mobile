import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { user } from 'data/selectors/user'
import { size } from 'modules/format/number'

import { Image } from 'react-native'
import Goto from 'co/common/goto'

function FilesItem({ navigation, last, user }){
    return (
        <Goto
            last={last}
            label={t.s('usedSpace')}
            subLabel={size(user.files.used)}
            iconComponent={<Image source={require('assets/images/upload.png')} />}
            onPress={()=>navigation.navigate('files')} />
    )
}

export default connect(
	(state)=>({
		user: user(state)
	})
)(FilesItem)