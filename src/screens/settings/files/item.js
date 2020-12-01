import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { user } from 'data/selectors/user'
import { fileSize } from 'modules/format/number'

import Goto from 'co/goto'

function FilesItem({ navigation, last, user }){
    return (
        <Goto
            last={last}
            label={t.s('usedSpace')}
            subLabel={fileSize(user.files.used)}
            icon='file-upload'
            color='asphalt'
            onPress={()=>navigation.navigate('files')} />
    )
}

export default connect(
	(state)=>({
		user: user(state)
	})
)(FilesItem)