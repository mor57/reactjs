import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./Home";
import Car from "./Car";
import Body from "./Body";
import Fire from "./Fire";
import Medical from "./Medical";
import Travel from "./Travel";

const App = () => {
    return (
        <HashRouter>
            <div>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <ul className="navbar-nav">
                            <li className="nav-item"><NavLink className="nav-link" to="/" >خانه</NavLink></li> 
                            <li className="nav-item"><NavLink className="nav-link" to="/Car" >بیمه شخص ثالث</NavLink></li> 
                            <li className="nav-item"><NavLink className="nav-link" to="/Body" >بیمه بدنه خودرو</NavLink></li> 
                            <li className="nav-item"><NavLink className="nav-link" to="/Fire" >بیمه آتش سوزی</NavLink></li> 
                            <li className="nav-item"><NavLink className="nav-link" to="/Medical" >بیمه مسئولیت پزشکی</NavLink></li> 
                            <li className="nav-item"><NavLink className="nav-link" to="/Travel" >بیمه مسافرتی</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="container">
                    <div className="admin-contents">
                        <Route  exact path="/" component={Home} />
                        <Route path="/Car" component={Car} />
                        <Route path="/Body" component={Body} />
                        <Route path="/Fire" component={Fire} />
                        <Route path="/Medical" component={Medical} />
                        <Route path="/Travel" component={Travel} />
                    </div>
                </div>
            </div>
        </HashRouter>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
// const element=React.createElement(
//     'div',
//     {className:'container'},
//     'Hello World',
//     'Goodby'
//   );
// const props={
//     className:'container',
//     children:'Hello morteza'
// }
// const element=<div {...props} className="myclass" >hi</div>
  // console.log(element);
//   ReactDOM.render(element, document.getElementById("app"));