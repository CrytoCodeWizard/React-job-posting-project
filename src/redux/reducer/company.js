import { GET_COMPANY_PENDING, GET_COMPANY_REJECTED, GET_COMPANY_FULFILLED, ADD_COMPANY_PENDING, ADD_COMPANY_REJECTED, ADD_COMPANY_FULFILLED, REMOVE_JOB_PENDING, REMOVE_JOB_REJECTED, REMOVE_JOB_FULFILLED, EDIT_COMPANY_PENDING, EDIT_COMPANY_REJECTED, EDIT_COMPANY_FULFILLED } from './../constanta/actiontypes'


const initialState = {
    isLoading : false,
    isError : false,
    data : []
}

const company = ( state = initialState, action) => {
    switch(action.type){
        case GET_COMPANY_PENDING:
            return{
                ...state,
                isLoading : true
            }

            case GET_COMPANY_REJECTED:
                return{
                    isLoading: false,
                    isError : true
                }
            case GET_COMPANY_FULFILLED:
                return{
                    isLoading: false,
                    isError : false,
                    companies : action.payload.data
                } 

                case ADD_COMPANY_PENDING:
            return{
                ...state,
                isLoading : true
            }

            case ADD_COMPANY_REJECTED:
                return{
                    isLoading: false,
                    isError : true
                }
            case ADD_COMPANY_FULFILLED:
                return{
                    isLoading: false,
                    isError : false,
                    companies : [...state.companies,action.payload.data]
                } 

            case EDIT_COMPANY_PENDING:
            return{
                ...state,
                isLoading : true
            }

            case EDIT_COMPANY_REJECTED:
                return{
                    isLoading: false,
                    isError : true
                }
            case EDIT_COMPANY_FULFILLED:
                return{
                    isLoading: false,
                    isError : false,
                    companies : state.companies.map(company => (company.id === action.payload.data.id) ?
                    action.payload.data : company)
                } 
                
            case REMOVE_JOB_PENDING:
            return{
                ...state,
                isLoading : true
            }

            case REMOVE_JOB_REJECTED:
                return{
                    isLoading: false,
                    isError : true
                }
            case REMOVE_JOB_FULFILLED:
                return{
                    isLoading: false,
                    isError : false,
                    companies : state.companies.filter(companies => companies.id !== action.payload.data.id)
                } 
        default :
            return state
    }
}

export default company