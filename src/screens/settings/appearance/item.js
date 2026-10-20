import t from 't'
import { useSelector } from 'react-redux'

import themes from './themes'
import Goto from 'co/goto'

export default function AppearanceItem({ last, navigation }){
    const appearance = useSelector(state=>state.local.appearance)
    const active = themes.find(({id})=>id==appearance)

    return (
        <Goto
            last={last}
            label={t.s('interfaceStyle')}
            subLabel={active ? active.label : ''}
            icon='palette'
            color='asphalt'
            onPress={()=>navigation.navigate('settings/appearance')} />
    )
}