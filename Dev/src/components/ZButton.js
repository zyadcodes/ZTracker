//This component will be the default button that is going to be used throughout the app. It'll be green with a white
//font for the text.
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import colors from 'config/colors';
import { screenWidth, screenHeight } from 'config/dimensions';
import fontStyles from 'config/fontStyles';
import PropTypes from 'prop-types';

//declares the class
class ZButton extends Component {
	//renders the button
	render() {
		//Fetches the passes in props
		const { text, onPress, isLoading } = this.props;
		return (
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					alignSelf: 'center'
				}}>
				<TouchableOpacity
					onPress={() => {
						onPress();
					}}
					disabled={isLoading === true ? true : false}
					style={{
						width: screenWidth * 0.8,
						justifyContent: 'center',
						alignItems: 'center',
						height: screenHeight * 0.05,
						backgroundColor: colors.green
					}}>
					{isLoading === true ? (
						<ActivityIndicator animating={true} color={colors.white} size={25} />
					) : (
						<Text style={fontStyles.bigTextStyleWhite}>{text}</Text>
					)}
				</TouchableOpacity>
			</View>
		);
	}
}

//Declares the prop type for the button. It will just be the text to render and an onPress method. Both are required.
//It will take an optional isLoading prop to determine when to turn on the progress indicator
ZButton.propTypes = {
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	isLoading: PropTypes.bool
};

//exports the module
export default ZButton;
