const initialState = {
    isLoading : false,
    isError : false,
    data : []
}

const company = ( state = initialState, action) => {
    switch(action.type){
        case 'GET_COMPANY_PENDING':
            return{
                isLoading : true
            }

            case 'GET_COMPANY_REJECTED':
                return{
                    isLoading: false,
                    isError : true
                }
            case 'GET_COMPANY_FULFILLED':
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

export default company