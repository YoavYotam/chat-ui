import React, { Component } from "react";
import { Form, TextArea, Segment, Image } from "semantic-ui-react";
import auntJemima from "../assets/aunt-jemima.jpg";
import cartmen from "../assets/cartmen.jpg";
import morty from "../assets/morty.jpg";
import nightKing from "../assets/night-king.jpg";
import rick from "../assets/rick.jpg";
import stewie from "../assets/stewie.jpg";
import moses from "../assets/moses.jpg";

class TextHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatars: [auntJemima, cartmen, morty, nightKing, rick, stewie, moses],
      avatar: moses,
      userName: "",
      message: ""
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleAvatar = av => {
    this.setState({ avatar: av });
  };

  clear = () => {
    this.setState({ message: "" });
  };

  handleSubmit = () => {
    if (this.state.userName !== "" && this.state.message !== "") {
      let messageReceiver = {
        avatar: this.state.avatar,
        userName: this.state.userName,
        message: this.state.message
      };

      this.props.updateCurrentUser(this.state.userName);
      this.props.socket.emit("spotim/chat", messageReceiver);
      this.clear();
    }
  };

  render() {
    const { userName, message, avatars } = this.state;

    return (
      <Segment context={this.createRef}>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                placeholder="User Name Here"
                name="userName"
                value={userName}
                onChange={this.handleChange}
              />
              <TextArea
                placeholder="Message Here"
                style={{ maxWidth: 400, minHeight: 10 }}
                name="message"
                value={message}
                onChange={this.handleChange}
              />
              <Form.Button content="Submit" />
              <text>Choose Your Looks:</text>
            </Form.Group>
            <Form.Field style={{ position: "relative", left: 400, bottom: 50 }}>
              <Image.Group size="mini">
                {avatars.map((avatar, id) => {
                  return (
                    <Image
                      key={id}
                      href="#"
                      avatar
                      src={avatar}
                      onClick={() => this.handleAvatar(avatar)}
                    />
                  );
                })}
              </Image.Group>
            </Form.Field>
          </Form>
        </div>
      </Segment>
    );
  }
}

export default TextHandler;
