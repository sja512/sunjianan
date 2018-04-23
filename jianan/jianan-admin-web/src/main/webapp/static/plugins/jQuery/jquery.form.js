/**
 *
 */
/**
 * form load
 *
 */
(function ($) {
    /**
     * load form data
     * if data is a URL string type load from remote site,
     * otherwise load from local data object.
     */
    function load(target, data) {
        if (typeof data == 'string') {
            var param = {};
            $.ajax({
                url: data,
                data: param,
                dataType: 'json',
                success: function (data) {
                    _load(data);
                }
            });
        } else {
            _load(data);
        }

        function _load(data) {
            var form = $(target);
            for (var name in data) {
                var val = data[name];
                if (!_checkField(name, val)) {
                    form.find('input[name="' + name + '"]').val(val);
                    form.find('textarea[name="' + name + '"]').val(val);
                    form.find('select[name="' + name + '"]').val(val);
                }
            }
        }

        /**
         * check the checkbox and radio fields
         */
        function _checkField(name, val) {
            var cc = $(target).find('input[name="' + name + '"][type=radio], input[name="' + name + '"][type=checkbox]');
            if (cc.length) {
                cc.iCheck('uncheck');
                cc.each(function () {
                    var checked = _isChecked($(this).val(), val);
                    $(this).iCheck(checked ? 'check' : 'uncheck');
                });
                return true;
            }
            return false;
        }

        function _isChecked(v, val) {
            if (v == String(val) || $.inArray(v, $.isArray(val) ? val : [val]) >= 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    function reset(target) {
        var form = $(target);
        form[0].reset();
        form.find(':input[name]:not(:radio)').val('');
        form.find(':radio').attr('checked', false);
        form.find(':radio[data-flag]').iCheck('update');
        form.find(':checkbox').attr('checked', false);
        form.find(':checkbox[data-flag]').iCheck('update');
        form.find('label[name]').text('');
        form.find('select:not(.select2)').val("");
        form.find("select.select2").val('').trigger('change');
        if (form.data('bootstrapValidator')) {
            form.data('bootstrapValidator').resetForm();
        }
    }

    function initForm(target, options) {
        options = options || {};
        $.data(target, 'form', {
            options: $.extend({}, options)
        });
    }

    $.fn.form = function (options, param) {
        if (typeof options == 'string') {
            this.each(function () {
                initForm(this);
            });
            return $.fn.form.methods[options](this, param);
        }
    };

    $.fn.form.methods = {
        load: function (jq, data) {
            return jq.each(function () {
                load(this, data);
            });
        }, reset: function (jq, data) {
            return jq.each(function () {
                reset(this);
            });
        }
    };
})(jQuery);
