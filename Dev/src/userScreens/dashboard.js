//This is the landing screen of the app when a user is logged into the app. It'll display graphs of the profit,
//revenue, and expenses for the given user
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import strings from 'config/strings';
import { screenHeight, screenWidth } from 'config/dimensions';
import fontStyles from 'config/fontStyles';
import screenStyle from 'config/screenStyle';

//creates the class
export default class dashboard extends Component {
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
					<Text style={fontStyles.bigSubTitleStyleWhite}>{strings.Dashboard}</Text>
				</View>
			</View>
		);
	}
}