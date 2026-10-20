import t from 't'
import { mediumFade } from 'co/style/animation'
import { useSelector, useDispatch } from 'react-redux'
import { hideSection } from 'data/actions/config'
import { Touchable } from 'react-native-gesture-handler'

import { SectionView, SectionText } from 'co/style/section'
import Button from 'co/button'

export default function TagsItemsHeader({ hidden: hiddenProp }) {
    const dispatch = useDispatch()
    const tagsHide = useSelector(state=>state.config.tags_hide)
    const hidden = typeof hiddenProp != 'undefined' ? hiddenProp : tagsHide

    const onSectionPress = ()=>{
        mediumFade()
        dispatch(hideSection('tags', !hidden))
    }

    return (
        <Touchable androidRipple={{}} onPress={onSectionPress}>
            <SectionView>
                <SectionText>{t.s('tags')}</SectionText>

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