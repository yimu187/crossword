import React from 'react'
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react';


const VerificationForm = (props) => {


    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='grey' textAlign='center'>
                    <Icon name={"puzzle piece"}/>
                    Kodu Doğrula
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input id={'username'} onChange={props.onValueChange} fluid icon='user' iconPosition='left' placeholder='Kullanıcı Adı'/>
                        <Form.Input id={'code'} onChange={props.onValueChange} fluid icon='user' iconPosition='left' placeholder='Doğrulama Kodu'/>

                        <Button color='grey' fluid size='large' onClick={props.onVerifyClick}>
                            Doğrula
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default VerificationForm
