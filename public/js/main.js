(function ($) {
"use strict";
// TOP Menu Sticky
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 400) {
    $("#sticky-header").removeClass("sticky");
    $('#back-top').fadeIn(500);
	} else {
    $("#sticky-header").addClass("sticky");
    $('#back-top').fadeIn(500);
	}
});


$(document).ready(function(){
  let api_key = 'd75385709d134b0a92ef2f15524a9d44';
  let what = 'dominican-republic-elections-2020';
  let now_date = new Date();
  fetch(`https://newsapi.org/v2/everything?q=${what}&from=${now_date.toString()}&sortBy=publishedAt&apiKey=${api_key}`)
  .then((response) => {
    /* 
      source: {id: null, name: "Truthdig.com"}
      author: "Natasha Hakimi Zapata"
      title: "The Latinx Vote Might Carry ‘Tio Bernie’ to Victory"
      description: "The Vermont senator is winning over the nation’s largest minority voting block, and it could make the difference in Nevada and beyond."
      url: "https://www.truthdig.com/articles/the-latinx-vote-might-carry-tio-bernie-to-victory/"
      urlToImage: "https://www.truthdig.com/wp-content/uploads/2020/02/AP_19355848901012-1024x749.jpg"
      publishedAt: "2020-02-22T11:07:04Z"
      content: "Theres no denying Latinx voters are falling in love with Tío Bernie. As a supporter of Sanders myself, Id been reading indications of this phenomenon for many months con mi corazón en la boca, a Spanish saying that translates roughly to with baited breath. Sa… [+17294 chars]"
    */
   let template = `
    <div class="single__blog d-flex align-items-center">
        <div class="thum">
            <img src="img/news/1.png" alt="">
        </div>
        <div class="newsinfo">
            <span>July 18, 2019</span>
            <a href="single-blog.html">
                <h3>Pure Water Is More 
                    Essential</h3>
            </a>
            <p>The passage experienced a 
                surge in popularity during the 
                1960s when used it on their  
                sheets, and again.</p>
            <a class="read_more" href="single-blog.html">Read More</a>
        </div>
    </div>
   `;
    //console.log(response);
    /*
    var i;
    for (i = 0; i < articles.length; i++) {
      let article = articles[i];
      $('.news_active').append(`
        <div class="single__blog d-flex align-items-center">
            <div class="thum">
                <img src="img/news/1.png" alt="">
            </div>
            <div class="newsinfo">
                <span>${article.author}</span>
                <a href="single-blog.html">
                    <h3>Pure Water Is More 
                        Essential</h3>
                </a>
                <p>The passage experienced a 
                    surge in popularity during the 
                    1960s when used it on their  
                    sheets, and again.</p>
                <a class="read_more" href="single-blog.html">Read More</a>
            </div>
        </div>
     `);
    }
    */

    return response.json();
  })
  .then((myJson) => {
    //console.log(myJson);
    
    let articles = myJson.articles;

    var i;
    for (i = 0; i < articles.length; i++) {
      let article = articles[i];
      let dateArt = article.publishedAt;
      var d = new Date(dateArt);
      var date = d.toLocaleDateString();
      let title = article.title.substring(0,50);
      let desc = article.description.substring(0,150);
      
      $('.news_active').append(`
        <div class="single__blog d-flex align-items-center">
            <div class="thum" style="background-image: url(${article.urlToImage})">
                
            </div>
            <div class="newsinfo">
                <span>${date}</span>
                <a href="${article.url}">
                    <h3>${title}...</h3>
                </a>
                <p>${desc}...</p>
                <a class="read_more" target="_blank" href="${article.url}">Read More</a>
            </div>
        </div>
     `);

     if (i < 3){
      $('.news_links').append(`
      <li>
        <div class="thumb" style="background-image: url(${article.urlToImage})"></div>
        <div class="info">
            <a href="${article.url}" target="_blank">
                <h4>${title}...</h4>
            </a>
            <span>${date}</span>
        </div>
      </li>
     `);
     }

    }

    // render 
    
  //about-pro-active
$('.news_active').owlCarousel({
  loop:true,
  margin:30,
// autoplay:true,
  navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
  nav:false,
  dots:false,
// autoplayHoverPause: true,
// autoplaySpeed: 800,
  responsive:{
      0:{
          items:1,
          nav:false

      },
      767:{
          items:1,
          nav:false
      },
      992:{
          items:2,
          nav:false
      },
      1200:{
          items:2,
      }
  }
});

  });

  /*
  fetch(`https://lu2lgow2oe.execute-api.us-east-1.amazonaws.com/dev/get_candidates`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(myJson);
  })
  */

// GOOGLE AUTOCOMPLETE
// Prepare location info object.
var locationInfo = {
  geo: null,
  country: null,
  state: null,
  city: null,
  postalCode: null,
  street: null,
  streetNumber: null,
  reset: function() {
    this.geo = null;
    this.country = null;
    this.state = null;
    this.city = null;
    this.postalCode = null;
    this.street = null;
    this.streetNumber = null;
  }
};

let googleAutocomplete = {
  autocompleteField: function(fieldId) {
    var input = document.getElementById(fieldId);
    var options = {
      types: ['geocode']
    };

    let autocomplete = new google.maps.places.Autocomplete(input, options);
    
    google.maps.event.addListener(autocomplete, "place_changed", function(e) {
      console.log(e);
      return;
      // Segment results into usable parts.
      var place = autocomplete.getPlace(),
        address = place.address_components,
        lat = place.geometry.location.lat(),
        lng = place.geometry.location.lng();
    });
  }
};

// Attach listener to address input field.
googleAutocomplete.autocompleteField("address");

  

// mobile_menu
var menu = $('ul#navigation');
if(menu.length){
	menu.slicknav({
		prependTo: ".mobile_menu",
		closedSymbol: '+',
		openedSymbol:'-'
	});
};
// blog-menu
  // $('ul#blog-menu').slicknav({
  //   prependTo: ".blog_menu"
  // });

// review-active
$('.slider_active').owlCarousel({
  loop:true,
  margin:0,
items:1,
autoplay:true,
navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
  nav:true,
dots:false,
autoplayHoverPause: true,
autoplaySpeed: 800,
  responsive:{
      0:{
          items:1,
          nav:false,
      },
      767:{
          items:1,
          nav:false,
      },
      992:{
          items:1,
          nav:false
      },
      1200:{
          items:1,
          nav:false
      },
      1600:{
          items:1,
          nav:true
      }
  }
});


// for filter
  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      // use outer width of grid-sizer for columnWidth
      columnWidth: 1
    }
  });

  // filter items on button click
  $('.portfolio-menu').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

  //for menu active class
  $('.portfolio-menu button').on('click', function (event) {
    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
    event.preventDefault();
	});
  
  // wow js
  new WOW().init();

  // counter 
  $('.counter').counterUp({
    delay: 10,
    time: 10000
  });

