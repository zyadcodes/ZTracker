//This component will be the default button that is going to be used throughout the app. It'll be green with a white
//font for the text.
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import colors from 'config/colors';
import { screenWidth, screenHeight } from 'config/dimensions';
import fontStyles from 'config/fontStyles';
import PropTypes from 'prop-types';

//declares the class
class ZButton extends Component {
	//renders the button
	render() {
		//Fetches the passes in props
		const { text, onPress } = this.props;
		return (
			<TouchableOpacity
				onPress={() => {
					onPress();
				}}
				style={{
					width: screenWidth * 0.8,
					justifyContent: 'center',
					alignItems: 'center',
					height: screenHeight * 0.05
				}}>
				<Text style={fontStyles.mainTextStyleWhite}>{text}</Text>
			</TouchableOpacity>
		);
	}
}

//Declares the prop type for the button. It will just be the text to render and an onPress method. Both are required.
ZButton.propTypes = {
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired
};

//exports the module
export default ZButton;
