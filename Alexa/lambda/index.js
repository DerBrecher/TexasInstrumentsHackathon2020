/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
var admin = require("firebase-admin");

var serviceAccount = require("firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://drive-e26b7.firebaseio.com"
});


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const GoalIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GoalIntent';
    },
    handle(handlerInput) {
        
        var goal = handlerInput.requestEnvelope.request.intent.slots.Dest.value;
     
        const speakOutput = 'Hello hallo';
        try {
            const DB = admin.firestore();
            var y = admin.database().ref().child('Goal').set(goal);
            var z = admin.database().ref().child('Flag').set("3");
            var xy = admin.database().ref().child('ESP32done').set('false');
        }
        catch(e){
            console.log(e);
        }
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    }
};
const GoodboyeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GoodboyeIntent';
    },
    async handle(handlerInput) {
     
       
        const speakOutput = 'Hello hallo';
        var num1 = handlerInput.requestEnvelope.request.intent.slots.we.value;
        try {
            const DB = admin.firestore();
           
          await admin.database().ref().child('Flag').set("4");
          await admin.database().ref().child('ESP32done').set('false');
           
        }
        catch(e){
            console.log(e);
        }
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    }
};

const RotateIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RotateIntent';
    },
    handle(handlerInput) {
        var num1 = handlerInput.requestEnvelope.request.intent.slots.Degree.value;
        var num2 = handlerInput.requestEnvelope.request.intent.slots.Direction.value;
       
        var Flag = 2;
        const speakOutput = 'Hello hallo';
        try {
            const DB = admin.firestore();
            var x =  admin.database().ref().child('direction').set(num2);
            var y = admin.database().ref().child('Degree').set(num1);
            var z = admin.database().ref().child('Flag').set("2");
            var xy = admin.database().ref().child('ESP32done').set('false');
        }
        catch(e){
            console.log(e);
        }
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    }
};

const DriveIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DriveIntent';
    },
handle(handlerInput) {

         var num1 = handlerInput.requestEnvelope.request.intent.slots.distance.value;
         var num2 = handlerInput.requestEnvelope.request.intent.slots.direction.value;
          var num3 = handlerInput.requestEnvelope.request.intent.slots.unit.value;
         var Flag = 1;
         const speakOutput = 'Hello Worlfddfdffdd!'+ num1+ 'hallo';
         console.log(num1);
         const DB = admin.firestore();
         
     //    await DB.collection('test').add({
      //       title : 'tt',
        //     createdAt : '12'
        // });

       var x =  admin.database().ref().child('direction').set(num2);
       var y = admin.database().ref().child('distance').set(num1);
          var z = admin.database().ref().child('Flag').set("1");
                 var xy = admin.database().ref().child('ESP32done').set('false');
                          var xx = admin.database().ref().child('unit').set(num3);
       //var DB = admin.database();
        //var ref = await DB.ref('drive-e26b7');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
  }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
       
        GoalIntentHandler,
        RotateIntentHandler,
        HelpIntentHandler,
        GoodboyeIntentHandler,
        DriveIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();