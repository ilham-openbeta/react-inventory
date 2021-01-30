import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import routes from "./configs/routes";
import {Provider} from "react-redux";
import store  from "./configs/store"

function App() {
    return (
        <Provider store={store}>
        <Router>
            <Switch>
                {routes.map((route, index) =>
                    <Route key={route.id} path={route.path} exact>
                        {route.component}
                    </Route>)}
            </Switch>
        </Router>
        </Provider>
    );
}

export default App;
