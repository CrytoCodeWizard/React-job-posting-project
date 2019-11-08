import axios from 'axios'

export const getUser = ()=>{
    return{
        type : 'GET_USER',
        payload : axios.get('http://localhost:2000/user')
    }
}

export const addUser = (account)=>{
    return{
        type : 'ADD_USER',
        payload : axios.post('http://localhost:2000/user/signup' ,account)
    }
}

export const updateUser = (id,dataUser)=>{
    return{
        type : 'UPDATE_USER',
        payload : axios.patch('http://localhost:2000/user/' + id,dataUser)
    }
}

export const deleteUser = (id)=>{
    return{
        type : 'DELETE_USER',
        payload : axios.delete('http://localhost:2000/user/' + id)
    }
}

export const loginUser = (email,password)=>{
    return{
        type : 'LOGIN_USER',
        payload : axios.post('http://localhost:2000/user', email,password)
    }
}