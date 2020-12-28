/**
 * Easy HTTP Library
 * Library for making HTTP Requests
 *
 * @version 3.0.0
 * @author Daniel Afriyie
 * @license MIT
 *
 **/

class EasyHTTP {
    // make http get request
    async get(url) {
        const response = await fetch(url);
        return await response.json();
    }

    // make http post request
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    // make http put request
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    // make http delete request
    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        return 'Resource deleted...';
    }
}

export const http = new EasyHTTP();