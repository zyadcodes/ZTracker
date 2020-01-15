//This component is going tto be the default text input that is going to be used throughout this app. It will
//take in a title as a prop, a placeholder, and a onChange method
import React, { Component } from 'react';
import fontStyles from 'config/fontStyles';
import colors from 'config/colors';
import { screenWidth, screenHeight } from 'config/dimensions';
import { View, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';

//Creates the class
class ZTextInput extends Component {
	//Renders the component
	render() {
		//Fetches the props
		const { title, placeholder, onChangeText, value, password, autoCapitalize } = this.props;
		return (
			<View
				style={{
					width: screenWidth * 0.8,
					flexDirection: 'column',
					alignItems: 'flex-start'
				}}>
				<View style={{ marginBottom: screenHeight * 0.02 }}>
					<Text style={fontStyles.bigTextStyleWhite}>{title}</Text>
				</View>
				<View>
					<TextInput
						style={{
							width: screenWidth * 0.8,
							backgroundColor: colors.white,
							color: colors.black,
							height: screenHeight * 0.05,
							paddingLeft: screenWidth * 0.02
						}}
						secureTextEntry={password ? password : false}
						autoCapitalize={autoCapitalize ? autoCapitalize : 'sentences'}
						placeholder={placeholder}
						value={value}
						onChangeText={(text) => {
							onChangeText(text);
						}}
					/>
				</View>
			</View>
		);
	}
}

//Declares the prop type for the button. Required are title, onChangeText, and value.
//Optional are placeholder, autoCapitalize, and password mode
ZTextInput.propTypes = {
	title: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	onChangeText: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	password: PropTypes.bool,
	autoCapitalize: PropTypes.string
};

//exports the module
export default ZTextInput;
