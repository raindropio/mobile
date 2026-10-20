import t from 't'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { user as getUser } from 'data/selectors/user'
import { ProgressView } from 'co/native'
import { fileSize } from 'modules/format/number'
import { ItemTitle, ItemSubinfo, styles } from 'co/style/item'
import Button from 'co/button'
import { Wrap, Body, LeadImage } from './style'

function SettingsFiles({ navigation }) {
    const user = useSelector(getUser)

    const onProPress = ()=>
        navigation.navigate('settings/pro')

    return (
        <Wrap>
            <Body>
                <LeadImage />
                <ProgressView progress={(1/user.files.size*user.files.used)||0} style={{width:'100%'}} />

                <ItemTitle />
                <ItemTitle bold>{`${fileSize(user.files.used)} ${t.format('ofMaxSize', fileSize(user.files.size))}`}</ItemTitle>
                <View style={styles.footer}>
                    <ItemSubinfo style={{textAlign: 'center'}}>{t.s('usedForUploads')}</ItemSubinfo>
                </View>
            </Body>

            {!user.pro && (
                <Body>
                    <ItemTitle />
                    <Button 
                        onPress={onProPress}
                        title={t.s('upgradeToPro')} />
                </Body>
            )}
        </Wrap>
    )
}

SettingsFiles.options = {
    title: t.s('usedSpace')
}

export default SettingsFiles