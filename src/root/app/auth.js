export default async()=>{
    return {
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'auth/home'
                        }
                    }
                ]
            }
        }
    }
}