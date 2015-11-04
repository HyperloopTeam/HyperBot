module.exports = function(req, res, next) {
  var userName = req.body.user_name;

  var triggerWord = req.body.trigger_word;
  var txt = req.body.text;

  var response = 'swag';


  if(triggerWord == "ask:"){

      var tl = triggerWord.length;
      var query = txt.substring(tl);
      var podSpecs = ~query.indexOf("specs") && ~query.indexOf("pod");
      var tubeSpecs = ~query.indexOf("specs") && ~query.indexOf("tube");

      if(podSpecs){
          response = 'Pod: Mass: 500kg';
      }
      if(tubeSpecs){
        if(response.length > 0){
          response += ', Tube: Material: ASTM A1018 Grade'
        }
        else{
          response = 'Tube: insert tube specs'
        }
      }


  }
  else if(triggerWord === "deadlines:"){
    var tl = triggerWord.length;
    var query = txt.substring(tl);

    if(query == 'team'){

    }
    else if(query == 'spacex'){
        response = 'Prelim design: November 13, Final Design: January 13, Design Weekend: January 29 and 30';
    }
    else{
      response = 'error,triggerWord == ' + triggerWord + "x";
    }
  }
  else if(triggerWord == "search:"){
      response = 'Under Construction';
  }
  else{
    response = 'Yo, ' + userName + '! Type \'deadlines:<optional - team or spacex>\', \'ask:<any text containing \'specs\' and either \'pod\' or \'tube\'>\',\'search:<whatever you want to search in Google Drive>\'';
  }


  var botPayload = {
    text: response
  };

if(userName !== 'slackbot'){
  return res.status(200).json(botPayload);
}
else{
  return res.status(200).end();
}

}
