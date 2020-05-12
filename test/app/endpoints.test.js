const fs = require('fs');
const request = require('request');

describe('Test Push', () => {
  it('send push request', async done => {
    request.post({
      headers: [{'Content-Type' : 'application/x-www-form-urlencoded'},{'X-Gitlab-Event': 'Push Hook'}],
      url:     'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body:    fs.readFileSync('json/push.json')
    }, function(error, response, body){
      console.log(response.body)
      expect(response.statusCode).toBe(200)
      done()
    });  
  })
})