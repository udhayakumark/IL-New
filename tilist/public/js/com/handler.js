$(document).ready(function () {
});


function menuHandler(obj) {
    var p = obj.id;
   
    if (p == "home") {
        window.location = "./OrgUnit.html";
    }
    else if (p == "users") {
        window.location = "./Users.html";
    }
    else if (p == "orgUnit") {
        window.location = "./OrgUnit.html";
    }
    else if (p == "events") {
        window.location = "./Events.aspx";
    }
    else if (p == "tiles") {
        window.location = "./Tiles.aspx";
    }
}


function logOut() {
    Ext.Ajax.request({
        url: 'UserServices.asmx/logOut',
        method: 'POST',
        params: {},
        success: function (response) {
            var status = Ext.DomQuery.selectValue('Status', response.responseXML);
            if (status == 'success') {
                window.location = "./index.aspx";
            }
            else {
                window.location = "./index.aspx";
            }

        },
        failure: function (response) {
            Ext.MessageBox.alert('Error', 'Error! Try again...');
        }
    });  
}


//This function gives the difference in days between 2 date objects. enDate - stdate
function dateDiff(stDate, enDate) {
    return Math.ceil((enDate.getTime() - stDate.getTime()) / (1000 * 60 * 60 * 24))
}

//This function gives the difference in seconds between 2 date objects. enDate - stdate
function timeDiff(stDate, enDate) {
    return Math.ceil((enDate.getTime() - stDate.getTime()) / 1000)
}


function formatedDate(date) {
    var dt = new Date(date);
    return Ext.Date.format(dt, 'Y-m-d\TH:i:sP');
}


function formatDateTile(date) {
    var dt = new Date(date);
    return Ext.Date.format(dt, 'd-m-Y');
}