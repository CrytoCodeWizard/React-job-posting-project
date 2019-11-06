import axios from 'axios'

export const getJob = ()=>{
    return{
        type : 'GET_JOB',
        payload : axios.get('https://localhost:2000/job')
    }
}

export const updateJob = (id,data)=>{
    return{
        type : 'UPDATE_JOB',
        payload : axios.get('https://localhost:2000/job/' + id)
    }
}

export const deleteJob = (id)=>{
    return{
        type : 'DELETE_JOB',
        payload : axios.get('https://localhost:2000/job/' + id)
    }
}
