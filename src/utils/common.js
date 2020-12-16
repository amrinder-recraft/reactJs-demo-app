/**
 * @param {array} arr A list of items
 * @param {string} key The field in the item which we will compare against our search term again
 * @param {string} searchTerm The input search which we will use to filter out results
 * @returns {array} filtered array according to our searchTerm
*/
export const filterArray = (arr, key, searchTerm) =>
    arr.filter(
        val => 
            val[key]
                .toString()
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase().trim()
                ) || searchTerm === ''
    )

export function saveObject(key, value, storage = localStorage) {
    if (storage) {
        storage.setItem(key, JSON.stringify(value))
    }
}

export function getObject(key, storage = localStorage) {
    if (storage && key) {
        const value = storage.getItem(key)
        return value ? JSON.parse(value) : null
    }

    return null
}

export const responseData = response => response.data

export const getBorderClass = (errors = []) => {
    return `${errors.length ? 'is-danger' : ''}`
}

export const getJobLink = job => `${window.location.protocol}//${window.location.host}/job/${createSlug(job)}`

export const debounce = (func, delay, watch) => {
    if(watch) {
      clearTimeout(watch)
    }
    return setTimeout(func, delay)
}

export const createSlug = (job = {}) => {
    let { position = '', _id = '' } = job
    return `${encodeURIComponent(position).split(' ').join('-')}_~${_id}`
}
