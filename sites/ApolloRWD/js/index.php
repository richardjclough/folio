<?php

if (isset($_POST['advertisersSubmit']) && !empty($_POST['advertisersSubmit']))
    {
    include_once ('valitron/Validator.php');

    $form_v = new valitron\Validator($_POST, array() , 'en', getcwd() . '/valitron/lang/');
    $form_v->labels(array(
        'advertisersFirstName' => 'First name',
        'advertisersLastName' => 'Last name',
        'advertisersEmail' => 'Email',
        'advertisersPhone' => 'Phone',


    ));
    $rules = ['required' => [['advertisersFirstName'], ['advertisersLastName'], ['advertisersEmail'], ['advertisersPhone'], ['advertisersCompanyName']],

    'lengthMin' => [['advertisersPassword', 7]],



    // This code will error check for correct syntax

    'nameDash' => [['advertisersFirstName'], ['advertisersLastName']], 'email' => [['advertisersEmail']], ];
    $form_v->rules($rules);
    $form_v->validate();
    $fv_errors = $form_v->errors();
    if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])):

        // your site secret key

        $secret = '6LcuiBMTAAAAAIfYTJrb0RAZNDAkjdSiLULvFHj9';

        // get verify response data

        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);
        $responseData = json_decode($verifyResponse);
        if ($responseData->success):


            $advertisersFirstName = !empty($_POST['advertisersFirstName']) ? $_POST['advertisersFirstName'] : '';
            $advertisersLastName = !empty($_POST['advertisersLastName']) ? $_POST['advertisersLastName'] : '';
            $advertisersEmail = !empty($_POST['advertisersEmail']) ? $_POST['advertisersEmail'] : '';
            $advertisersPhone = !empty($_POST['advertisersPhone']) ? $_POST['advertisersPhone'] : '';
            $advertisersCompanyName = !empty($_POST['advertisersCompanyName']) ? $_POST['advertisersCompanyName'] : '';
            // $advertisersPassword = !empty($_POST['advertisersPassword']) ? $_POST['advertisersPassword'] : '';
            $advertisersCategory = !empty($_POST['advertisersCategory']) ? $_POST['advertisersCategory'] : '';
            $advertisersMonthlySpend = !empty($_POST['advertisersMonthlySpend']) ? $_POST['advertisersMonthlySpend'] : '';
            $checkbox = !empty($_POST['checkbox']) ? $_POST['checkbox'] : '';

            $to = 'richardjclough@gmail.com';
            $subject = "An Advertisers request has been submitted by $advertisersFirstName $advertisersLastName.";
            $frm_nm = "Service - Apollo Media";
            $frm_email = 'richardjclough@gmail.com';
            $hdr = '';
            $msg = "<h2>Advertisers details</h2>
            <p><b>First name: </b>" . $advertisersFirstName . "</p>
            <p><b>Last name: </b>" . $advertisersLastName . "</p>
            <p><b>Email: </b>" . $advertisersEmail . "</p>
             <p><b>Phone: </b>" . $advertisersPhone . "</p>
            <p><b>Company Name: </b>" . $advertisersCompanyName . "</p>
            <p><b>Category: </b>" . $advertisersCategory . "</p>
            <p><b>Monthly Spend: </b>" . $advertisersMonthlySpend . "</p>";
            $hdr.= 'MIME-Version: 1.0' . "\n";
            $hdr.= 'Content-type: text/html; charset=utf-8' . "\n";
            $hdr.= 'Content-Transfer-Encoding: base64' . "\n";
            $hdr.= "From: {$frm_nm}<{$frm_email}>\n";
            $hdr.= "Reply-To: {$frm_nm}<{$frm_email}>\n";
            $hdr.= "Return-Path: <{$frm_email}>\n";
            $hdr.= "Message-ID: <" . time() . "-{$frm_email}>\n";
            $hdr.= 'X-Mailer: DSP/1.0';
            $msg = chunk_split(base64_encode($msg));
            $res = @mail($to, $subject, $msg, $hdr);
            $_POST = array();
            if (!is_array($fv_errors) || empty($fv_errors) || (count($fv_errors) <= 0))
                {
                $fv_msgSuccessAdvertisers = 'Thank you your enquiry has been sucesfully submitted.
                We will contact you within 48 business hours.';
                }
              else
                {
                $fv_msgAdvertisers = 'Please clear the following error(s):<br /> ';
                $fv_msg_ar = array();
                foreach($fv_errors as $fv_k => $fv_v)
                    {
                    $fv_msg_ar = array_merge($fv_msg_ar, $fv_v);
                    }

                $fv_msg.= @implode('<br /> ', $fv_msg_ar);
                }

        endif;
    else:
        $fv_msgAdvertisers = 'Please click on the reCAPTCHA box.';
    endif;
    }
