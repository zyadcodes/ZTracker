//This screen will just be the loading screen for the app where multiple things will happen. It will fetch an update
//from code push if there is one. It will also test if a user is currently logged in.
import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import strings from 'config/strings';
import screenStyle from 'config/screenStyle';
import SplashScreen from 'react-native-splash-screen';
import { Icon } from 'react-native-elements';
import { screenHeight, screenWidth } from 'config/dimensions';
import colors from 'config/colors';
import fontStyles from 'config/fontStyles';
import FirebaseFunctions from 'config/FirebaseFunctions';
import firebase from 'react-native-firebase';

//Creates the exports the class
export default class launchScreen extends Component {
	//This will get rid of iOS default splash screen
	UNSAFE_componentWillMount() {
		SplashScreen.hide();
	}

	//This is going to fetch a code push update if there is one, then checks if a user is logged in and goes to
	//either the splash screen or the dashboard based on that
	async componentDidMount() {
		let alreadyCalled = false;
		firebase.auth().onAuthStateChanged(async (user) => {
			if (alreadyCalled === false) {
				alreadyCalled = true;
				if (user) {
					const { uid } = user;
					//Fetches the user's data & then navigates the user screens
					const userObject = await FirebaseFunctions.call('getUserByID', {
						userID: uid
					});
					this.props.navigation.push('UserScreens', {
						userID: uid,
						user: userObject
					});
				} else {
					this.props.navigation.push('SplashScreen');
				}
			}
		});
	}

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
				<View style={{ marginBottom: screenHeight * 0.25 }}>
					<Icon type={'font-awesome'} size={100} color={colors.green} name={'money'} />
				</View>
				<ActivityIndicator size={'large'} animating={true} color={colors.green} />
			</View>
		);
	}
}
