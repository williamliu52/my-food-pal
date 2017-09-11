/**
 * This file defines functions that can be used to call the USDA APIs
 * @type {Object}
 */
const USDA = {
    /**
     * Calls the USDA Search API which searches based on a keyword
     * Doc: https://ndb.nal.usda.gov/ndb/doc/apilist/API-SEARCH.md
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
        }).then(resp => {
            if (!resp.ok) {
                throw new Error(`status ${resp.status}`);
            }
            return resp.json();
        }).then(json => {
            return json.list.item;
        }).then(callback);
    },

    /**
     * Calls the USDA Report API to get the nutrient info of a food based on
     * its ID in the USDA database.
     * Doc: https://ndb.nal.usda.gov/ndb/doc/apilist/API-FOOD-REPORT.md
     * @param  {string}   query    [ID of the food]
     * @param  {Function} callback [Callback function to handle results]
     * @return {Object}            [Nutrient report returned by USDA]
     */
    report: function(query, callback) {
        let param = {
            ndbno: query
        };
        fetch('/api/report', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(param)
        }).then(resp => {
            if (!resp.ok) {
                throw new Error(`status ${resp.status}`);
            }
            return resp.json();
        }).then(json => {
            return json.report.food.nutrients;
        }).then(callback);
    }
}

export default USDA;
