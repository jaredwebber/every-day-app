//Local Storage
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { act } from 'react-test-renderer';


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
    this.LastGoalInit = date.toLocaleDateString()
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

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function areDifferentWeeks(dateStringOne, dateStringTwo){
    var result = true;
    console.log("one: "+dateStringOne)
    console.log("two: "+dateStringTwo)
    var stringOne = dateStringOne.split('-');
    var stringTwo = dateStringTwo.split('-');

    console.log(stringOne[1])
    console.log(stringTwo[1])
    if(parseInt(stringOne[1]) === parseInt(stringTwo[1])){//if same month
        if(parseInt(stringTwo[2]) - parseInt(stringOne[2]) <7){
            result = false;
        }
    }else{
        var daysInFirstMonth = daysInMonth(parseInt(stringOne[1]), new Date().getFullYear()) - parseInt(stringOne[2]);
        console.log(parseInt(daysInFirstMonth))
        if(parseInt(daysInFirstMonth) + parseInt(stringTwo[2]) < 7){
            result = false;
        }
    }
    return result;
}


// Interaction Functions
const verifyInGoalSpan = async() =>{
    await pullMetadataAsync();

    var needsPush = false; //if span is not within bounds, then must push to storage
    currDateString = new Date().toLocaleDateString();

    if(metadataCodeCopy !== null){
        for(var i in metadataCodeCopy){
            if(metadataCodeCopy[i].GoalFrequency === DAY){
                if(metadataCodeCopy[i].LastGoalInit !== currDateString.split("-")[2]){
                    needsPush = true;
                }
            }else if(metadataCodeCopy[i].GoalFrequency === WEEK){
                if(areDifferentWeeks(metadataCodeCopy[i].LastGoalInit, currDateString)){
                    needsPush = true;
                }
            }

            if(needsPush){
                metadataCodeCopy[i].LastGoalInit = currDateString;
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

                    if(metadataCodeCopy[i].TodayCount > metadataCodeCopy[i].HighestPeriod){
                        metadataCodeCopy[i].HighestPeriod  = (metadataCodeCopy[i].TodayCount);
                    }

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

module.exports.DEBUGupdate = async(update)=>{
    await pullMetadataAsync();
    if(update.length === 10){
        for(i in metadataCodeCopy){
            if(parseInt(metadataCodeCopy[i].ActivityID) === parseInt(update[0])){
                try{
                    if(update[1] !== "-") metadataCodeCopy[i].ActivityName = update[1];
                    if(update[2] !== "-") metadataCodeCopy[i].GoalAmount = parseInt(update[2]);
                    if(update[3] !== "-") metadataCodeCopy[i].CurrentStreak = parseInt(update[3]);
                    if(update[4] !== "-") metadataCodeCopy[i].HighestPeriod = parseInt(update[4]);
                    if(update[5] !== "-") metadataCodeCopy[i].TotalGoalsMet = parseInt(update[5]);
                    if(update[6] !== "-") metadataCodeCopy[i].GrandTotal = parseInt(update[6]);
                    if(update[7] !== "-") metadataCodeCopy[i].TotalLogCount = parseInt(update[7]);
                    if(update[8] !== "-") metadataCodeCopy[i].LongestStreak = parseInt(update[8]);
                    if(update[9] !== "-") metadataCodeCopy[i].Unit = update[9];
                }catch(e){
                    console.warn("Unable to update with values:");
                    console.warn(update);
                }

                break;
            }
        }
    }else{
        console.error("Invalid update array length: "+update.length)
    }
    //parse array of order - finish order and make sure everything is included
    //ActivityID,name,goal,currStreak,highestPeriod,totalGoalsMet,Total,TotalLogs,longestStreak, unit

    //any null column is not updated

    //set all metadataCodeCopy vals

    await pushMetadataAsync();
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

//Testing

console.log(areDifferentWeeks(new Date(2022,0,28).toLocaleDateString(), new Date(2022,1,3).toLocaleDateString()))