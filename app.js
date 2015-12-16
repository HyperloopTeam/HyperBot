var WebClient = require('slack-client').WebClient;
var RtmClient = require('slack-client').RtmClient;

var token = 'xoxb-16788374866-ro5FYCv3YFxLsDHHYbmJ9EzW' || process.env.SLACK_API_TOKEN;

var webClient = new WebClient(token);
var rtm = new RtmClient(webClient, {logLevel: 'debug'});

rtm.start();

rtm.on('message', function(message) {
  console.log(message);
});
