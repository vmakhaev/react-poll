import EventEmitter from 'events';
import React from 'react';
import QuestionDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import Apiblueprint from '../api/Apiblueprint';

var CHANGE_EVENT = 'change';
var _questions = {};
var _pages = {};

class QuestionStore extends EventEmitter {
  getQuestion(questionUrl) {
    return _questions[questionUrl];
  }

  getPage(page = 1) {
    return _pages[page] || [];
  }

  save(text, choices) {
    return new Promise((fulfill, reject) => {
      Apiblueprint
        .postQuestion({
          question: text,
          choices: choices
        })
        .then((question) => {
          fulfill(question.url);
        });
    });
  }

  loadQuestion(url) {
    Apiblueprint
      .getData(url)
      .then((question) => {
        _questions[url] = question;
        this.emitChange();
      });
  }

  loadPage(page = 1) {
    Apiblueprint
      .getListData()
      .then((questions) => {
        _pages[page] = questions;
        this.emitChange();
      });
  }

  payload(payload) {
    let action = payload.action;
    switch(action.actionType) {
  		case AppConstants.QUESTION_CREATE:
  			this.save(action.text, action.choices);
  			this.emitChange();
  			break;
  		case AppConstants.VOTE:
        this.vote(action.questionUrl, action.choiceUrl);
  			this.emitChange();
  			break;
      default:
        break;
    }
  }

  vote(questionUrl, choiceUrl) {
    Apiblueprint
      .postChoice(choiceUrl)
      .then((choice) => {
        console.log(_questions, questionUrl)
        var question = _questions[questionUrl];
        question.choices.forEach((c, index) => {
          if (c.url === choice.url) {
            question.choices[index] = choice;
          }
        });
        this.emitChange();
      });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

var questionStore = new QuestionStore();

QuestionDispatcher.register(questionStore.payload.bind(questionStore));

export default questionStore;
