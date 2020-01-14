//This will be the main naivgator that the app will use to navigate between the STACK screens. The rest of the app
//will be through a bottom tab navigator
import { createStackNavigator, createAppContainer } from 'react-navigation';
import logInScreen from './authenticationScreens/logInScreen';
import splashScreen from './authenticationScreens/splashScreen';
import signUpScreen from './authenticationScreens/signUpScreen';

//The route config for all of the screens
const routeConfig = {
	//Takes you to the splash screen of the app
	SplashScreen: {
		screen: splashScreen,
		navigationOptions: ({ navigation }) => ({
			gesturesEnabled: false
		})
	},

	//Takes you to the login screen of the app
	LogInScreen: {
		screen: logInScreen,
		navigationOptions: ({ navigation }) => ({
			gesturesEnabled: false
		})
	},
	//Takes you to the sign up screen of the app
	SignUpScreen: {
		screen: signUpScreen,
		navigationOptions: ({ navigation }) => ({
			gesturesEnabled: false
		})
	}
};

//The navigation config containing the initial route name
const navigatorConfig = {
	initialRouteName: 'SplashScreen',
	headerMode: 'none'
};

//Creates & exports the stack navigator
const MainStackStackNavigator = createStackNavigator(routeConfig, navigatorConfig);
const MainStackNavigator = createAppContainer(MainStackStackNavigator);
export default MainStackNavigator;
