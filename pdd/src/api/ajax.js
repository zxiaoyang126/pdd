import axios from 'axios'

export default function (url = '', params = {}, type = 'GET') {
    
    return new Promise((resolve, reject) => {
        let promise;
        if(type === 'GET') {
            let paramsStr = '';
            Object.keys(params).forEach(key => {
                paramsStr += key + '=' + params[key] + '&';                
            });

            if(paramsStr !== '') {
                paramsStr = '?' + paramsStr.substr(0, paramsStr.lastIndexOf('&'))
            }
            promise = axios.get(url + paramsStr);
    
        } else if (type === 'POST') {
            promise = axios.post(url, params)
        }

        promise.then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        });
        
    }); 
}

