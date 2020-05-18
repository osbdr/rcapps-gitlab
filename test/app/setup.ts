const request = require('request');
import * as auth from "./utils/auth";

export default function () {
    auth.login().then((res) => {
        res = JSON.parse(res);
        createChannel(res.data.authToken, res.data.userId)
            .then(() => {})
            .catch(() => {});
    });
};

function createChannel(authToken, userId) {
    const channelBody = { name: 'jonmi-webhooks-test' };

    return new Promise(function (resolve, reject) {
        request.post(
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': authToken,
                    'X-User-Id': userId,
                },
                url: 'http://localhost:3000/api/v1/channels.create',
                body: JSON.stringify(channelBody),
            },
            function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            }
        );
    });
}