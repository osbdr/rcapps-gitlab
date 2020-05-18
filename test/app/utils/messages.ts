const request = require('request');
import * as auth from './auth';

export async function getLastMessage(): Promise<any> {
    let res = await auth.login();
    res = JSON.parse(res);

    let message = await getLastMessageInChannel(
        res.data.authToken,
        res.data.userId
    );
    return message;
}

function getLastMessageInChannel(authToken, userId): Promise<any> {
    return new Promise(function (resolve, reject) {
        request.get(
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": authToken,
                    "X-User-Id": userId,
                },
                url:
                    "http://localhost:3000/api/v1/channels.history?roomName=jonmi-webhooks-test&count=1",
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
