//This is the sign up screen for the app. Here, the user will enter in email information and create a password and then
//sign up for their account
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import strings from 'config/strings';
import fontStyles from 'config/fontStyles';
import screenStyle from 'config/screenStyle';
import { screenHeight, screenWidth } from 'config/dimensions';
import ZTextInput from '../components/ZTextInput';
import ZButton from '../components/ZButton';
import KeyboardAvoidingView from '../components/KeyboardAvoidingView';
import ZAlert from '../components/ZAlert';
import { Icon } from 'react-native-elements';
import colors from 'config/colors';
import FirebaseFunctions from 'config/FirebaseFunctions';

//Exports the component
export default class signUpScreen extends Component {
  //Controls the value of the text input fields
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
    /* The following fields will be for fields*/
    fieldsError: false,
    emailError: false,
    passwordMatchError: false,
    passwordError: false,
    emailExistsError: false
  };

  //This method will check that all fields are what they're supposed be, and then create the user if they are
  async signUp() {
    const { name, email, password, confirmPassword } = this.state;
    //Checks if fields are all completed
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      confirmPassword.trim().length === 0
    ) {
      this.setState({ fieldsError: true });
    } //Checks if the email is in the correct format
    else if (!email.includes('@')) {
      this.setState({ emailError: true });
    } //Checks that both the password and the confirm password match
    else if (password !== confirmPassword) {
      this.setState({ passwordMatchError: true });
    } //Checks if the password is of proper length
    else if (password.length < 6) {
      this.setState({ passwordError: true });
    } else {
      //Turns on the button loading animation
      this.setState({
        isLoading: true
      });
      //Creates the user. Then it goes to the main screen. If the user already exists, a pop up comes up
      const userID = await FirebaseFunctions.signUp(email, password, name);
      if (userID === -1) {
        this.setState({ emailExistsError: true, isLoading: false });
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
          <Text style={fontStyles.bigSubTitleStyleWhite}>{strings.SignUp}</Text>
        </View>
        <View style={{ marginBottom: screenHeight * 0.03 }}>
          <ZTextInput
            title={strings.Name}
            placeholder={strings.EnterYourNameDotDotDot}
            onChangeText={(text) => {
              this.setState({ name: text });
            }}
            value={this.state.name}
          />
        </View>
        <View style={{ marginBottom: screenHeight * 0.03 }}>
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
        <View style={{ marginBottom: screenHeight * 0.03 }}>
          <ZTextInput
            title={strings.CreatePassword}
            autoCapitalize={'none'}
            placeholder={strings.CreateAPasswrodDotDotDot}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
            value={this.state.password}
            password={true}
          />
        </View>
        <View style={{ marginBottom: screenHeight * 0.03 }}>
          <ZTextInput
            title={strings.ConfirmPassword}
            autoCapitalize={'none'}
            placeholder={strings.ReenterYourPasswordDotDotDot}
            onChangeText={(text) => {
              this.setState({ confirmPassword: text });
            }}
            value={this.state.confirmPassword}
            password={true}
          />
        </View>
        <View>
          <ZButton
            text={strings.SignUp}
            onPress={() => {
              //Creates the user
              this.signUp();
            }}
            isLoading={this.state.isLoading}
          />
        </View>
        {/* The following will be all the alerts for this screen  */}
        <ZAlert
          isVisible={this.state.fieldsError}
          onPress={() => {
            this.setState({ fieldsError: false });
          }}
          title={strings.Whoops}
          message={strings.PleaseFillOutAllFields}
        />
        <ZAlert
          isVisible={this.state.emailError}
          onPress={() => {
            this.setState({ emailError: false });
          }}
          title={strings.Whoops}
          message={strings.PleaseEnterAValidEmail}
        />
        <ZAlert
          isVisible={this.state.passwordMatchError}
          onPress={() => {
            this.setState({ passwordMatchError: false });
          }}
          title={strings.Whoops}
          message={strings.BothPasswordsMustMatch}
        />
        <ZAlert
          isVisible={this.state.passwordError}
          onPress={() => {
            this.setState({ passwordError: false });
          }}
          title={strings.Whoops}
          message={strings.ShortPassword}
        />
        <ZAlert
          isVisible={this.state.emailExistsError}
          onPress={() => {
            this.setState({ emailExistsError: false });
          }}
          title={strings.Whoops}
          message={strings.EmailExists}
        />
      </KeyboardAvoidingView>
    );
  }
}
