//Local Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act } from 'react-test-renderer';


//AsyncStorage key for metadata
const META_KEY = '@metadata';

//params constants: logActivity function
const UPDATE = 'update';
const LOG = 'log';

//local copy of metadata from async to be used between modifications
var metadataCodeCopy = null;

//local copy of activityLog being manipulated
var currActivityLog = null;

//JSON objects
function metadataObject(name, goal){
    var date = new Date();
    this.ActivityID = date.getTime().toString();
    this.ActivityName = name;
    this.GoalAmount = goal;
    this.CurrentStreak = 0;
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
    .catch(err => console.error(err))
}

// Interaction Functions
const verifyPresentDay = async() =>{
    await pullMetadataAsync();

    var curr = new Date();
    var needsPush = false; //if day is updated, then must push to storage
    day = curr.getDate();

    if(metadataCodeCopy !== null){
        for(var i in metadataCodeCopy){
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

    if(ActivityID === undefined || Count === undefined){
        console.error("Invalid params LogActivity");
        return;
    }

    //update metadataCodeCopy values
    if(type === LOG){
        console.log("log")
        if(metadataCodeCopy !== null){
            for(var i in metadataCodeCopy){
                if(parseInt(metadataCodeCopy[i].ActivityID) === parseInt(ActivityID)){
                    activityFound = true;

                    //update metadata with values
                    metadataCodeCopy[i].TodayCount+=Count;
                    metadataCodeCopy[i].TodayLogs++;
                    metadataCodeCopy[i].GrandTotal+=Count;
                    metadataCodeCopy[i].LogCount++;

                    //create new ActivityLog object
                    var currUTC = new Date().getTime().toString();
                    var actObj = '{'+ currUTC +", "+Count+'}'

                    await pullActivityLogAsync(ActivityID);

                    currActivityLog.push(actObj);

                    await pushActivityLogAsync(ActivityID);

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

const newActivity = async(ActivityName, GoalAmount) =>{
    await pullMetadataAsync();

    if(metadataCodeCopy === null){
        metadataCodeCopy = new Array();
    }

    var newMeta = new metadataObject(ActivityName, parseInt(GoalAmount));
    metadataCodeCopy.push(newMeta);
    console.log(newMeta.ActivityID);

    currActivityLog = new Array();

    await pushActivityLogAsync(newMeta.ActivityID);
    await pushMetadataAsync();
}

const exportData = async() =>{
    //find way to make all async storage data presentable & exportable
    //make possible to auto-export data? on a daily/weekly/whatever schedule? - upload to icloud or something as csv?
}

const dumpData = async() =>{
    console.log("DUMPING DATA")
    var keys = await AsyncStorage.getAllKeys();
    console.log("keys: "+ keys);

    for(i in keys){
        await getData(keys[i])
        .then(data => {
            console.log(keys[i]+": ");
            console.log(data);
            })
        .catch(err => console.log(err))
    }
}

const testDataFunction = async(ActivityID, Count) => {

    //Test all functions working properly
        // newActivity() seems to work as expected
        // verifyPresentDay

    //TODO:
        // verifyPresentDay
        // logActivity


    //await pullMetadataAsync();

    //await newActivity("name", 12);
    //await newActivity("nameTwo", 120)

    //console.log(await AsyncStorage.getAllKeys())


    //await newActivity("pushups", 100);

    //await logActivity("1642963175219", Count, LOG);

    //await dumpData();
    
    await CLEAR_STORAGE_DEBUG();
}

const CLEAR_STORAGE_DEBUG = async()=>{
    var keys = await AsyncStorage.getAllKeys();
    console.log("keys: "+ keys);

    for(i in keys){
        await AsyncStorage.removeItem(keys[i])
        .then(data => {
            console.log("CLEARING KEY: "+keys[i])
            })
        .catch(err => console.error(err))
    }

    for(i in keys){
        console.log("data at "+keys[i]+": "+ await getData(keys[i]))
    }
}

module.exports.DUMP_DATA_DEBUG = async() =>{
    await dumpData();
}

//Functions accessible to external files
module.exports.logActivityPublic = async(ActivityID, Count) =>{
    await logActivity(ActivityID,Count, LOG);
    //console.log("\n\nNEW PRESS:")
    //testDataFunction("id",Count);
}

module.exports.newActivityPublic = async(ActivityName, GoalAmount) => {
    await newActivity(ActivityName, GoalAmount);
    //await CLEAR_STORAGE_DEBUG();
}

module.exports.exportDataPublic = async() => {
    await exportData();
}

module.exports.updateTodayTotalPublic = async(ActivityID, updatedTotal) =>{
    await logActivity(ActivityID, updateTodayTotal, UPDATE);
}

module.exports.getStatisticsPublic = async() =>{
    var keys = await AsyncStorage.getAllKeys();
    var dump = new Array();

    //make cleaner & include activity keys?
    for(i in keys){
        await getData(keys[i])
        .then(data => {
            dump.push(data)
            })
        .catch(err => console.log(err))
    }

    return dump;
}