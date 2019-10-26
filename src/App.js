import React, {Component} from 'react';

import Solve from './container/Solve/';
import Add from './container/Add/';
import NotFound from "./container/NotFound";

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import VerificationForm from "./components/VerificationForm";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import jwt from 'jsonwebtoken';

import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
    CognitoIdToken
} from 'amazon-cognito-identity-js';
import ForgetPasswordForm from "./components/ForgetPasswordForm";

const poolData = {
    UserPoolId: 'eu-central-1_CSkqliVpE',
    ClientId: 'ji16u7s383dok7qga6frds8dg',
};

class App extends Component {

    state = {
        activeTab: '',
        userData: {},
        signUpFormData: {},
        signInFormData: {},
        verificationFormData: {},
        forgetPasswordFormData: {},
        accessToken: null,
        authUser: null,
        name: '',
        familyName: ''
    }

    signIn = () => {
        const signInFormData = this.state.signInFormData;
        const username = signInFormData.username;
        const password = signInFormData.password;

        const {authenticationDetails, userData} = this.getUserPool(username, password);
        const cognitoUser = new CognitoUser(userData);

        const me = this;

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                const accessToken = result.getAccessToken().getJwtToken();

                me.setState({
                    userData: {username, password},
                    accessToken : accessToken,
                    authUser:username
                });

                // this.props.history.push('/coz')
                const url = '/coz';
                const win = window.open(url, '_self');
                win.focus();

            },

