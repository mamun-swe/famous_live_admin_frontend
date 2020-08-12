import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SideBar from '../components/SideBar';
import Dashboard from './Dashboard/Dashboard';
import UserIndex from './Users/Index';
import UserProfile from './Users/Profile';
import MyProfile from './Users/MyProfile';
import UpdateRequests from './Requests/Index';


const Master = () => {
    return (
        <div>
            <div className="d-flex">
                <div>
                    <SideBar />
                </div>

                <div className="flex-grow-1">
                    <main>
                        <Switch>
                            <Route exact path="/dashboard/" component={Dashboard} />
                            <Route exact path="/dashboard/users" component={UserIndex} />
                            <Route exact path="/dashboard/user/:id" component={UserProfile} />
                            <Route exact path="/dashboard/me" component={MyProfile} />
                            <Route exact path="/dashboard/requests" component={UpdateRequests} />
                        </Switch>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Master;