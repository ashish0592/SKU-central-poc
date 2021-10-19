import {createSelector} from 'reselect'

const getResourceListing = createSelector(
    state => state.resources,
    (resourcesState) => { 
        return {
            isLoading: resourcesState.isLoading,
            isError: resourcesState.error.isError,
            errorList: [...resourcesState.error.errorList],
            isSuccess: resourcesState.success.isSuccess,
            successList: [...resourcesState.success.successList],
            loggedInUserData: {...resourcesState.resources.loggedInUserData},
            skuList: [...resourcesState.resources.skuList]
        }
    }
)

export default getResourceListing