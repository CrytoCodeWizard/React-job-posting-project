import axios from 'axios'

export const getJob = (query)=>{
    return{
        type : 'GET_JOB',
        payload : axios.get('http://localhost:2000/job?page='+query)
    }
}

export const getJobId = (id)=>{
    return{
        type : 'GET_JOB',
        payload : axios.get('http://localhost:2000/job/'+id)
    }
}

export const getJobSearch = (name,company)=>{
    return{
        type : 'GET_JOB',
        payload : axios.get('http://localhost:2000/job?name='+ name +'&company='+ company)
    }
}

export const getJobOrderBy = (query)=>{
    return{
        type : 'GET_JOB',
        payload : axios.get('http://localhost:2000/job?orderby='+ query)
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
