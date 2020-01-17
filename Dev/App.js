//The component that is launched once the app is launcehd. Just leads to the MainStackNavigator
import React, { Component } from 'react';
import MainNavigator from './src/MainNavigator';
import { YellowBox } from 'react-native';

//Exports the class
export default class App extends Component {
	//Renders the component
	render() {
		YellowBox.ignoreWarnings(['Deprecation in \'createStackNavigator\'']);
		return <MainNavigator />;
	}
}
