import React from 'react'
import t from 't'

import { appVersion } from 'modules/native'
import { getBrowserName } from 'modules/navigation/browser'
import { getCurrentTheme } from 'co/style/colors'
import { size } from 'modules/format/number'
import { plan } from 'modules/format/subscription'

import { Image, Platform } from 'react-native'
import {
	Form,
	FormSection,
	ScrollForm,
	SubInfoText
} from 'co/style/form'
import { SectionText } from 'co/style/section'
import Goto from 'co/common/goto'
import Avatar from 'co/common/avatar'

export default class Settings extends React.PureComponent {
	icon_pro = <Image source={require('assets/images/pro.png')} />
	icon_howto = <Image source={require('assets/images/howto.png')} />
	icon_support = <Image source={require('assets/images/support.png')} />
	icon_darkTheme = <Image source={require('assets/images/darkTheme.png')} />
	icon_browser = <Image source={require('assets/images/browser.png')} />
	icon_reorder = <Image source={require('assets/images/reorder.png')} />
	icon_upload = <Image source={require('assets/images/upload.png')} />
	icon_import = <Image source={require('assets/images/import.png')} />
	icon_backup = <Image source={require('assets/images/backup.png')} />
	icon_desktop = <Image source={require('assets/images/desktop.png')} />
	icon_vote = <Image source={require('assets/images/vote.png')} />

	render() {
		const {
			theme,
			user,
			subscription,
			browser,
			onPro,
			onTheme,
			onProfile,
			onHowTo,
			onHelp,
			onBrowser,
			onCollectionsSort,
			onFiles,
			onDesktop,
			onImport,
			onBackup,
			onVote
		} = this.props;

		return (
			<ScrollForm>
				<Form first>
					<Goto
						label={t.s('upgradeAccount')}
						subLabel={plan(subscription)}
						iconComponent={this.icon_pro}
						onPress={onPro} />

					<Goto last
						label={user.fullName}
						subLabel={t.s('editMin')}
						iconComponent={<Avatar {...user} />}
						onPress={onProfile} />
				</Form>

				<FormSection><SectionText>{t.s('commonSettings')}</SectionText></FormSection>
				<Form>
					<Goto
						label={t.s('interfaceStyle')}
						subLabel={getCurrentTheme().name}
						iconComponent={this.icon_darkTheme}
						onPress={onTheme} />

					<Goto last
						label={t.s('openInBrowser')}
						subLabel={getBrowserName(browser)}
						iconComponent={this.icon_browser}
						onPress={onBrowser} />
				</Form>

				<FormSection><SectionText>{t.s('basicData')}</SectionText></FormSection>
				<Form>
					<Goto
						label={`${t.s('import')} ${t.s('or')} ${t.s('export').toLowerCase()}`}
						iconComponent={this.icon_import}
						onPress={onImport}
						/>

					<Goto
						label={t.s('cloudBackup')}
						iconComponent={this.icon_backup}
						onPress={onBackup}
						/>

					<Goto
						label={t.s('usedSpace')}
						subLabel={size(user.files.used)}
						iconComponent={this.icon_upload}
						onPress={onFiles}
						/>

					<Goto last
						label={t.s('collectionsSorting')}
						iconComponent={this.icon_reorder}
						onPress={onCollectionsSort} />
				</Form>

				<FormSection><SectionText>Raindrop.io {appVersion} ({Platform.OS})</SectionText></FormSection>
				<Form>
					<Goto
						label={'Web '+t.s('und')+' '+t.s('pro_desktop')}
						iconComponent={this.icon_desktop}
						onPress={onDesktop} />

					<Goto
						label={t.s('pro_nextFeatures')}
						iconComponent={this.icon_vote}
						onPress={onVote} />

					<Goto
						label={t.s('help')}
						iconComponent={this.icon_howto}
						onPress={onHowTo} />

					<Goto last
						label={t.s('support')}
						iconComponent={this.icon_support}
						onPress={onHelp} />
				</Form>
			</ScrollForm>
		)
	}
}