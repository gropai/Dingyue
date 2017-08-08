//import vendor files
import 'fullpage.js/dist/jquery.fullpage.js';
import 'fullpage.js/dist/jquery.fullpage.css';
import './vendor/jquery.bxslider.min';
import './vendor/jquery.bxslider.min.css';

//import development files
import './index.css';
//import '../index.html';	//for testing

(function ($) {
	//Site module, regulate the running of the
	//entire site.
	var Site = (function () {
		var siteLoaded = false, 	//whether site has been loaded before
			sections;	//sections of the site, to be passed in init()

		//configuration for site scroll
		var siteConfig = {
			afterLoad: siteFirstLoad,	//for loading the first section
			onLeave: sectionChange		//for managing section changes
		};

		//Trigger effects and initialize settings when
		// the site is loaded for the first time
		function siteFirstLoad(anchorLink, index){
			if(!siteLoaded){
				sections.forEach(function (section) {
					section.init && section.init();
				});
				siteLoaded = true;
			}
		}

		//Manage section changes
		function sectionChange(index, nextIndex, direction) {
			sections.forEach(function (section) {
				section.update && section.update(index, nextIndex);
			});
		}

		//Kickoff point.
		function init(componentsOfSite) {
			sections = componentsOfSite;

			$(document).ready(function () {
				$('#fullpage').fullpage(siteConfig);
			});

			//assistant method
			function test() {
				$(document).on('click', function () {
					console.log('testing load');
					$('.section7').addClass('load');

				});

				$(document).on('contextmenu', function () {
					console.log('testing leave');
					$('.section7').removeClass('load');

					return false;
				});
			}
			//test();
		}

		return {
			init: init
		};
	})();

	//Header module
	var Header = (function () {
		var header;

		//Set the anchor links in the header.
		function setAnchors() {
			$('#header a').click(function () {
				$.fn.fullpage.moveTo($(this).data('index'));
			});
		}

		//Initialize settings
		function init() {
			header = $('#header');
			header.addClass('load');
			setAnchors();
		}

		//Update the header when section changes
		function update(fromIndex, toIndex) {
			if(fromIndex == 1 || toIndex == 1){
				header.toggleClass('load');
			}
		}

		return {
			update: update,
			init: init
		};
	})();
	
	//Section1 module
	var Section1 = (function () {
		var index = 1,
			slider,
			slides,
			pager,
			sectionLoaded = false;		//whether the section has been loaded before

		//configuration for slider
		var sliderConfig = {
			controls: false,
			auto: true,
			pause: 4000,
			pager: true,
			startSlide: 0,
			onSlideAfter: slideChange,	//for managing slide changes
			onSliderLoad: firstSlideLoad	//for loading for the first load
		};

		//Manage slide changes
		function slideChange($slideElem, oldIndex, newIndex) {
			var oldSlide = slides[oldIndex];
			var newSlide = slides[newIndex];

			oldSlide.leave && oldSlide.leave();
			newSlide.load && newSlide.load();

			//console.log('from slide', oldIndex, ' to slide', newIndex);

		}

		//Load the first slide
		function firstSlideLoad() {
			//console.log('slide loaded: ', index);
			if(!sectionLoaded){
				Section1.Slide1.load();
				sectionLoaded = true;
			}

		}

		//Initialize settings of Section1
		function init() {
			//set up the slider to scroll
			slider = $('.sec1-slider').bxSlider(sliderConfig);
			pager = $('.section1 .bx-pager-item');

			//change pager behavior
			pager.click(function () {
				slider.stopAuto();
				setTimeout(function () {
					slider.startAuto();
				},4000);
			});

			slides = [Section1.Slide1, Section1.Slide2, Section1.Slide3];
			//test();

		}

		return {
			init: init
		};
	})();
	
	//Slide1 of Section1, submodule of Section1
	Section1.Slide1 = (function () {
		var index = 0,
			$slogans = $('.section1 .slider1 .slogan span'),
			$line = $('.section1 .slider1 .line'),
			timer = null;

		function leave() {
			clearTimeout(timer);
			$slogans.removeClass('active');
			$line.removeClass('active1 active2');
		}

		function load() {
			//console.log('load ', index);
			$slogans.addClass('active');

			$line.addClass('active1');
			timer = setTimeout(function () {
				$line.removeClass('active1');
				$line.addClass('active2');
			},1200);
		}

		return {
			leave: leave,
			load: load
		};
	})();

	//Slide2 of Section1, submodule of Section1
	Section1.Slide2 = (function () {
		var index = 1,
			$slogans = $('.section1 .slider2 .slogan'),
			$bg = $('.section1 .slider2 img');

		function leave() {
			//console.log('leave ', index);

			$slogans.removeClass('active');
			$bg.removeClass('active');
		}

		function load() {
			//console.log('load ', index);
			$slogans.addClass('active');
			$bg.addClass('active');
		}

		return {
			leave: leave,
			load: load
		};
	})();

	//Slide3 of Section1, submodule of Section1
	Section1.Slide3 = (function () {
		var index = 2,
			$leftBox = $('.section1 .slider3 .left-box'),
			$mask = $('.section1 .slider3 .mask'),
			$pics = $('.section1 .slider3 img'),
			timer = null;

		function leave() {
			//console.log('leave ', index);

			$leftBox.removeClass('active');
			$mask.removeClass('active');

		}

		function load() {
			//console.log('load ', index);

			$leftBox.addClass('active');
			$mask.addClass('active');
		}

		return {
			leave: leave,
			load: load
		};
	})();

	//Section2 module
	var Section2 = (function () {
		var index = 2,
			$li
			;

		//Initialize settings
		function init() {
			$li = $('.section2 li');

			$li.hover(
				function () {
					$(this).addClass('active');

				},
				function () {
					$(this).removeClass('active');

				}
			);


		}

		//Update the section when section changes
		function update(fromIndex, toIndex) {
			if(toIndex === index){
				$li.addClass('load');
			}

			if(fromIndex === index){
				$li.removeClass('load');
			}
		}

		return {
			init: init,
			update: update
		};
	})();
	
	//Section3 module
	var Section3 = (function () {
		var index = 3,
			$num,
			$section,
			initialNum = 900,
			finalNum = 1532,
			currentNum = initialNum,
			step = 30,
			countTimer = null,
			resetTimer = null
			;

		//Count up the number
		function count() {
			currentNum += step;

			if(currentNum > finalNum){
				currentNum = finalNum;
			}

			$num.text(currentNum);

			if(currentNum < finalNum){
				countTimer = setTimeout(count,50);
			}
		}

		//Reset the number to the original value
		function resetCount() {
			currentNum = initialNum;
			$num.text(currentNum);
			clearTimeout(countTimer);
		}

		//Initialize settings
		function init() {
			$section = $('.section3');
			$num = $('#sec3_number');

			$('.section3 .company').hover(
				function () {
					$(this).addClass('active');
				},
				function () {
					$(this).removeClass('active');
				}
			);
		}

		//Update when section changes
		function update(fromIndex, toIndex) {
			$section.removeClass('load');
			if(fromIndex === index){
				resetTimer = setTimeout(resetCount,100);
			}
			if(toIndex === index){
				clearTimeout(resetTimer);
				resetCount();
				count();
				$section.addClass('load');
			}
		}

		return {
			init: init,
			update: update
		};
	})();

	//Section4 module
	var Section4 = (function () {
		var index = 4,
			carouselConfig = {
				minSlides: 4,
				maxSlides: 4,
				slideWidth: 250,
				moveSlides: 1,
				auto: true,
				pause: 1500,
				pager: false
			},
			$li,
			$controls,
			$section,
			controlsTimer = null,
			slider,
			moving = false
			;

		//Display the controls
		function show() {
			clearTimeout(controlsTimer);
			$controls.css('display', 'block');
			slider.stopAuto();
		}

		//Hide the controls
		function hide() {
			controlsTimer = setTimeout(function () {
				$controls.css('display', 'none');
			},500);
			slider.startAuto();
		}

		//Initialize settings and the carousel
		function init() {
			slider = $('.sec4-carousel').bxSlider(carouselConfig);
			$controls = $('.section4 .bx-controls a');
			$li = $('.sec4-carousel li');
			$section = $('.section4');

			//change the 'display' property of control buttons
			$('.section4 .bx-viewport').hover(
				function () {
					show();
				},
				function () {
					hide();
				}
			);
			$controls.hover(
				function () {
					show();
				},
				function () {
					hide();
				}
			);

			//change li 'active' state when hovering
			$li.hover(
				function () {
					$(this).addClass('active');
				},
				function () {
					$(this).removeClass('active');
				}
			);
		}

		return {
			init: init
		};
	})();

	//Section5 module
	var Section5 = (function () {
		var index = 5,
			section;

		//Initialize settings
		function init() {
			section = $('.section5');
		}

		//Update when section changes
		function update(fromIndex, toIndex) {
			if(fromIndex === index){
				section.removeClass('load');
			}
			if(toIndex === index){
				section.addClass('load');
			}
		}

		return {
			init: init,
			update: update
		};
	})();

	//Section6 module
	var Section6 = (function () {
		var index = 6,
			slider,
			sliderConfig = {
				minSlides: 1,
				maxSlides: 1,
				moveSlides: 1,
				auto: true,
				pause: 3000,
				slideWidth: 1100,
				pager: false
			}
			;

		//Initialize settings
		function init() {
			slider = $('.section6 .carousel').bxSlider(sliderConfig);
		}

		return {
			init: init
		};
	})();

	//Section7 module
	var Section7 = (function () {
		var index = 7,
			section;

		//Initialize settings
		function init() {
			section = $('.section7');
		}

		//Update when section changes
		function update(fromIndex, toIndex) {
			if(fromIndex === index){
				section.removeClass('load');
			}
			if(toIndex === index){
				section.addClass('load');
			}
		}
		return {
			init: init,
			update: update
		};
	})();


	//Code execution
	var sections = [Header, Section1, Section2, Section3, Section4, Section5, Section6, Section7];
	Site.init(sections);
})(jQuery);






























