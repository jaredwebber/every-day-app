//Local Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act } from 'react-test-renderer';

//Template JSON objects
const newActivityTemplate = {
    "1642952897":{
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

//local var of activityLog being manipulated
var currActivityLog = null;


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
        console.log("Pulling metadata: ");
        console.log(data);
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

const pushActivityLogAsync = async(ActivityID) =>{
    //push updated json array to activityID
    await storeData(ActivityID, currActivityLog)
    .then(data => {
        //console.log(data)
        })
    .catch(err => console.log(err))
}

const pullActivityLogAsync = async(ActivityID) => {
    //set metadata global JSON with all metadata from async
    await getData(ActivityID)
    .then(data => {
        console.log("Pulling activity log ("+ActivityID+"): " + data);
        currActivityLog = data;
        })
    .catch(err => console.log(err))
}

// Interaction Functions
const verifyPresentDay = async() =>{
    await pullMetadataAsync();

    var curr = new Date();
    var needsPush = false; //if day is updated, then must push to storage
    day = curr.getDate();

    if(metadataCodeCopy !== null){
        //might need to just use metadataCodeCopy.length if array??
        var keys = Object.keys(metadataCodeCopy);

        for(var i in keys){
            if(metadataCodeCopy[i].PresentDay !== day){
                needsPush = true;
                metadataCodeCopy[i].PresentDay = day;
                metadataCodeCopy[i].TodayLogs = 0;
                if(metadataCodeCopy[i].TodayCount >= metadataCodeCopy[i].GoalAmount){
                    metadataCodeCopy[i].CurrentStreak  = (metadataCodeCopy[i].CurrentStreak+1);
                }else{
                    metadataCodeCopy[i].CurrentStreak = 0;
                }
            }
        }

    }else{
        console.error("code metadata is null (verifyPresentDay)")
    }

    if(needsPush) await pushMetadataAsync();
}

const logActivity = async(ActivityID, Count, type) =>{
    console.log("update daily input: "+ActivityID + ", "+Count)

    //update metadata in accordance with date
    verifyPresentDay();

    var activityFound = false;

    //update metadataCodeCopy values
    if(type === LOG){
        console.log("log")
        if(metadataCodeCopy !== null){
            //might need to use length if metadata is arrat now?
            var keys = Object.keys(metadataCodeCopy);

            for(var i in keys){
                if(i === ActivityID){
                    activityFound = true;

                    //update metadata with values
                    metadataCodeCopy[i].TodayCount+=Count;
                    metadataCodeCopy[i].TodayLogs++;
                    metadataCodeCopy[i].GrandTotal+=Count;
                    metadataCodeCopy[i].LogCount++;

                    //create new ActivityLog object
                    var currUTC = new Date().getTime().toString();
                    var actObj = '{'+ currUTC +", "+Count+'}'

                    await pushActivityLogAsync(ActivityID, actObj);

                    break;
                }
            }
        }else{
            console.error("metadata code null (logActivity)")
        }
    }else if(type === UPDATE){
        console.log("update")

        console.log("Update not implemented")
        //find activityID
        //TodayCount=Count
    }else{
        console.error("unexpected logActivity 'type' param");
    }

    if(!activityFound) console.error("ActivityID: "+ActivityID + " not found");

    pushMetadataAsync();
}

//This function should receive a complete Metadata JSON object
const newActivity = async(ActivityName, GoalAmount) =>{
    await pullMetadataAsync();

    if(metadataCodeCopy === null){
        metadataCodeCopy = new Array();
    }

    var newMeta = new metadataObject(ActivityName, GoalAmount);
    metadataCodeCopy.push(newMeta);
    console.log(metadataCodeCopy);

    currActivityLog = new Array();

    await pushActivityLogAsync(newMeta.ActivityID);
    await pushMetadataAsync();}

const exportData = async() =>{
    //find way to make all async storage data presentable & exportable
    //make possible to auto-export data? on a daily/weekly/whatever schedule? - upload to icloud or something as csv?
}

const testDataFunction = async(ActivityID, Count) => {

    //Test all functions working properly
        // newActivity() seems to work as expected
        //

    //TODO:
        // verifyPresentDay
        // logActivity


    //await pullMetadataAsync();

    //newActivity("act name2", 123);

    //console.log(await AsyncStorage.getAllKeys())

    //CLEAR_STORAGE_DEBUG();

}

const CLEAR_STORAGE_DEBUG = async()=>{
    var keys = await AsyncStorage.getAllKeys();
    console.log("keys: "+ keys);

    for(i in keys){
        await AsyncStorage.removeItem(keys[i])
        .then(data => {
            console.log("CLEARING KEY: "+keys[i])
            })
        .catch(err => console.log(err))
    }

    for(i in keys){
        console.log("data at "+keys[i]+": "+ await getData(keys[i]))
    }
}

function metadataObject(name, goal){
    var date = new Date();
    this.ActivityID = date.getTime().toString();
    this.ActivityName = name;
    this.GoalAmount = goal;
    this.GrandTotal = 0;
    this.LogCount = 0;
    this.TodayCount = 0;
    this.PresentDay = date.getDate();
    this.TodayLogs = 0;
}

function activityLogObject(id, count){
    this.id = id;
    this.count = count;
}

//Functions accessible to external files
module.exports.logActivityPublic = async(ActivityID, Count) =>{
    //logActivity(ActivityID,Count, LOG);
    testDataFunction();
}

module.exports.newActivityPublic = async(ActivityName, GoalAmount) => {
    await newActivity(ActivityName, GoalAmount);
}

module.exports.exportDataPublic = async() => {
    await exportData();
}

module.exports.updateTodayTotalPublic = async(ActivityID, updatedTotal) =>{
    await logActivity(ActivityID, updateTodayTotal, UPDATE);
}