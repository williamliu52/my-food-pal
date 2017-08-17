const USDA = {
    search: function(query, callback) {
        let params = {
            // 'api_key': process.env.USDA_API_KEY,
            'api_key': 'DEMO_KEY',
            'query': query,
            'format': 'json'
        };

        fetch('/api/search', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(params)
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
