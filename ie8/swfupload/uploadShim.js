var Demo = {}
Demo.IMGTYPE = {
    gif: 1,
    bmp: 1,
    jpg: 1,
    png: 1
};
function UploadShim(options, conn) {
    var swfupload;

    var flashUpload = function (url) {
        swfupload.setUploadURL(url);
        swfupload.startUpload();
    };

    var startUpload = function () {
        console.log('start', conn)
        WebIM.utils.uploadFile.call(conn, {
            apiUrl: WebIM.config.apiURL,
            flashUpload: flashUpload
        });
    };

    var upload = {
        shim: function (fileInputId) {
            if (!WebIM.utils.isCanUploadFile) {
                return;
            }

            var pageTitle = document.title;
            var uploadBtn = document.getElementById(options.fileInputId);

            if (typeof SWFUpload === 'undefined' || !uploadBtn) {
                return;
            }

            return new SWFUpload({
                file_post_name: 'file'
                , flash_url: 'swfupload/swfupload.swf'
                , button_placeholder_id: options.fileInputId
                , button_width: 120
                , button_height: 30
                , button_cursor: SWFUpload.CURSOR.HAND
                , button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT
                , file_size_limit: 10485760
                , file_upload_limit: 0
                , file_queued_error_handler: function () {
                }
                , file_dialog_start_handler: function () {
                }
                , file_dialog_complete_handler: function () {
                }
                , file_queued_handler: function (file) {
                    if (this.getStats().files_queued > 1) {
                        this.cancelUpload();
                    }
                    if (10485760 < file.size) {
                        // Demo.api.NotifyError(Demo.lan.exceed);
                        this.cancelUpload();
                    } else if (Demo.IMGTYPE[file.type.slice(1).toLowerCase()]) {
                        this.filetype = 'img';
                        startUpload();
                    } else if (Demo.FILETYPE[file.type.slice(1).toLowerCase()]) {
                        this.filetype = 'audio';
                        startUpload();
                    } else if (Demo.AUDIOTYPE[file.type.slice(1).toLowerCase()]) {
                        this.filetype = 'file';
                        startUpload();
                    } else {
                        // Demo.api.NotifyError(Demo.lan.invalidType + file.type);
                        this.cancelUpload();
                    }
                }
                , upload_error_handler: function (file, code, msg) {
                    if (code != SWFUpload.UPLOAD_ERROR.FILE_CANCELLED
                        && code != SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED
                        && code != SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED) {
                        // var option = {
                        //     data: Demo.lan.uploadFileFailed,
                        //     to: Demo.selected
                        // };
                        // Demo.api.addToChatRecord(option, 'txt');
                        // Demo.api.appendMsg(option, 'txt');
                        console.log('fail')
                    }
                }
                , upload_success_handler: function (file, response) {
                    if (!file || !response) {
                        return;
                    }

                    var me = this;

                    try {
                        var res = WebIM.utils.parseUploadResponse(response);
                        res = JSON.parse(res);
                        if (file && !file.url && res.entities && res.entities.length > 0) {
                            file.url = ( (location.protocol != 'https:' && WebIM.config.isHttpDNS) ? conn.apiUrl : res.uri) + '/' + res.entities[0].uuid;
                        }

                        var msg = new WebIM.message(this.filetype, conn.getUniqueId());


                        var opt = {
                            body: {
                                type: this.filetype,
                                url: file.url,
                                filename: file.name
                            },
                            file: file,
                            //todo
                            // to: Demo.selected,
                            // roomType: Demo.selectedCate === 'chatrooms',
                            success: function (id) {
                                console.log('success: ', file.url)
                                // var option = {
                                //     data: file.url,
                                //     from: Demo.user,
                                //     to: Demo.selected
                                // };
                                // Demo.api.addToChatRecord(option, me.filetype);
                                // Demo.api.appendMsg(option, me.filetype);
                            }
                        };

                        msg.set(opt);

                        // todo
                        // if (Demo.selectedCate === 'groups') {
                        //     msg.setGroup(Demo.groupType);
                        // } else if (Demo.selectedCate === 'chatrooms') {
                        //     msg.setGroup(Demo.groupType);
                        // }

                        conn.send(msg.body);

                    } catch (e) {
                        // Demo.api.NotifyError('文件发送失败');
                    }
                }
            });
        }
    };

    if (!WebIM.utils.isCanUploadFileAsync && WebIM.utils.isCanUploadFile) {
        swfupload = upload.shim(options.fileInputId);
    }

    return upload;
};
