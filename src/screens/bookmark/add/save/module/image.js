import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'

/*
	value: [{
		uri,
		name,
		type
	}]
*/
class SaveImage extends React.PureComponent {
	state = {
		status: 'saving'
	}

	async componentDidMount() {
		const saved = []

		try{
			let i=0
			for (const file of this.props.value){
				saved.push(await this.uploadFile(file))
				i++
				this.setState({progress: parseInt(100/this.props.value.length*i)})
			}

			this.setState({
				status: 'loaded',
				...(saved.length == 1 ? { item: saved[0] } : { items: saved })
			})
		} catch(e) {
			this.setState({
				status: 'error'
			})
		}
	}

	uploadFile = (file)=>new Promise((res,rej)=>{
		this.props.actions.bookmarks.oneUpload({
			collectionId: this.props.collectionId,
			file
		}, res, rej)
	})

	render() {
		const { Screen, ...originalProps } = this.props
		return (
			<Screen 
				{...originalProps}
				{...this.state} />
		)
	}
}

export default connect(
	undefined,
	(dispatch)=>({
		actions: {
			bookmarks: bindActionCreators(bookmarksActions, dispatch)
		}
	})
)(SaveImage)