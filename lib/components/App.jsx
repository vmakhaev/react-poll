import React from 'react';
import { RouteHandler } from 'react-router';
import QuestionStore from '../stores/QuestionStore';

var App = React.createClass({

  render: function () {

    return (
      <div className='container-full'>
        <div className='row'>
          <div className='col-lg-12 text-center v-center'>
            <RouteHandler />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
