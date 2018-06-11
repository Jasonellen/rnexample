import React from 'react'
import { Text } from 'react-native'
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook'

import Button from './Button'
import CenterView from './CenterView'
import Welcome from './Welcome'

import App from './App/Containers/App'

storiesOf('Screen', module)
  .add('Login', () => (
    <App initialScene={'login'} onNewUser={linkTo('Screen', 'NewUser')} onForget={linkTo('Screen', 'ForgetPassword')} onSubmit={action('clicked-login')} />
  ))
  .add('NewUser', () => (
    <App initialScene={'newUser'} />
  ))
  .add('Register', () => (
    <App initialScene={'register'} onSubmit={action('clicked-register-submit')} onRegisterAgreements={linkTo('Screen', 'RegisterAgreements')} />
  ))
  .add('RegisterAgreements', () => (
    <App initialScene={'registerAgreements'} onBack={linkTo('Screen', 'Register')} uri={'https://doctor.mdshealth.cn/agreements/doctor_register'} />
  ))
  .add('ForgetPassword', () => (
    <App initialScene={'forgetPassword'} onSubmit={action('clicked-forget-password')} />
  ))
  .add('Home', () => (
    <App initialScene={'home'} showTabbar showHomeTab onQrcode={linkTo('Screen', 'Card')} onAddFriend={action('clicked-add-friend')} onGroupChat={action('clicked-group-chat')} onPostMessage={action('clicked-post-message')} onWodedaxuetang={linkTo('Screen', 'MySchool')} onGuojiyiliaolianmeng={action('onGuojiyiliaolianmeng')} onWodezhensuo={action('onWodezhensuo')} onExpertTeam={action('onExpertTeam')} onDoctorCollaboration={action('onDoctorCollaboration')} onResearchTopic={action('onResearchTopic')} />
  ))
  .add('Card', () => (
    <App initialScene={'card'} toQualification={linkTo('Screen', 'Qualification')} />
  ))
  .add('Qualification', () => (
    <App initialScene={'qualification'} />
  ))
  .add('MySchool', () => (
    <App initialScene={'mySchool'} showTabbar showHomeTab onChooseStream={action('onChooseStream')} onStreams={action('onStreams')} onStreamsReview={action('onStreamsReview')} />
  ))
  .add('Patients', () => (
    <App initialScene={'patients'} showTabbar />
  ))
  .add('Friends', () => (
    <App initialScene={'friends'} showTabbar />
  ))
  .add('Users', () => (
    <App initialScene={'users'} showTabbar goTo={(data) => linkTo('Screen', data)} />
  ))
  .add('LiveList', () => (
    <App initialScene={'liveList'} />
  ))
  .add('DoctorRegister', () => (
    <App initialScene={'doctorRegister'} />
  ))
  .add('StudentRegister', () => (
    <App initialScene={'studentRegister'} />
  ))
  .add('VisitorRegister', () => (
    <App initialScene={'visitorRegister'} />
  ))
  .add('BindNewAccount', () => (
    <App initialScene={'bindNewAccount'} />
  ))
  .add('BindAccount', () => (
    <App initialScene={'bindAccount'} />
  ))

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')} />
  ))

storiesOf('Button', module)
  .addDecorator(getStory => (
    <CenterView>{getStory()}</CenterView>
  ))
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ))
