import t from 't'
import { useSelector } from 'react-redux'
import { subscription } from 'data/selectors/user'
import { plan } from 'modules/format/subscription'

import Goto from 'co/goto'

export default function ProItem({ last, navigation }){
    const current = useSelector(subscription)

    return (
        <Goto
            last={last}
            label={t.s('goPro')}
            subLabel={plan(current)}
            icon='vip-diamond'
            color='danger'
            onPress={()=>navigation.navigate('settings/pro')} />
    )
}