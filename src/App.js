import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./pages/Main";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Router>
      <div>
        <Wrapper>
          <Route exact path="/" component={Main} />
        </Wrapper>
      </div>
    </Router>
  );
}

export default App;
