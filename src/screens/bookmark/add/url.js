import t from 't'
import { useState, useEffect } from 'react'
import { Clipboard } from 'react-native'
import { InputURL } from 'co/form'
import Button, { Buttons } from 'co/button'
import { Form } from 'co/form'

const validateURL = (link='')=>/\D+:\/\//.test(link)

export default function BookmarkAddURL({ navigation, collectionId }) {
	const [link, setLink] = useState('')
	const [selection, setSelection] = useState(undefined)

	useEffect(()=>{
		Clipboard.getString().then(clip=>{
			if (validateURL(clip)){
				setLink(clip)
				setSelection(clip.length ? { start: 0, end: clip.length } : undefined)
			}
		})
	}, [])

	const onChangeLink = (link)=>{
		setLink(link)
		setSelection(undefined)
	}

	const onSubmitLink = ()=>{
		let url = link.trim()

		if (!validateURL(url))
			url = 'http://'+url

		navigation.replace('create', {
			type: 'url',
			values: [{ link: url, collectionId }],
		})
	}

	const disabled = !link.trim()

	return (
		<>
			<Form>
				<InputURL
					autoFocus
					last
					returnKeyType='send'
					selection={selection}
					placeholder={t.s('enterUrl')}
					value={link}
					onChangeText={onChangeLink}
					onSubmitEditing={onSubmitLink} />
			</Form>

			<Buttons vertical>
				<Button 
					background='color.accent'
					disabled={disabled}
					title={t.s('addBookmark')}
					bold
					onPress={onSubmitLink} />
			</Buttons>
		</>
	)
}