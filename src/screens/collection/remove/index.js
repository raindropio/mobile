import t from 't'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { oneRemove, oneEmptyTrash } from 'data/actions/collections'

import Header from 'co/navigation/header'
import { ScrollForm, Form } from 'co/form'
import Button, { Buttons } from 'co/button'
import Warning from 'co/alert/warning'

function CollectionsRemoveScreen({ route: { params={} }, navigation }) {
    const dispatch = useDispatch()

    useEffect(()=>{
        if (params._id == -99) {
            dispatch(oneEmptyTrash())
            navigation.goBack()
        }
    }, [dispatch, navigation, params._id])

    const onRemovePress = ()=>
        dispatch(oneRemove(params._id, navigation.goBack))

    if (params._id <= 0)
        return null
        
    return (
        <ScrollForm centerContent={true}>
            <Header.Buttons a left />
            <Header.Buttons a />

            <Form>
                <Warning message={t.s('collectionDeleteConfirm')} />
            </Form>

            <Buttons vertical>
                <Button 
                    bold
                    background='color.danger' 
                    onPress={onRemovePress}
                    title={t.s('removeCollection')} />
            </Buttons>

            <Buttons vertical>
                <Button 
                    title={t.s('cancel')}
                    color='text.secondary'
                    onPress={navigation.goBack} />
            </Buttons>
        </ScrollForm>
    )
}

CollectionsRemoveScreen.propTypes = {
    route:  PropTypes.shape({
        params: PropTypes.shape({
            _id:    PropTypes.number
        })
    })
}

CollectionsRemoveScreen.options = {
    title: t.s('removeCollection')
}

export default CollectionsRemoveScreen