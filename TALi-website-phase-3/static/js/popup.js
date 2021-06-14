// $(function () {
//     'use strict';

//     window.addEventListener('load', function () {
//         // Fetch all the forms we want to apply custom Bootstrap validation styles to
//         var forms = document.getElementsByClassName('needs-validation');

//         // Loop over them and prevent submission
//         var validation = Array.prototype.filter.call(forms, function (form) {
//             form.addEventListener('submit', function (event) {
//                 if (form.checkValidity() === false) {
//                     event.preventDefault();
//                     event.stopPropagation();
//                 }
//                 form.classList.add('was-validated');
//             }, false);
//         });
//     }, false);
// });

$(document).ready(function () {

    // $(function () {
    //     if (window.history && window.history.pushState) {
    //         window.history.pushState('', null, '/popupOriginal.html');
    //         $(window).on('popstate', function () {
    //             if (window.confirm("Are you sure you want to go back as you will close this popup and lose all the data that you've entered so far?")) {
    //                 document.location.href = '/popupOriginal.html';
    //             }
    //         });
    //     };
    // });

    var current = 1, current_step, next_step, steps;
    steps = $("fieldset").length;
    //$(".next").click(function(){
    $(document).on("click", ".next", function () {
        current_step = $(this).parent("fieldset");
        next_step = $(this).parent("fieldset").next();
        next_step.show();
        current_step.hide();
        //setProgressBar(++current);
    });
    //$(".previous").click(function(){
    $(document).on("click", ".previous", function () {
        current_step = $(this).parent("fieldset");
        next_step = $(this).parent("fieldset").prev();
        next_step.show();
        current_step.hide();
        //setProgressBar(--current);
    });


    $("#previous-clear-selection").click(function () {
   
        // $(this).find('#add-client-add-a-new-client').val('');

        // $(this).closest('form').find("input[type=text], textarea").val("");

        // $(this).closest('form').find("input[type=input], add-client").val('');

        $('input[type="radio"]').prop('checked', false);

        console.log('Previous add client btn.');

        $(this).data('clicked', false);

        $("#modal-label-heading").html("Add client");
        $("#modal-label-text").html("<p></p>");


    });


    // START CHANGE COLOUR STATE OF NEXT BUTTON

    $("#add-client-add-a-new-client").click(function () {

        $(this).data('clicked', true);
        $("#next-add-client").fadeIn(600);
        
        console.log('Add  a new client btn');
    });

    $("#add-client-child-transfer").click(function () {
       
        $(this).data('clicked', true);
        $("#next-add-client").fadeIn(600);

        console.log('Child transfer btn');
    });

    $("#add-client-add-a-dummy-client").click(function () {
      
        $(this).data('clicked', true);
        $("#next-add-client").fadeIn(600);

        console.log('Add a new Dummy client btn');
    });

    // END CHANGE COLOUR STATE OF NEXT BUTTON

    //  $("#next").hide();


    // START HOME PAGE RADIO BUTTONS 

    $("#next-add-client").click(function () {
        if ($("#add-client-add-a-new-client").data('clicked')) {
            $(this).data('clicked', true);
            current_step = $(this).closest("fieldset");
            next_step = $("#step-add-a-new-client-access");
            next_step.show();
            current_step.hide();

            $("#modal-label-heading").html("Add a new client.....");
            $("#modal-label-text").html("<p>Create a new client record (Please note: Child records cannot be merged)</p>");
         
            console.log('add a new client');

        }
       else if ($("#add-client-child-transfer").data('clicked')) {
            $(this).data('clicked', true);
            current_step = $(this).closest("fieldset");
            next_step = $("#step-child-transfer");
            next_step.show();
            current_step.hide();
            
            $("#modal-label-heading").html("Request a child transfer");
            $("#modal-label-text").html("<p>Transfer a client’s existing TALi record from a parent account to my practitioner account</p>");

            console.log('child transfer');
        }

       else if ($("#add-client-add-a-dummy-client").data('clicked')) {
            $(this).data('clicked', true);
            current_step = $(this).closest("fieldset");
            next_step = $("#step-add-a-new-client-access");
            next_step.show();
            current_step.hide();

            $("#modal-label-heading").html("Add a dummy client");
            $("#modal-label-text").html("<p>Test TALi DETECT, TALi TRAIN and behavioural measures, and view generic sample reporting</p>");

            console.log('add a dummy client');
        }
        else $('input[type="radio"]').prop('checked', false);
    });

    // END HOME PAGE RADIO BUTTONS 


    // START NAVIGATE TO NEXT SECTION BY CLICKING NEXT BUTTON

    $("#next-add-client-access").click(function () {
        if ($("#add-client-add-a-new-client").data('clicked')) {
            current_step = $(this).closest("fieldset");
            next_step = $("#step-add-a-new-client-child-details");
            next_step.show();
            current_step.hide();
            $("#modal-label-heading").html("Add a new client");
            $("#modal-label-text").html("<p>Create a new client record (Please note: Child records cannot be merged)</p>");

            console.log('add a new client');
        }
        else if ($("#add-client-add-a-dummy-client").data('clicked')) {
            current_step = $(this).closest("fieldset");
            next_step = $("#step-add-a-new-client-child-details");
            next_step.show();
            current_step.hide();
            $("#modal-label-heading").html("Add a dummy client");
            $("#modal-label-text").html("<p>Test TALi DETECT, TALi TRAIN and behavioural measures, and view generic sample reporting</p>");

            console.log('add a dummy client add child');
        };
    });

    $("#next-child-details").click(function () {
        if ($("#add-client-add-a-new-client").data('clicked')) {
            current_step = $(this).closest("fieldset");
            next_step = $("#step-add-a-new-client-licence-type");
            next_step.show();
            current_step.hide();
            $("#modal-label-heading").html("Add a new client");
            $("#modal-label-text").html("<p>Create a new client record (Please note: Child records cannot be merged)</p>");

            $("#licence-assessment-available").html("<p>10 available</p>");
            $("#licence-training-available").html("<p>5 available</p>");

            $("#next-add-a-client-licence-type").prop("value", "Add New Client");

            console.log('add a new client');
        }
        else if ($("#add-client-add-a-dummy-client").data('clicked')) {
            current_step = $(this).closest("fieldset");
            next_step = $("#step-add-a-new-client-licence-type");
            next_step.show();
            current_step.hide();
            $("#modal-label-heading").html("Add a dummy client");
            $("#modal-label-text").html("<p>Test TALi DETECT, TALi TRAIN and behavioural measures, and view generic sample reporting</p>");

            $("#licence-assessment-available").html("<p>Unlimited for dummy clients</p>");
            $("#licence-training-available").html("<p>Unlimited for dummy clients</p>");


            $("#next-add-a-client-licence-type").prop("value", "Add Dummy Client");

            console.log('add a dummy client add child');
        };
    });

    // $("#next-child-details").click(function () {
    //     current_step = $(this).closest("fieldset");
    //     next_step = $("#step-add-a-new-client-licence-type");
    //     next_step.show();
    //     current_step.hide();
    //     $("#modal-label-heading").html("Add a new client");
    //     $("#modal-label-text").html("<p>Create a new client record (Please note: Child records cannot be merged)</p>");

    //     console.log('add new client');
    // });

    // $("#next-add-a-dummy-client").click(function () {
    //     current_step = $(this).closest("fieldset");
    //     next_step = $("#step-add-a-new-client-child-details");
    //     next_step.show();
    //     current_step.hide();
    //     $("#modal-label-heading").html("Add a dummy client");
    //     $("#modal-label-text").html("<p>Test TALi DETECT, TALi TRAIN and behavioural measures, and view generic sample reporting</p>");

    //     console.log('add new client');
    // });


    $("#next-add-a-client-licence-type").click(function () {
        if ($("#add-client-add-a-new-client").data('clicked')) {
            current_step = $(this).closest("fieldset");
            next_step = $("#step-success");
            next_step.show();
            current_step.hide();
            $("#modal-label-heading").html("Add a new client");
            $("#modal-label-text").html("<p>Create a new client record (Please note: Child records cannot be merged)</p>");

            $("#success-message-heading").html("A new client record has successfully been created");
            $("#success-message-text").html("<p>Thank you for adding a new client to your TALi Portal.</p>");


            console.log('next add a new client licence type');
        }
        else if ($("#add-client-add-a-dummy-client").data('clicked')) {
            current_step = $(this).closest("fieldset");
            next_step = $("#step-success");
            next_step.show();
            current_step.hide();
            $("#modal-label-heading").html("Add a dummy client");
            $("#modal-label-text").html("<p>Test TALi DETECT, TALi TRAIN and behavioural measures, and view generic sample reporting</p>");

            $("#success-message-heading").html("A new dummy client record has successfully been created");
            $("#success-message-text").html("<p>Thank you for adding a new dummy client to your TALi Portal.</p>");

            console.log('New dummy record created');
        };
    });

    $("#request-transfer-child").click(function () {
        current_step = $(this).closest("fieldset");
        next_step = $("#step-success");
        next_step.show();
        current_step.hide();
        $("#modal-label-heading").html("Request a child transfer");
        $("#modal-label-text").html("<p>Transfer a client’s existing TALi record from a parent account to my practitioner account</p>");

        $("#success-message-heading").html("Transfer request submitted");
        $("#success-message-text").html("<p>Thank you for submitting a child record transfer request.</p><p>&nbsp;</p><p>If the parent email address and/or mobile number is associated with a TALi account, the parent will now be notified of your request via email and SMS.</p><p>&nbsp;</p><p>You will receive an email once the parent has confirmed the transfer of the child record.</p>");

        $("#view-client-record").hide();

        console.log('Child transfer success');
    });

    $("#step-child-transfer-back-btn").click(function () {
        current_step = $(this).closest("fieldset");
        next_step = $("#step-add-client");
        next_step.show();
        current_step.hide();

        $('input[name="add-client"]').prop('checked', false);
        $('input[type="radio"]').prop('checked', false);

        $("#modal-label-heading").html("Add client");
        $("#modal-label-text").html("");

        console.log('Step add new client back from Child transfer');
    });


    // END NAVIGATE TO NEXT SECTION BY CLICKING NEXT BUTTON



    // START ADDING AND REMOVING DISABLED STATE OF NEXT BUTTON 

    $('#next-add-client-access').prop('disabled', true);

    $('#next-add-a-dummy-client').prop('disabled', true);

    $('#next-add-a-client-licence-type').prop('disabled', true);


    $("#add-a-new-client-access-yes").click(function () {
        $("#add-a-new-client-yes-form").css("display", "block");
        $('#next-add-client-access').prop('disabled', false);
    });

    $("#add-a-new-client-access-no").click(function () {
        $("#add-a-new-client-yes-form").css("display", "none");
        $('#next-add-client-access').prop('disabled', false);
    });

    $("#add-a-dummy-client-yes").click(function () {
        $("#add-a-dummy-client-yes-form").css("display", "block");
        $('#next-add-a-dummy-client').prop('disabled', false);
    });

    $("#add-a-dummy-client-yes").click(function () {
        $("#add-a-dummy-client-yes-form").css("display", "block");
        $("#next-add-a-dummy-client").removeClass("disabled");
    });

    $("#add-a-dummy-client-no").click(function () {
        $("#add-a-dummy-client-yes-form").css("display", "none");
        $("#next-add-a-dummy-client").removeClass("disabled");
    });

    $("#add-a-client-licence-type-tali-assessment").click(function () {
        $("#next-add-a-client-licence-type").prop('disabled', false);
    });

    $("#add-a-client-licence-type-tali-training").click(function () {
        $("#next-add-a-client-licence-type").prop('disabled', false);
    });

    // END ADDING AND REMOVING DISABLED STATE OF NEXT BUTTON  

    // START CODE FOR POPUP FORM CHILD CLINICAL 

    $('#id_diagnosis_ex_1_wrapper').addClass('d-none');

    $(function () {
        $('#id_diagnosis_ex_0').change(function () {
            var id_yes_diagnosis = '0',
                id_no_diagnosis = '1',
                id_no_disclose = '2',
                id_unknown = '3',
                value = $(this).val();
            if (value != id_yes_diagnosis) {
                $('#id_diagnosis_ex_1').val(null).trigger('change');
                $('#id_diagnosis_ex_1_wrapper').addClass('d-none');
            } else {
                $('#id_diagnosis_ex_1_wrapper').removeClass('d-none');
                $('#id_diagnosis_ex_1').select2('destroy').select2();
            }
        });
        $('#id_diagnosis_ex_1').change(function () {
            var id_asd = '5',
                value = $(this).val();
            if (value.includes(id_asd)) {
                $('#iid_diagnosis_ex_asd_levels_wrapper').removeClass('d-none');
            } else {
                $('#iid_diagnosis_ex_asd_levels_wrapper').addClass('d-none');
            }
        });
    });

    $(function () {
        $('div#id_diagnosis_ex_2 div.asd_level').on('click', function () {
            console.log($(this));
            $('div#id_diagnosis_ex_2 div').each(function (i, e) {
                $(e).removeClass('active');
            });
            $(this).addClass('active');
            $(this).find('input').prop('checked', true);
            return false;
        });
    });

    $(function () {
        $('div#id_diagnosis_ex_3 div.asd_level').on('click', function () {
            console.log($(this));
            $('div#id_diagnosis_ex_3 div').each(function (i, e) {
                $(e).removeClass('active');
            });
            $(this).addClass('active');
            $(this).find('input').prop('checked', true);
            return false;
        });
    });

    // END CODE FOR POPUP FORM CHILD CLINICAL 
     
    // START PROGRESS BAR 
    $('input').on('click', function () {
        var valueprogress = 0;
        $('input:checked').each(function () {
            if ($(this).attr('value') > valueprogress) {
                valueprogress = $(this).attr('value');
                console.log(valueprogress);
                // if ($("#progress-bar-66").data('clicked')) {
                //     valueprogress = 100;
                //     console.log(valueprogress);
                // };
            }
        });
        $('.progress-bar').css('width', valueprogress + '%').attr('aria-valuenow', valueprogress);
    });


    // END PROGRESS BAR 

    // inspired by http://jsfiddle.net/arunpjohny/564Lxosz/1/
    $('.table-responsive-stack').each(function (i) {
        var id = $(this).attr('id');
        //alert(id);
        $(this).find("th").each(function (i) {
            $('#' + id + ' td:nth-child(' + (i + 1) + ')').prepend('<span class="table-responsive-stack-thead">' + $(this).text() + ':</span> ');
            $('.table-responsive-stack-thead').hide();

        });



    });



    $('.table-responsive-stack').each(function () {
        var thCount = $(this).find("th").length;
        var rowGrow = 100 / thCount + '%';
        //console.log(rowGrow);
        $(this).find("th, td").css('flex-basis', rowGrow);
    });


    function flexTable() {
        if ($(window).width() < 768) {

            $(".table-responsive-stack").each(function (i) {
                $(this).find(".table-responsive-stack-thead").show();
                $(this).find('thead').hide();
            });


            // window is less than 768px   
        } else {


            $(".table-responsive-stack").each(function (i) {
                $(this).find(".table-responsive-stack-thead").hide();
                $(this).find('thead').show();
            });


        }
        // flextable   
    }

    flexTable();

    window.onresize = function (event) {
        flexTable();
    };

    // TOOLTIP

    // $("#resume-demo").html("Resume demo");

    $("#resume-demo").click(function () {
        $("#tooltip-start-demo").show();
        $("#clients").addClass('btn-clients-active');
        $("#clients").removeClass('nav-link');
    })


    $("#dismiss-start-demo").click(function () {
        $("#tooltip-start-demo").hide();
        $("#clients").removeClass('btn-clients-active');
        $("#clients").addClass('nav-link');

    });

    $("#clients").click(function () {
        $("#tooltip-start-demo").hide();
    });

    $("#btn-add-client").addClass('btn-clients-active');


    $("#dismiss-add-dummy-client").click(function () {
        $("#tooltip-add-dummy-client").hide();
        $("#clients").removeClass('btn-clients-active');
        $("#clients").addClass('nav-link');

    });  

    var valueprogress;

    $("#progress-bar-100").click(function () {
        valueprogress = 85;
        $('.progress-bar').css('width', valueprogress + '%').attr('aria-valuenow', valueprogress);
        console.log(valueprogress);
        window.location.href = "welcome.html";
    });

    var valueprogress = valueprogress;

});









