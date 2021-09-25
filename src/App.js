import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import ProtectRoute from "./components/protectRoute"
import RouteGuard from "../src/routeGuard"
import path from "path"
function App() {
    console.log(path.resolve("../","services/articles.js"))
    return (
        <Router getUserConfirmation={(v, callback) => {
            console.log(!v)
            callback(function () {
                if (!v) {
                    return true
                }
                return false
            }())
        }}>
            <RouteGuard onChange={(prevLocation, location, action, unlisten) => {
                console.log(prevLocation, location, action)
            }}>
                <Switch>
                    <Route path="/login" component={Login} exact></Route>
                    <ProtectRoute component={Admin} />
                </Switch>
            </RouteGuard>
        </Router >
    );
}

export default App;
