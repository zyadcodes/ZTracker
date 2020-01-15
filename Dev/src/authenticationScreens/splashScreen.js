//This is the splash screen of the app. It'll contain the ability to log in or sign up to the app. Will only show if
//the user is not already logged into a screen
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ZButton from '../components/ZButton';
import strings from 'config/strings';
import fontStyles from 'config/fontStyles';
import screenStyle from 'config/screenStyle';
import { screenHeight } from 'config/dimensions';
import { Icon } from 'react-native-elements';
import colors from 'config/colors';

//creates the exports the class
export default class splashScreen extends Component {
	//Renders the screen
	render() {
		return (
			<View style={screenStyle.container}>
				<View
					style={{
						marginTop: screenHeight * 0.1,
						marginBottom: screenHeight * 0.25,
						justifyContent: 'center',
						alignItems: 'center',
						alignSelf: 'center'
					}}>
					<Text style={fontStyles.bigSubTitleStyleWhite}>{strings.ZTracker}</Text>
				</View>
				<View style={{ marginBottom: screenHeight * 0.1 }}>
					<Icon type={'font-awesome'} size={100} color={colors.green} name={'money'} />
				</View>
				<View
					style={{
						marginBottom: screenHeight * 0.1
					}}>
					<ZButton
						text={strings.LogIn}
						onPress={() => {
							//Goes to the Log in screen
							this.props.navigation.push('LogInScreen');
						}}
					/>
				</View>
				<View>
					<ZButton
						text={strings.SignUp}
						onPress={() => {
							//Goes to the sign up screen
							this.props.navigation.push('SignUpScreen');
						}}
					/>
				</View>
			</View>
		);
	}
}
