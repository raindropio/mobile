import Navigation from 'modules/navigation'

export var detailScreenId = ''
export const masterMaxWidth = 400

export default (state)=>{
    detailScreenId = new Date().getTime().toString()

    return {
        root: {
            splitView: {
                master: {
                    stack: {
                        children: [
                            Navigation.getComponent('collections/home/ipad')
                        ]
                    }
                },
                detail: {
                    stack: {
                        id: 'detail-stack',
                        children: [
                            Navigation.getComponent('bookmarks/browse', { spaceId: state.last_collection }, {}, detailScreenId)
                        ]
                    }
                },
                options: {
                    splitView: {
                        displayMode: 'visible',
                        primaryEdge: 'leading',
                        minWidth: 250,
                        maxWidth: masterMaxWidth,
                    }
                }
            }
        }
    }
}