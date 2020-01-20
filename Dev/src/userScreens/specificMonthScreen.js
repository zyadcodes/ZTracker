//this screen will be accessed from the history screen and will display a specific month's earnings based on what the
//user actually entered during the span of that month.
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import strings from 'config/strings';
import screenStyle from 'config/screenStyle';
import { screenHeight, screenWidth } from 'config/dimensions';
import fontStyles from 'config/fontStyles';
import colors from 'config/colors';
import FirebaseFunctions from 'config/FirebaseFunctions';
import { Table, Row, Rows } from 'react-native-table-component';

//Declares the class and exports it
export default class specificMonthScreen extends Component {
	state = {
		isScreenLoading: true,
		month: this.props.navigation.state.params.month,
		userID: this.props.navigation.state.params.userID,
		tableTitles: [strings.Date, strings.Amt, strings.Type, strings.Notes],
		tableData: []
	};

	//This method is going to fetch the entries for this month
	async componentDidMount() {
		const { month, userID } = this.state;
		const entries = await FirebaseFunctions.call('getMonthEntriesByID', {
			userID,
			month: month.month
		});
		//Constructs the table's data
		const tableData = [];
		for (const entry of entries) {
			tableData.push([
				//Converts the date to a readable format
				this.convertShortMonthToString(entry.date.substring(entry.date.indexOf('-') + 1)),
				//Adds the dollar sign to the amount
				'$' + entry.amount,
				//Capitalizes the first lettter of the type
				entry.type.charAt(0).toUpperCase() + entry.type.substring(1),
				//If there are no notes, an empty string
				entry.notes ? entry.notes : strings.None
			]);
		}
		this.setState({ isScreenLoading: false, tableData });
	}

	//This method is going to convert a month's numeric value to it's actual name string. 2020-02 would be "February 2020"
	convertMonthToString(date) {
		const year = date.substring(0, date.indexOf('-'));
		let monthNum = date.substring(date.indexOf('-') + 1);
		if (monthNum.charAt(0) === '0') {
			monthNum = monthNum.charAt(1);
		}
		const monthsArr = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		monthNum = parseInt(monthNum);
		const month = monthsArr[monthNum - 1];
		return month + ' ' + year;
	}

	//This method is going to convert a month's numeric value to it's actual name string without the year. 2020-02-05 should
	//return February 5th
	convertShortMonthToString(date) {
		let day = date.substring(date.indexOf('-') + 1);
		if (day.charAt(0) === '0') {
			day = day.charAt(1);
		}

		//Adds the suffix to the day
		const lastDigit = day.charAt(day.length - 1);
		let suffix = '';
		if (day.charAt(0) === '1' && day.length > 1) {
			suffix = 'th';
		} else {
			switch (lastDigit) {
				case '1':
					suffix = 'st';
					break;
				case '2':
					suffix = 'nd';
					break;
				case '3':
					suffix = 'rd';
					break;
				default:
					suffix = 'th';
			}
		}

		let monthNum = date.substring(0, date.indexOf('-'));
		if (monthNum.charAt(0) === '0') {
			monthNum = monthNum.charAt(1);
		}
		const monthsArr = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		monthNum = parseInt(monthNum);
		const month = monthsArr[monthNum - 1];
		return month + ' ' + day + suffix;
	}

	//Renders the class
	render() {
		const { isScreenLoading } = this.state;
		return (
			<View style={screenStyle.container}>
				<ScrollView
					style={{ width: screenWidth }}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}>
					<View
						style={{
							marginTop: screenHeight * 0.1,
							marginBottom: screenHeight * 0.075,
							width: screenWidth,
							justifyContent: 'flex-start',
							alignItems: 'center',
							alignSelf: 'center',
							flexDirection: 'row'
						}}>
						<TouchableOpacity
							style={{
								width: screenWidth * 0.2,
								marginLeft: screenWidth * 0.02,
								alignItems: 'flex-start'
							}}
							onPress={() => {
								this.props.navigation.goBack();
							}}>
							<Icon size={30} name={'angle-left'} type={'font-awesome'} color={colors.green} />
						</TouchableOpacity>
						<Text style={fontStyles.bigSubTitleStyleWhite}>
							{this.convertMonthToString(this.state.month.month)}
						</Text>
					</View>
					{isScreenLoading === true ? (
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: screenHeight * 0.15
							}}>
							<ActivityIndicator size={'large'} animating={true} color={colors.green} />
						</View>
					) : (
						<View>
							<View
								style={{
									marginBottom: screenHeight * 0.075,
									flexDirection: 'row',
									justifyContent: 'space-evenly'
								}}>
								<View>
									<Text style={fontStyles.bigTextStyleWhite}>{strings.Revenue}</Text>
									<View style={{ height: screenHeight * 0.01 }} />
									<Text style={fontStyles.bigTextStyleGreen}>${this.state.month.revenue}</Text>
								</View>
								<View>
									<Text style={fontStyles.bigTextStyleWhite}>{strings.Expenses}</Text>
									<View style={{ height: screenHeight * 0.01 }} />
									<Text style={fontStyles.bigTextStyleGreen}>${this.state.month.expenses}</Text>
								</View>
								<View>
									<Text style={fontStyles.bigTextStyleWhite}>{strings.Profit}</Text>
									<View style={{ height: screenHeight * 0.01 }} />
									<Text style={fontStyles.bigTextStyleGreen}>${this.state.month.profit}</Text>
								</View>
							</View>
							<View
								style={{
									width: screenWidth * 0.98,
									alignSelf: 'center'
								}}>
								<Table borderStyle={{ borderWidth: 2, borderColor: colors.green }}>
									<Row
										data={this.state.tableTitles}
										textStyle={[fontStyles.mainTextStyleWhite, { margin: 5 }]}
									/>
									<Rows
										textStyle={[
											fontStyles.mainTextStyleWhite,
											{ marginHorizontal: screenWidth * 0.02, marginVertical: screenHeight * 0.01 }
										]}
										data={this.state.tableData}
									/>
								</Table>
							</View>
						</View>
					)}
				</ScrollView>
			</View>
		);
	}
}
