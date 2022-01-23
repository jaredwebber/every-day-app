//Local Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//Template JSON objects
const newActivityTemplate = {
    "000":{
        "ActivityName": "pushups",
        "GoalAmount": 100,
        "CurrentStreak": 22,
        "GrandTotal": 2300,
        "LogCount": 110,
        "PresentDay": 22,
        "TodayCount": 100,
        "TodayLogs": 5
    }
}

const altTemplate = {
    "ID":{
        "ActivityName": "name",
        "GoalAmount": 0,
        "CurrentStreak": 0,
        "GrandTotal": 0,
        "LogCount": 0,
        "PresentDay": 0,
        "TodayCount": 0,
        "TodayLogs": 0
    }
}

const logActivityTemplate = {
    "UTC": "Count"
}

const META_KEY = '@metadata';

//Used in logActivity function
const UPDATE = 'update';
const LOG = 'log';

//temp copy of metadata from async to be used between modifications
var metadataCodeCopy = null;


// Direct Data Manipulation
const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.error("Error storing data [key: "+key+", value: "+value+"]");
    }
}

const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.error("Error getting data [key: "+key+"]");
    }
}

const pullMetadataAsync = async() => {
    //set metadata global JSON with all metadata from async
    await getData(META_KEY)
    .then(data => {
        console.log(data)
        metadataCodeCopy = data;
        })
    .catch(err => console.log(err))
}

const pushMetadataAsync = async() => {
    //set async metadata with global JSON values
    await storeData(META_KEY, metadataCodeCopy)
    .then(data => {
        //console.log(data)
      })
    .catch(err => console.log(err))
}


// Interaction Functions
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


const logActivity = async(ActivityID, Count, type) =>{
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

//This function should receive a complete Metadata JSON object
const newActivity = async(toAdd) =>{
    await pullMetadataAsync();


        //create & store new metadata object with new ActivityID


    await pushMetadataAsync();
}

const exportData = async() =>{
    //find way to make all async storage data presentable & exportable
    //make possible to auto-export data? on a daily/weekly/whatever schedule? - upload to icloud or something as csv?
}

const testDataFunction = async(ActivityID, Count) => {
    console.log(metadataCodeCopy)

    metadataCodeCopy = newActivityTemplate;

    await pushMetadataAsync();

    metadataCodeCopy = altTemplate;

    await pullMetadataAsync();
    console.log(metadataCodeCopy)
}

const CLEAR_METADATA_DEBUG = async()=>{
    await AsyncStorage.removeItem(META_KEY)
    .then(data => {
        console.log("CLEARING STORAGE")
        })
    .catch(err => console.log(err))
}

//Functions accessible to external files
module.exports.logActivityPublic = async(ActivityID, Count) =>{
    //logActivity(ActivityID,Count, LOG);
    //testDataFunction();
    CLEAR_METADATA_DEBUG();
}

module.exports.newActivityPublic = async(toAdd) => {
    await newActivity(toAdd);
}

module.exports.exportDataPublic = async() => {
    await exportData();
}

module.exports.updateTodayTotalPublic = async(ActivityID, updatedTotal) =>{
    await logActivity(ActivityID, updateTodayTotal, UPDATE);
}