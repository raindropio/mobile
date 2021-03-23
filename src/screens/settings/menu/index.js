import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import { appVersion } from 'modules/native'

import { Form, FormSection, ScrollForm } from 'co/form'
import { SectionText } from 'co/style/section'
import Shadow from 'co/list/helpers/shadow'

import Backups from '../backups/item'
import Better from '../better/item'
import Browser from '../browser/item'
import Desktop from '../desktop/item'
import Files from '../files/item'
import Help from '../help/item'
import Import from '../import/item'
import Logout from '../logout/item'
import Pro from '../pro/item'
import Profile from '../profile/item'
import Support from '../support/item'
import Appearance from '../appearance/item'
import Language from '../language/item'
import ShareExtension from '../share_extension/item'

function SettingsMenu(props) {
    return (
        <Shadow>{onScroll=>
            <ScrollForm onScroll={onScroll}>
                <Form>
                    <Profile {...props} />
                    <Pro last {...props} />
                </Form>

                <FormSection><SectionText>{t.s('commonSettings')}</SectionText></FormSection>
                <Form>
                    <Browser {...props} />
                    <Appearance {...props} />
                    <Language {...props} />
                    <ShareExtension last {...props} />
                </Form>

                <FormSection><SectionText>{t.s('data')}</SectionText></FormSection>
                <Form>
                    <Import {...props} />
                    <Backups {...props} />
                    <Files last {...props} />
                </Form>

                <FormSection><SectionText>Raindrop.io {appVersion} ({Platform.OS})</SectionText></FormSection>
                <Form>
                    <Desktop {...props} />
                    <Better {...props} />
                    <Help {...props} />
                    <Support last {...props} />
                </Form>

                <Form>
                    <Logout last {...props} />
                </Form>
            </ScrollForm>
        }</Shadow>
    )
}

SettingsMenu.options = {
    title: t.s('settings'),
    headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0
    }
}

export default SettingsMenu