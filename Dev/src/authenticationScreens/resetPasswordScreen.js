//This screen will be used to reset user passwords
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import strings from 'config/strings';
import fontStyles from 'config/fontStyles';
import screenStyle from 'config/screenStyle';
import { screenHeight, screenWidth } from 'config/dimensions';
import ZTextInput from '../components/ZTextInput';
import ZButton from '../components/ZButton';
import KeyboardAvoidingView from '../components/KeyboardAvoidingView';
import FirebaseFunctions from 'config/FirebaseFunctions';
import { Icon } from 'react-native-elements';
import colors from 'config/colors';
import ZAlert from '../components/ZAlert';

//Creates and exports the class
export default class resetPasswordScreen extends Component {
	//The state controlling the text fields
	state = {
		email: '',
		emailSent: false
	};

	//Sends the reset password email
	resetPassword() {
		const { email } = this.state;
		FirebaseFunctions.resetPassword(email);
		this.setState({ emailSent: true });
	}

	//Renders the screen
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
					<Text style={fontStyles.bigSubTitleStyleWhite}>{strings.ResetPassword}</Text>
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
					<ZButton
						text={strings.ResetPassword}
						onPress={() => {
							//Logs in the user
							this.resetPassword();
						}}
					/>
				</View>
				{/*The following components are alerts used in this screen*/}
				<ZAlert
					isVisible={this.state.emailSent}
					onPress={() => {
						this.setState({ emailSent: false });
						this.props.navigation.goBack();
					}}
					title={strings.Whoops}
					message={strings.EmailSent}
				/>
			</KeyboardAvoidingView>
		);
	}
}
