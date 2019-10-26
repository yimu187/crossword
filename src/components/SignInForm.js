import React from 'react'
import { Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react';


const SignInForm = (props) => {

    const onSignupClick = () => {
        const url = '/kaydol';
        const win = window.open(url, '_self');
        win.focus();
    }

    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='grey' textAlign='center'>
                    <Icon name={"puzzle piece"}/>
                    Giriş Yapın
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input id={'username'} onChange={props.onValueChange} fluid icon='user' iconPosition='left' placeholder='Kullanıcı Adı'/>
                        <Form.Input
                            id={'password'}
                            onChange={props.onValueChange}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Şifre'
                            type='password'
                        />

                        <Button color='grey' fluid size='large' onClick={props.signIn}>
                            Giriş
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Kayıt olmak için. <a a href='#' onClick={onSignupClick}>Kaydol</a>
                    <br/>
                    Şifremi unuttum. <a a href='#' onClick={props.onRegenerate}>Tekrar Oluştur</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default SignInForm
