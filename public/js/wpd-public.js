(function ($) {
    'use strict';

    $(document).ready(function () {
        $(document).on("touchstart click", ".wpc-customize-product", function ()
        {
            var variation_id = 0;
            var type = $(this).data("type");
            if (type == "simple")
                variation_id = $(this).data("id");
            else if (type == "variable")
                variation_id = $("input[name='variation_id']").val();

            if (!variation_id)
            {
                alert("Select the product options first");
                return;
            }
            else
            {
                $.get(
                        ajax_object.ajax_url,
                        {
                            action: "get_customizer_url",
                            variation_id: variation_id

                        },
                function (data) {
                    if (data.url)
                        $(location).attr('href', data.url);
                }
                , "json"
                        );
            }
        });

//        $("[data-original-title]").tooltip();

        $(document).on("touchstart click", ".wpc-upload-product-design", function (e)
        {
            e.preventDefault();
            var variation_id = 0;
            var type = $(this).data("type");
            if (type == "simple")
                variation_id = $(this).data("id");
            else if (type == "variable")
                variation_id = $("input[name='variation_id']").val();

            if (!variation_id)
            {
                alert("Select the product options first");
                return;
            }
            else
            {
                //$(".wpc-uploaded-design-container").show();
                $(".wpc-uploaded-design-container").css("display", "inline-block");
                $("#wpc-product-id-upl").val(variation_id);
                $(this).hide();
            }
        });

        $(".native-uploader #user-custom-design").change(function () {
            var file = $(this).val().toLowerCase();
            if (file != "")
            {
                $("#custom-upload-form").ajaxForm({
                    success: upload_custom_design_callback
                }).submit();
            }
        });

        if ($('#custom-upload-form.custom-uploader').length)
        {
            var custom_upload_ul = $('#custom-upload-form.custom-uploader .acd-upload-info');
            // Initialize the jQuery File Upload plugin
            $('#custom-upload-form.custom-uploader').fileupload({
                // This element will accept file drag/drop uploading
                dropZone: $('#drop'),
                url: ajax_object.ajax_url,
                // This function is called when a file is added to the queue;
                // either via the browse button, or via drag/drop:
                add: function (e, data) {
                    var tpl = $('<div class="working"><div class="acd-info"></div><div class="acd-progress-bar"><div class="acd-progress"></div></div></div>');

                    // Append the file name and file size
                    tpl.find('.acd-info').text(data.files[0].name).append('<i>' + formatFileSize(data.files[0].size) + '</i>');

                    // Add the HTML to the UL element
                    custom_upload_ul.html("");
                    data.context = tpl.appendTo(custom_upload_ul);

                    // Initialize the knob plugin
                    tpl.find('input').knob();

                    // Listen for clicks on the cancel icon
                    tpl.find('span').click(function () {

                        if (tpl.hasClass('working')) {
                            jqXHR.abort();
                        }

                        tpl.fadeOut(function () {
                            tpl.remove();
                        });

                    });

                    // Automatically upload the file once it is added to the queue
                    var jqXHR = data.submit();



                },
                progress: function (e, data) {

                    // Calculate the completion percentage of the upload
                    var progress = parseInt(data.loaded / data.total * 100, 10);

                    // Update the hidden input field and trigger a change
                    // so that the jQuery knob plugin knows to update the dial
                    //data.context.find('input').val(progress).change();
                    data.context.find('.acd-progress').css("width", progress + "%");

                    if (progress == 100) {
                        data.context.removeClass('working');
                    }
                },
                fail: function (e, data) {
                    // Something has gone wrong!
                    data.context.addClass('error');
                },
                done: function (e, data) {
                    upload_custom_design_callback(data.result, false, false, false);
                }
            });
        }



        //Ninja form
        if ($('.wpd-design-opt .ninja-forms-form').length > 0 ){
            
            //Upload my own design form
            if ($('.cart').length > 0){
                $(document).on('change', '.ninja-forms-form .ninja-forms-field', function(){
                    if($('#wpd-design-opt-price').length < 1){
                         $('<input>').attr({
                            type: 'hidden',
                            id: 'wpd-design-opt-price',
                            name: 'wpd-design-opt'
                        }).appendTo('.cart');
                    }
                       
                    var total = $('.ninja-forms-form .calc-wrap input[type = "text"]').val();
                    var wpc_desing_opt = get_design_options();
                    wpc_desing_opt['opt_price'] = total;
                    console.log(wpc_desing_opt);
                    $('#wpd-design-opt-price').val(JSON.stringify(wpc_desing_opt));
                    if($('.amount').length > 0 )
                        $('.amount').html($('.wpd-design-opt').data('currency_symbol')+' '+(parseFloat($('.wpd-design-opt').data('regular_price')) + parseFloat(total)));
                });
            }else{
                $(document).on('change', '.ninja-forms-form .calc-wrap input[type = "text"]', function(){
                    var total = $(this).val();
                    if ($("#wpd-qty").length > 0){
                        $("#wpd-qty").attr("opt_price", total);
                        $("#wpd-qty").trigger( 'change' );
                    }else 

                    return total;
                });
            }
        }

        function upload_custom_design_callback(responseText, statusText, xhr, form)
        {
            if (is_json(responseText))
            {
                var response = $.parseJSON(responseText);

                if (response.success)
                {
                    $("#wpc-uploaded-file").html(response.message);
                }
                else
                    alert(response.message);
            }
            else
                console.log(responseText);
            $("#user-custom-design").val("");
        }

        function formatFileSize(bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }

            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2) + ' GB';
            }

            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2) + ' MB';
            }

            return (bytes / 1000).toFixed(2) + ' KB';
        }

        function is_json(data)
        {
            if (/^[\],:{}\s]*$/.test(data.replace(/\\["\\\/bfnrtu]/g, '@').
                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                    replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
                return true;
            else
                return false;
        }
    });

})(jQuery);