?>


<?php

if (isset($_POST['affiliateSubmit']) && !empty($_POST['affiliateSubmit']))
    {
    include_once ('valitron/Validator.php');

    $form_v = new valitron\Validator($_POST, array() , 'en', getcwd() . '/valitron/lang/');
    $form_v->labels(array(
        'affiliateFirstName' => 'First name',
        'affiliateLastName' => 'Last name',
        'affiliateEmail' => 'Email',
        'affiliatePhone' => 'Phone',


    ));
    $rules = ['required' => [['affiliateFirstName'], ['affiliateLastName'], ['affiliateEmail'], ['affiliatePhone'], ['affiliateCompanyName']],

    // 'lengthMin' => [['affiliatePassword', 7]],



    // This code will error check for correct syntax

    'nameDash' => [['affiliateFirstName'], ['affiliateLastName']], 'email' => [['affiliateEmail']], ];
    $form_v->rules($rules);
    $form_v->validate();
    $fv_errors = $form_v->errors();
    if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])):

        // your site secret key

        $secret = '6LcuiBMTAAAAAIfYTJrb0RAZNDAkjdSiLULvFHj9';

        // get verify response data

        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);
        $responseData = json_decode($verifyResponse);
        if ($responseData->success):


            $affiliateFirstName = !empty($_POST['affiliateFirstName']) ? $_POST['affiliateFirstName'] : '';
            $affiliateLastName = !empty($_POST['affiliateLastName']) ? $_POST['affiliateLastName'] : '';
            $affiliateEmail = !empty($_POST['affiliateEmail']) ? $_POST['affiliateEmail'] : '';
            $affiliatePhone = !empty($_POST['affiliatePhone']) ? $_POST['affiliatePhone'] : '';
            $affiliateCompanyName = !empty($_POST['affiliateCompanyName']) ? $_POST['affiliateCompanyName'] : '';
            // $affiliatePassword = !empty($_POST['affiliatePassword']) ? $_POST['affiliatePassword'] : '';
            $affiliateHowDidYouHear = !empty($_POST['affiliateHowDidYouHear']) ? $_POST['affiliateHowDidYouHear'] : '';

            $to = 'richardjclough@gmail.com';
            $subject = "An Affiliate request has been submitted by $affiliateFirstName $affiliateLastName.";
            $frm_nm = "Service - Apollo Media";
            $frm_email = 'richardjclough@gmail.com';
            $hdr = '';
            $msg = "<h2>Affiliate details</h2>
            <p><b>First name: </b>" . $affiliateFirstName . "</p>
            <p><b>Last name: </b>" . $affiliateLastName . "</p>
            <p><b>Email: </b>" . $affiliateEmail . "</p>
            <p><b>Company Name: </b>" . $affiliateCompanyName . "</p>
            <p><b>Phone: </b>" . $affiliatePhone . "</p>
            <p><b>How did you hear: </b>" . $affiliateHowDidYouHear . "</p>";
            $hdr.= 'MIME-Version: 1.0' . "\n";
            $hdr.= 'Content-type: text/html; charset=utf-8' . "\n";
            $hdr.= 'Content-Transfer-Encoding: base64' . "\n";
            $hdr.= "From: {$frm_nm}<{$frm_email}>\n";
            $hdr.= "Reply-To: {$frm_nm}<{$frm_email}>\n";
            $hdr.= "Return-Path: <{$frm_email}>\n";
            $hdr.= "Message-ID: <" . time() . "-{$frm_email}>\n";
            $hdr.= 'X-Mailer: DSP/1.0';
            $msg = chunk_split(base64_encode($msg));
            $res = @mail($to, $subject, $msg, $hdr);
            $_POST = array();
            if (!is_array($fv_errors) || empty($fv_errors) || (count($fv_errors) <= 0))
                {
                $fv_msgSuccessAffiliate = 'Thank you your enquiry has been sucesfully submitted.
                We will contact you within 48 business hours.';
                }
              else
                {
                $fv_msg = 'Please clear the following error(s):<br /> ';
                $fv_msg_ar = array();
                foreach($fv_errors as $fv_k => $fv_v)
                    {
                    $fv_msg_ar = array_merge($fv_msg_ar, $fv_v);
                    }

                $fv_msg.= @implode('<br /> ', $fv_msg_ar);
                }

        endif;
    else:
        $fv_msgAffiliate = 'Please click on the reCAPTCHA box.';
    endif;
    }
