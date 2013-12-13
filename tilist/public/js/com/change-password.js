Ext.Loader.setConfig({
    enabled: true
}); Ext.Loader.setPath('Ext.ux', '../ux');

Ext.require([
    'Ext.data.*'
]);

var change_pwd_form = "";

Ext.onReady(function () {
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';

    Ext.define('changePasswordData', {
        extend: 'Ext.data.Model',
        fields: [{ name: 'current_password', type: 'string' },
                 { name: 'new_password', type: 'string' },
                 { name: 'confirm_password', type: 'string' }
                ]
    });

    password_store = Ext.create('Ext.data.ArrayStore', {
        storeId: 'changePasswordStore',
        model: changePasswordData,
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'items'
            }
        }
    });

    change_pwd_form = Ext.create('Ext.form.Panel', {
        title: 'Change Password',
        bodyPadding: 5,
        width: 350,
        layout: 'anchor',
        store: password_store,
        defaults: {
            anchor: '100%'
        },
        defaultType: 'textfield',
        items: [{
            id: "cpsw",
            name: "curntPwd",
            fieldLabel: 'Current Password',
            inputType: 'password',
            allowBlank: false,
            initialPassField: 'curpwd',
            listeners: {
                'change': function (res) {
                    var loginObj = Ext.state.LocalStorageProvider.create();
                    if (loginObj.state.password == res.lastValue) {
                        Ext.getCmp('psw1').setDisabled(false);
                        Ext.getCmp('psw2').setDisabled(false);
                        Ext.getCmp('submit').setDisabled(false);

                    } else {
                        Ext.getCmp('psw1').setDisabled(true);
                        Ext.getCmp('psw2').setDisabled(true);
                        Ext.getCmp('submit').setDisabled(true);
                    }
                }
            }
        }, {
            id: "psw1",
            name: "nwPwd",
            fieldLabel: 'New Password',
            inputType: 'password',
            allowBlank: false,
            disabled: true
        }, {
            id: "psw2",
            name: "nwConfPwd",
            fieldLabel: 'Confirm Password',
            inputType: 'password',
            vtype: 'password',
            initialPassField: 'pwd',
            allowBlank: false,
            disabled: true
        }
    ],
        buttons: [{
            text: 'Submit',
            id: 'submit',
            formBind: true,
            disabled: true,
            handler: function () {
                if (change_pwd_form.getForm().isValid()) {
                    var formValue = change_pwd_form.getValues();
                    if (formValue) {
                        changePwdFormSubmit(formValue);
                    }
                }
            }
        }],
        renderTo: 'change-pwd'
    });

    Ext.apply(Ext.form.VTypes, {
        password: function (val) {
            var formValue = change_pwd_form.getValues();
            if (formValue) {
                return (val == formValue.nwPwd);
            }
            return true;
        },
        passwordText: 'Password doesnt Match !'
    });

});

function changePwdFormSubmit(formValue) {
    var logObj = Ext.state.LocalStorageProvider.create();

    var pwdUpdate = "{" + "fullname: " + "\'" + logObj.state.name + "\'" + ", ";
    pwdUpdate += "email: " + "\'" + logObj.state.email + "\'" + ", ";
    pwdUpdate += "password: " + "\'" + formValue.nwPwd + "\'" + ", ";
    pwdUpdate += "role: " + "\'" + logObj.state.role + "\'" + ", ";
    pwdUpdate += "_id: " + "\'" + logObj.state._id + "\'" + " }";
    eval('var objPwdUpdate=' + pwdUpdate);
    objPwdUpdate.organizations = logObj.state.orgs;

    $.post('http://tilist.nodeville.net/users/save', objPwdUpdate, function (res) {
        if (res) {
            change_pwd_form.getForm().reset();
            Ext.Msg.alert('new password has been updated!');
        }
        else {
            Ext.Msg.alert("Error!");
        }
    }, "json");
}




