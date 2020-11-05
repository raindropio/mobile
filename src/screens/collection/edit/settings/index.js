import React from 'react'
import t from 't'

import { connect } from 'react-redux'
import { startSelectMode } from 'data/actions/bookmarks'
import { oneChangeView } from 'data/actions/collections'
import { collection } from 'data/selectors/collections'
import { makeSort, makeSorts } from 'data/selectors/bookmarks'

import { Form } from 'co/style/form'
import SwitchIcon from 'co/common/switchIcon'
import Goto from 'co/common/goto'
import { ButtonLink } from 'co/common/button'
import { getLabel } from '../../sort/options'

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
            this.props.oneChangeView(this.props._id, view)
    }

    onSelectModePress = ()=>{
        this.props.startSelectMode(this.props._id)
        this.props.navigation.goBack()
    }

    onSortPress = ()=>
        this.props.navigation.navigate('sort', { _id: this.props._id })

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
                        subLabel={getLabel(this.props.sort)}
                        onPress={this.onSortPress} />
				</Form>

                {this.props.showSelectMode ? (<ButtonLink onPress={this.onSelectModePress}>{t.s('helpBatch')}...</ButtonLink>) : null}
            </React.Fragment>
		)
	}
}

export default connect(
	() => {
        const getSort = makeSort()
        const getSorts = makeSorts()
    
        return (state, { _id })=>{
            return {
                view:   collection(state, _id).view,
                sort:   getSort(state, _id),
                sorts:  getSorts(state, _id)
            }
        }
    },
	{ oneChangeView, startSelectMode }
)(CollectionSettings)