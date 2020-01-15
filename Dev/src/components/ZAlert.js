//This component will be the alert that presents a message to the user. When they click ok, it'll disappear.
import React, { Component } from 'react';
import { Modal, View } from 'react-native';
import PropTypes from 'prop-types';
import AwesomeAlert from 'react-native-awesome-alerts';
import strings from 'config/strings';
import colors from 'config/colors';

//The class that will render the alert
class ZAlert extends Component {
	render() {
		const { isVisible, onPress, title, message } = this.props;
		return (
			<View>
				<Modal visible={isVisible} transparent={true}>
					<AwesomeAlert
						show={isVisible}
						title={title}
						message={message}
						closeOnTouchOutside={false}
						showCancelButton={false}
						showConfirmButton={true}
						confirmButtonColor={colors.green}
						confirmText={strings.Ok}
						onConfirmPressed={() => {
							onPress();
						}}
					/>
				</Modal>
			</View>
		);
	}
}

//Defines the prop types for the alert. An is visible boolean, an onPress function, a title, and a message
ZAlert.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onPress: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired
};

//exports the module
export default ZAlert;
