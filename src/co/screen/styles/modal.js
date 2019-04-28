import cancel from '../buttons/cancel'

export default (original)=>{
    if (original && original.topBar && original.topBar.leftButtons)
        return {}

    return {
        topBar: {
            backButton: {
                visible: false,
            },
            ...cancel
        }
    }
}