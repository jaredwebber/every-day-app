//Local Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act } from 'react-test-renderer';


//AsyncStorage key for metadata
const META_KEY = '@metadata';

//params constants: logActivity function
const UPDATE = 'update';
const LOG = 'log';

//param constants: Activity Frequency
const DAY = 'D';
const WEEK = 'W';
const DAY_DIFF = 86400; //seconds in a day
const WEEK_DIFF = 604800;//seconds in a week


//local copy of metadata from async to be used between modifications
var metadataCodeCopy = null;

//local copy of activityLog being manipulated
var currActivityLog = null;

//JSON objects
function metadataObject(name, goal, frequency, unit){
    var date = new Date();
    this.ActivityID = date.getTime().toString();
    this.ActivityName = name;
    this.GoalAmount = goal;
    this.CurrentStreak = 0;
    this.HighestPeriod = 0;
    this.TotalGoalsMet = 0;
    this.GrandTotal = 0;
    this.TotalLogCount = 0;
    this.TodayCount = 0;
    this.LastGoalInit = date.getTime().toString();
    this.TodayLogs = 0;
    this.LongestStreak = 0;
    this.GoalFrequency = frequency;
    this.Unit = unit;
}

function activityLogObject(count){
    this.utc = new Date().getTime().toString();
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
        //console.log("Pulling metadata: ");
        //console.log(data);
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
        //console.log("Pulling activity log ("+ActivityID+"): " + data);
        currActivityLog = data;
        })
    .catch(err => console.error(err))
}

// Interaction Functions
const verifyInGoalSpan = async() =>{
    await pullMetadataAsync();

    var needsPush = false; //if span is not within bounds, then must push to storage
    currUTC = new Date().getTime().toString();

    if(metadataCodeCopy !== null){
        for(var i in metadataCodeCopy){
            var diff = 0;
            if(metadataCodeCopy[i].GoalFrequency === DAY){
                diff = DAY_DIFF;
            }else if(metadataCodeCopy[i].GoalFrequency === WEEK){
                diff = WEEK_DIFF;
            }

            if(metadataCodeCopy[i].LastGoalInit - currUTC > diff){
                needsPush = true;
                metadataCodeCopy[i].LastGoalInit = currUTC;
                metadataCodeCopy[i].TodayLogs = 0;

                    if(metadataCodeCopy[i].TodayCount >= metadataCodeCopy[i].GoalAmount){
                        metadataCodeCopy[i].TotalGoalsMet++;
                        metadataCodeCopy[i].CurrentStreak  = (metadataCodeCopy[i].CurrentStreak+1);
                        if(metadataCodeCopy[i].LongestStreak < metadataCodeCopy[i].CurrentStreak){
                            metadataCodeCopy[i].LongestStreak = metadataCodeCopy[i].CurrentStreak;
                        }
                    }else{
                        metadataCodeCopy[i].CurrentStreak = 0;
                    }

                    if(metadataCodeCopy[i].TodayCount > metadataCodeCopy[i].HighestPeriod){
                        metadataCodeCopy[i].HighestPeriod  = (metadataCodeCopy[i].TodayCount);
                    }
                metadataCodeCopy[i].TodayCount = 0;
            }
    }
    }else{
        console.error("code metadata is null (verifyPresentDay)")
    }

    if(needsPush) await pushMetadataAsync();
}

const logActivity = async(ActivityID, Count, type) =>{
    //console.warn("update daily input: "+ActivityID + ", "+Count)

    //update metadata in accordance with date
    verifyInGoalSpan();

    var activityFound = false;

    if(ActivityID === undefined || Count === undefined){
        console.error("Invalid params LogActivity");
        return;
    }

    //update metadataCodeCopy values
    if(type === LOG){
        //console.log("log")
        if(metadataCodeCopy !== null){
            for(var i in metadataCodeCopy){
                if(parseInt(metadataCodeCopy[i].ActivityID) === parseInt(ActivityID)){
                    activityFound = true;

                    //update metadata with values
                    metadataCodeCopy[i].TodayCount = parseInt(metadataCodeCopy[i].TodayCount) + parseInt(Count);
                    metadataCodeCopy[i].TodayLogs = parseInt(metadataCodeCopy[i].TodayLogs) + 1;
                    metadataCodeCopy[i].GrandTotal = parseInt(metadataCodeCopy[i].GrandTotal) + parseInt(Count);
                    metadataCodeCopy[i].TotalLogCount = parseInt(metadataCodeCopy[i].TotalLogCount) + 1;

                    await pushMetadataAsync();

                    await pullActivityLogAsync(ActivityID);

                    //add new Log object
                    currActivityLog.push(new activityLogObject(Count));

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
}

const newActivity = async(ActivityName, GoalAmount, GoalFrequency, Unit) =>{
    await pullMetadataAsync();

    if(metadataCodeCopy === null){
        metadataCodeCopy = new Array();
    }

    var newMeta = new metadataObject(ActivityName, parseInt(GoalAmount), GoalFrequency, Unit);
    metadataCodeCopy.push(newMeta);
    //console.log(newMeta.ActivityID);

    currActivityLog = new Array();

    await pushActivityLogAsync(newMeta.ActivityID);
    await pushMetadataAsync();
}

const exportData = async() =>{
    //find way to make all async storage data presentable & exportable
    //make possible to auto-export data? on a daily/weekly/whatever schedule? - upload to icloud or something as csv?
}

//Functions accessible to external files
module.exports.logActivityPublic = async(ActivityID, Count) =>{
    await logActivity(ActivityID,Count, LOG);
}

module.exports.newActivityPublic = async(ActivityName, GoalAmount, GoalFrequency, Unit) => {
    await newActivity(ActivityName, GoalAmount, GoalFrequency, Unit);
}

module.exports.exportDataPublic = async() => {
    await exportData();
}

module.exports.updateTodayTotalPublic = async(ActivityID, updatedTotal) =>{
    await logActivity(ActivityID, updateTodayTotal, UPDATE);
}

module.exports.getStatisticsPublic = async() =>{
    await pullMetadataAsync();
    return metadataCodeCopy;
}

module.exports.DUMP_DATA_DEBUG = async() =>{
    //console.log("DUMPING DATA")
    var keys = await AsyncStorage.getAllKeys();
    //console.log("keys: "+ keys);

    var dump = '';

    for(i in keys){
        await getData(keys[i])
        .then(data => {
            dump+=keys[i] + ": " + JSON.stringify(data) + ", ";
            //console.log(keys[i]+": ");
            //console.log(data);
            })
        .catch(err => console.log(err))
    }

    return dump;
}

module.exports.CLEAR_DATA_DEBUG = async() => {
    var keys = await AsyncStorage.getAllKeys();
    //console.log("keys: "+ keys);

    for(i in keys){
        await AsyncStorage.removeItem(keys[i])
        .then(data => {
            //console.log("CLEARING KEY: "+keys[i])
            })
        .catch(err => console.error(err))
    }

    for(i in keys){
        //console.log("data at "+keys[i]+": "+ await getData(keys[i]))
    }
}