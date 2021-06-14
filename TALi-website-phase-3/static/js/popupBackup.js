{/* <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"><\/script>') */ }
// <script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
// </script>

//  <script>
$(document).ready(function () {
    // alert('test');
    $(function() {
        if (window.history && window.history.pushState) {
            window.history.pushState('', null, '/popupOriginal.html');
            $(window).on('popstate', function() {
                if(window.confirm("Are you sure you want to go back as you will close this popup and lose all the data that you've entered so far?")) {
                     document.location.href = '/popupOriginal.html';
                }
            });
        };
    });

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
    $(document).on("click", ".step-1", function () {
        current_step = $(this).closest("fieldset");
        next_step = $("#step1");
        next_step.show();
        current_step.hide();

    });
    $(document).on("click", ".step-2", function () {
        current_step = $(this).closest("fieldset");
        next_step = $("#step2");
        next_step.show();
        current_step.hide();
 
    });
    $(document).on("click", ".step-3", function () {
        current_step = $(this).closest("fieldset");
        next_step = $("#step3");
        next_step.show();
        current_step.hide();
    });
    $(document).on("click", ".step-4", function () {
        current_step = $(this).closest("fieldset");
        next_step = $("#step4");
        next_step.show();
        current_step.hide();

    });
    $(document).on("click", ".step-5", function () {
        current_step = $(this).closest("fieldset");
        next_step = $("#step5");
        next_step.show();
        current_step.hide();
    });



    // $(':radio').prop('checked',false);

    $("#add-client-add-a-new-client").click(function () {
        /*  alert( "Handler for .click() called." ); */
        /*  $("#next").css({ "backgroundColor": "black", "color": "white" }); */
        $(this).data('clicked', true);
        $("#next-add-client").fadeIn(600);
    });

    $("#add-client-child-transfer").click(function () {
        /*  alert( "Handler for .click() called." ); */
        /*  $("#next").css({ "backgroundColor": "black", "color": "white" }); */
        $(this).data('clicked', true);
        $("#next-add-client").fadeIn(600);
    });

    $("#add-a-dummy-client").click(function () {
        /*  alert( "Handler for .click() called." ); */
        /*  $("#next").css({ "backgroundColor": "black", "color": "white" }); */
        $(this).data('clicked', true);
        $("#next-add-client").fadeIn(600);
    });

    $("#add-a-dummy-client").click(function () {
        /*  alert( "Handler for .click() called." ); */
        /*  $("#next").css({ "backgroundColor": "black", "color": "white" }); */
        $(this).data('clicked', true);
        $("#next-add-client").fadeIn(600);
    });

    $("#next").hide();

    
    /* START HOME PAGE RADIO BUTTONS */

    $("#next-add-client").click(function () {
        if ($("#add-client-add-a-new-client").data('clicked')) {
            current_step = $(this).closest("fieldset");
            next_step = $("#step-add-a-new-client-access");
            next_step.show();
            current_step.hide();
            // $("#nextAddClient").addClass("step-4");
            $("#modal-label-heading").html("Add a new client");
            $("#modal-label-text").html("<p>Create a new client record (Please note: Child records cannot be merged)</p>");

            console.log('add new client');

        }
        else if ($("#add-client-child-transfer").data('clicked')) {
            current_step = $(this).closest("fieldset");
            next_step = $("#step-child-transfer");
            next_step.show();
            current_step.hide();
            // $("#nextAddClient").addClass("step-5");

            $("#modal-label-heading").html("Request a child transfer");
            $("#modal-label-text").html("<p>Transfer a client’s existing TALi record from a parent account to my practitioner account</p>");
            
            console.log('child transfer');
        }

        else if ($("#add-a-dummy-client").data('clicked')) {
            current_step = $(this).closest("fieldset");
            next_step = $("#step-add-a-dummy-client");
            next_step.show();
            current_step.hide();

            $("#modal-label-heading").html("Add a dummy client");
            $("#modal-label-text").html("<p>Test TALi DETECT, TALi TRAIN and behavioural measures, and view generic sample reporting</p>");

            console.log('add dummy client');
        }
    });

     /* END HOME PAGE RADIO BUTTONS */

    $("#next-add-a-new-client").click(function () {
        current_step = $(this).closest("fieldset");
        next_step = $("#step-add-a-new-client-child-details");
        next_step.show();
        current_step.hide();
        $("#modal-label-heading").html("Add a new client");
        $("#modal-label-text").html("<p>Create a new client record (Please note: Child records cannot be merged)</p>");

        console.log('add new client');
    });

    $("#next-add-a-new-client-child-details").click(function () {
        current_step = $(this).closest("fieldset");
        next_step = $("#step-add-a-new-client-licence-type");
        next_step.show();
        current_step.hide();
        $("#modal-label-heading").html("Add a new client");
        $("#modal-label-text").html("<p>Create a new client record (Please note: Child records cannot be merged)</p>");

        console.log('add new client');
});

    $("#next-add-a-new-client-licence-type").click(function () {
        current_step = $(this).closest("fieldset");
        next_step = $("#step-success");
        next_step.show();
        current_step.hide();
        $("#modal-label-heading").html("Add a new client");
        $("#modal-label-text").html("<p>Create a new client record (Please note: Child records cannot be merged)</p>");
        $("#step-child-transfer").css("display", "none");

        console.log('next add a new client licence type');
    });


    $("#request-transfer-child-transfer").click(function () {
        current_step = $(this).closest("fieldset");
        next_step = $("#step-success");
        next_step.show();
        current_step.hide();
        $("#modal-label-heading").html("Request a child transfer");
        $("#modal-label-text").html("<p>Transfer a client’s existing TALi record from a parent account to my practitioner account</p>");

        console.log('Request chid transfer');
    });
 

    $("#add-a-new-client-access-yes").click(function(){
        $("#add-a-new-client-yes-form").css("display", "block");
        $('#next-add-a-new-client-access').prop('disabled', false);
    });

    $("#add-a-new-client-access-no").click(function(){
        $('#next-add-a-new-client-access').prop('disabled', false);
    });


    $("#add-a-dummy-client-yes").click(function(){
        $("#add-a-dummy-client-yes-form").css("display", "block");
        $('#next-add-a-dummy-client').prop('disabled', false);
    });

    $("#add-a-dummy-client-yes").click(function() {
        $("#next-add-a-dummy-client").removeClass("disabled");
    })

    $('#next-add-a-new-client-access').prop('disabled', true);
    
    $('#next-add-a-dummy-client').prop('disabled', true);

});

$(function(){
    $('input').on('click', function(){
      var valeur = 0;
      $('input:checked').each(function(){
           if ( $(this).attr('value') > valeur )
           {
               valeur =  $(this).attr('value');
           }
      });
      $('.progress-bar').css('width', valeur+'%').attr('aria-valuenow', valeur);    
    });
    
    });