?>


<?php

if (isset($_POST['contactSubmit']) && !empty($_POST['contactSubmit']))
    {
    include_once ('valitron/Validator.php');

    $form_v = new valitron\Validator($_POST, array() , 'en', getcwd() . '/valitron/lang/');
    $form_v->labels(array(
        'contactFirstName' => 'First name',
        'contactLastName' => 'Last name',
        'contactEmail' => 'Email',
        'contactSubject' => 'Subject',
        'contactMessage' => 'Message',
    ));
    $rules = ['required' => [['contactFirstName'], ['contactLastName'], ['contactEmail'], ['contactSubject'], ['contactMessage']],
    // This code will error check for correct syntax

    'nameDash' => [['contactFirstName'], ['contactLastName']], 'email' => [['contactEmail']], ];
    $form_v->rules($rules);
    $form_v->validate();
    $fv_errors = $form_v->errors();
    if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])):

        // your site secret key

        $secret = '6LcuiBMTAAAAAIfYTJrb0RAZNDAkjdSiLULvFHj9';

        // get verify response data

        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);
        $responseData = json_decode($verifyResponse);
        if ($responseData->success):

            // contact form submission code

            $contactFirstName = !empty($_POST['contactFirstName']) ? $_POST['contactFirstName'] : '';
            $contactLastName = !empty($_POST['contactLastName']) ? $_POST['contactLastName'] : '';
            $contactEmail = !empty($_POST['contactEmail']) ? $_POST['contactEmail'] : '';
            $contactSubject = !empty($_POST['contactSubject']) ? $_POST['contactSubject'] : '';
            $contactMessage = !empty($_POST['contactMessage']) ? $_POST['contactMessage'] : '';
            $to = 'richardjclough@gmail.com';
            $subject = "A contact request has been submitted by $contactFirstName $contactLastName.";
            $frm_nm = "Service - Apollo Media";
            $frm_email = 'richardjclough@gmail.com';
            $hdr = '';
            $msg = "<h2>Contact request details</h2>
            <p><b>First name: </b>" . $contactFirstName . "</p>
            <p><b>Last name: </b>" . $contactLastName . "</p>
            <p><b>Email: </b>" . $contactEmail . "</p>
            <p><b>Subject: </b>" . $contactSubject . "</p>
            <p><b>Message: </b>" . $contactMessage . "</p>";
            $hdr.= 'MIME-Version: 1.0' . "\n";
            $hdr.= 'Content-type: text/html; charset=utf-8' . "\n";
            $hdr.= 'Content-Transfer-Encoding: base64' . "\n";
            $hdr.= "From: {$frm_nm}<{$frm_email}>\n";
            $hdr.= "Reply-To: {$frm_nm}<{$frm_email}>\n";
            $hdr.= "Return-Path: <{$frm_email}>\n";
            $hdr.= "Message-ID: <" . time() . "-{$frm_email}>\n";
            $hdr.= 'X-Mailer: DSP/1.0';
            $msg = chunk_split(base64_encode($msg));
            $res = @mail($to, $subject, $msg, $hdr);
            $_POST = array();
            if (!is_array($fv_errors) || empty($fv_errors) || (count($fv_errors) <= 0))
                {
                $fv_msgSuccessContact = 'Thank you your enquiry has been sucesfully submitted. <br />
                We will contact you within 48 business hours.';
                }
              else
                {
                $fv_msgContact = 'Please clear the following error(s):<br /> ';
                $fv_msg_ar = array();
                foreach($fv_errors as $fv_k => $fv_v)
                    {
                    $fv_msg_ar = array_merge($fv_msg_ar, $fv_v);
                    }

                $fv_msg.= @implode('<br /> ', $fv_msg_ar);
                }

        endif;
    else:
        $fv_msgContact = 'Please click on the reCAPTCHA box.';
    endif;
    }
?>

<!DOCTYPE html>

