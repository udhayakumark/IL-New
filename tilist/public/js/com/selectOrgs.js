Ext.Loader.setConfig({
    enabled: true
}); Ext.Loader.setPath('Ext.ux', '../ux');

Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*',
    'Ext.ux.CheckColumn',
    'Ext.data.JsonP',
    'Ext.data.proxy.Ajax'
]);

Ext.onReady(function () {
    $.post('http://tilist.nodeville.net/orgunits/get', null, function (json) {
        if (json.length != 0) {
            var objAssignedOrgs = "";
            var assignedOrgs = Ext.state.LocalStorageProvider.create();
            if (assignedOrgs.state.name != "admin") {
                eval('objAssignedOrgs=' + assignedOrgs.state.organizations);
            }

            Ext.define('SelectedOrgs', {
                extend: 'Ext.data.Model',
                fields: [
                          { name: 'name', type: 'string' },
                          { name: '_id', type: 'string' }
                    ]
            });

            selec_orgs = Ext.create('Ext.data.Store', {
                model: 'SelectedOrgs',
                storeId: 'orgsSelec',
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            });
            selec_orgs.sync();

            var orgsAssigned = new Array();

            if (assignedOrgs.state.name != "admin") {
                for (var i = 0; i < objAssignedOrgs.length; i++) {
                    var data_selec_orgs = new Object();
                    data_selec_orgs.name = objAssignedOrgs[i].name;
                    data_selec_orgs._id = objAssignedOrgs[i]._id;
                    orgsAssigned.push(data_selec_orgs);
                }
            }
            else {
                for (var i = 0; i < json.length; i++) {
                    var data_selec_orgs = new Object();
                    data_selec_orgs.name = json[i].name;
                    data_selec_orgs._id = json[i]._id;
                    orgsAssigned.push(data_selec_orgs);
                }
            }

            for (var i = 0; i < orgsAssigned.length; i++) {
                selec_orgs.add(orgsAssigned[i]);
                selec_orgs.sync();
            }

            var pageCombo = Ext.create('Ext.form.ComboBox', {
                id: 'orgsCombo',
                store: selec_orgs,
                width: 300,
                height: 23,
                queryMode: 'local',
                displayField: 'name',
                emptyText: 'Select Organization',
                valueField: 'name',
                editable: false,
                renderTo: 'div-select-org',
                listeners: {
                    select: function (combo, record, eOpts) {
                    	var li;
                        var tab = $('input[id=hdnTab]').val();
                        $('input[id=hdnSelecOrg]').val(record[0].data._id); 
                        switch(tab)
                         {
                           case "events":
                           
                             li = $('li:contains("Events")');
                             eventsPage(li);     
                             break;
                             
                           case "tiles":
                           
                             li = $('li:contains("Tiles")');
                             tilesPage(li);     
                             break;
                             
                           case "orgunits":   
                                    
                             li = $('li:contains("Organizations Unit")');
                             orgunitsPage(li);               
                             break;
                             
                           case "users":
                           
                             li = $('li:contains("Users")');
                             usermanagePage(li);                 
                             break;
                       }
                    }
                }
            });

            pageCombo.setValue(orgsAssigned[0].name);
            $('input[id=hdnSelecOrg]').val(orgsAssigned[0]._id);

        }

    }, "json");

});



