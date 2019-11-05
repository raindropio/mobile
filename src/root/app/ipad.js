import Navigation from 'modules/navigation'
import { store } from 'data'
import { setLastTab } from 'local/actions'

export var detailScreenId = ''

export default async(state, firstRun)=>{
    //Persist tabIndex
    if (firstRun) {
        Navigation.events().registerBottomTabSelectedListener(({ selectedTabIndex }) => {
            store.dispatch(setLastTab(selectedTabIndex))
        })
    }

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
                        maxWidth: 400,
                    }
                }
            }
        }
    }
}