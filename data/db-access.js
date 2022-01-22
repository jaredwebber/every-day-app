/*

    https://rnfirebase.io/database/usage

    https://firebase.google.com/docs/database/admin/save-data#node.js

    https://console.firebase.google.com/u/1/project/every-day-app/database/every-day-app-default-rtdb/data

*/

import database from '@react-native-firebase/database';


function verifyPresentDay(){
    /*
        Check the current date against the date in Metadata PresentDay
        If currentDate is PresentDay, do nothing

        If currentDate is NOT PresentDay
        Move the PresentDay and TodayCount into ActivityLog Table 
        for corresponding ActivityID
    */

    var endpoint = '/users/userid'

    database()
    .ref(endpoint)
    .once('value')
    .then(snapshot => {
        console.log('User data: ', snapshot.val());
    });

    const newReference = database().ref('/users').push("newKey?");

    console.log('Auto generated key: ', newReference.key);

    newReference
    .set({
        userid: 1,
    })
    .then(() => console.log('Data updated.'));

}

function getCurrentMetadata(){
    //return array with metadata from relevant user
}

function updateDailyActivity(ActivityID, Count){
    verifyPresentDay();
    
    var currentMetadata = getCurrentMetadata();

    //Something like this
    //database().ref('/users/storeduserid/metadata').update();
}



export default updateDailyActivity;

