import t from 't'
import { useState, useRef } from 'react'
import { PropTypes } from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { oneCreate } from 'data/actions/collections'

import { Wrap } from './style'
import View from './view'
import SearchBar, { knownHeight } from 'co/form/search'

const snapToOffsets = [0, knownHeight]
const contentOffset = {x:0, y: knownHeight}
const defaultOptions = {}

export default function CollectionsItems(props) {
	const {
		options=defaultOptions,
		searchAutoFocus=false,
		searchPlaceholder=t.s('defaultCollection-0'),
		searchOffset,
		onSearchFocus,
		onSearchBlur,
		onItemPress,
		disableVirtualization,
		SearchComponent
	} = props

	const dispatch = useDispatch()
	const navigation = useNavigation()
	const createNew = useRef(false)

	const [prevOptions, setPrevOptions] = useState(options)
	const [treeOptions, setTreeOptions] = useState(options)

	if (options != prevOptions) {
		setPrevOptions(options)
		setTreeOptions(options)
	}

	//Search
	const onSearchChange = (search)=>{
		setTreeOptions({
			...treeOptions,
			search
		})
	}

	const onPress = item=>{
		if (item._id == -100){
			if (createNew.current)
				return

			createNew.current = true

			dispatch(oneCreate(
				{
					title: treeOptions.search
				},
				(item)=>{
					onItemPress && onItemPress(item)
					createNew.current = false
				},
				()=>{
					createNew.current = false
				}
			))
			return
		}

		onItemPress && onItemPress(item)
	}

	const renderSearch = ()=>(
		<SearchBar
			value={treeOptions.search}
			placeholder={searchPlaceholder}
			autoFocus={searchAutoFocus}
			onChange={onSearchChange}
			onFocus={onSearchFocus}
			onBlur={onSearchBlur} />
	)

	return (
		<Wrap disableVirtualization={disableVirtualization}>
			<View
				{...props}
				navigation={navigation}
				snapToOffsets={searchOffset ? snapToOffsets : undefined}
				contentOffset={searchOffset ? contentOffset : undefined}
				onItemPress={onPress}
				treeProps={{ options: treeOptions }}
				SearchComponent={typeof SearchComponent == 'undefined' ? renderSearch() : SearchComponent} />
		</Wrap>
	)
}

CollectionsItems.propTypes = {
	//customization
	options:			PropTypes.object,
	searchAutoFocus:	PropTypes.bool,
	searchPlaceholder:	PropTypes.string,
	searchOffset:		PropTypes.bool,
	onSearchFocus:		PropTypes.func,
	onSearchBlur:		PropTypes.func,
	//+all in ./view
}