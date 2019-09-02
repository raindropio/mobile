import Navigation from 'modules/navigation'
import { store } from 'data'
import { setLastTab } from 'local/actions'

export default async(state, firstRun)=>{
    //Persist tabIndex
    if (firstRun) {
        Navigation.events().registerBottomTabSelectedListener(({ selectedTabIndex }) => {
            store.dispatch(setLastTab(selectedTabIndex))
        })
    }

    return {
        root: {
            bottomTabs: {
                options: {
                    bottomTabs: {
                        currentTabIndex: (state.lastTabIndex >= 0 && state.lastTabIndex <= 1 ? state.lastTabIndex : 0)
                    }
                },
                children: [
                    { stack: { children: [
                        Navigation.getComponent('collections/home/phone'),
                        ...(state.last_collection ? [
                            Navigation.getComponent('bookmarks/browse', { spaceId: state.last_collection })
                        ] : []) //buggy on iOS when pop gesture
                    ] } },
                    { stack: { children: [ Navigation.getComponent('bookmarks/all') ] } },
                    { stack: { children: [ Navigation.getComponent('bookmarks/search', { spaceId: '0s', isRoot: true }) ] } },
                    { stack: { children: [ Navigation.getComponent('settings/home') ] } }
                ]
            }
        }
    }
}