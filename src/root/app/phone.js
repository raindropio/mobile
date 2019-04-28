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
                        currentTabIndex: (state.lastTabIndex >= 0 && state.lastTabIndex <= 2 ? state.lastTabIndex : 0)
                    }
                },
                children: [
                    { stack: { children: [
                        { component: { name: 'collections/home/phone' } },
                        /*...(state.lastCollection ? [
                            Navigation.getComponent('bookmarks/home', { spaceId: state.lastCollection })
                        ] : [])*/ //buggy on iOS when pop gesture
                    ] } },
                    { stack: { children: [ { component: { name: 'bookmarks/recent' } } ] } },
                    { stack: { children: [ { component: { name: 'bookmarks/search' } } ] } },
                    { stack: { children: [ { component: { name: 'settings/home' } } ] } }
                ]
            }
        }
    }
}