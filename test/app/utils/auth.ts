const request = require('request');

export function login(): Promise<any> {
    const body = { username: 'admin', password: 'supersecret' };

    return new Promise(function (resolve, reject) {
        request.post(
            {
                headers: { 'Content-Type': 'application/json' },
                url: 'http://localhost:3000/api/v1/login',
                body: JSON.stringify(body),
            },
            function (error, res, body) {
                if (!error && res.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            }
        );
    });
}
