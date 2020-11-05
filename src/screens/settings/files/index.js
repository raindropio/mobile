import t from 't'
import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { user } from 'data/selectors/user'
import ProgressBar from 'co/common/progressBar'
import { size } from 'modules/format/number'
import { ItemTitle, ItemSubinfo, styles } from 'co/style/item'
import { ButtonAction } from 'co/common/button'
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
                    <ProgressBar progress={(1/user.files.size*user.files.used)||0} style={{width:'100%'}} />

                    <ItemTitle />
                    <ItemTitle bold>{`${size(user.files.used)} ${t.s('of')} ${size(user.files.size)}`}</ItemTitle>
                    <View style={styles.footer}>
                        <ItemSubinfo style={{textAlign: 'center'}}>{t.s('usedThisMonth')} {t.s('forUploads')}</ItemSubinfo>
                    </View>
                </Body>

                {!user.pro && (
                    <Body>
                        <ItemTitle />
                        <ButtonAction onPress={this.onProPress}>{t.s('upgradeToPro')}</ButtonAction>
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