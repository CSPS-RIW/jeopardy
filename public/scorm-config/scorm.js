//Vars
var SCORMOnline, data, isLoaded, isSynchronized, stringData;

/*---------- On Load Stuff ----------*/
function SCORMOnLoad(){
    SCORMOnline = initSCORM();

    console.log("Loaded, calling SCORM completion...");
    if(SCORMOnline){
        setCompletion();
    }
    else{
        console.error("Couldn't set completion because SCORM is offline");
    }

    initTracking();
}


/*---------- SCORM Init ----------*/
function initSCORM(){
    return doLMSInitialize();
}


/*---------- Tracking ----------*/
function initTracking(){
    console.log("Initializing tracking...");

    //DATA CONTAINS DATA IN OBJ FORMAT; used for everything...
    data = {};

    //IS LOADED? (BOOL) THAT SIGNIFIES IF INITIAL TRACKING HAS BEEN RETRIEVED FROM iLMS
    isLoaded = false;

    //IS SYNCHRONIZE? (BOOL) THAT SPECIFIES IF this.data{} IS SYNCHRONIZED WITH (THE SAME AS) WHATS IN THE iLMS
    isSynchronized = false;

    //PURE STRING OF WHATS IN THE CMI.COMMENTS; it's what the iLMS gives and takes when loading/saving
    stringData = "";

    //LOAD 
    if(SCORMOnline){
        stringData = getSuspendData();
    }
    else{
        console.error("Couldn't get suspendData because SCORM is offline");
    }

    if (stringData === undefined || typeof stringData != "string" || stringData === "") {
        //EMPTY STRING DATA
        stringData = "";
    } else {
        //CONVERT TO OBJECT
        data = JSON.parse(stringData);
    }

    //ONCE LOADED...
    isLoaded = true;
    isSynchronized = true;
}

//SAVE DATA; you know, save stuff
function saveData(id, dat){
    //NOT SYNCHRONIZED NO MORE
    isSynchronized = false;

    if (!fValidateData(dat, -1)) {
        return false;
    }

    if (data[id] === undefined) {
        //create new entry
        data[id] = dat;
    } else {
        //update existing entry
        data[id] = dat;
    }

    //READY JSON STRING
    stringData = JSON.stringify(data);


    //SAVE DATA TO iLMS
    syncData();
}

//RETRIEVE DATA; you know, return stuff you asked for
function getData(id){
    if (data[id] === undefined) {
        return undefined;
    } else {
        return data[id];
    }
}

//SYNCHRONIZE DATA; take current this.data{} and save it in iLMS
function syncData() {
    if(SCORMOnline){
        saveSuspendData(JSON.stringify(data));
    }
    else{
        console.error("Couldn't save suspendData because SCORM is offline");
    }

    isSynchronized = true;
}

//VALIDATE DATA
function fValidateData(dat, mode) {
    var isValid = true;

    //IMPERATIVELY CHANGE UNDEFINEDs TO NULLs (JSON DOESNT LIKE UNDEFINED)
    dat = (dat === undefined) ? null : dat;

    //*TMP, should also crawl through objects & arrays to get rid of undefineds, unefinedes, undefinds...we

    mode = (isNaN(mode)) ? 0 : mode;
    switch (mode) {
        case -1:
            //Loose - don't care
            //obvious passthrough *TMP
            isValid = true;
            break;
        case 0:
            //Strict - Check if String
            if (typeof dat != "string") {
                isValid = false;
            }
            break;
        default:
        //console.error('DataController.fValidateData: validation mode does not exist');
    }
    return isValid;
}

function getSuspendData(){
    return doLMSGetValue("cmi.suspend_data");
}

function saveSuspendData(data){
    doLMSSetValue("cmi.suspend_data", data);

    if(SCORMOnline){
        doLMSCommit();
    }
    else{
        console.error("Couldn't do LMSCommit because SCORM is offline");
    }
}

function getUserName(){
    var userName = doLMSGetValue("cmi.core.student_name");
    var first = userName.substring(userName.indexOf(',') + 1);
    var last = userName.substring(0, userName.indexOf(','));

    return { first: first, last: last};
}