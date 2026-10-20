import t from 't'
import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Wrap, Form, Input, Button, MagnifierIcon, knownHeight } from './style'
import { ActivityIndicator } from 'co/native'
import Icon from 'co/icon'

export { knownHeight }

export const ClearButton = ({onPress})=>(
	<Button onPress={onPress}>
		<Icon
			name='close'
			variant='fill' />
	</Button>
)

export default function Search({ ref, style, loading, onFocus, onChange, onSubmit, variant='default', value='', autoFocus, onBlur, ...etc }) {
	const innerRef = useRef(null)
	const inputRef = ref || innerRef

	useEffect(()=>{
		const timer = setTimeout(()=>{
			if (autoFocus)
				inputRef.current?.focus()
		}, 200)
		return ()=>clearTimeout(timer)
	}, [autoFocus, inputRef])

	const onBlurRef = useRef(onBlur)
	useEffect(()=>{ onBlurRef.current = onBlur }, [onBlur])
	useEffect(()=>()=>{ onBlurRef.current?.() }, [])

	const onClear = ()=>{
		onChange('')
		inputRef.current?.focus()
	}

	return (
		<Wrap style={style}>
			<Form 
				variant={variant}>
				{variant != 'head' ? (
					<MagnifierIcon 
						name='search'
						size='18' />
				) : null}

				<Input 
					placeholder={t.s('defaultCollection-0')}
					{...etc}
					value={value}
					autoFocus={autoFocus}
					onBlur={onBlur}
					ref={inputRef}
					variant={variant}
					onFocus={onFocus}
					onChangeText={onChange}
					onSubmitEditing={onSubmit} />

				{loading ? (
					<ActivityIndicator />
				) : (value ? 
					<ClearButton onPress={onClear} /> : 
					null
				)}
			</Form>
		</Wrap>
	)
}

Search.propTypes = {
	value:			PropTypes.string,
	loading:		PropTypes.bool,
	variant:		PropTypes.string, //default||head

	onChange:       PropTypes.func,
	onSubmit:       PropTypes.func
}