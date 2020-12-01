import t from 't'
import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { user } from 'data/selectors/user'
import { ProgressView } from 'co/native'
import { fileSize } from 'modules/format/number'
import { ItemTitle, ItemSubinfo, styles } from 'co/style/item'
import Button from 'co/button'
import { Wrap, Body, LeadImage } from './style'

class SettingsFiles extends React.Component {
    static options = {
        title: t.s('usedSpace')
    }

    onProPress = ()=>
        this.props.navigation.navigate('pro/status')

    render() {
        const { user } = this.props

        return (
            <Wrap>
                <Body>
                    <LeadImage />
                    <ProgressView progress={(1/user.files.size*user.files.used)||0} style={{width:'100%'}} />

                    <ItemTitle />
                    <ItemTitle bold>{`${fileSize(user.files.used)} ${t.s('of')} ${fileSize(user.files.size)}`}</ItemTitle>
                    <View style={styles.footer}>
                        <ItemSubinfo style={{textAlign: 'center'}}>{t.s('usedThisMonth')} {t.s('forUploads')}</ItemSubinfo>
                    </View>
                </Body>

                {!user.pro && (
                    <Body>
                        <ItemTitle />
                        <Button 
                            onPress={this.onProPress}
                            title={t.s('upgradeToPro')} />
                    </Body>
                )}
            </Wrap>
        )
    }
}

export default connect(
	(state)=>({
		user: user(state)
	})
)(SettingsFiles)