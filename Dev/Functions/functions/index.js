const functions = require('firebase-functions');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ztracker-d9d96.firebaseio.com"
});

//Declares the firestore constant
const firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//This function is going to create a user in Cloud Firestore with a name & an email address
exports.addUserToFirestore = functions.https.onCall(async (request, response) => {

    const { name, email, userID } = request;
    await firestore.collection('users').doc(userID).set({
        name,
        email,
        userID
    });

    return 0;

});

//This function is going to add an entry into the subcollection of the database according to its month. It will take in 
//parameters of the entry type, a date, an amountt, and notes & a user ID
exports.addEntry = functions.https.onCall(async (request, response) => {

    const { type, date, amount, notes, userID } = request;
    const entry = {
        type,
        date,
        amount,
        notes,
        userID
    }
    //Retrieves what the month is
    const month = date.substring(0, date.indexOf("-") + 1) + date.substring(date.lastIndexOf("-") + 1);

    //Updates the month with the new revenue and the profit and the cost
    const doc = firestore.collection('users').doc('userID').collection('months').doc('month');
    const docGet = await doc.get();
    if (docGet.exists === false) {
        doc.set({
            expenses: 0,
            revenue: 0,
            profit: 0,
            month
        });
    }
    const docData = docGet.data();
    let { revenue, cost, profit } = docData
    if (type === 'revenue') {
        revenue += amount;
    } else {
        cost += amount;
    }
    profit = revenue - cost;
    await doc.update({
        revenue,
        cost, 
        profit
    });

    //Adds the entry to the doc's subcollection
    const newEntry = await doc.collection('entries').add({
        ...entry,
        month
    });
    //Adds the entryID to the docment as well
    await newEntry.update({
        entryID: newEntry.id
    });
     

    return 0;

});

//This function will take in a user's ID and is going to fetch that user's document's data. If the doc doesn't exist, -1
//will be returned
exports.getUserByID = functions.https.onCall(async (request, response) => {

    const { userID } = request;
    const doc = await firestore.collection('users').doc(userID).get();
    if (doc.exists) {
        return doc.data();
    } else {
        return -1;
    }

});

//This function is going to take in a user's ID and an month and return that month document. If it doesn't
//exist, -1 will be returned
exports.getMonthByID = functions.https.onCall(async (request, response) => {

    const { userID, month } = request;
    const doc = await firestore.collection('users').doc(userID).collection('months').doc(month).get();
    if (doc.exists) {
        return doc.data();
    } else {
        return -1;
    }

});

//This function is going to take in a user's ID & then it will return all of the month documents that are with associated
//with the user. If user doesn't exist, -1 is returned
exports.getAllMonthsByID = functions.https.onCall(async (request, response) =>  {

    const { userID } = request;
    const doc = firestore.collection('users').doc(userID);
    if ((await doc.get()).exists) {
        const allMonthDocs = await doc.collection('months').get();
        const allMonths = allMonthDocs.docs.map((doc) => doc.data());
        return allMonths;
    } else {
        return -1;
    }

});

//This function is going to take in a userID and a month  and is going to return an array of all of the entries
//during that month from their documents. If the month document doesn't exist, -1 will be returned
exports.getMonthEntriesByID = functions.https.onCall(async (request, response) => {

    const { userID, month } = request;
    const doc = firestore.collection('users').doc(userID).collection('months').doc(month);
    if ((await doc.get()).exists) {
        const  entries = await doc.collection('entries').get();
        const docs = entries.docs.map((doc) => doc.data());
        return docs;
    } else {
        return -1;
    }

})