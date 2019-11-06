import axios from 'axios'

export const getUser = ()=>{
    return{
        type : 'GET_USER',
        payload : axios.get('https://localhost:2000/user')
    }
}

export const updateUser = (id)=>{
    return{
        type : 'UPDATE_USER',
        payload : axios.get('https://localhost:2000/user/' + id)
    }
}

export const deleteUser = (id)=>{
    return{
        type : 'DELETE_USER',
        payload : axios.get('https://localhost:2000/user/' + id)
    }
}
