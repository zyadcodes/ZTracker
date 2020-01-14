//This higher order component should be used when there are text inputs and you need to be able to implement the following
//capablities. When a text input is clicked, it is focused to, and when the user clicks outside the keyboard, the
//keyboard goes away.
import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import screenStyle from 'config/screenStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Creates the higher order component
const KeyboardAvoidingViewHOC = (Comp) => {
	return ({ children, ...props }) => (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<KeyboardAwareScrollView
				resetScrollToCoords={{ x: 0, y: 0 }}
				scrollEnabled={true}
				contentContainerStyle={screenStyle.container}
				extraScrollHeight={5}
				enableOnAndroid={true}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}>
				<View>
					<Comp {...props}>{children}</Comp>
				</View>
			</KeyboardAwareScrollView>
		</TouchableWithoutFeedback>
	);
};

//Creats the component & exports it
const KeyboardAwareView = KeyboardAvoidingViewHOC(View);
export default KeyboardAwareView;
