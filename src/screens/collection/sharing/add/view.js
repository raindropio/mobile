import { Fragment, useState } from 'react'
import t from 't'
import { Alert } from 'react-native'
import share from 'react-native-share'
import { ScrollForm, Form, FormSection } from 'co/form'
import { SectionText } from 'co/style/section'
import Button, { Buttons } from 'co/button'
import PickFlatList from 'co/list/flat/pick'

export default function CollectionSharingAddView({ _id, sharingSendInvites }) {
	const roles = [
		{ id: 'member', label: t.s('memberAndInvite') },
		{ id: 'viewer', label: t.s('role_viewer') }
	]

	const [role, setRole] = useState('member')
    const [loading, setLoading] = useState(false)

    const onSend = ()=>{
        setLoading(true)

        sharingSendInvites(
			_id,
            role,
            async(url)=>{
				share.open({
					title: t.s('invite'),
					url,
					failOnCancel: false
				})

                setLoading(false)
            },
            (error)=>{
				Alert.alert(t.s('server'), String(error))
                setLoading(false)
            }
        )
    }

	return (
		<ScrollForm>
			{loading ? null : (
				<Fragment>
					<FormSection><SectionText>{t.s('withAccessLevel')}</SectionText></FormSection>
					<Form>
						<PickFlatList 
							options={roles}
							selected={role}
							onSelect={setRole} />
					</Form>
				</Fragment>
			)}
			
			<Buttons vertical>
				<Button 
					background='color.accent'
					bold
					disabled={loading} 
					onPress={onSend}
					title={loading ? t.s('loading')+'...' : t.s('sendInvites')} />
			</Buttons>
		</ScrollForm>
	)
}