import React from 'react';
import { Link } from 'react-router';
import AppActions from '../actions/AppActions';

var Question = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  save: function() {
    var text = this.refs.text.getDOMNode().value;
    var choices = this.refs.choices.getDOMNode().value.split(' ');

    AppActions.createQuestion(text, choices);
    this.context.router.transitionTo('/');
  },

  render: function () {

    return (
      <div className='container'>
        <div className='row row-centered'>
          <div className='col-lg-12 text-center v-center'>
            <h1>Create Question</h1>
            <div>
              <Link to='list'>To List</Link>
            </div>
          </div>
          <div className='col-lg-2 col-centered'>
            <input type='text' className='form-control' ref='text' placeholder='Question' />
            <input type='text' className='form-control' ref='choices' placeholder='Choices' />
            <button className='btn btn-default' onClick={this.save}>Save</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Question;
