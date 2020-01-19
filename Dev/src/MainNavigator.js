//This will be the main naivgator that the app will use to navigate between the STACK screens. The rest of the app
//will be through a bottom tab navigator
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import logInScreen from './authenticationScreens/logInScreen';
import splashScreen from './authenticationScreens/splashScreen';
import signUpScreen from './authenticationScreens/signUpScreen';
import resetPasswordScreen from './authenticationScreens/resetPasswordScreen';
import userTabNavigator from './userScreens/userTabNavigator';
import launchScreen from './authenticationScreens/launchScreen';
import specificMonthScreen from './userScreens/specificMonthScreen';

//The route config for all of the screens
const routeConfig = {
	//Route leads to the launch screen
	LaunchScreen: {
		screen: launchScreen,
		navigationOptions: {
			gestureEnabled: false
		}
	},

	//Takes you to the splash screen of the app
	SplashScreen: {
		screen: splashScreen,
		navigationOptions: ({ navigation }) => ({
			gestureEnabled: false
		})
	},

	//Takes you to the login screen of the app
	LogInScreen: {
		screen: logInScreen,
		navigationOptions: ({ navigation }) => ({
			gestureEnabled: false
		})
	},

	//Takes you to the sign up screen of the app
	SignUpScreen: {
		screen: signUpScreen,
		navigationOptions: ({ navigation }) => ({
			gestureEnabled: false
		})
	},

	//Takes you to the reset password screen
	ResetPasswordScreen: {
		screen: resetPasswordScreen,
		navigationOptions: ({ navigation }) => ({
			gestureEnabled: false
		})
	},

	SpecificMonthScreen: {
		screen: specificMonthScreen,
		navigationOptions: ({ navigation }) => ({
			gestureEnabled: false
		})
	},

	//Takes you to the user screens
	UserScreens: {
		screen: userTabNavigator,
		navigationOptions: ({ navigation }) => ({
			gestureEnabled: false
		})
	}
};

//The navigation config containing the initial route name
const navigatorConfig = {
	initialRouteName: 'LaunchScreen',
	headerMode: 'none'
};

//Creates & exports the stack navigator
const MainStackStackNavigator = createStackNavigator(routeConfig, navigatorConfig);
const MainStackNavigator = createAppContainer(MainStackStackNavigator);
export default MainStackNavigator;
