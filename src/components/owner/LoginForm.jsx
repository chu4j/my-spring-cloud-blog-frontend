import { enable } from 'darkreader'
import React from 'react'
import { Button, Form, Grid, Header, Icon, Image, Message, Segment } from 'semantic-ui-react'
import { enable as enableDarkReader } from 'darkreader';
export default function LoginForm() {

    return (<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 350 }}>
            <Header as='h2' color='olive' textAlign='center'>
                Sign in
      </Header>
            <Form size='large'>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                />
                <Button color='olive' fluid size='large'>
                    Login
          </Button>

            </Form>
            <Message>
                Go home? <a href='/'> Home page</a>
            </Message>
            <a onLoad={enableDarkReader({
                brightness: 100,
                contrast: 105,
                sepia: 25,
            })}></a>
        </Grid.Column>
    </Grid>
    )
}