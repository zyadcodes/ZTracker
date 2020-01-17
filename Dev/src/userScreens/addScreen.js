//This is the screen where the user will be able to add expenses and revenues into the database given a date and a dollar
//amount
import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import strings from 'config/strings';
import { screenHeight, screenWidth } from 'config/dimensions';
import fontStyles from 'config/fontStyles';
import screenStyle from 'config/screenStyle';
import KeyboardAvoidingView from '../components/KeyboardAvoidingView';
import CalendarPicker from 'react-native-calendar-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from 'react-native-elements';
import colors from 'config/colors';
import ZTextInput from '../components/ZTextInput';
import ZButton from '../components/ZButton';
import ZAlert from '../components/ZAlert';
import FirebaseFunctions from '../../config/FirebaseFunctions';

//creates the class
export default class addScreen extends Component {
	//This is the state that controls the fields being entered in this screen
	state = {
		entryType: 'expense',
		dateSelected: '',
		amount: '',
		notes: '',
		isLoading: false,
		/* The following will be all the booleans for Alert isVisible*/
		fieldsError: false,
		isEntryAdded: false
	};

	//This method will add the entry for the user
	async addEntry() {
		const { entryType, dateSelected, amount, notes } = this.state;

		//Tests that all entries have been compoleted adequetly
		if (
			(entryType === 'expense' || entryType === 'revenue') &&
			dateSelected !== '' &&
			amount.trim().length > 0
		) {
			this.setState({ isLoading: true });
			const numAmount = parseFloat(amount);
			await FirebaseFunctions.call('addEntry', {
				type: entryType,
				date: dateSelected,
				amount: numAmount,
				notes: notes,
				userID: this.props.navigation.state.params.userID
			});
			//Resets the fields
			this.setState({ isLoading: false, isEntryAdded: true, amount: '', notes: '' });
		} else {
			this.setState({ fieldsError: true });
		}
	}

	//Renders the class
	render() {
		return (
			<KeyboardAvoidingView style={screenStyle.container}>
				<ScrollView
					style={{ width: screenWidth }}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}>
					<View
						style={{
							marginTop: screenHeight * 0.1,
							marginBottom: screenHeight * 0.05,
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'center'
						}}>
						<Text style={fontStyles.bigSubTitleStyleWhite}>{strings.Add}</Text>
					</View>
					<View
						style={{
							marginLeft: screenWidth * 0.1,
							alignItems: 'flex-start'
						}}>
						<Text style={fontStyles.bigTextStyleWhite}>{strings.Type}</Text>
						<View style={{ height: screenHeight * 0.02 }} />
						<RNPickerSelect
							onValueChange={(value) => this.setState({ entryType: value })}
							items={[
								{ label: strings.Expense, value: 'expense' },
								{ label: strings.Revenue, value: 'revenue' }
							]}
							value={this.state.entryType}
							style={{
								iconContainer: {
									top: screenHeight * 0.015,
									right: screenWidth * 0.125
								},
								inputIOS: {
									...fontStyles.mainTextStyleWhite,
									width: screenWidth * 0.8,
									height: screenHeight * 0.05,
									borderColor: colors.green,
									borderWidth: 2,
									borderRadius: 10,
									paddingLeft: screenWidth * 0.025
								}
							}}
							Icon={() => (
								<Icon type='font-awesome' name='arrow-down' color={colors.green} size={20} />
							)}
						/>
					</View>
					<View
						style={{
							marginTop: screenHeight * 0.04,
							alignItems: 'center'
						}}>
						<Text
							style={[
								fontStyles.bigTextStyleWhite,
								{ alignSelf: 'flex-start', marginLeft: screenWidth * 0.1 }
							]}>
							{strings.Date}
						</Text>
						<View style={{ height: screenHeight * 0.02 }} />
						<View
							style={{
								borderColor: colors.green,
								borderWidth: 2,
								borderRadius: 10,
								width: screenWidth * 0.8
							}}>
							<CalendarPicker
								textStyle={fontStyles.subTextStyleWhite}
								selectedDayTextColor={colors.white}
								todayBackgroundColor={colors.black}
								todayTextStyle={fontStyles.subTextStyleWhite}
								selectedDayColor={colors.green}
								height={screenHeight * 0.5}
								width={screenWidth * 0.8}
								onDateChange={(newDate) => {
									//Formats the date and selects it
									const date = new Date(newDate).toISOString().split('T')[0];
									this.setState({
										dateSelected: date
									});
								}}
							/>
						</View>
					</View>
					<View
						style={{
							marginTop: screenHeight * 0.04,
							alignSelf: 'flex-start',
							marginLeft: screenWidth * 0.1
						}}>
						<Text style={fontStyles.bigTextStyleWhite}>{strings.Amount}</Text>
						<View style={{ height: screenHeight * 0.02 }} />
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={fontStyles.bigTextStyleWhite}>{strings.DollarSign}</Text>
							<View style={{ width: screenWidth * 0.02 }} />
							<TextInput
								style={{
									width: screenWidth * 0.7,
									backgroundColor: colors.white,
									color: colors.black,
									height: screenHeight * 0.05,
									paddingLeft: screenWidth * 0.02
								}}
								keyboardType={'numeric'}
								placeholder={strings.AmountPlaceholder}
								value={this.state.amount}
								onChangeText={(text) => {
									this.setState({
										amount: text
									});
								}}
							/>
						</View>
					</View>
					<View
						style={{
							marginTop: screenHeight * 0.04,
							alignSelf: 'flex-start',
							marginLeft: screenWidth * 0.1
						}}>
						<ZTextInput
							title={strings.Notes}
							autoCapitalize={'none'}
							placeholder={strings.AnyAdditionalNotesDotDotDot}
							onChangeText={(text) => {
								this.setState({ notes: text });
							}}
							value={this.state.notes}
						/>
					</View>
					<View style={{ marginTop: screenHeight * 0.04, alignSelf: 'center' }}>
						<ZButton
							text={strings.Add}
							isLoading={this.state.isLoading}
							onPress={() => {
								//Adds the entry
								this.addEntry();
							}}
						/>
					</View>
					<View style={{ height: screenHeight * 0.05 }} />
					{/*The following components are all the alerts that can pop up on this screen*/}
					<ZAlert
						isVisible={this.state.fieldsError}
						onPress={() => {
							this.setState({ fieldsError: false });
						}}
						title={strings.Whoops}
						message={strings.PleaseFillOutAllFields}
					/>
					<ZAlert
						isVisible={this.state.isEntryAdded}
						onPress={() => {
							this.setState({ isEntryAdded: false });
						}}
						title={strings.Added}
						message={strings.EntryAdded}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
