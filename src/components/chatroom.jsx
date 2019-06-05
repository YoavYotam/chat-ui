import React, { Component } from "react";
import { List, Image, Label } from "semantic-ui-react";

class ChatRoom extends Component {
  handleColor = usr => {
    if (this.props.currentUser === usr) return "violet";
    else return "grey";
  };

  render() {
    const { receivedMessages } = this.props;
    return (
      <div>
        <List>
          {receivedMessages.map(message => {
            return (
              <List.Item key={message.id}>
                <Label color={this.handleColor(message.userName)}>
                  <Image avatar src={message.avatar} />
                  <List.Content>
                    <List.Header as="a">{message.userName}</List.Header>
                    <List.Description>{message.message}</List.Description>
                  </List.Content>
                </Label>
              </List.Item>
            );
          })}
        </List>
      </div>
    );
  }
}

export default ChatRoom;
