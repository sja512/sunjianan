Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, // month  
        "d+": this.getDate(), // day  
        "h+": this.getHours(), // hour  
        "m+": this.getMinutes(), // minute  
        "s+": this.getSeconds(), // second  
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S": this.getMilliseconds()// millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

function dateTimeRender(data, type, row, meta) {
    if (data == null || data == '') {
        return '';
    }
    var dt;
    if (data instanceof Date) {
        dt = data;
    } else {
        dt = new Date(data);
    }
    return dt.format("yyyy-MM-dd hh:mm:ss");
}

function repairTypeRender(data, type, row, meta) {
    if (data == 'repair_saleable_pick_type') {
        return '可销可配数修复';
    }
    if (data == 'repair_road_type') {
        return '在途数修复';
    }
    if (data == 'repair_batch_pick_type') {
        return '批次可配数修复';
    }
    if (data == 'db_from_refresh_to_cache') {
        return '缓存刷新';
    }
    if (data == 'repair_stock_sku_ext_type') {
        return '库存商品冗余修复';
    }
    if (data == 'repair_item_location_type') {
        return '商品库位对照冗余修复';
    }
    return '其他任务';
}

function statusRender(data, type, row, meta) {
    if (data == 1) {
        return "<small class='label bg-green'>启用</small>";
    } else {
        return "<small class='label bg-red'>停用</small>";
    }
}

function typeRender(data, type, row, meta) {
    if (data == 1) {
        return "<small class='label bg-orange'>缓存</small>";
    } else if (data == 2) {
        return "<small class='label bg-blue'>数据库</small>";
    } else if (data == 3) {
        return "<small class='label bg-black'>其他</small>";
    }
}

function bizTypeRender(data, type, row, meta) {
    if (data == 1) {
        return "<small class='label bg-orange'>库存</small>";
    } else if (data == 2) {
        return "<small class='label bg-red'>可销</small>";
    } else if (data == 3) {
        return "<small class='label bg-green'>可配</small>";
    } else if (data == 4) {
        return "<small class='label bg-blue'>在途</small>";
    } else if (data == 5) {
        return "<small class='label bg-black'>未付款</small>";
    }
}

function jobStatusRender(data, type, row, meta) {
    if (data == 1 || data == '1') {
        return "<small class='label bg-green'>运行中</small>";
    } else if (data == 2) {
        return "<small class='label bg-red'>任务暂停</small>";
    } else if (data == 5) {
        return "<small class='label bg-green'>立即运行</small>";
    } else if (data == 0) {
        return "<small class='label bg-red'>停用</small>";
    }
}

function importStatusRender(data, type, row, meta) {
    if (data === 1) {
        return "<small class='label bg-green'>有效</small>";
    } else {
        return "<small class='label bg-red'>无效</small>";
    }
}

