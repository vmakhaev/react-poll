import request from 'superagent';
const HOST = 'http://polls.apiblueprint.org';
var _questionsUrl;

function makeRequest(url = '', method = 'get', data) {
  return new Promise((fulfill, reject) => {
    request
      [method](`${HOST}${url}`)
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          fulfill(res.body);
        }
      });
  });
}

class Apiblueprint {

  onError(err) {
    //console.error(err);
    alert(err);
  }

  getQuestionsUrl() {
    return new Promise((fulfill, reject) => {
      if (_questionsUrl) {
        fulfill(_questionsUrl);
      } else {
        makeRequest()
          .then((data) => {
            _questionsUrl = data.questions_url;
            fulfill(_questionsUrl);
          })
          .catch((err) => {
            this.onError(err);
          });
      }
    });
  }

  getData(url = '') {
    return new Promise((fulfill, reject) => {
      makeRequest(`${url}`)
        .then((data) => {
          fulfill(data);
        })
        .catch((err) => {
          this.onError(err);
        });
    });
  }

  getListData() {
    return new Promise((fulfill, reject) => {
      this.getQuestionsUrl()
        .then((questionsUrl) => {
          makeRequest(`${questionsUrl}`)
            .then((data) => {
              fulfill(data);
            })
            .catch((err) => {
              this.onError(err);
            });
        });
    });
  }

  postQuestion(data) {
    return new Promise((fulfill, reject) => {
      this.getQuestionsUrl()
        .then((questionsUrl) => {
          makeRequest(`${questionsUrl}`, 'post', data)
            .then((question) => {
              fulfill(question);
            })
            .catch((err) => {
              this.onError(err);
            });
        });
    });
  }

  postChoice(url = '') {
    return new Promise((fulfill, reject) => {
      makeRequest(`${url}`, 'post')
        .then((question) => {
          fulfill(question);
        })
        .catch((err) => {
          this.onError(err);
        });
    });
  }
}

export default new Apiblueprint();
