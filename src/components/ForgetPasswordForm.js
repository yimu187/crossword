import React from 'react'
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react';


const ForgetPasswordForm = (props) => {


    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='grey' textAlign='center'>
                    <Icon name={"puzzle piece"}/>
                    Şifremi Unuttum
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input id={'username'} onChange={props.onForgetPasswordValueChange} fluid icon='user' iconPosition='left' placeholder='Kullanıcı Adı'/>
                        <Form.Input id={'code'} onChange={props.onForgetPasswordValueChange} fluid icon='code' iconPosition='left' placeholder='Doğrulama Kodu'/>
                        <Form.Input
                            id={'password'}
                            onChange={props.onForgetPasswordValueChange}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Şifre'
                            type='password'
                        />

                        <Form.Input
                            id={'passwordConfirm'}
                            onChange={props.onForgetPasswordValueChange}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Şifre'
                            type='password'
                        />

                        <Button color='grey' fluid size='large' onClick={props.onVerifyClick}>
                            Doğrula
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default ForgetPasswordForm
