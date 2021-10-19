import {combineReducers} from 'redux'
import resources from './reducers/resourcesReducer'

const rootReducer = combineReducers({
    resources: resources,
})

export default rootReducer