<head>

    <title>Apollo Digital Media</title>

    <meta name="viewport" content="width=device-width">

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="description" content="Apollo Media is a new digital media company that specializes in creating online marketplaces dedicated to specific markets, providing a solution for advertisers and consumers in a common trading ground.">



    <script src="js/jquery-1.8.2.min.js" type="text/javascript" charset="utf-8"></script>
   	<script src="js/jquery.validationEngine-en.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/jquery.validationEngine.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/modernizr.custom.js" type="text/javascript" ></script>




    <!-- allow multiple reCAPTCHAs on on page -->

     <script type="text/javascript">
      var verifyCallback = function(response) {
    //    alert('response');
      };
      var reCaptcha01;
    //  var reCaptcha02;
      var reCaptcha03;
      var onloadCallback = function() {
        // Renders the HTML element with id 'example1' as a reCAPTCHA widget.
        // The id of the reCAPTCHA widget is assigned to 'widgetId1'.
        reCaptcha01 = grecaptcha.render('reCaptchaAdvertiser', {
          'sitekey' : '6LcuiBMTAAAAALcjtrpqZ_sWsWuni-1kMeF22jX0',
          'theme' : 'light'
        });
        //  reCaptcha02 = grecaptcha.render('reCaptchaAffiliate', {
        //   'sitekey' : '6LfB6g0TAAAAAE2IaXwQvMoZkYpjpyZ4Ho3_Jjn3',
        //   'theme' : 'light'
        // });
          reCaptcha03 = grecaptcha.render('reCaptchaContact', {
          'sitekey' : '6LcuiBMTAAAAALcjtrpqZ_sWsWuni-1kMeF22jX0',
          'theme' : 'light'
        });
      };
      </script>

    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&amp;render=explicit" async defer>
    </script>

    <link href="css/styles.css" rel="stylesheet" />
    <link rel="stylesheet" media="screen" href="css/formStyles.css" >
    <link rel="stylesheet" media="screen" href="css/animate.min.css" >

    <link rel="stylesheet" href="css/validationEngine.jquery.css" type="text/css"/>

	<link rel="stylesheet" type="text/css" href="css/normalize.css" />

    <link rel="icon" href="favicon.ico" type="image/x-icon" />

    <link href='https://fonts.googleapis.com/css?family=Arvo:400,700' rel='stylesheet' type='text/css'>

    <!-- position validation engine errors -->
    <script>
        $(document).ready(function(){
        $("#formAdvertisers,#formAffiliates,#formContact").validationEngine('attach', {promptPosition : "centerRight"});
        });
    </script>

    <!-- sroll to anchors -->
    <script>
        $(document).ready(function(){
        $('a[href^="#"]').on('click',function (e) {
          e.preventDefault();

          var target = this.hash;
          var $target = $(target);

        $('html, body').stop().animate({
          'scrollTop': $target.offset().top -140
            }, 900, 'swing', function () {
            });
          });
        });
    </script>

