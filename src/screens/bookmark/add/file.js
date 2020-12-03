import t from 't'
import React from 'react'
import DocumentPicker from 'react-native-document-picker'
import Goto from 'co/goto'

export default class AddFile extends React.PureComponent {
    onPress = async ()=>{
        let files = []
        try{
            files = await DocumentPicker.pickMultiple()
        }catch(e){}

        if (!files.length)
            return

        this.props.navigation.replace('create', {
            values: files.map(({name, uri, type})=>({
                uri,
                name,
                type
            })),
            type: 'file',
            collectionId: this.props.collectionId
        })
    }

    render() {
        return (
            <Goto 
                last={this.props.last}
                icon='file'
                color='document'
                label={t.s('add')+' '+t.s('file').toLowerCase()}
                subLabel={`PDF, Office, ${t.s('videos')}`}
                onPress={this.onPress} />
        )
    }
}