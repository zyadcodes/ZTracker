//This is the screen which will display a monthly analysis of the user's history. It'll be a simple table that will
//show the month, revenue, expense, and revenue according the user's selection. It'll be customizable based on what
//the user wants to view specifically.
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import strings from 'config/strings';
import { screenHeight, screenWidth } from 'config/dimensions';
import fontStyles from 'config/fontStyles';
import screenStyle from 'config/screenStyle';

//creates the class
export default class historyScreen extends Component {
	//Renders the class
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
					<Text style={fontStyles.bigSubTitleStyleWhite}>{strings.History}</Text>
				</View>
			</View>
		);
	}
}