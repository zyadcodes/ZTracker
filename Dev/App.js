//The component that is launched once the app is launcehd. Just leads to the MainStackNavigator
import React, { Component } from 'react';
import MainNavigator from './src/MainNavigator';

//Exports the class
export default class App extends Component {
	//Renders the component
	render() {
		return <MainNavigator />;
	}
}
