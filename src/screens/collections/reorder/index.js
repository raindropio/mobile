import t from 't'
import React from 'react'
import Navigation from 'modules/navigation'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'

import { Form } from 'co/style/form'
import Goto from 'co/common/goto'

class CollectionsSort extends React.PureComponent {
	static options() {
		return {
			style: 'form',
			topBar: {
				title: {
					text: t.s('collectionsSorting')
				}
			}
		}
	}

	onSubmit = (id)=>{
		this.props.actions.collections.reorder(id)
		Navigation.close(this.props)
	}
	
	render() {
		return (
			<Form first>
				<Goto
					action
					label={t.s('byName')}
					onPress={()=>this.onSubmit('title')} />

				<Goto
					action
					last
					label={t.s('byBookmarksCount')}
					onPress={()=>this.onSubmit('count')} />
			</Form>
		)
	}
}

export default connect(
	()=>({}),
	(dispatch)=>({
		actions: {
			collections: 		bindActionCreators(collectionsActions, dispatch)
		}
	})
)(CollectionsSort)