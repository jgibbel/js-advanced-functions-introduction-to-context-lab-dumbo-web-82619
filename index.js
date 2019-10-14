// Your code here

function createEmployeeRecord (arr) {
    let record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return record;
}

function createEmployeeRecords (arrofarr) {
    let record_array = arrofarr.map(function(arr) {
        return createEmployeeRecord(arr)
    });
    return record_array;
}

function createTimeInEvent (record, date_stamp) {
    let date_arr = date_stamp.split(" ")
    let time_event = {
        type: "TimeIn",
        hour: parseInt(date_arr[1]),
        date:  date_arr[0]
    };
    record.timeInEvents.push(time_event);
    return record;
}

function createTimeOutEvent (record, date_stamp) {
    let date_arr = date_stamp.split(" ")
    let time_event = {
        type: "TimeOut",
        hour: parseInt(date_arr[1]),
        date:  date_arr[0]
    };
    record.timeOutEvents.push(time_event);
    return record;
}

function hoursWorkedOnDate (record, date) {
    let in_obj = record.timeInEvents.find(function(a) {
        return a.date === date;
    });
    let out_obj = record.timeOutEvents.find(function(a) {
        return a.date === date;
    });
    let hours_worked_zero = parseInt(out_obj.hour) - parseInt(in_obj.hour);
    let hours_worked = hours_worked_zero/100
    return hours_worked;
}

function wagesEarnedOnDate(record, date) {
    const wage = record.payPerHour;
    const hours = hoursWorkedOnDate(record, date);
    return wage*hours;
}

function allWagesFor(record) {
    const date_arr = record.timeInEvents.map(function(a){return a.date});
    const wages = date_arr.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(record, d);
    }, 0);
    return wages;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(record){
        return record.firstName === firstName;
    });
}

function calculatePayroll(arrofarr) {
    return arrofarr.reduce(function(memo, record){
        return memo + allWagesFor(record);
    }, 0);
}


