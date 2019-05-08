import t from 't'
import React from 'react'
import { connect } from 'react-redux'
import { user } from 'data/selectors/user'
import ProgressBar from 'co/common/progressBar'
import { size } from 'modules/format/number'
import { ItemTitle, ItemSubinfo, ItemFooterView } from 'co/style/item'
import { Wrap, Body, LeadImage } from './style'

class SettingsFiles extends React.Component {
    static options(){
        return {
            topBar: {
                title: {
                    text: t.s('usedSpace')
                }
            }
        }
    }

    render() {
        const { user } = this.props

        return (
            <Wrap>
                <Body>
                    <LeadImage />
                    <ProgressBar progress={(1/user.files.size*user.files.used)||0} style={{width:'100%'}} />

                    <ItemTitle />
                    <ItemTitle bold>{`${size(user.files.used)} ${t.s('of')} ${size(user.files.size)}`}</ItemTitle>
                    <ItemFooterView>
                        <ItemSubinfo style={{textAlign: 'center'}}>{t.s('usedThisMonth')} {t.s('forImageUploads')}</ItemSubinfo>
                    </ItemFooterView>
                </Body>
            </Wrap>
        )
    }
}

export default connect(
	(state)=>({
		user: user(state)
	})
)(SettingsFiles)