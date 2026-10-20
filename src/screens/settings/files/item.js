import t from 't'
import { useSelector } from 'react-redux'
import { user as getUser } from 'data/selectors/user'
import { fileSize } from 'modules/format/number'

import Goto from 'co/goto'

export default function FilesItem({ navigation, last }){
    const user = useSelector(getUser)

    return (
        <Goto
            last={last}
            label={t.s('usedSpace')}
            subLabel={fileSize(user.files.used)}
            icon='file-upload'
            color='asphalt'
            onPress={()=>navigation.navigate('settings/files')} />
    )
}