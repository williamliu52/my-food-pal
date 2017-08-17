const USDA = {
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
