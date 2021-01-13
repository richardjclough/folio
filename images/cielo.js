var Cielo = function(){
	return {
		prepare: function(){
			Skinbox.disableSetup();
		}, 
		
		init: function(){
			Skinbox.init( { storage_ns: 'cielo' } );
		},
		
		shides: function(){				
			var welcomeImage = false;
			
			Skinbox.$store('#welcome-store .trigger-on', 'welcome_trigger_on');
			Skinbox.$store('#welcome-store .trigger-off', 'welcome_trigger_off');
			Skinbox.$store('#shide-trigger', 'welcome_trigger');
			
			Skinbox.shide( {
				ns: 'welcome',
				element: '.welcomeleft, .welcome > a, .welcome > img, .welcome > div:not(.hideit)',
				trigger: '.welcome .hideit',
				callback: function($, opts, visible){
					if( visible )
					{
						Skinbox.$switch('welcome_trigger', 'welcome_trigger_off', 'welcome_trigger_on');
					}
					else
					{
						Skinbox.$switch('welcome_trigger', 'welcome_trigger_on', 'welcome_trigger_off');
					}
				},
				
				complete: function($, opts, visible){
					if( visible )
					{
						if( welcomeImage !== false )
						{
							$('.welcome').css('background-image', welcomeImage);
						}
					}
					else
					{
						if( welcomeImage === false )
						{
							welcomeImage = $('.welcome').css('background-image');
						}
						
						$('.welcome').css('background-image', 'none');
					}
				}
			} );
		},
		
		backgroundPicker: function(){
			var applyTriggers = Skinbox.backgroundSwitcher( {
				triggers: '#background-switcher',
				ns: 'main',
				element: '#bg-area',
				delayApplyTriggers: true
			} );
			
			Skinbox.balloon( {
				name: 'background-picker',
				element: '#background-picker',
				trigger: '#background-picker-trigger',
				once: false,
				afterCreation: applyTriggers
			} );
		},
	
		dropdowns: function(){
			Skinbox.dropdown( {
				element: '#dropdown_1'
			} );
		}
	};
}();

Cielo.prepare();

Skinbox.ready( [
	Cielo.init,
	Skinbox.topLink,
	Skinbox.loginBox,
	Skinbox.creditsBox,
	Cielo.shides,
	Cielo.backgroundPicker,
	Cielo.dropdowns
] );