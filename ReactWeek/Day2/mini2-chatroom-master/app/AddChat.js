var React = require('react');
var $ = require('jquery');

var AddChat = React.createClass({
  getInitialState: function(){
    return {
      chat: ''
    };
  },
  propTypes: {
    url: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      url: 'https://api.parse.com/1/classes/chat'
    };
  },
  addChat: function(){
    $.ajax({
      url: this.props.url,
      type: 'POST',
      data: JSON.stringify({text: this.refs.newChatInput.getDOMNode().value}),
      beforeSend: function(request) {
        request.setRequestHeader("X-Parse-Application-Id", 'YOUR-PARSE-APP-ID');
        request.setRequestHeader("X-Parse-REST-API-Key", 'YOUR-PARSE-API-KEY');
        request.setRequestHeader("Content-Type", 'application/json');
      },
      error: function() {
        console.log('error on post');
      },
      success: function() {
        console.log('Successful Post');
      }
    });
  },
  handleSubmit: function(e){
    if(e.keyCode === 13){
      this.addChat();
      this.refs.newChatInput.getDOMNode().value = '';
    }
  },
  render: function(){
    return (
      <div className="form-group">
        <input type="text" ref='newChatInput' placeholder="Compose Message" className="form-control" onKeyDown={this.handleSubmit} />
      </div>
    )
  }
});

module.exports = AddChat;
