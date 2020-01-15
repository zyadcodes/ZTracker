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

	//This method is going to log the user into their account. It will return the user's ID. If the user doesn't exist, the
	//method will return -1;
	static async logIn(email, password) {
		const doesExist = await this.auth.fetchSignInMethodsForEmail(email);
		if (doesExist.length > 0) {
			const account = await this.auth.signInWithEmailAndPassword(email, password);
			return account.user.uid;
		} else {
			return -1;
		}
	}

	//This method is going to create a user with an email and password. Then it will return the ID it just
	//created with. If the user already exists, returns -1.
	//This method will also create the user's associated document in Firebase Firestore
	static async signUp(email, password, name) {
		const doesExist = await this.auth.fetchSignInMethodsForEmail(email);
		if (doesExist.length > 0) {
			return -1;
		} else {
			const account = await this.auth.createUserWithEmailAndPassword(email, password);
			const userID = account.user.uid;
			await this.call('addUserToFirestore', {
				name,
				email,
				userID
			});
			return userID;
		}
	}

	//this method is going to take in an email and attempt to send a password reset email. This is not async
	//because we don't care about the result
	static resetPassword(email) {
		this.auth.sendPasswordResetEmail(email);
	}
}
