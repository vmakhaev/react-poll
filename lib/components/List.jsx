import React from 'react';
import { Link } from 'react-router';
import QuestionStore from '../stores/QuestionStore';

var List = React.createClass({

  getInitialState: function() {
    var page = +this.props.query.page || 1;
    return {
      questions: QuestionStore.getPage(page),
      loading: true,
      page: page
    };
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    QuestionStore.addChangeListener(() => {
      if (this.isMounted()) {
        this.setState({
          loading: false,
          questions: QuestionStore.getPage(this.state.page)
        });
      }
    });

    QuestionStore.loadPage(this.state.page);
  },

  componentWillReceiveProps: function(nextProps) {
    var page = +nextProps.query.page;
    console.log('receive', page);
    this.setState({
      loading: true,
      page: page
    });
    QuestionStore.loadPage(page);
  },

  _refresh: function(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    QuestionStore.loadPage(this.state.page);
  },

  render: function () {
    var list = [];

    if (this.state.loading) {
      list.push(<div>Loading...</div>);
    } else {
      //list.push(<div><a href='#' onClick={this._refresh}>Refresh</a></div>);
    }
    if (this.state.questions.length) {
      list.push(<div>Questions: {this.state.questions.length}</div>);
      this.state.questions.forEach((question) => {
        var questionId = question.url.split('/')[2];
        list.push(
          <div>
            <Link to='question' params={{questionId: questionId}}>{question.question}</Link>
          </div>
        );
      });
    }

    return (
      <div className='container-full'>
        <div className='row'>
          <div className='col-lg-12 text-center v-center'>
            <h1>Poll {/*}page {this.state.page} {*/}</h1>
            <Link to='create'>Create</Link>
            {/*}<Link to='list' query={{page: this.state.page - 1}}>Prev</Link>
            <Link to='list' query={{page: this.state.page + 1}}>Next</Link>{*/}
            {list}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = List;
