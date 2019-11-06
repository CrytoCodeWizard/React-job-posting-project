const initialState = {
    isLoading : false,
    isError : false,
    data : []
}

const job = ( state = initialState, action) => {
    switch(action.type){
        case 'GET_JOB_PENDING':
            return{
                isLoading : true
            }

            case 'GET_JOB_REJECTED':
                return{
                    isLoading: false,
                    isError : true
                }
            case 'GET_JOB_FULFILLED':
                return{
                    isLoading: false,
                    isError : false,
                    data : action.payload.data.results
                } 
        default :
            return state
            
            //[...state.data.results ,action.payload.data.results]
    }
}

export default job