import React from 'react'
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react';


const SignUpForm = (props) => {

    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='grey' textAlign='center'>
                    <Icon name={"puzzle piece"}/>
                    Kayıt Olun
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input id={'user'} onChange={props.onValueChange} fluid icon='user' iconPosition='left' placeholder='Kullanıcı Adı'/>
                        <Form.Input id={'mail'} onChange={props.onValueChange} fluid icon='mail' iconPosition='left' placeholder='E-Posta'/>
                        <Form.Input id={'name'} onChange={props.onValueChange} fluid icon='user' iconPosition='left' placeholder='İsim'/>
                        <Form.Input id={'familyName'} onChange={props.onValueChange} fluid icon='user' iconPosition='left' placeholder='Soyisim'/>
                        <Form.Input id={'level'} onChange={props.onValueChange} fluid icon='level up' iconPosition='left' placeholder='Derece'/>
                        <Form.Input id={'phoneNumnber'} type={'number'} onChange={props.onValueChange} fluid icon='phone' iconPosition='left' placeholder='Telefon'/>

                        <Form.Input
                            id={'password'}
                            onChange={props.onValueChange}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Şifre'
                            type='password'
                        />
                        <Form.Input
                            id={'passwordConfirm'}
                            onChange={props.onValueChange}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Şifre Doğrula'
                            type='password'
                        />

                        <Button color='grey' fluid size='large' onClick={props.signUp}>
                            Kaydol
                        </Button>
                    </Segment>
                </Form>

                {/*<br/>*/}
                {/*<br/>*/}

                {/*<Form size='large'>*/}
                    {/*<Segment stacked>*/}
                        {/*<Form.Input fluid icon='user' iconPosition='left' placeholder='Kullanıcı Adı'/>*/}
                        {/*<Form.Input fluid icon='code' iconPosition='left' placeholder='E-Posta'/>*/}

                        {/*<Button color='grey' fluid size='large'>*/}
                            {/*Kaydol*/}
                        {/*</Button>*/}
                    {/*</Segment>*/}
                {/*</Form>*/}
            </Grid.Column>
        </Grid>
    )
}

export default SignUpForm
