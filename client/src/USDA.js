/**
 * This file defines functions that can be used to call the USDA APIs
 * @type {Object}
 */
const USDA = {
    /**
     * Calls the USDA Search API which searches based on a keyword
     * @param  {string}   query    [Keyword to search]
     * @param  {Function} callback [Callback function to handle results]
     * @return {Object}            [List of food items returned by USDA]
     */
    search: function(query, callback) {
        let param = {
            food: query
        };
        fetch('/api/search', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(param)
            // body: params
        }).then(resp => {
            if (!resp.ok) {
                throw new Error(`status ${resp.status}`);
            }
            return resp.json();
        }).then(json => {
            return json.list.item;
        }).then(callback);
    }
}

export default USDA;