            onFailure: function(err) {

                if(err.message === 'User is disabled'){
                    me.navigateToVerification();
                }else{
                    toast.error(err.message || JSON.stringify(err), {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose:3000
                    });
                }
            },
        });
    }

    getUserPool(username, password) {
        const authenticationData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(
            authenticationData
        );

        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool,
        };
        return {authenticationDetails, userData};
    }

    signUp = () => {
        const user = this.state.signUpFormData.user;
        const mail = this.state.signUpFormData.mail;
        const name = this.state.signUpFormData.name;
        const familyName = this.state.signUpFormData.familyName;
        const level = this.state.signUpFormData.level;

        const phoneNumber = this.state.signUpFormData.phoneNumber;
        const password = this.state.signUpFormData.password;
        const passwordConfirm = this.state.signUpFormData.passwordConfirm;

        if(passwordConfirm !== password){
            toast.error('Doğrulama şifresi ile girilen şifre aynı olmalıdır', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose:3000
            });
            return;
        }
        const userPool = new CognitoUserPool(poolData);

        const attributeList = [];

        const dataEmail = {
            Name: 'email',
            Value: mail,
        };
        const attributeEmail = new CognitoUserAttribute(dataEmail);

        const dataPhoneNumber = {
            Name: 'phone_number',
            Value: phoneNumber,
        };
        const attributePhoneNumber = new CognitoUserAttribute(
            dataPhoneNumber
        );

        const dataName = {
            Name: 'name',
            Value: name,
        };
        const attributeName = new CognitoUserAttribute(
            dataName
        );

        const dataFamilyName = {
            Name: 'family_name',
            Value: familyName,
        };
        const attributeFamilyName = new CognitoUserAttribute(
            dataFamilyName
        );

        const dataLevel = {
            Name: 'level',
            Value: level,
        };
        const attributeLevel = new CognitoUserAttribute(
            dataLevel
        );

        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);
        attributeList.push(attributeName);
        attributeList.push(attributeFamilyName);
        // attributeList.push(attributeLevel);

        const me = this;
        userPool.signUp(user, password, attributeList, null, function(
            err,
            result
        ) {
            if (err) {
                toast.error(err.message || JSON.stringify(err), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose:3000
                });
                return;
            }
            const cognitoUser = result.user;
            me.navigateToVerification();

            console.log('user name is ' + cognitoUser.getUsername());
        });

        console.log('signUp');
    }

    onSignOutClick= () => {
        const userValues = this.state.userData;
        const {userData} = this.getUserPool(userValues.username, userValues.password);
        const userPool = userData.Pool;
        const user = userPool.getCurrentUser();
        if(user != null){
            user.signOut();
        }
        this.navigateToAuth();
    }


    navigateToAuth() {
        const url = '/giris';
        const win = window.open(url, '_self');
        win.focus();
    }

    navigateToVerification() {
        const url = '/dogrula';
        const win = window.open(url, '_self');
        win.focus();
    }

    navigateToPasswordReset() {
        const url = '/sifremiUnuttum';
        const win = window.open(url, '_self');
        win.focus();
    }

    updateState(event, signUpFormData) {
        const id = event.id;
        const value = event.value;
        signUpFormData[id] = value;
        this.setState({
            signUpFormData
        });
    }

    onSignInFormValueChange = (field, event) => {
        const signInFormData = this.state.signInFormData;
        this.updateState(event, signInFormData);
    }

    onSignUpFormValueChange = (field, event) => {
        const signUpFormData = this.state.signUpFormData;
        this.updateState(event, signUpFormData);
    }

    onVerificationFormValueChange = (field, event) => {
        const verificationFormData = this.state.verificationFormData;
        this.updateState(event, verificationFormData);
    }

    onForgetPasswordValueChange = (field, event) => {
        const forgetPasswordFormData = this.state.forgetPasswordFormData;
        this.updateState(event, forgetPasswordFormData);
    }

    onVerifyClick = () => {

        const username = this.state.verificationFormData.username;
        const code = this.state.verificationFormData.code;

        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        const me = this;
        cognitoUser.confirmRegistration(code, true, function(err, result) {
            if (err) {
                toast.error(err.message || JSON.stringify(err), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose:3000
                });
                return;
            }else{
                me.navigateToAuth();
            }
        });
    }

    onRegenerate = () => {
        const username = this.state.signInFormData.username;
        if(username !== null && username !== '' && username !== undefined){

            const userPool = new CognitoUserPool(poolData);
            const userData = {
                Username: username,
                Pool: userPool,
            };

            const cognitoUser = new CognitoUser(userData);
            const me = this;
            cognitoUser.forgotPassword({
                onSuccess: function(result) {
                    console.log('call result: ' + result);
                    me.navigateToPasswordReset();
                },
                onFailure: function(err) {
                    toast.error(err.message || JSON.stringify(err), {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose:3000
                    });
                },
            });
        }
    }

    onForgetPasswordResetClick = () => {
        const username = this.state.forgetPasswordFormData.username;
        const password = this.state.forgetPasswordFormData.password;
        const passwordConfirm = this.state.forgetPasswordFormData.passwordConfirm;
        const code = this.state.forgetPasswordFormData.code;


        if(username === null || username === '' || username === undefined
            || password === null || password === '' || password === undefined
            || passwordConfirm === null || passwordConfirm === '' || passwordConfirm === undefined
            || code === null || code === '' || code === undefined

        ){
            toast.error('Eksik bilgi girilmemelidir', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose:3000
            });
            return;
        }

        if(passwordConfirm !== password){
            toast.error('Doğrulama şifresi ile girilen şifre aynı olmalıdır', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose:3000
            });
            return;
        }

        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);
        const me = this;
        cognitoUser.confirmPassword(code, password,{
            onSuccess: function(result) {
                console.log('call result: ' + result);
                me.navigateToAuth();
            },
            onFailure: function(err) {
                toast.error(err.message || JSON.stringify(err), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose:3000
                });
            },
        });


    }

    getAuthUser() {
        const userPool = new CognitoUserPool(poolData);
        const user = userPool.getCurrentUser();
        return user;
    }

    componentDidMount() {
        const userPool = new CognitoUserPool(poolData);
        const user = userPool.getCurrentUser();

        if(user !== null){

            const token = user.storage.getItem('CognitoIdentityServiceProvider.58204gqdaq613tlsmrmfv9bcem.yimu187.accessToken');

            const decodedJwt = jwt.decode(token, { complete: true });
            console.log(decodedJwt);

            var me = this;

            user.getSession(function(err, session) {
                if (err) {
                    alert(err);
                    return;
                }
                user.getUserAttributes(function(err, result) {
                    if (err) {
                        alert(err);
                        return;
                    }
                    let name = '';
                    let familyName = '';
                    for (let i = 0; i < result.length; i++) {
                        const cognitoAttribute = result[i];
                        if(cognitoAttribute.Name === 'name'){
                            name = cognitoAttribute.Value;
                        }

                        if(cognitoAttribute.Name === 'family_name'){
                            familyName = cognitoAttribute.Value;
                        }

                        console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                    }

                    me.setState({
                        authUser: user !== null ? user.username : '',
                        name,
                        familyName
                    });
                });
            });
        }
    }

    render(){
        document.title = 'Bulmaca';
        return (
            <div>
                <ToastContainer/>
                <Router>
                    <Switch>
                        <Route exact path="/" render={
                            () => {

                                const userPool = new CognitoUserPool(poolData);
                                const user = userPool.getCurrentUser();

                                if(user == null){
                                    this.navigateToAuth()
                                }else{
                                    return <Solve active={true} onSignOutClick={this.onSignOutClick}
                                                  authUser={this.state.authUser}
                                                  authUserName={this.state.name}
                                                  authUserFamilyName={this.state.familyName}
                                    />
                                }
                            }
                        } />
                        <Route exact path="/coz" render={
                            () => {
                                const userPool = new CognitoUserPool(poolData);
                                const user = userPool.getCurrentUser();

                                if(user == null){
                                    this.navigateToAuth()
                                }else{
                                    return <Solve active={true} onSignOutClick={this.onSignOutClick}
                                                  authUser={this.state.authUser}
                                                  authUserName={this.state.name}
                                                  authUserFamilyName={this.state.familyName}
                                    />
                                }
                            }
                        }/>
                        <Route exact path="/ekle" render={
                            () => {

                                const user = this.getAuthUser();

                                if(user == null){
                                    this.navigateToAuth()
                                }else{
                                    return <Add active={true} onSignOutClick={this.onSignOutClick}
                                                authUser={this.state.authUser}
                                                authUserName={this.state.name}
                                                authUserFamilyName={this.state.familyName}
                                    />
                                }
                            }
                        }/>

                        <Route exact path="/giris" render={
                            () => {
                                return <SignInForm
                                    signIn={this.signIn}
                                    onRegenerate={this.onRegenerate}
                                    onValueChange={this.onSignInFormValueChange}
                                />;
                            }
                        }/>

                        <Route exact path="/kaydol" render={
                            () => {
                                return <SignUpForm
                                    signUp={this.signUp}
                                    onValueChange={this.onSignUpFormValueChange}
                                />;
                            }
                        }/>

                        <Route exact path="/dogrula" render={
                            () => {
                                return <VerificationForm
                                    onVerifyClick={this.onVerifyClick}
                                    onValueChange={this.onVerificationFormValueChange}
                                />;
                            }
                        }/>

                        <Route exact path="/sifremiUnuttum" render={
                            () => {
                                return <ForgetPasswordForm
                                    onVerifyClick={this.onForgetPasswordResetClick}
                                    onForgetPasswordValueChange={this.onForgetPasswordValueChange}
                                />;
                            }
                        }/>

                        <Route component={NotFound} />

                    </Switch>
                </Router>
            </div>
        )
    }
}
export default App;