//Serialize ninja form
function get_design_options() {
    var wpc_desing_opt = {};
    var result = {};
    jQuery(".ninja-forms-form-wrap").find("input[type=text], input[type=checkbox], input[type=radio], input[type=number], select, textarea, input[name=_form_id]").each(function (index) {
        var name = jQuery(this).attr("name");
        if (name != "" && typeof name != "undefined")
        {
            var type = jQuery(this).attr("type");
            var val = "";
            if (type == "radio")
            {
                if (jQuery(".ninja-forms-form-wrap [name=" + name + "]:checked").length)
                    val = jQuery(".ninja-forms-form-wrap [name=" + name + "]:checked").val();
                else
                    val = ""
            }
            else if (type == "checkbox")
            {
                if (jQuery(this).parents('.list-checkbox-wrap').length > 0) {
                    val = (result.hasOwnProperty(name)) ? result[name] : '';
                    if ((jQuery(this).is(":checked"))) {
                        val += jQuery(this).val() + ': checked; ';
                    } else {
                        val += jQuery(this).val() + ': unchecked; ';
                    }
                } else {
                    if ((jQuery(this).is(":checked"))) {
                        val = ' checked';
                    } else {
                        val = ' unchecked';
                    }
                }



            }
            else if (jQuery.isArray(jQuery(this).val()))
            {
                var tpm_val = jQuery(this).val();
                jQuery.each(tpm_val, function (index, single_val) {
                    if (index < (tpm_val.length - 1)) {
                        val += single_val + ' | ';
                    } else {
                        val += single_val;
                    }
                });
            } else {
                val = jQuery(this).val();
            }

            result[name] = val;
        }
    });
    var output = {};
    if (jQuery("#wpd-qty").length > 0) {
        var opt_price = jQuery("#wpd-qty").attr("opt_price");
        //            var output = {};
        if (opt_price != 'undefined') {
            output['opt_price'] = opt_price;
        }
        output['wpc_design_opt_list'] = result; //wpc_desing_opt;
        //console.log(output);
        return output;
    } else {
        output['wpc_design_opt_list'] = result;
        return output;//wpc_desing_opt;
    }

}
