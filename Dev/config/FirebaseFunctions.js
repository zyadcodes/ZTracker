//This file will contain all of the functions that are going to interact with Firebase throughout the project
import firebase from 'react-native-firebase';

//Creates and exports the class
export default class FirebaseFunctions {

    //Declares the static Cloud Functions & Cloud Authentication variable
    static functions = firebase.functions();
    static auth = firebase.auth();

	//Method calls a firebase function by taking the functions name as a parameter, the parameters of the cloud function
	//as a second parameter, and then returns the functions result
	static async call(functionName, parameters) {
		const functionReturn = await this.functions.httpsCallable(functionName)(parameters);
		return functionReturn.data;
	}
}
