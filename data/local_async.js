//Local Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//Template JSON objects
const newActivityTemplate = {
    "ActivityID - One":{
        "ActivityName": "One",
        "GoalAmount": -1,
        "CurrentStreak": -1,
        "GrandTotal": -1,
        "LogCount": -1,
        "PresentDay": "day",
        "TodayCount": -1,
        "TodayLogs": -1
    }
}

const logActivityTemplate = {
    "UTC": "Count"
}

//Used in logActivity function
const UPDATE = 'update';
const LOG = 'log';

//temp copy of metadata from async to be used between modifications
var metadataCodeCopy = null;




function verifyPresentDay(){
    pullMetadataAsync();

    var curr = new Date();
    day = curr.getDate();
    
    /*
        Check the current date against the date in metadataCodeCopy.PresentDay
        If currentDate is PresentDay, do nothing

        If currentDate is NOT PresentDay
        Set PresentDay to day
        IF TodayCount>=GoalAmount, CurrentStreak++, else CurrentStreak = 0
        TodayCount = 0;
        TodayLogs = 0;
    */

}

function pullMetadataAsync(){
    //set metadata global JSON with all metadata from async
}

function pushMetadataAsync(){
    //set async metadata with global JSON values
}

function logActivity(ActivityID, Count, type){
    console.log("update daily input: "+ActivityID + ", "+Count)

    //update metadata in accordance with date
    verifyPresentDay();

    //update metadataCodeCopy values
    if(type === LOG){
        console.log("log")
        //find activityID
        //TodayCount+=Count
        //TodayLogs++
    }else if(type === UPDATE){
        console.log("update")
        //find activityID
        //TodayCount=Count
    }else{
        console.error("unexpected logActivity 'type' param");
    }

    pushMetadataAsync();
}

function newActivity(toAdd){
    //create & store new metadata object with new ActivityID
}

function exportData(){
    //find way to make all async storage data presentable & exportable
    //make possible to auto-export data? on a daily/weekly/whatever schedule? - upload to icloud or something as csv?
}


//Functions accessible to external files
module.exports.logActivityPublic = function(ActivityID, Count){
    logActivity(ActivityID,Count, LOG);
}

module.exports.newActivityPublic = function(toAdd){
    newActivity(toAdd);
}

module.exports.exportDataPublic = function(){
    exportData();
}

module.exports.updateTodayTotalPublic = function(ActivityID, updatedTotal){
    logActivity(ActivityID, updateTodayTotal, UPDATE);
}

