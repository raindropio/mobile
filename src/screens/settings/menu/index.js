import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import { appVersion } from 'modules/native'

import { Form, FormSection, ScrollForm } from 'co/form'
import { SectionText } from 'co/style/section'

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

function SettingsMenu(props) {
    return (
        <ScrollForm>
            <Form>
                <Pro {...props} />
                <Profile last {...props} />
            </Form>

            <FormSection><SectionText>{t.s('app')}</SectionText></FormSection>
            <Form>
                <Browser {...props} />
                <Appearance last {...props} />
            </Form>

            <FormSection><SectionText>Data</SectionText></FormSection>
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
    )
}

SettingsMenu.options = {
    title: t.s('settings')
}

export default SettingsMenu