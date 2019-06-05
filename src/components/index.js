//This is your top level React component, you may change everything

import React from "react";
import logo from "../assets/spotim-logo.jpg";
import { Header, Image, Container } from "semantic-ui-react";
import ChatRoom from "./chatroom";
import MessageHandler from "./messagehandler";
import io from "socket.io-client";

const socket = io("https://spotim-demo-chat-server.herokuapp.com");

/*Data will be here, the messages will be handled from MessageHandler to server
  the messages recieved from server will be inserted to the data -here using connectionHandler().
  chatRoom will use this data to show the messages.
  if a message's userName in chatRoom is the same as the currentUser, then it will be colored differently.
*/

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messages: [], // messages recieved by the Server - passed on to chatRoom
      currentUser: "" //this is a shared state member "shared" by handler and chatRoom, handler writing to it, and chatRoom reading from it
    };
  }
  componentDidMount() {
    this.connectionHandler();
  }

  connectionHandler = () => {
    socket.on("connect", function() {});
    socket.on("disconnect", function() {});
    socket.on("spotim/chat", ack => {
      this.setState({ messages: [...this.state.messages, ack] });
    });
  };
  updateCurrentUser = curr => {
    this.setState({ currentUser: curr });
  };

  render() {
    const { messages, currentUser } = this.state;
    return (
      <div className="main">
        <div className="header">
          <Header as="h2">
            <Image size={"tiny"} src={logo} /> Welcome to the Spot.IM Chat app
          </Header>
        </div>

        <div>
          <Container className={"chatDef"}>
            <ChatRoom currentUser={currentUser} receivedMessages={messages} />
          </Container>
        </div>

        <Container className={"textDef"}>
          <MessageHandler
            updateCurrentUser={this.updateCurrentUser}
            currentUser={currentUser}
            socket={socket}
          />
        </Container>
      </div>
    );
  }
}

export default App;
