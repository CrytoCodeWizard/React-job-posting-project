import axios from 'axios'

export const getJob = ()=>{
    return{
        type : 'GET_JOB',
        payload : axios.get('http://localhost:2000/job')
    }
}

export const addJob = (dataJob)=>{
    return{
        type : 'ADD_JOB',
        payload : axios.post('http://localhost:2000/job',dataJob)
    }
}

export const updateJob = (id,data)=>{
    return{
        type : 'UPDATE_JOB',
        payload : axios.patch('http://localhost:2000/job/' + id,data)
    }
}

export const deleteJob = (id)=>{
    return{
        type : 'DELETE_JOB',
        payload : axios.delete('http://localhost:2000/job/' + id)
    }
}
