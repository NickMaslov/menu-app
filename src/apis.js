import { toast } from 'react-toastify';

// base request function
function request(path, { data = null, token = null, method = 'GET' }) {
    return fetch(path, {
        method,
        headers: {
            Authorization: token ? `Token ${token}` : '',
            'Content-Type': 'application/json',
        },
        body:
            method !== 'GET' && method !== 'DELETE'
                ? JSON.stringify(data)
                : null,
    })
        .then((response) => {
            console.log(response);
            // If it is success
            if (response.ok) {
                if (method === 'DELETE') {
                    // If delete, nothing return
                    return true;
                }
                return response.json();
            }

            // Otherwise, if there are errors
            return response
                .json()
                .then((json) => {
                    // Handle JSON error, response by the server
                    if (response.status === 400) {
                        const errors = Object.keys(json).map(
                            (k) => `${json[k].join(' ')}`
                        );
                        throw new Error(errors.join(' '));
                    }
                    throw new Error(JSON.stringify(json));
                })
                .catch((e) => {
                    // if (e.name === 'SyntaxError') {
                    //   throw new Error(response.statusText);
                    // }
                    throw new Error(e);
                });
        })
        .catch((e) => {
            // Handle all errors
            toast.error(e.message);
        });
}

export function signIn(username, password) {
    return request('/auth/token/login/', {
        data: { username, password },
        method: 'POST',
    });
}

export function register(username, password) {
    return request('/auth/users/', {
        data: { username, password },
        method: 'POST',
    });
}

export function fetchPlaces(token) {
    return request('/api/menu_app/places', { token });
}

export function addPlace(data, token) {
    return request('/api/places/', { data, token, method: 'POST' });
}
