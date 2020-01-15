//This is the screen where the user will be able to log out, or update any information such as their name or password
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import strings from 'config/strings';
import { screenHeight, screenWidth } from 'config/dimensions';
import fontStyles from 'config/fontStyles';
import screenStyle from 'config/screenStyle';

//creates the class
export default class accountScreen extends Component {
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
					<Text style={fontStyles.bigSubTitleStyleWhite}>{strings.Account}</Text>
				</View>
			</View>
		);
	}
}
