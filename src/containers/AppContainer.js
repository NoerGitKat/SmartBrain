import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <Logo />
        <h1>Hello!</h1>
      </div>
    );
  }
}

export default App;
