//this is going to be the navigator of the main app which will control the tabs at the bottom of the app
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import colors from 'config/colors';
import { Icon } from 'react-native-elements';
import strings from 'config/strings';
import fontStyles from 'config/fontStyles';
import accountScreen from './accountScreen';
import addScreen from './addScreen';
import dashboard from './dashboard';
import historyScreen from './historyScreen';
import { screenHeight } from 'config/dimensions';

//The route configurations
const routeConfig = {


	HistoryScreen: {
		screen: historyScreen,
		navigationOptions: {
			tabBarLabel: strings.History,
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon name='table' size={30} type='font-awesome' color={tintColor} />
			)
		}
	},
	Dashboard: {
		screen: dashboard,
		navigationOptions: {
			tabBarLabel: strings.Dashboard,
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon name='chart-line' size={30} type='material-community' color={tintColor} />
			)
		}
	},
	AddScreen: {
		screen: addScreen,
		navigationOptions: {
			tabBarLabel: strings.Add,
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon name='plus-square' size={30} type='font-awesome' color={tintColor} />
			)
		}
	},
	AccountScreen: {
		screen: accountScreen,
		navigationOptions: {
			tabBarLabel: strings.Account,
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon name='user' size={30} type='font-awesome' color={tintColor} />
			)
		}
	},
};

const navigatorConfig = {
	initialRouteName: 'Dashboard',
	animationEnabled: false,
	swipeEnabled: false,
	// Android's default option displays tabBars on top, but iOS is bottom
	tabBarPosition: 'bottom',
	tabBarOptions: {
		activeTintColor: colors.green,
		inactiveTintColor: colors.darkGrey,
		style: {
			backgroundColor: colors.black,
			height: screenHeight * 0.1,
			borderColor: colors.black
		},
		labelStyle: fontStyles.subTextStyleNoColor,
		// Android's default showing of icons is false whereas iOS is true
		showIcon: true
	}
};

const ZBottomTab = createBottomTabNavigator(routeConfig, navigatorConfig);

const ZBottomTabNavigator = createAppContainer(ZBottomTab);

export default ZBottomTabNavigator;
