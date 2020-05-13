const fs = require('fs');
const request = require('request');

beforeAll(async done => {
  login().then((res) => {
    res = JSON.parse(res)
    
    createChannel(res.data.authToken, res.data.userId).then(() => {
      done()
    }).catch(() => {
      done()
    })
  })
});

function login() {
  const body = { username: 'admin', password: 'supersecret'}

  return new Promise(function (resolve, reject) {
   request.post({
    headers: {'Content-Type' : 'application/json'},
    url:     'http://localhost:3000/api/v1/login',
    body:    JSON.stringify(body)
  }, function (error, res, body) {
    if (!error && res.statusCode == 200) {
      resolve(body);
    } else {
      reject(error);
    }
  });
});
}

function createChannel(authToken, userId) {
  const channelBody = { "name": "jonmi-webhooks-test" }

  return new Promise(function (resolve, reject) {
   request.post({
    headers: {'Content-Type' : 'application/json', 'X-Auth-Token' : authToken, 'X-User-Id' : userId},
    url:     'http://localhost:3000/api/v1/channels.create',
    body:    JSON.stringify(channelBody)
  }, function (error, res, body) {
    if (!error && res.statusCode == 200) {
      resolve(body);
    } else {
      reject(error);
    }
  });
}); 
}



describe('Test Push', () => {
  it('send push request', async done => {
    request.post({
      headers: {'Content-Type' : 'application/json', 'X-Gitlab-Event': 'Push Hook'},
      url:     'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body:    fs.readFileSync('json/push.json')
    }, function(error, response, body){
      console.log(body)
      expect(response.statusCode).toBe(200)
      done()
    });  
  })
})