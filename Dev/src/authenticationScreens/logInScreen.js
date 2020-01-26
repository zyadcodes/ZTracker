//This is the screen that a user with an existing account will be able to log into their account. Simple email & password
//screen
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import strings from 'config/strings';
import fontStyles from 'config/fontStyles';
import screenStyle from 'config/screenStyle';
import { screenHeight, screenWidth } from 'config/dimensions';
import ZTextInput from '../components/ZTextInput';
import ZButton from '../components/ZButton';
import KeyboardAvoidingView from '../components/KeyboardAvoidingView';
import colors from 'config/colors';
import { Icon } from 'react-native-elements';
import ZAlert from '../components/ZAlert';
import FirebaseFunctions from 'config/FirebaseFunctions';

//Exports the component
export default class logInScreen extends Component {
  //Controls the value of the text input fields
  state = {
    email: '',
    password: '',
    isLoading: false,
    /* The following will be all the booleans for Alert isVisible*/
    fieldsError: false,
    incorrectInfoError: false
  };

  //This method will log in the user then  navigate to the main screen if the information is correct
  async login() {
    const { email, password } = this.state;
    if (email.trim().length === 0 || password.trim().length === 0) {
      this.setState({ fieldsError: true });
    } else {
      this.setState({ isLoading: true });
      const userID = await FirebaseFunctions.logIn(email, password);
      if (userID === -1) {
        this.setState({ isLoading: false, incorrectInfoError: true });
      } else {
        const user = await FirebaseFunctions.call('getUserByID', { userID });
        const allMonths = await FirebaseFunctions.call('getAllMonthsByID', { userID });
        this.setState({
          isLoading: false
        });
        this.props.navigation.push('UserScreens', {
		  userID,
		  user,
		  allMonths
        });
      }
    }
  }

  //Render the component
  render() {
    return (
      <KeyboardAvoidingView style={screenStyle.container}>
        <View
          style={{
            marginTop: screenHeight * 0.1,
            marginBottom: screenHeight * 0.075,
            width: screenWidth,
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row'
          }}>
          <TouchableOpacity
            style={{
              width: screenWidth * 0.2,
              marginLeft: screenWidth * 0.02,
              marginRight: screenWidth * 0.1,
              alignItems: 'flex-start'
            }}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Icon size={30} name={'angle-left'} type={'font-awesome'} color={colors.green} />
          </TouchableOpacity>
          <Text style={fontStyles.bigSubTitleStyleWhite}>{strings.LogIn}</Text>
        </View>
        <View style={{ marginBottom: screenHeight * 0.1 }}>
          <ZTextInput
            title={strings.Email}
            autoCapitalize={'none'}
            placeholder={strings.EnterYourEmailDotDotDot}
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
            value={this.state.email}
          />
        </View>
        <View style={{ marginBottom: screenHeight * 0.1 }}>
          <ZTextInput
            title={strings.Password}
            autoCapitalize={'none'}
            placeholder={strings.EnterYourPasswordDotDotDot}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
            password={true}
            value={this.state.password}
          />
        </View>
        <View style={{ marginBottom: screenHeight * 0.1 }}>
          <ZButton
            text={strings.LogIn}
            isLoading={this.state.isLoading}
            onPress={() => {
              //Logs in the user
              this.login();
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: screenWidth * 0.6,
            height: screenHeight * 0.075
          }}
          onPress={() => {
            this.props.navigation.push('ResetPasswordScreen');
          }}>
          <Text style={fontStyles.bigTextStyleGreen}>{strings.ResetPassword}</Text>
        </TouchableOpacity>
        {/*The following components are all the alerts that can pop up on this screen*/}
        <ZAlert
          isVisible={this.state.fieldsError}
          onPress={() => {
            this.setState({ fieldsError: false });
          }}
          title={strings.Whoops}
          message={strings.PleaseFillOutAllFields}
        />
        <ZAlert
          isVisible={this.state.incorrectInfoError}
          onPress={() => {
            this.setState({ incorrectInfoError: false });
          }}
          title={strings.Whoops}
          message={strings.IncorrentEmailPassword}
        />
      </KeyboardAvoidingView>
    );
  }
}
