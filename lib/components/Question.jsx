import React from 'react';
import { Link } from 'react-router';
import AppActions from '../actions/AppActions';
import QuestionStore from '../stores/QuestionStore';

function makeUrl(questionId) {
  return '/questions/' + questionId;
}

var Question = React.createClass({

  getInitialState: function() {
    var questionId = this.context.router.getCurrentParams().questionId;

    return {
      questionId: questionId,
      question: QuestionStore.getQuestion(makeUrl(questionId)),
      loading: true
    };
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    var questionId = this.state.questionId;

    QuestionStore.addChangeListener(function() {
      if (this.isMounted()) {
        this.setState({
          loading: false,
          question: QuestionStore.getQuestion(makeUrl(questionId))
        });
      }
    }.bind(this));

    QuestionStore.loadQuestion(makeUrl(questionId));
  },

  render: function () {
    var list = [];

    if (this.state.loading) {
      list.push(<div>Loading...</div>);
    } else {
      var question = this.state.question;
      if (question) {
        var choices = [];
        question.choices.forEach((choice) => {
          var questionId = this.state.questionId;

          var vote = function(e) {
            e.preventDefault();
            AppActions.vote(question.url, choice.url);
          }

          choices.push(
            <div>
              {choice.choice} ({choice.votes}) <a href='#' onClick={vote}>+</a>
            </div>
          );
        });
        list.push(
          <div>
            <p>Question {question.question}</p>
            {choices}
          </div>
        );
      }
    }

    return (
      <div className='container-full'>
        <div className='row'>
          <div className='col-lg-12 text-center v-center'>
            <h1>Question</h1>
            <div>
              <Link to='list'>To List</Link>
            </div>
            {list}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Question;
