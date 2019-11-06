import {GET_JOB_REJECTED,GET_JOB_PENDING,GET_JOB_FULFILLED,ADD_JOB_FULFILLED
        ,ADD_JOB_REJECTED,ADD_JOB_PENDING,EDIT_JOB_FULFILLED,
        EDIT_JOB_PENDING,EDIT_JOB_REJECTED, REMOVE_JOB_PENDING, REMOVE_JOB_REJECTED, REMOVE_JOB_FULFILLED} from './../constanta/actiontypes'

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
                    jobs : action.payload.data
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
                    jobs : [...state.job,action.payload.data]
                }
                
            case EDIT_JOB_PENDING:
                return{
                    ...state,
                    isLoading : true
                }
                
            case EDIT_JOB_REJECTED:
                return{
                    ...state,
                    isLoading : false,
                    isError : true
                }

            case EDIT_JOB_FULFILLED:
                return{
                    ...state,
                    isLoading : false,
                    jobs : state.jobs.map(job => (job.id === action.payload.data.id) ?
                    action.payload.data : job)
                }

            case REMOVE_JOB_PENDING:
                return{
                    ...state,
                    isLoading : true
                }
                
            case REMOVE_JOB_REJECTED:
                return{
                    ...state,
                    isLoading : false,
                    isError : true
                }    
            
            case REMOVE_JOB_FULFILLED:
                return{
                    ...state,
                    jobs : state.jobs.filter(job => job.id !== action.payload.data.id),
                    isLoading : false
                }    

        default :
            return state
            
            //[...state.data.results ,action.payload.data.results]
    }
}

export default job