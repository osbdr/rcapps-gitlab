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


async function getLastMessage() {
  let res = await login();
  res = JSON.parse(res);

  let message = await getLastMessageInChannel(res.data.authToken, res.data.userId)
  return message;
}


function getLastMessageInChannel(authToken, userId) {
  return new Promise(function (resolve, reject) {
   request.get({
    headers: {'Content-Type' : 'application/json', 'X-Auth-Token' : authToken, 'X-User-Id' : userId},
    url:     'http://localhost:3000/api/v1/channels.history?roomName=jonmi-webhooks-test&count=1',
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
    }, async function(error, response, body){
      console.log(body)
      let msg = await getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });  
  })
})

describe('Test Push (no avatar)', () => {
  it('send push request without user avatar', async done => {
    request.post({
      headers: {'Content-Type' : 'application/json', 'X-Gitlab-Event': 'Push Hook'},
      url:     'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body:    fs.readFileSync('json/push-no-avatar.json')
    }, async function(error, response, body){
      console.log(body)
      let msg = await getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });  
  })
})

describe('Test Issue', () => {
  it('send issue hook', async done => {
    request.post({
      headers: {'Content-Type' : 'application/json', 'X-Gitlab-Event': 'Issue Hook'},
      url:     'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body:    fs.readFileSync('json/issue.json')
    }, async function(error, response, body){
      console.log(body)
      let msg = await getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });  
  })
})

describe('Test Issue (edit)', () => {
  it('send issue hook with changed desccription', async done => {
    request.post({
      headers: {'Content-Type' : 'application/json', 'X-Gitlab-Event': 'Issue Hook'},
      url:     'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body:    fs.readFileSync('json/issue-edit.json')
    }, async function(error, response, body){
      console.log(body)
      let msg = await getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });  
  })
})


describe('Pipeline 1', () => {
  it('send pipeline hook', async done => {
    request.post({
      headers: {'Content-Type' : 'application/json', 'X-Gitlab-Event': 'Pipeline Hook'},
      url:     'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body:    fs.readFileSync('json/pipeline1.json')
    }, async function(error, response, body){
      console.log(body)
      let msg = await getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });  
  })
})

describe('Pipeline 2', () => {
  it('send pipeline hook', async done => {
    request.post({
      headers: {'Content-Type' : 'application/json', 'X-Gitlab-Event': 'Pipeline Hook'},
      url:     'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body:    fs.readFileSync('json/pipeline2.json')
    }, async function(error, response, body){
      console.log(body)
      let msg = await getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });  
  })
})
