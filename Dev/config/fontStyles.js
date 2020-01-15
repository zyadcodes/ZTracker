//This file will contain all of the font styles that will be used through out the project
//This class will represent all the font styles that should be used throughout the application
//This includes font families, sizes, and colors.
import colors from './colors';
import { StyleSheet, Platform, PixelRatio } from 'react-native';

//Gets the correct font based on either iOS or Android
const font = 'Arial';

//Sets the font size
let baseFontSize = Platform.OS === 'android' ? 20 : 18;
const pixelRatio = PixelRatio.get();
if (pixelRatio < 3) {
	baseFontSize = Platform.OS === 'android' ? 16 : 14.4;
}

const bigFontSize = baseFontSize * 1.2;
const subTextFontSize = baseFontSize * 0.9;
const subTitleFontSize = baseFontSize * 2.2;
const bigTitleFontSize = baseFontSize * 4.4;

export default StyleSheet.create({
	//The style for all big text that will be colored black
	bigTextStyleBlack: {
		fontFamily: font,
		fontSize: bigFontSize,
		color: colors.black,
		fontWeight: 'bold'
	},

	//The style for all big text that will be colored white
	bigTextStyleWhite: {
		fontFamily: font,
		fontSize: bigFontSize,
		color: colors.white,
		fontWeight: 'bold'
	},

	//The style for all big text that will be colored green
	bigTextStyleGreen: {
		fontFamily: font,
		fontSize: bigFontSize,
		color: colors.green,
		fontWeight: 'bold'
	},

	//The style for main text that will be colored black
	mainTextStyleBlack: {
		fontFamily: font,
		fontSize: baseFontSize,
		color: colors.black,
		fontWeight: 'bold'
	},

	//The style for main text that will be colored green
	mainTextStyleGreen: {
		fontFamily: font,
		fontSize: baseFontSize,
		color: colors.green,
		fontWeight: 'bold'
	},

	//The style for main text that will be colored white
	mainTextStyleWhite: {
		fontFamily: font,
		fontSize: baseFontSize,
		color: colors.white,
		fontWeight: 'bold'
	},

	//The style for all non-main text that is black
	subTextStyleBlack: {
		fontFamily: font,
		fontSize: subTextFontSize,
		color: colors.black,
		fontWeight: 'bold'
	},

	//The style for all non-main text that is green
	subTextStyleGreen: {
		fontFamily: font,
		fontSize: subTextFontSize,
		color: colors.green,
		fontWeight: 'bold'
	},

	//The style for all non-main text that is white
	subTextStyleWhite: {
		fontFamily: font,
		fontSize: subTextFontSize,
		color: colors.white,
		fontWeight: 'bold'
	},

	//The style for all non-main text that has no color
	subTextStyleNoColor: {
		fontFamily: font,
		fontSize: subTextFontSize,
		fontWeight: 'bold'
	},

	//The style for all big green title texts
	bigTitleStyleGreen: {
		fontFamily: font,
		fontSize: bigTitleFontSize,
		color: colors.green,
		fontWeight: 'bold'
	},

	//The style for all big white title texts
	bigTitleStyleWhite: {
		fontFamily: font,
		fontSize: bigTitleFontSize,
		color: colors.white,
		fontWeight: 'bold'
	},

	//The style for all big sub white title texts
	bigSubTitleStyleWhite: {
		fontFamily: font,
		fontSize: subTitleFontSize,
		color: colors.white,
        fontWeight: 'bold'
	}
});
