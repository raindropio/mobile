import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import t from 't'
import _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import * as collectionsActions from 'data/actions/collections'
import { collection } from 'data/selectors/collections'
import { makeSort } from 'data/selectors/bookmarks'

import { Form, FormSection } from 'co/style/form'
import { SectionText } from 'co/style/section'
import SwitchIcon from 'co/common/switchIcon'
import Goto from 'co/common/goto'
import { ButtonLink } from 'co/common/button'

class CollectionSettings extends React.PureComponent {
	static defaultProps = {
        _id:            undefined,
        showSelectMode: true
	}

    view = {
        options: [
            {key: 'list', source: require('assets/images/viewList.png')},
            {key: 'grid', source: require('assets/images/viewGrid.png')},
            {key: 'simple', source: require('assets/images/viewSimple.png')}
        ],

        onChange: (view)=>
            this.props.actions.collections.oneChangeView(this.props._id, view)
    }
        
    sort = {
        options: [
            {id: 'lastUpdate', label: t.s('byDate')},
            {id: 'title', label: t.s('byName')},
            {id: 'domain', label: t.s('sites')},
            {id: 'rating', label: t.s('byPopularity')}
        ],

        getSelectedLabel: ()=>{
            const selected = this.sort.options.find(({id})=>this.props.sort == id)
            if (selected)
                return selected.label
        },

        onPress: ()=>{
            Navigation.push(this.props, 'misc/picker', {
                options: this.sort.options,
                selected: this.props.sort,
                title: t.s('sortBy'),
                onSelect: (selected)=>{
                    this.props.actions.bookmarks.changeSort(this.props._id, selected)
                }
            })
        }
    }

    onSelectModePress = ()=>{
        this.props.actions.bookmarks.startSelectMode(this.props._id)
        Navigation.close(this.props)
    }

	render() {
		return (
			<React.Fragment>
				<Form>
					<SwitchIcon
						label={t.s('view')}
						items={this.view.options}
						selected={this.props.view}
						onChange={this.view.onChange}
						/>

                    <Goto
                        last
                        label={t.s('sortBy')}
                        subLabel={this.sort.getSelectedLabel()}
                        onPress={this.sort.onPress} />
				</Form>

                {this.props.showSelectMode ? (<ButtonLink onPress={this.onSelectModePress}>{t.s('helpBatch')}...</ButtonLink>) : null}
            </React.Fragment>
		)
	}
}

const makeMapStateToProps = () => {
	const getSort = makeSort()

	const mapStateToProps = (state, { _id })=>{
		return {
            view:   collection(state, _id).view,
			sort:   getSort(state, _id) || 'lastUpdate'
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: {
            bookmarks: 			bindActionCreators(bookmarksActions, dispatch),
            collections:        bindActionCreators(collectionsActions, dispatch)
		}
	})
)(CollectionSettings)