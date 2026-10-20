import t from 't'
import _ from 'lodash-es'
import { mediumFade } from 'co/style/animation'
import { useSelector, useDispatch } from 'react-redux'
import { hideSection } from 'data/actions/config'
import { Touchable } from 'react-native-gesture-handler'

import { SectionView, SectionText } from 'co/style/section'
import Button from 'co/button'

export default function FiltersItemsHeader({ hidden: hiddenProp }) {
    const dispatch = useDispatch()
    const filtersHide = useSelector(state=>state.config.filters_hide)
    const hidden = typeof hiddenProp != 'undefined' ? hiddenProp : filtersHide

    const onSectionPress = ()=>{
        mediumFade()
        dispatch(hideSection('filters', !hidden))
    }

    return (
        <Touchable androidRipple={{}} onPress={onSectionPress}>
            <SectionView>
                <SectionText>{_.capitalize(t.s('fastFilter'))}</SectionText>

                {!!hidden && (
                    <Button 
                        icon='arrow-down-s'
                        color='text.secondary'
                        onPress={onSectionPress} />
                )}
            </SectionView>
        </Touchable>
    )
}