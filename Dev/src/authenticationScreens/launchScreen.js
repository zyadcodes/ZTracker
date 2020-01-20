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
import firebase from 'react-native-firebase';
import CodePush from 'react-native-code-push';
import ZAlert from '../components/ZAlert';

//Creates the exports the class
export default class launchScreen extends Component {
	//This will get rid of iOS default splash screen
	UNSAFE_componentWillMount() {
		SplashScreen.hide();
	}

	//State determining status of code push update
	state = {
		willRestart: false,
		status: ''
	};

	//This is going to fetch a code push update if there is one, then checks if a user is logged in and goes to
	//either the splash screen or the dashboard based on that
	async componentDidMount() {
		//Checks and installs CodePush update
		const update = await CodePush.checkForUpdate();
		if (update) {
			const status = await update.download();
			this.setState({
				willRestart: true,
				status
			});
			return;
		}

		let alreadyCalled = false;
		firebase.auth().onAuthStateChanged(async (user) => {
			if (alreadyCalled === false) {
				alreadyCalled = true;
				if (user) {
					const { uid } = user;
					this.props.navigation.push('UserScreens', {
						userID: uid
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
				{/*All the alerts for this screen*/}
				<ZAlert
					isVisible={this.state.willRestart}
					onPress={async () => {
						this.setState({ willRestart: false });
						await this.state.status.install();
						CodePush.restartApp();
					}}
					title={strings.Restart}
					message={strings.AppWillRestart}
				/>
			</View>
		);
	}
}
