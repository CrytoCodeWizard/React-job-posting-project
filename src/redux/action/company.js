import axios from 'axios'

export const getCompany = ()=>{
    return{
        type : 'GET_COMPANY',
        payload : axios.get('https://localhost:2000/company')
    }
}

export const updateCompany = (id)=>{
    return{
        type : 'UPDATE_COMPANY',
        payload : axios.get('https://localhost:2000/company/' + id)
    }
}

export const deleteCompany = (id)=>{
    return{
        type : 'DELETE_COMPANY',
        payload : axios.get('https://localhost:2000/company/' + id)
    }
}
