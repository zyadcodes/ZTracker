//This is the screen which will display a monthly analysis of the user's history. It'll be a simple table that will
//show the month, revenue, expense, and revenue according the user's selection. It'll be customizable based on what
//the user wants to view specifically.
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
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

	//This method is going to fetch the history of the current user
	async componentDidMount() {
		const { userID } = this.props.navigation.state.params;
		const allMonths = await FirebaseFunctions.call('getAllMonthsByID', { userID });

		//Constructs the data
		const tableData = [];
		for (const month of allMonths) {
			const monthData = [month.month, month.revenue, month.expenses, month.profit];
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
						<ActivityIndicator size={'large'} animating={true} color={colors.green} />
					) : (
						<View style={{ width: screenWidth * 0.98 }}>
							<Table borderStyle={{ borderWidth: 2, borderColor: colors.green }}>
								<Row
									data={this.state.tableTitles}
									textStyle={[fontStyles.mainTextStyleWhite, { margin: 5 }]}
								/>
								<Rows
									data={this.state.tableData}
									textStyle={[fontStyles.subTextStyleWhite, { margin: 5 }]}
								/>
							</Table>
						</View>
					)}
					<View height={screenHeight * 0.05} />
				</ScrollView>
			</View>
		);
	}
}
