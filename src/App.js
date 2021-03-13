import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Dashboard from './components/Dashboard/Dashboard';
import Home from './page/Home/Home';
// import Chart from './components/Chart/Chart';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                {/* <Route path="/chart" exact component={Chart}></Route> */}
            </Switch>
            {/* <Dashboard /> */}
        </Router>
    );
}

export default App;
