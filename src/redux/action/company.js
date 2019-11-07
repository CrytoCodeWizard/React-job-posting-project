import axios from 'axios'

export const getCompany = ()=>{
    return{
        type : 'GET_COMPANY',
        payload : axios.get('http://localhost:2000/company')
    }
}

export const addCompany = (dataCompany)=>{
    return{
        type : 'ADD_COMPANY',
        payload : axios.post('http://localhost:2000/company',dataCompany)
    }
}

export const updateCompany = (id,dataCompany)=>{
    return{
        type : 'UPDATE_COMPANY',
        payload : axios.patch('http://localhost:2000/company/' + id,dataCompany)
    }
}

export const deleteCompany = (id)=>{
    return{
        type : 'DELETE_COMPANY',
        payload : axios.delete('http://localhost:2000/company/' + id)
    }
}
