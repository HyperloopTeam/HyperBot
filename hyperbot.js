module.exports = function(req, res, next) {

  var mongodb = require('mongodb');
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://shreyashirday:hyperbot@ds053164.mongolab.com:53164/heroku_k0m6zq8z';


  var userName = req.body.user_name;

  var triggerWord = req.body.trigger_word;
  var txt = req.body.text;

  var response = 'swag';


  if(triggerWord === "ask:"){

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
  else if(triggerWord === "deadlines:"){
    var tl = triggerWord.length;
    var query = txt.substring(tl);

    if(query === 'team'){
        response = 'None yet'
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
    else if(query === 'spacex'){
        response = 'Prelim design: November 13, Final Design: January 13, Design Weekend: January 29 and 30';
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
    else{
      response = 'Please do deadlines:team or deadlines:spacex';
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
  }
  else if(triggerWord === "announcements:"){
    MongoClient.connect(url, function(err,db){
      if(err){
        console.log(err);
      }
      else{
          var collection = db.collection('announcements');
          cursor = collection.find();
          cursor.each(function(err, doc){
            if(err){
              console.log(err);
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
            else{




              console.log(response);
              console.log(doc + "eh");

              if(doc === null){
                console.log("yahoo!");

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
              else{
                if(response === 'swag'){
                  response = '';
                }
                response += doc["message"] + ' at ' + (doc["date"]).toString() + '\n';
              }


            }
          });


      }
    });
  }
  else if(triggerWord === "search:"){
      response = 'Under Construction';
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
  else if((userName === 'shreyashirday' || userName === 'kkaplan2') && triggerWord === 'add:'){






    var tl = 4;
    var query = txt.substring(tl);
    var first_letter = query.substring(0,1);



    MongoClient.connect(url, function(err, db){

      if(err) {
        console.log('unable to connect');
      }
      else{
      //announcement
      console.log('connected');
      if(first_letter === 'A'){
        var announcement = query.substring(1);
        var a = {author : userName, date: new Date(), message: announcement};
        var collection = db.collection('announcements');
        collection.insert(a, function(err, result){
          if(err) {
            console.log('error!');
            console.log(err);
            response = 'error: ' + err;
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
          else{
            console.log('Announcement added');
            response = 'Announcement added!';
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

          db.close();

        });
      }
      //deadline
      else if(first_letter === 'D'){
        var deadline = query.substring(1);
        var d = {author: userName, date : new Date(), message: deadline};
        var collection = db.collection('deadlines');
        collection.insert(d, function(err, result){
          if(err){
            console.log(err);
            response = 'error: ' + err;
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
          else{
            response = 'Deadline added!';
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

          db.close();

        });
      }



      }

    });

  }
  else{
    response = 'Yo, ' + userName + '! Type \'deadlines:<optional - team or spacex>\',\'search:<whatever you want to search in Google Drive>\'';
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




}