/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup img view */
$('.img-pop-up').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
  type: 'iframe',
  iframe: {
    markup: '<div class="mfp-iframe-scaler">'+
              '<div class="mfp-close"></div>'+
              '<iframe width="560" height="315" src="https://www.youtube.com/embed/u0tMU8VZ5fU?start=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'+
            '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button
  
    patterns: {
      youtube: {
        index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
  
        id: 'v=', // String that splits URL in a two parts, second part should be %id%
        // Or null - full URL will be returned
        // Or a function that should return %id%, for example:
        // id: function(url) { return 'parsed id'; }
  
        src: 'https://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
      },
      vimeo: {
        index: 'vimeo.com/',
        id: '/',
        src: '//player.vimeo.com/video/%id%?autoplay=1'
      },
      gmaps: {
        index: '//maps.google.',
        src: '%id%&output=embed'
      }
  
      // you may add here more sources
  
    },
  
    srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
  }
});


  // scrollIt for smoth scroll
  $.scrollIt({
    upKey: 38,             // key code to navigate to the next section
    downKey: 40,           // key code to navigate to the previous section
    easing: 'linear',      // the easing function for animation
    scrollTime: 600,       // how long (in ms) the animation takes
    activeClass: 'active', // class given to the active nav element
    onPageChange: null,    // function(pageIndex) that is called when page is changed
    topOffset: 0           // offste (in px) for fixed top navigation
  });

  // scrollup bottom to top
  $.scrollUp({
    scrollName: 'scrollUp', // Element ID
    topDistance: '4500', // Distance from top before showing element (px)
    topSpeed: 300, // Speed back to top (ms)
    animation: 'fade', // Fade, slide, none
    animationInSpeed: 200, // Animation in speed (ms)
    animationOutSpeed: 200, // Animation out speed (ms)
    scrollText: '<i class="fa fa-angle-double-up"></i>', // Text for element
    activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
  });

  /*
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
  
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });
  */
  // blog-page

  //brand-active
$('.brand-active').owlCarousel({
  loop:true,
  margin:30,
items:1,
autoplay:true,
  nav:false,
dots:false,
autoplayHoverPause: true,
autoplaySpeed: 800,
  responsive:{
      0:{
          items:1,
          nav:false

      },
      767:{
          items:4
      },
      992:{
          items:7
      }
  }
});

// blog-dtails-page

  //project-active
$('.project-active').owlCarousel({
  loop:true,
  margin:30,
items:1,
// autoplay:true,
navText:['<i class="Flaticon flaticon-left-arrow"></i>','<i class="Flaticon flaticon-right-arrow"></i>'],
nav:true,
dots:false,
// autoplayHoverPause: true,
// autoplaySpeed: 800,
  responsive:{
      0:{
          items:1,
          nav:false

      },
      767:{
          items:1,
          nav:false
      },
      992:{
          items:2,
          nav:false
      },
      1200:{
          items:1,
      },
      1501:{
          items:2,
      }
  }
});

if (document.getElementById('default-select')) {
  $('select').niceSelect();
}

  //about-pro-active
$('.causes_active').owlCarousel({
  loop:true,
  margin:30,
// autoplay:true,
  navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
  nav:false,
  dots:false,
// autoplayHoverPause: true,
// autoplaySpeed: 800,
  responsive:{
      0:{
          items:1,
          nav:false

      },
      767:{
          items:2,
          nav:false
      },
      992:{
          items:3,
          nav:false
      },
      1200:{
          items:3,
      }
  }
});

});

// resitration_Form
$(document).ready(function() {
	$('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});
});



//------- Mailchimp js --------//  
function mailChimp() {
  $('#mc_embed_signup').find('form').ajaxChimp();
}
mailChimp();



        // Search Toggle
        $("#search_input_box").hide();
        $("#search").on("click", function () {
            $("#search_input_box").slideToggle();
            $("#search_input").focus();
        });
        $("#close_search").on("click", function () {
            $('#search_input_box').slideUp(500);
        });
        // Search Toggle
        $("#search_input_box").hide();
        $("#search_1").on("click", function () {
            $("#search_input_box").slideToggle();
            $("#search_input").focus();
        });

})(jQuery);	