function createDataTable(tableId, config) {
    var columns = [];
    $("#" + tableId + " thead th").each(function (i) {
        var options = new Function("return " + "{" + $(this).attr("data-options") + "}")();
        columns.push({
            data: options.field,
            width: options.width,
            defaultContent: '',
            render: options.render
        });
    });
    var table = $('#' + tableId).DataTable($.extend({
        language: {
            url: ctx + '/static/plugins/datatables/zh_CN.json'
        },
        scrollY: "360px",
        serverSide: true,
        processing: true,
        pageLength: 10,
        paging: true,
        lengthChange: false,
        info: true,
        ordering: false,
        pagingType: "full_numbers",
        autoWidth: false,
        stateSave: false,
        searching: false,
        singleSelect: true,
        destroy: true,
        bLengthChange: false,
        ajax: {
            url: config.url,
            type: 'post',
            data: function (d) {
                var param = {};
                param.start = d.start;//开始的序号
                param.length = d.length;//要取的数据的
                $("#" + tableId + "_filter").find(':input[name]').each(function (i) {
                    param[$(this).attr('name')] = $(this).val();
                });
                return param;
            }
        },
        columns: columns,
    }, config));
    $('#' + tableId + ' tbody').on('click', '>tr[role="row"]:not(.details)', function () {
        if (config.singleSelect == undefined || config.singleSelect) {
            if (!$(this).hasClass('selected')) {
                $('#' + tableId + ' tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        } else {
            $(this).toggleClass('selected');
        }
        if (typeof config.onClickRow != 'undefined') {
            var rowData = table.row($(this)).data();
            config.onClickRow(rowData);
        }
    });
    $('#' + tableId + " input[name='select_all']").on('click', function () {
        if (this.checked) {
            $('#' + tableId + ' tbody tr:not(.selected)').addClass('selected');
        } else {
            $('#' + tableId + ' tbody tr.selected').removeClass('selected');
        }
    });
    return table;
}

function initDataTable(tableId, config) {
    var columns = [];
    $("#" + tableId + " thead th").each(function (i) {
        var options = new Function("return " + "{" + $(this).attr("data-options") + "}")();
        columns.push({
            data: options.field,
            width: options.width,
            defaultContent: '',
            render: options.render
        });
    });
    var table = $('#' + tableId).DataTable($.extend({
        language: {
            url: ctx + '/static/plugins/datatables/zh_CN.json'
        },
        scrollY: "300px",
        processing: true,
        paging: false,
        lengthChange: false,
        ordering: false,
        autoWidth: false,
        stateSave: false,
        searching: false,
        columns: columns,
        scrollX: true,
        scrollCollapse: true,
        data: []
    }, config));
    return table;
}

function createDateRangePicker(pickerId, config) {
    var date = new Date();
    var yesterday = new Date().setDate(date.getDate() - 1);
    var last7Day = new Date().setDate(date.getDate() - 7);
    var options = $.extend({
        timePicker24Hour: true,
        timePickerIncrement: 5,
        timePicker: true,
        startDate: new Date().format('yyyy-MM-dd'),
        endDate: date,
        locale: {
            format: 'YYYY-MM-DD HH:mm'
        }, ranges: {
            "Today": [
                new Date().format('yyyy-MM-dd'),
                new Date().format("yyyy-MM-dd 23:59:59")
            ],
            "Yesterday": [
                new Date(yesterday).format('yyyy-MM-dd'),
                new Date(yesterday).format("yyyy-MM-dd 23:59:59")
            ],
            "Last 7 Days": [
                new Date(last7Day).format('yyyy-MM-dd'),
                new Date().format("yyyy-MM-dd 23:59:59")
            ]
        }
    }, config);
    $("#" + pickerId).daterangepicker(options);
    var startDateId = pickerId + 'Start';
    var endDateId = pickerId + 'End';
    ($("#" + pickerId)).after($('<input />').attr('id', startDateId).attr('name', pickerId + 'Begin').attr('type', 'hidden'));
    ($("#" + startDateId)).after($('<input />').attr('id', endDateId).attr('name', pickerId + 'End').attr('type', 'hidden'));
    $("#" + startDateId).val(new Date(options.startDate).format('yyyy-MM-dd hh:mm:ss'));
    $("#" + endDateId).val(new Date(options.endDate).format('yyyy-MM-dd hh:mm:ss'));
    $("#" + pickerId).on('apply.daterangepicker', function (ev, picker) {
        $("#" + startDateId).val(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
        $("#" + endDateId).val(picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
    });
}

function initSelect2(options, callback) {
    $.ajax({
        type: "post",
        url: options.url,
        dataType: "json",
        success: function (data) {
            var results = $.map(data, function (item) {
                return {
                    text: item[options.text],
                    id: item[options.id]
                }
            });
            callback.call(this, results);
        }
    });
}

function ajaxPost(url, params, callback, options) {
    $.ajax($.extend({
        type: 'post',
        async: false,
        url: url,
        data: params,
        dataType: 'json',
        success: function (result) {
            if (result.status == 200) {
                var dlg = BootstrapDialog.success('操作成功');
                setTimeout(function () {
                    dlg.close();
                }, 800);
                if (typeof callback != 'undefined') {
                    callback.call(this, result);
                }
            } else {
                BootstrapDialog.warning(result.message);
            }
        },
        error: function (err) {
            BootstrapDialog.danger('操作失败');
        }
    }, options));
}

var _old_load = jQuery.fn.load;
jQuery.fn.load = function (url, params, callback) {
    if (typeof url !== "string" && _old_load) {
        return _old_load.apply(this, arguments);
    }
    var selector, type, response,
        self = this,
        off = url.indexOf(" ");
    if (off > -1) {
        selector = jQuery.trim(url.slice(off));
        url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
        callback = params;
        params = undefined;
    } else if (params && typeof params === "object") {
        type = "POST";
    }
    if (self.length > 0) {
        jQuery.ajax({
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Requested-With', {
                    toString: function () {
                        return '';
                    }
                });
            },
            type: type || "GET",
            dataType: "html",
            data: params
        }).done(function (responseText) {
            response = arguments;
            //页面超时跳转到首页
            if (responseText.startWith("<!--login_page_identity-->")) {
                BootstrapDialog.warning('登录超时,请重新登录！');
                setTimeout(function () {
                    window.location.href = ctx + "/";
                }, 1200);
            } else {
                self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
            }
        }).always(callback && function (jqXHR, status) {
                self.each(function () {
                    callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                });
            });
    }
    return this;
};

String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
}

function loadPage(url) {
    if (url.indexOf('stockflowegleye/etl') >= 0 || url.indexOf('stockflowegleye/transfer') >= 0) {
        $(".content-wrapper").empty();
        $('.content-wrapper').append("<iframe id='content-iframe' scrolling='no' frameborder='0' src='' style='width:100%;height:640px;'></iframe>");
        $('#content-iframe').attr('src', '/' + url);
    } else {
        $('.content-wrapper').load(url, function (response, status, xhr) {
            if (status == 'error') {
                if (response) {
                    $('.content-wrapper').html(response);
                } else {
                    BootstrapDialog.warning('页面加载失败');
                }
            }
        });
    }
}

function loadFramePage(url) {
    var content = '<iframe scrolling="no" frameborder="0" src="' + url + '" style="width:100%;height:640px;"></iframe>';
    $('.content-wrapper').html(content);
}