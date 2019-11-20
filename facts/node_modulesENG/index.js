/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Game Of Thrones Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  'More than 450 babies were named "Khaleesi" in 2017. And over 2,000 were named Arya.',
  'Fake blood left You can buy the cloaks the Nights Watch used in the show at Ikea for $79',
  'Kit Harrington, the actor who plays Jon Snow is descended from Jon Harrington, the man who invented the first flushing toilet.',
  'The Lannisters would have loved the original theme song.',
  'The "horse heart" Daenerys ate for Khol Drogo on the show was actually a three-pound mass of a gummy bear–like substance.',
  'Peter Dinklage is vegetarian. All the "meat" he eats on the show is not real.',
  'The last season of Game Of Thrones cost around $10 million per episode — the same amount as the final season of Friends. The final season will surpass that at $15 million per episode.',
  'As of the 2019 Emmy Awards, Kit Harington has still not watched the final season of Game of Thrones.',
  'Jerome Flynn, who plays Bronn, was in 90s doo-wop duo called Robson and Jerome. They had three No. 1 singles in the U.K.',
  'The actor who plays Bran 13-year-old companion Jojen Reed was actually 23 years old at the time of filming. He was also the voice of Ferb on the Disney Channel show Phineas and Ferb. And he is the kid from Love Actually.',
  'Emilia Clarke, who plays Daenerys on the show, does not dye her hair blonde. She wears a wig instead.',
  'The co-creators of the HBO show, David Benioff and D. B. Weiss, wrote an episode in the ninth season episode of It is Always Sunny In Philadelphia called "Flowers For Charlie."',
  'Before his audition for Jon Snow, Kit Harrington got into a fight at McDonalds and ended up auditioning with a big ol shiner.',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
