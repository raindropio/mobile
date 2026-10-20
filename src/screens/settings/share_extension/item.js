import t from 't'
import { useSelector } from 'react-redux'

import Goto from 'co/goto'

export default function ExtensionModeItem({ last, navigation }){
    const mobile_add_auto_save = useSelector(state=>state.config.mobile_add_auto_save)
    const label = mobile_add_auto_save ? t.s('saveAutomatically') : ''

    return (
        <Goto
            last={last}
            label={t.s('shareExtension')}
            subLabel={label}
            icon='share'
            color='asphalt'
            onPress={()=>navigation.navigate('settings/share_extension')} />
    )
}