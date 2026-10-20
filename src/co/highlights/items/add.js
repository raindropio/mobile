import { Linking, View } from 'react-native'
import t from 't'
import { links } from 'config'

import { Form } from 'co/form'
import Goto from 'co/goto'

export default function HighlightsItemsAdd({ _id }) {
    return (
        <View style={{width: '100%'}}>
            <Form>
                <Goto
                    last
                    icon='question'
                    action='arrow-right-up'
                    label={t.s('howToUse')}
                    onPress={()=>Linking.openURL(links.help.highlights.index)} />
            </Form>
        </View>
    )
}