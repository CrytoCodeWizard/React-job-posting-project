import {GET_JOB_REJECTED,GET_JOB_PENDING,GET_JOB_FULFILLED,ADD_JOB_FULFILLED
        ,ADD_JOB_REJECTED,ADD_JOB_PENDING,UPDATE_JOB_FULFILLED,
        UPDATE_JOB_PENDING,UPDATE_JOB_REJECTED, DELETE_JOB_PENDING, DELETE_JOB_REJECTED, DELETE_JOB_FULFILLED} from './../constants/actiontypes'

const initialState = {
    isLoading : false,
    isError : false,
    data : []
}

const job = ( state = initialState, action) => {
    switch(action.type){
        case GET_JOB_PENDING:
            return{
                ...state,
                isLoading : true
            }

            case GET_JOB_REJECTED:
                return{
                    ...state,
                    isLoading: false,
                    isError : true
                }

            case GET_JOB_FULFILLED:
                return{
                    ...state,
                    isLoading: false,
                    isError : false,
                    data : action.payload.data.data
                } 

            case ADD_JOB_PENDING:
                return{
                    ...state,
                    isLoading : true
                }

            case ADD_JOB_REJECTED:
                return{
                    ...state,
                    isLoading : false,
                    isError : true
                }
                
            case ADD_JOB_FULFILLED:
                return{
                    ...state,
                    isLoading : false,
                    data : [...state.data,action.payload.data.data]
                }
                
            case UPDATE_JOB_PENDING:
                return{
                    ...state,
                    isLoading : true
                }
                
            case UPDATE_JOB_REJECTED:
                return{
                    ...state,
                    isLoading : false,
                    isError : true
                }

            case UPDATE_JOB_FULFILLED:
                return{
                    ...state,
                    isLoading : false,
                    data : state.data.map(data => (data.id === action.payload.data.data.id) ?
                    action.payload.data.data : data)
                }

            case DELETE_JOB_PENDING:
                return{
                    ...state,
                    isLoading : true
                }
                
            case DELETE_JOB_REJECTED:
                return{
                    ...state,
                    isLoading : false,
                    isError : true
                }    
            
            case DELETE_JOB_FULFILLED:
                return{
                    ...state,
                    data : state.data.filter(data => data.id !== action.payload.data.id),
                    isLoading : false
                }    

        default :
            return state
    }
}

export default job