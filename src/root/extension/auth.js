import { stackId } from 'modules/extension'

export default async()=>{
    return {
        root: {
            stack: {
                id: stackId,
                
                children: [
                    {
                        component: {
                            name: 'extension/auth'
                        }
                    }
                ]
            }
        }
    }
}