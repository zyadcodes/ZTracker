//This is the screen where the user will be able to log out, or update any information such as their name or password
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import strings from 'config/strings';
import { screenHeight, screenWidth } from 'config/dimensions';
import fontStyles from 'config/fontStyles';
import screenStyle from 'config/screenStyle';
import ZTextInput from '../components/ZTextInput';
import ZButton from '../components/ZButton';
import ZAlert from '../components/ZAlert';
import { Icon } from 'react-native-elements';
import colors from 'config/colors';
import FirebaseFunctions from 'config/FirebaseFunctions';

//creates the class
export default class accountScreen extends Component {
	//Controls the state of the text field
	state = {
		name: this.props.navigation.state.params.user.name,
		isLoading: false,
		/* This controls the displaying of the alert that verifies the account has been saved */
		isAccountSavedVisible: false,
		fieldsError: false
	};

	//This method is going to save the user's new name to the database
	async saveUser() {
		const { name } = this.state;

		if (name.trim().length === 0) {
			this.setState({
				fieldsError: true
			});
		} else {
			this.setState({
				isLoading: true
			});
			await FirebaseFunctions.call('updateUserByID', {
				updates: {
					name
				},
				userID: this.props.navigation.state.params.userID
			});
			this.setState({
				isLoading: false,
				isAccountSavedVisible: true
			})
		}
	}

	//Renders the class
	render() {
		return (
			<View style={screenStyle.container}>
				<View
					style={{
						marginTop: screenHeight * 0.1,
						marginBottom: screenHeight * 0.05,
						justifyContent: 'center',
						alignItems: 'center',
						alignSelf: 'center'
					}}>
					<Text style={fontStyles.bigSubTitleStyleWhite}>{strings.Account}</Text>
				</View>
				<View style={{ marginBottom: screenHeight * 0.05 }}>
					<Icon type={'font-awesome'} size={65} color={colors.green} name={'money'} />
				</View>
				<View style={{ marginBottom: screenHeight * 0.05 }}>
					<ZTextInput
						title={strings.Name}
						placeholder={strings.EnterYourNameDotDotDot}
						onChangeText={(text) => {
							this.setState({ name: text });
						}}
						value={this.state.name}
					/>
				</View>
				<View style={{ marginBottom: screenHeight * 0.25 }}>
					<ZButton
						text={strings.Save}
						onPress={() => {
							//Saves the account information for the user
							this.saveUser();
						}}
						isLoading={this.state.isLoading}
					/>
				</View>
				<View>
					<ZButton
						text={strings.LogOut}
						onPress={() => {
							//Logs the user out
							FirebaseFunctions.logOut();
							this.props.navigation.push('SplashScreen');
						}}
					/>
				</View>
				{/* The following will be all the alerts for this screen  */}
				<ZAlert
					isVisible={this.state.isAccountSavedVisible}
					onPress={() => {
						this.setState({ isAccountSavedVisible: false });
					}}
					title={strings.AccountSaved}
					message={strings.AccountHasBeenSaved}
				/>
				<ZAlert
					isVisible={this.state.fieldsError}
					onPress={() => {
						this.setState({ fieldsError: false });
					}}
					title={strings.Whoops}
					message={strings.PleaseFillOutAllFields}
				/>
			</View>
		);
	}
}
