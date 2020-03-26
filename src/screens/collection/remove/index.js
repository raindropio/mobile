import t from 't'
import React from 'react'
import Navigation from 'modules/navigation'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'

import { ScrollForm } from 'co/style/form'
import { ButtonLink } from 'co/common/button'
import Warning from 'co/common/alert/warning'

class CollectionsRemoveScreen extends React.PureComponent {
    static propTypes = {
        _id:    PropTypes.number,
        onDone: PropTypes.func
    }

    static options({title}) {
        return {
            topBar: {
                title: {
                    text: title
                },
                largeTitle: {
					visible: true
				}
            }
        }
    }

    componentDidMount() {
        if (this.props._id == -99) {
            this.props.actions.oneEmptyTrash()
            Navigation.close(this.props)
        }
    }

    onRemovePress = ()=>{
        this.props.actions.oneRemove(this.props._id, ()=>{
            Navigation.close(this.props)

            this.props.onDone && this.props.onDone()
        })
    }

    render() {
        if (this.props._id <= 0)
            return null
            
        return (
            <ScrollForm centerContent={true}>
                <Warning message={t.s('collectionDeleteConfirm')} />
                <ButtonLink danger onPress={this.onRemovePress}>{t.s('removeCollectionForever')}</ButtonLink>
            </ScrollForm>
        )
    }
}

export default connect(
	()=>({}),
	(dispatch)=>({
		actions: bindActionCreators(collectionsActions, dispatch)
	})
)(CollectionsRemoveScreen)