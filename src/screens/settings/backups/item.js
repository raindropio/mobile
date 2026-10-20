import t from 't'

import Goto from 'co/goto'

export default function BackupsItem({ navigation, last }){
    return (
        <Goto
            last={last}
            label={t.s('backups')}
            icon='file-cloud'
            color='green'
            onPress={()=>navigation.navigate('settings/backups')} />
    )
}