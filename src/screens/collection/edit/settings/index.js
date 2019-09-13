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
import { makeSort, makeSorts } from 'data/selectors/bookmarks'

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
    
    componentDidMount() {
        this.sort.init()
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
        options: [],
        lang: {
            '+lastUpdate':  {label: t.s('byDate')+' ↑'},
            '-lastUpdate':  {label: t.s('byDate')+' ↓'},
            'title':        {label: t.s('byName')+' (A-Z)'},
            '-title':       {label: t.s('byName')+' (Z-A)'},
            'domain':       {label: t.s('sites')+' (A-Z)'},
            '-domain':      {label: t.s('sites')+' (Z-A)'},
            'sort':         {label: t.s('manual'), subLabel:`Drag'n'drop ${t.s('soon').toLowerCase()}`}
        },

        init: ()=>{
            this.sort.options = Object.keys(this.props.sorts)
                .filter(id=>this.props.sorts[id] && this.props.sorts[id].enabled)
                .map(id=>({
                    id,
                    ...this.props.sorts[id],
                    ...(this.sort.lang[id] ? this.sort.lang[id] : {}),
                }))
        },

        getSelectedLabel: ()=>{
            const selected = this.sort.lang[this.props.sort]
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
    const getSorts = makeSorts()

	const mapStateToProps = (state, { _id })=>{
		return {
            view:   collection(state, _id).view,
            sort:   getSort(state, _id),
            sorts:  getSorts(state, _id)
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