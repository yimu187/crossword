import React, {Component} from 'react';

import Solve from './container/solve/';
import Add from './container/add/';
import NotFound from "./container/NotFound";

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


class App extends Component {

    state = {
        activeTab: 'solve'
    }

    setActiveTab = (activeTab) => {
        this.setState({
            activeTab
        })
    }

    render(){
        document.title = 'Bulmaca';
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={
                        () => {
                            return <Solve active={this.state.activeTab === 'solve'}
                                          setActiveTab={this.setActiveTab}
                            />;
                        }
                    } />
                    <Route exact path="/coz" render={
                        () => {
                            return <Solve active={this.state.activeTab === 'solve'}
                                          setActiveTab={this.setActiveTab}
                            />;
                        }
                    }/>
                    <Route exact path="/ekle" render={
                        () => {
                            return <Add active={this.state.activeTab === 'add'}
                                        setActiveTab={this.setActiveTab}
                            />;
                        }
                    }/>
                    <Route component={NotFound} />
                </Switch>
            </Router>
        )
    }

}
export default App;
