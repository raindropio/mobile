import t from 't'
import { connect } from 'react-redux'
import languages from 'assets/languages/index.json'

import Goto from 'co/goto'

function LanguageItem({ last, navigation, lang }){
    return (
        <Goto
            last={last}
            label={t.s('language')}
            subLabel={languages[lang] || t.s('automatically')}
            icon='global'
            color='asphalt'
            onPress={()=>navigation.navigate('language')} />
    )
}

export default connect(
	(state)=>({
		lang: state.config.lang
	})
)(LanguageItem)