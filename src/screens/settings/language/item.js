import t from 't'
import { useSelector } from 'react-redux'
import languages from 'assets/languages/index.json'

import Goto from 'co/goto'

export default function LanguageItem({ last, navigation }){
    const lang = useSelector(state=>state.config.lang)

    return (
        <Goto
            last={last}
            label={t.s('language')}
            subLabel={languages[lang] || t.s('automatically')}
            icon='global'
            color='asphalt'
            onPress={()=>navigation.navigate('settings/language')} />
    )
}