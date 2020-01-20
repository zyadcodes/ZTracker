//This is the screen which will display a monthly analysis of the user's history. It'll be a simple table that will
//show the month, revenue, expense, and revenue according the user's selection. It'll be customizable based on what
//the user wants to view specifically.
import React, { Component } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	ScrollView,
	RefreshControl,
	TouchableOpacity
} from 'react-native';
import strings from 'config/strings';
import { screenHeight, screenWidth } from 'config/dimensions';
import fontStyles from 'config/fontStyles';
import screenStyle from 'config/screenStyle';
import colors from 'config/colors';
import FirebaseFunctions from 'config/FirebaseFunctions';
import { Table, Row, Rows } from 'react-native-table-component';

//creates the class
export default class historyScreen extends Component {
	//The state controlling the loading screen and the data
	state = {
		isScreenLoading: true,
		tableTitles: [strings.Month, strings.Revenue, strings.Expenses, strings.Profit],
		tableData: [],
		//The refreshing state
		refreshing: false
	};

	//This method is going to convert a month's numeric value to it's actual name string. 2020-02 would be "Feb 2020"
	convertMonthToString(date) {
		let year = date.substring(0, date.indexOf('-'));
		year = year.substring(2);
		let monthNum = date.substring(date.indexOf('-') + 1);
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
		return month + " '" + year;
	}

	//This method is going to generate the TouchableOpacities for each row's text
	getTouchableOpacity(text, onPress) {
		return (
			<TouchableOpacity onPress={() => onPress()}>
				<Text
					style={[
						fontStyles.mainTextStyleWhite,
						{ marginHorizontal: screenWidth * 0.02, marginVertical: screenHeight * 0.01 }
					]}>
					{text}
				</Text>
			</TouchableOpacity>
		);
	}

	//This method is going to fetch the history of the current user
	async componentDidMount() {
		const { userID } = this.props.navigation.state.params;
		const allMonths = await FirebaseFunctions.call('getAllMonthsByID', { userID });
		allMonths.reverse();
		//Constructs the data
		const tableData = [];
		for (const month of allMonths) {
			const monthData = [
				this.getTouchableOpacity(this.convertMonthToString(month.month), () => {
					this.props.navigation.push('SpecificMonthScreen', {
						month: month,
						userID
					});
				}),
				this.getTouchableOpacity('$' + month.revenue, () => {
					this.props.navigation.push('SpecificMonthScreen', {
						month: month,
						userID
					});
				}),
				this.getTouchableOpacity('$' + month.expenses, () => {
					this.props.navigation.push('SpecificMonthScreen', {
						month: month,
						userID
					});
				}),
				this.getTouchableOpacity('$' + month.profit, () => {
					this.props.navigation.push('SpecificMonthScreen', {
						month: month,
						userID
					});
				})
			];
			tableData.push(monthData);
		}
		this.setState({
			isScreenLoading: false,
			tableData: tableData
		});
	}

	//This method is going to refresh the screen to fetch the most current data
	async refresh() {
		this.setState({
			refreshing: true
		});
		await this.componentDidMount();
		this.setState({ refreshing: false });
	}

	//Renders the class
	render() {
		const { isScreenLoading } = this.state;
		return (
			<View style={screenStyle.container}>
				<ScrollView
					style={{ width: screenWidth }}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							tintColor={colors.green}
							onRefresh={() => {
								this.refresh();
							}}
						/>
					}>
					<View
						style={{
							marginTop: screenHeight * 0.1,
							marginBottom: screenHeight * 0.065,
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'center'
						}}>
						<Text style={fontStyles.bigSubTitleStyleWhite}>{strings.History}</Text>
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
						<View style={{ width: screenWidth * 0.98 }}>
							<Table borderStyle={{ borderWidth: 2, borderColor: colors.green }}>
								<Row
									data={this.state.tableTitles}
									textStyle={[fontStyles.mainTextStyleWhite, { margin: 5 }]}
								/>
								<Rows data={this.state.tableData} />
							</Table>
						</View>
					)}
					<View height={screenHeight * 0.05} />
				</ScrollView>
			</View>
		);
	}
}