</head>
<body>
    <div class="wrapper">
        <div class="header">
            <div class="headerContent">
            <a href="#home">
                <div class="logo" >
                </div>
            </a>
            <div class="nav">
                <ul>
                    <li><a href="#aboutus-anchor">about Us</a></li>
                    <li><a href="#portfolio-anchor">portfolio</a></li>
                    <!-- <li><a href="#services-anchor">services</a></li>
                    <li><a href="#operations-anchor">operations</a></li> -->
                    <li><a href="#advertisers-anchor">advertisers</a></li>
                   <!--  <li><a href="#affiliates-anchor">affiliates</a></li> -->
                    <li><a href="#contact-anchor">contact</a></li>
                </ul>
            </div>
            </div>
        </div>
        <div class="hero" id="home">
        </div>
        <div class="contentBackground">
            <div class="content">
                <section class="content-section" id="aboutus">
                    <div class="section-inner" id="aboutus-anchor">
                        <h1 class="center wow fadeInDown animated" style="visibility: visible; animation-name: fadeInDown;">About Us</h1>
                                    <h3 >Apollo Media</h3>
                                    <p>Apollo Media is a new digital media company that specializes in creating online marketplaces dedicated to specific markets, providing a solution for advertisers and consumers in a common trading ground.
                                    </p>
                                    <p>
                                        We connect brands, stores and service providers to ready to buy consumers.
                                    </p>
                                    <p>
                                        Apollo Media is paving a new way through e-Commerce and advertising services industry with a fresh mindset and a new approach to consolidated concepts.
                                    </p>
                                    <h3>What we do</h3>
                                    <p>Apollo Media partners with established retailers and advertisers to create the ideal trading ground for niche markets through our portfolio.
                                    </p>
                                    <p>
                                    We provide the platform to our advertisers acquire customers and expand their business, and the tools to manage traffic generation streams, increase website traffic and seize data opportunities by networking with the most adequate target market.
                                    </p>

                                    <h3>How we do it</h3>
                                    <p>Our approach focuses on relevant connections through careful selection and association of the ideal advertiser with one of our communications streams based on target market and expected return, therefore maximizing return on investment by driving relevant traffic to our advertisers websites. </p>
                                    <p>
                                     <span class="bold">We believe that a dedicated marketplace is the best option to create valuable commercial connections.</span>
                                     </p>
                    </div>
                    </section>
                     <section class="content-section" id="portfolio">
                        <header class="heading">
                            <em class="subtitle center wow fadeInDown animated" style="visibility: visible; animation-name: fadeInDown;">A varied range of websites to accommodate all needs and offer intuitive navigation to users</em>
                        </header>
                        <div class="section-inner" id="portfolio-anchor">
                            <h2 class="center wow fadeInDown animated" style="visibility: visible; animation-name: fadeInDown;">Portfolio</h2>

                                    <h3>Websites owned and operated by Apollo Media focused on niche target markets.
                                    </h3>
                                    <h3>Marketplaces</h3>
                                    <!-- <p><strong><a href="http://OffersCentral.com.au" target="_blank">OffersCentral.com.au</a></strong></p>

                                    <p>Where you can find discounted retail offers, vouchers, coupons, enter competitions for giveaways as well as engage with Customer Survey of your favourite brands and stores.</p> -->

                                    <p><strong><a href="http://TriCentral.com.au" target="_blank">TriCentral.com.au</a></strong></p>

                                    <p>Common ground for triathletes to source the best and newest gear as well as prepare the season calendar full of events and information.</p>

                                    <p><strong><a href="http://TechnoCentral.com.au" target="_blank">TechnoCentral.com.au</a></strong></p>

                                    <p>Gadgets and innovations pop up at a faster than ever rate and Techno Central offers all of them. From the useful to the superfluous, from pre loved to pre release equipment.</p>

                                    <p><strong><a href="http://MobilesCentral.com.au" target="_blank">MobilesCentral.com.au</a></strong></p>

                                    <p>Find, compare and select the best Mobile plan the Telcos can offer, including also Home Phone and Internet plans.</p>

                                    <p><strong><a href="http://Loans-Central.com.au" target="_blank">Loans-Central.com.au</a></strong></p>

                                    <p>Find, compare and select the best Personal Fast loans the market can offer, and contact Finance Consultant, Advisors and Brokers for debt consolidation and financial stability.</p>
                                    <h3>Services Directory</h3>
                                    <p>
                                        <strong><a href="http://MigrationCentral.com.au" target="_blank">MigrationCentral.com.au</a></strong>
                                        </p>

                                        <p>

                                        Providing online Migration information and online marketing services for Migration Agents and the opportunity for prospective Migrants to find, compare and contact the ideal Agents for their needs.
                                        </p>

                                        <p><strong><a href="http://SitterCentral.com.au" target="_blank">SitterCentral.com.au</a></strong></p>

                                        <p>House sitting and Pet sitting providers under the same roof. Helping you sort out all the important details for you to enjoy your holidays the most.</p>

                                        <p><strong><a href="http://MobilesCentral.com.au" target="_blank">MobilesCentral.com.au</a></strong><p>
                                        <p>Find, compare and select the best Mobile plan the Telcos can offer, including also Home Phone and Internet plans.</p>

                                        <p><strong><a href="http://Loans-Central.com.au" target="_blank">Loans-Central.com.au</a></strong></p>

                                        <p>Find, compare and select the best Personal Fast loans the market can offer, and contact Finance Consultant, Advisors and Brokers for debt consolidation and financial stability.</p>

                                        <!-- <p><strong><a href="http://StartupFactory.com.au" target="_blank">StartupFactory.com.au</a></strong> </p>(in negotiation)

                                        <p>Resources and networking for start-ups and prospective entrepreneurs. Meeting place for Venture Capitalist, Angel Investors and Start-ups seeking funding.</p> -->
                        </div>
                    </section>

                     <section class="content-section" id="advertisers">
                      <!-- this makes the browser jump to the correct position where the server side error messages are displayed, if an unsuccessful server side submission is made -->
                        <div id="advertisersForm"></div>
                        <div class="section-inner" id="advertisers-anchor">
                         <h2 class="center wow fadeInDown animated" style="visibility: visible; animation-name: fadeInDown;">Advertisers</h2>
                         <!-- <div class="twoColumns"> -->
                            <div class="leftColumn">
                                         <ul>
                                            <li>Long term partnership focus based on consistent return</li>
                                            <li>Attention to your KPIs and overall objectives</li>
                                            <li>Full scale marketing, technical and creative design</li>
                                            <li>Transparency into all marketing efforts</li>
                                            <li>Low scale test budgets spent wisely and effectively</li>
                                            <li>Options to generate incremental revenue streams to increase ROI</li>
                                            <li>Easy campaign setup, with CPC, CPA and other options</li>
                                            <li>Hit only your target market</li>
                                        </ul>
                                        <br />
                                        <!-- <h3>Advertiser Login</h3>
                                         <a href="" class="submit">ADVERTISERS LOGIN</a> -->
                                        </div>
                                  <div class="advertisersForm">
                                        <h3>New Advertiser sign up</h3>
                                       <?php if(!empty($fv_msgAdvertisers)): ?><div class="fv_msg"><?php echo $fv_msgAdvertisers; ?></div><?php endif; ?>
                                <?php if(!empty($fv_msgSuccessAdvertisers)): ?><div class="fv_msgSuccess"><?php echo $fv_msgSuccessAdvertisers; ?></div><?php endif; ?>

                                <form id="formAdvertisers" class="form" autocomplete="off" method="POST" action="index.php#advertisersForm" >
                                    <ul>
                                        <li>
                                            <label for="advertisersFirstName">First Name:</label>
                                            <input placeholder="John" value="<?php if(isset($_POST['advertisersFirstName'])) { echo $_POST['advertisersFirstName']; }  ?>" class="validate[required,custom[internationalName]]" type="text" name="advertisersFirstName" id="advertisersFirstName" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label for="advertisersLastName">Last Name:</label>
                                            <input placeholder="Doe" value="<?php if(isset($_POST['advertisersLastName'])) { echo $_POST['advertisersLastName']; } ?>" class="validate[required,custom[internationalName]]" type="text" name="advertisersLastName" id="advertisersLastName" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label for="advertisersEmail">Email:</label>
                                            <input placeholder="someone@nowhere.com" value="<?php if(isset($_POST['advertisersEmail'])) { echo $_POST['advertisersEmail']; } ?>" class="validate[required,custom[email]]" type="text" name="advertisersEmail" id="advertisersEmail" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label for="advertisersPhone">Phone:</label>
                                            <input placeholder="Phone" value="<?php if(isset($_POST['advertisersPhone'])) { echo $_POST['advertisersPhone']; } ?>" class="validate[required,custom[phone]]" type="text" name="advertisersPhone" id="advertisersPhone" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label for="advertisersCompanyName">Company name:</label>
                                            <input placeholder="Company name" value="<?php if(isset($_POST['advertisersCompanyName'])) { echo $_POST['advertisersCompanyName']; } ?>" class="validate[required]" type="text" name="advertisersCompanyName" id="advertisersCompanyName" />
                                            <span class="asterix">*</span>
                                        </li>

                                        <li>
                                            <label for="advertisersCategory">Category:</label>

                                            <select name="advertisersCategory" id="advertisersCategory" class="validate[required]">
                                              <option value="Dating" selected >Dating</option>
                                              <option value="Legal">Legal</option>
                                              <option value="Beauty">Beauty</option>
                                              <option value="Offers">Offers</option>
                                              <option value="Apps &amp; Entertainment">Apps &amp; Entertainment</option>
                                              <option value="Insurance">Insurance</option>
                                              <option value="Financial">Financial</option>
                                              <option value="Home">Home</option>
                                              <option value="Jobs &amp; Education">Jobs &amp; Education</option>
                                              <option value="Health">Health</option>
                                              <option value="Smoking">Smoking</option>
                                              <option value="Retail">Retail</option>
                                              <option value="Services">Services</option>

                                            </select>

                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label for="advertisersMonthlySpend">Monthly spend:</label>

                                            <select name="advertisersMonthlySpend" id="advertisersMonthlySpend" >
                                              <option value="Less than $1000">Less than $1000</option>
                                              <option value="From $1001 to $10,000">From $1001 to $10,000</option>
                                              <option value="From $10,001 to $50,000" selected>From $10,001 to $50,000</option>
                                              <option value="Above $50,001">Above $50,001</option>
                                            </select>
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                        <label></label>
                                        <a href="img/WebsiteTermsOfUse.pdf" target="_blank">Terms and Conditions</a>

                                        </li>
                                        <li>
                                          <label>Agree to Terms and Conditions:</label>
                                        </li>
                                        <li>
                                            <div class="checkbox">
                                            <input class="validate[required] checkbox" id="checkboxInput" type="checkbox" name="txtCheck" value="1" <?php if (!empty($_POST['txtCheck'])): ?> checked="checked"<?php endif; ?> data-prompt-position="centerRight:-101" />
                                            <label for="checkboxInput"></label>
                                              <span id="checkboxAsterix" class="asterix">*</span>
                                        </div>

                                        </li>


                                        <li>
                                            <div class="recaptchaContainerAdvertiser" >
                                                <div id="reCaptchaAdvertiser">

                                                </div>

                                                <input type="submit" name="advertisersSubmit" value="SUBMIT" class="submit" >
                                            </div>
                                        </li>
                                    </ul>


                                </form>
                            </div>
                        <!-- </div> -->


                        </div>
                    </section>

                    <!-- <section class="content-section" id="affiliates">
                        <div class="section-inner" id="affiliates-anchor" >
                            <h1>Affiliates</h1>

                                        <p>
                                        <ul>
                                            <li>Exclusive, Proprietary and Branded offers
                                            </li>
                                            <li>Invite Only Offers for Trusted Publishers
                                            </li>
                                            <li>Long-term strategic partners
                                            </li>
                                            <li>Small group of publishers with media power = dedicated attention and large budgets</li>
                                            <li>Transparency into results for optimization</li>
                                            <li>Sharing of KPIs, demos and other targets</li>
                                            <li>Consistency of budgets</li>
                                            <li>Results sharing from internal email, social, display and search marketing</li>
                                        </ul>
                                        </p>

                                         <h2>Affiliate Login</h2>
                                    <a href="https://login.apollomedia.com.au/affiliates"><button type="button" name="affiliateLogin" value="Affiliate Login" class="submit" >AFFILIATE LOGIN</button></a>
                                    <br /><br />

                                        <h2>New Affiliate sign up</h2>

                                        <div id="affiliateForm" ></div>

                                         <?php if(!empty($fv_msgAffiliate)): ?><div class="fv_msg"><?php echo $fv_msgAffiliate; ?></div><?php endif; ?>
                                <?php if(!empty($fv_msgSuccessAffiliate)): ?><div class="fv_msgSuccess"><?php echo $fv_msgSuccessAffiliate; ?></div><?php endif; ?>

                                <form id="formAffiliates" class="form" method="POST" action="index.php#affiliateForm">
                                    <ul>
                                        <li>
                                            <label name="affiliateFirstName" for="affiliateFirstName">First Name:</label>
                                            <input placeholder="John" value="<?php if(isset($_POST['affiliateFirstName'])) { echo $_POST['affiliateFirstName']; }  ?>" class="validate[required,custom[internationalName]]" type="text" name="affiliateFirstName" id="affiliateFirstName" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label name="affiliateLastName" for="affiliateLastName">Last Name:</label>
                                            <input placeholder="Doe" value="<?php if(isset($_POST['affiliateLastName'])) { echo $_POST['affiliateLastName']; } ?>" class="validate[required,custom[internationalName]]" type="text" name="affiliateLastName" id="affiliateLastName" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label name="affiliateEmail" for="affiliateEmail">Email:</label>
                                            <input placeholder="someone@nowhere.com" value="<?php if(isset($_POST['affiliateEmail'])) { echo $_POST['affiliateEmail']; } ?>" class="validate[required,custom[email]]" type="text" name="affiliateEmail" id="affiliateEmail" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label name="affiliatePhone" for="lastName">Phone:</label>
                                            <input placeholder="Phone" value="<?php if(isset($_POST['affiliatePhone'])) { echo $_POST['affiliatePhone']; } ?>" class="validate[required,custom[phone]]" type="text" name="affiliatePhone" id="affiliatePhone" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label name="affiliateCompanyName" for="affiliateCompanyName">Company name:</label>
                                            <input placeholder="Company name" value="<?php if(isset($_POST['affiliateCompanyName'])) { echo $_POST['affiliateCompanyName']; } ?>" class="validate[required]" type="text" name="affiliateCompanyName" id="affiliateCompanyName" />
                                            <span class="asterix">*</span>
                                        </li>

                                        <li>
                                            <label name="affiliateHowDidYouHear" for="affiliateHowDidYouHear">How did you hear about us?:</label>

                                            <select name="affiliateHowDidYouHear" id="affiliateHowDidYouHear" class="validate[required]">

                                                <option value="Word of mouth" selected>Word of mouth</option>
                                                <option value="Brochure">Brochure</option>
                                                <option value="Email">Email</option>
                                                <option value="Google">Google</option>
                                                <option value="Yahoo">Yahoo</option>
                                                <option value="Bing">Bing</option>
                                                <option value="Other search engine">Other search engine</option>

                                            </select>

                                            <span class="asterix">*</span>
                                        </li>

                                        <li>
                                            <div class="recaptchaContainerAffiliate" >
                                                <div id="reCaptchaAffiliate">
                                                </div>
                                                <input type="submit" name="affiliateSubmit" value="SUBMIT" class="submit" >
                                            </div>
                                        </li>
                                    </ul>
                                </form>

                        </div>
                    </section> -->
                    <section class="content-section" id="contact">
                        <header class="heading">
                                <em class="subtitle center wow fadeInDown animated" style="visibility: visible; animation-name: fadeInDown;">Business continuity that withstands<br /> environmental norms
                                </em>
                        </header>
                        <h4>&nbsp;</h4>

            </section>
    </div>
            <div class="contact">
                 <div class="contact-inner" id="contact-anchor" >
                            <div class="contactContent">
                                <h2 class="center wow fadeInDown animated" style="visibility: visible; animation-name: fadeInDown;">contact</h2>
                                <p>
                                    Lifestyle Working building<br />
                                    Suite 2.09/838 Collins Street<br />
                                    Docklands, VIC 3008 <br />
                                    Phone +61 3 9621 2052<br />
                                    Email <a href="mailto:richardjclough@gmail.com">richardjclough@gmail.com</a><br />

                                   <!--  <a href="https://www.linkedin.com/company/apollo-digital-media" target="_blank"><img src="img/In-2C-48px-R.png" class="socmedIcon" alt="LinkedIn" title="LinkedIn" /></a>&nbsp;
                                    <a href="" target="_blank"><img src="img/FB-f-Logo__blue_50.png" class="socmedIcon" alt="Facebook" title="Facebook" /></a>  -->
                                </p>
                                <!-- this makes the browser jump to the correct position where the server side error messages are displayed, if an unsuccessful server side submission is made -->
                                <div id="contactForm"></div>
                                 <?php if(!empty($fv_msgContact)): ?><div class="fv_msg"><?php echo $fv_msgContact; ?></div><?php endif; ?>
                                <?php if(!empty($fv_msgSuccessContact)): ?><div class="fv_msgSuccess"><?php echo $fv_msgSuccessContact; ?></div><?php endif; ?>

                                <form id="formContact" class="form" method="POST" action="index.php#contactForm" >
                                    <ul>
                                        <li>
                                            <label>First Name:</label>
                                            <input placeholder="John" value="<?php if(isset($_POST['contactFirstName'])) { echo $_POST['contactFirstName']; }  ?>" class="validate[required,custom[internationalName]]" type="text" name="contactFirstName" id="contactFirstName" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label>Last Name:</label>
                                            <input placeholder="Doe" value="<?php if(isset($_POST['contactLastName'])) { echo $_POST['contactLastName']; } ?>" class="validate[required,custom[internationalName]]" type="text" name="contactLastName" id="contactLastName" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label>Email:</label>
                                            <input placeholder="someone@nowhere.com" value="<?php if(isset($_POST['contactEmail'])) { echo $_POST['contactEmail']; } ?>" class="validate[required,custom[email]]" type="text" name="contactEmail" id="contactEmail" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label>Subject:</label>
                                            <input placeholder="Subject" value="<?php if(isset($_POST['contactSubject'])) { echo $_POST['contactSubject']; } ?>" class="validate[required]" type="text" name="contactSubject" id="contactSubject" />
                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <label>Message:</label>

                                            <textarea placeholder="Message" class="validate[required]" cols="40" rows="6" name="contactMessage" id="contactMessage"><?php echo $var = isset($_POST['contactMessage']) ? $_POST['contactMessage'] : ''; ?></textarea>

                                            <span class="asterix">*</span>
                                        </li>
                                        <li>
                                            <div class="recaptchaContainerContact" >
                                                <div id="reCaptchaContact">
                                                </div>
                                                <input type="submit" name="contactSubmit" value="SUBMIT" class="submit" >
                                            </div>
                                        </li>



                                    </ul>
                                </form>
                            </div>
                            <div class="map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.101106537485!2d144.94342896639034!3d-37.82048104395435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d59422626e1%3A0xb54ce0869eb6d64c!2s838+Collins+St%2C+Docklands+VIC+3008!5e0!3m2!1sen!2sau!4v1443157549735" width="300px" height="300px" style="border:0" allowfullscreen></iframe>
                                <br />

                            </div>
                        </div>
            </div>

    </div>
    </div>


</body>
</html>
