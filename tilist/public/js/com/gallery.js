Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', '../ux');
Ext.require([
    'Ext.data.*',
    'Ext.util.*',
    'Ext.view.View',
    'Ext.ux.DataView.DragSelector',
    'Ext.ux.DataView.LabelEditor'
]);

Ext.onReady(function () {

    $.post('http://tilist.nodeville.net/image/get', null, function (json) {
        if (json) {
            var images = constructImages(json);
            fileupload(images);
        }
    }, "json");
});


function constructImages(images) {
    var data = "{\'Datas\': [";
    for (var i = 0; i < images.length; i++) {
        data += "{ \"name\": ";
        data += "\'" + images[i].name + "\'" + ", ";
        data += "\"title\": ";
        data += "\'" + images[i].type + "\'" + ", ";
        data += "\"_id\": ";
        data += "\'" + images[i]._id + "\'" + "},";
    }
    if (images.length > 1) {
        data = data.substring(0, data.length - 1);
    }
    data += "]}";
    return data;
}

function fileupload(images) {
    eval('var datas=' + images);
    var ImageModel = Ext.define('ImageModel', {
        extend: 'Ext.data.Model',
        fields: [
           { name: 'name' },
           { name: 'type' },
           { name: '_id' }
        ]
    });

    var store = Ext.create('Ext.data.Store', {
        data: datas,
        model: ImageModel,
        storeId: 'imgStore',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'Datas'
            }
        }
    });

    var tbar = new Ext.Toolbar({
        style: 'border:1px solid #99BBE8;'
    });

    var detailsView = Ext.create('Ext.view.View', {
        store: store,
        id: 'detailsView',
        tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{_id}">',
                    '<div class="thumb"><img src="{url}" title=""></div>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
        multiSelect: true,
        height: 300,
        trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.thumb-wrap',
        emptyText: 'No images to display',
        plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {}),
                Ext.create('Ext.ux.DataView.LabelEditor', { dataIndex: 'name' })
            ],
        prepareData: function (data) {
            Ext.apply(data, {
                shortName: Ext.util.Format.ellipsis(data.name, 15),
                url: "http://tilist.nodeville.net/img/Tile/" + data.name
            });
            return data;
        },
        listeners: {
            selectionchange: function (dv, nodes) {

            },
            itemdblclick: function (dv, nodes) {
                confirmDeleteImages();
            }
        }
    });

    var imgList = Ext.create('Ext.Panel', {
        id: 'images-view',
        frame: true,
        collapsible: false,
        width: 420,
        margin: '10 0 0 8',
        autoScroll: true,
        items: [detailsView]
    });

    function confirmDeleteImages() {
        Ext.MessageBox.confirm('Confirmation', 'Are you sure?', deleteImages);
    }

    function deleteImages(btn) {
        switch (btn) {
            case 'yes':
                var records = detailsView.getSelectionModel().getSelection()[0];
                if (records) {
                    if (records.data._id != "" || records.data._id != null) {
                        var datas = "{" + "title: " + "\'" + records.data.name + "\'" + ", ";
                            datas += "tile_type: " + "\'" + records.data.type + "\'" + ", ";
                        if (records.data._id != "") {
                            datas = datas.substring(0, datas.length - 1);
                            datas += ", _id: " + "\'" + records.data._id + "\'" + " }";
                        }

                        eval('var images=' + datas);
                        $.post('http://tilist.nodeville.net/image/remove', images, function (json) {
                            if (json) {
                                store.remove(records);
                                store.sync();
                            }
                            else {
                                Ext.Msg.alert('Error', 'Unable to Remove in database');
                            }
                        }, "json");
                    }
                }
                break;
            case 'no':
                break;
        }
    }

    Ext.apply(Ext.form.field.VTypes, {
        Image: function (v) {
            v = v.replace(/^\s|\s$/g, ""); //trims string
            if (v.match(/([^\/\\]+)\.(gif|png|jpg|jpeg)$/i))
                return true;
            else
                return false;
        },
        ImageText: 'Must be a valid image: gif,jpg,png,jpeg'
    });

    var fileUpload = new Ext.create('Ext.form.Panel', {
        width: 420,
        height: 100,
        bodyPadding: 20,
        frame: true,
        margin: '10 10 10 8',
        fileUpload: true,
        renderTo: 'right-top',
        items: [{
            xtype: 'filefield',
            name: 'image',
            fieldLabel: 'New Image',
            labelWidth: 100,
            vtype: 'Image',
            width: 380,
            allowBlank: false,
            buttonText: '',
            buttonConfig: {
                iconCls: 'upload-icon'
            }
        },
        {
            xtype: 'hidden',
            id: 'type',
            name: 'type',
            value: 'Tile'
        },
        {
            xtype: 'hidden',
            id: 'name',
            name: 'name',
            value: 'test1'
        }
       ],
        buttons: [{
            text: 'Upload',
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        url: 'http://tilist.nodeville.net/image/upload',
                        waitMsg: 'Uploading ....',
                        success: function (form, o) {
                        },
                        failure: function (form, o) {
                            debugger;
                        }
                    });
                }
            }
         }
        ]
    });

    var formWindow = Ext.create('Ext.window.Window', {
        title: 'Image List',
        closable: true,
        width: 450,
        height: 470,
        plain: true,

        modal: true,
        layout: 'vbox',
        items: [imgList, { xtype: 'tbfill', height: 2 }, fileUpload],
        listeners: {
            close: function () {
                formWindow.destroy();
            }
        }
    });
    formWindow.show();
}