//This is the landing screen of the app when a user is logged into the app. It'll display graphs of the profit,
//revenue, and expenses for the given user
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import strings from 'config/strings';
import colors from 'config/colors';
import { screenHeight, screenWidth } from 'config/dimensions';
import fontStyles from 'config/fontStyles';
import screenStyle from 'config/screenStyle';
import FirebaseFunctions from 'config/FirebaseFunctions';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';

//creates the class
export default class dashboard extends Component {
	//Controls the state of the screen
	state = {
		isScreenLoading: true,
		user: '',
		refreshing: false,
		profitData: [],
		revenueData: [],
		expensesData: []
	};

	//Fetches the correct data that is displayed on this screen
	async componentDidMount() {
		const { userID } = this.props.navigation.state.params;
		const user = await FirebaseFunctions.call('getUserByID', { userID });

		//Constructs all the proper data
		const data = await FirebaseFunctions.call('getMonthlyData', { userID });
		const profitData = data[0];
		const revenueData = data[1];
		const expensesData = data[2];

		//Removes the loading state
		this.setState({
			user,
			profitData,
			revenueData,
			expensesData,
			isScreenLoading: false
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
		const { isScreenLoading, user } = this.state;
		return (
			<View style={screenStyle.container}>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					style={{ width: screenWidth }}
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
							marginBottom: screenHeight * 0.05,
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'center'
						}}>
						<Text style={fontStyles.bigSubTitleStyleWhite}>{strings.Dashboard}</Text>
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
						<View
							style={{
								alignItems: 'flex-start',
								width: screenWidth,
								marginLeft: screenWidth * 0.025
							}}>
							<View
								style={{
									marginBottom: screenHeight * 0.02
								}}>
								<Text style={fontStyles.bigSubTitleStyleWhite}>
									{strings.Hello} {this.state.user.name}
								</Text>
							</View>
							<View style={{ marginBottom: screenHeight * 0.03 }}>
								<View style={{ flexDirection: 'row' }}>
									<Text style={fontStyles.bigTextStyleWhite}>{strings.AverageProfitColon}</Text>
									<Text style={fontStyles.bigTextStyleGreen}>
										${parseFloat(user.averageProfit).toFixed(2)}
									</Text>
								</View>
								<View
									style={{
										borderWidth: 3,
										borderColor: colors.green,
										borderRadius: 15,
										paddingHorizontal: screenWidth * 0.025,
										paddingVertical: screenHeight * 0.01,
										marginTop: screenHeight * 0.025,
										flexDirection: 'row'
									}}>
									<YAxis
										data={this.state.profitData}
										svg={{ ...fontStyles.subTextStyleNoColor, fill: colors.white }}
										numberOfTicks={5}
										formatLabel={(value) => '$' + value}
										contentInset={{ top: screenHeight * 0.022, bottom: screenHeight * 0.022 }}
									/>
									<LineChart
										style={{
											paddingHorizontal: screenWidth * 0.02,
											height: screenHeight * 0.3,
											width: screenWidth * 0.8
										}}
										data={this.state.profitData}
										numberOfTicks={5}
										svg={{
											stroke: colors.green,
											strokeWidth: 3
										}}
										contentInset={{ top: screenHeight * 0.022, bottom: screenHeight * 0.022 }}>
										<Grid />
									</LineChart>
								</View>
							</View>
							<View style={{ marginBottom: screenHeight * 0.03 }}>
								<View style={{ flexDirection: 'row' }}>
									<Text style={fontStyles.bigTextStyleWhite}>{strings.AverageRevenueColon}</Text>
									<Text style={fontStyles.bigTextStyleGreen}>
										${parseFloat(user.averageRevenue).toFixed(2)}
									</Text>
								</View>
								<View
									style={{
										borderWidth: 3,
										borderColor: colors.green,
										borderRadius: 15,
										paddingHorizontal: screenWidth * 0.025,
										paddingVertical: screenHeight * 0.01,
										marginTop: screenHeight * 0.025,
										flexDirection: 'row'
									}}>
									<YAxis
										data={this.state.revenueData}
										contentInset={{ top: screenHeight * 0.022, bottom: screenHeight * 0.022 }}
										svg={{ ...fontStyles.subTextStyleNoColor, fill: colors.white }}
										numberOfTicks={5}
										formatLabel={(value) => '$' + value}
									/>
									<LineChart
										style={{
											height: screenHeight * 0.3,
											width: screenWidth * 0.8,
											paddingHorizontal: screenWidth * 0.02
										}}
										data={this.state.revenueData}
										numberOfTicks={5}
										svg={{
											stroke: colors.green,
											strokeWidth: 3
										}}
										contentInset={{ top: screenHeight * 0.022, bottom: screenHeight * 0.022 }}>
										<Grid />
									</LineChart>
								</View>
							</View>
							<View>
								<View style={{ flexDirection: 'row' }}>
									<Text style={fontStyles.bigTextStyleWhite}>{strings.AverageExpensesColon}</Text>
									<Text style={fontStyles.bigTextStyleGreen}>
										${parseFloat(user.averageExpenses).toFixed(2)}
									</Text>
								</View>
								<View
									style={{
										borderWidth: 3,
										borderColor: colors.green,
										borderRadius: 15,
										paddingHorizontal: screenWidth * 0.025,
										paddingVertical: screenHeight * 0.01,
										marginTop: screenHeight * 0.025,
										flexDirection: 'row'
									}}>
									<YAxis
										data={this.state.expensesData}
										contentInset={{ top: screenHeight * 0.022, bottom: screenHeight * 0.022 }}
										svg={{ ...fontStyles.subTextStyleNoColor, fill: colors.white }}
										numberOfTicks={5}
										formatLabel={(value) => '$' + value}
									/>
									<LineChart
										style={{
											paddingHorizontal: screenWidth * 0.02,
											height: screenHeight * 0.3,
											width: screenWidth * 0.8
										}}
										data={this.state.expensesData}
										numberOfTicks={5}
										svg={{
											stroke: colors.green,
											strokeWidth: 3
										}}
										contentInset={{ top: screenHeight * 0.022, bottom: screenHeight * 0.022 }}>
										<Grid />
									</LineChart>
								</View>
							</View>
						</View>
					)}
					<View style={{ marginBottom: screenHeight * 0.03 }} />
				</ScrollView>
			</View>
		);
	}
}
