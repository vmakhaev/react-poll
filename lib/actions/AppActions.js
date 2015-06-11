import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var AppActions = {

  createQuestion: (text, choices) => {
    AppDispatcher.handleAction({
      actionType: AppConstants.QUESTION_CREATE,
      text: text,
      choices: choices
    })
  },

  vote: (questionUrl, choiceUrl) => {
    AppDispatcher.handleAction({
      actionType: AppConstants.VOTE,
      questionUrl: questionUrl,
      choiceUrl, choiceUrl
    });
  }

};

module.exports = AppActions;
