import {combineReducers} from 'redux'

import user from './user'
import job from './job'
import company from './company'

const appReducer = combineReducers({
    user,
    job,
    company
})

export default appReducer