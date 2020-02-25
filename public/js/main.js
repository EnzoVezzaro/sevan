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
  let what = 'dominican-republic-elections-fraud';
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
    if (articles){
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
    
    }

    // render 

$('#find-location').on('click', ()=>{
  /*
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      console.log(position);
      
    }, function(e) {
      console.log(e);
      
    });
  } else {
    
  }
  */
})
    
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

let searchCandidates = function(municipio){
  let data = {
    municipio: municipio
  }

  return fetch('https://lu2lgow2oe.execute-api.us-east-1.amazonaws.com/dev/get_candidates', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    //console.log('Success:', data);
    return data;
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}
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
      types: ['geocode'],
      componentRestrictions: {country: "do"}
    };

    let autocomplete = new google.maps.places.Autocomplete(input, options);
    
    google.maps.event.addListener(autocomplete, "place_changed",async function(e) {
      $('#candidates_results').empty();
      $("#candidates-response").empty();
      // RENDER TEXT
      let notify = `
        <div class="col-lg-6">
            <div class="section_title text-center mb-55">
              <h3><span>Estamos buscando los candidatos en tu area</span></h3>
            </div>
        </div>
      `;
      $("#candidates-response").append(notify);
      // Segment results into usable parts.
      var place = autocomplete.getPlace(),
        address = place.address_components,
        lat = place.geometry.location.lat(),
        lng = place.geometry.location.lng();
      let template_notify = '';
      if (!place){
        $('#candidates_results').empty();
        $("#candidates-response").empty();
        template_notify = `
          <div class="col-lg-6">
              <div class="section_title text-center mb-55">
                  <h3><span>Mis Candidatos</span></h3>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem mollitia, maxime ut ratione ea inventore vel enim quos quam, ullam ipsam!</p>
              </div>
          </div>
        `;
        $("#candidates-response").append(template_notify);
      }

      console.log(place);
      let address_components = place.address_components;
      let loaded = false;
      for (let e = 0; e < address_components.length; e++) {
        const element = address_components[e];
        const types = element.types;
        let includes = ["administrative_area_level_2","administrative_area_level_1","locality"];
          for (let f = 0; f < includes.length; f++) {
            const include = includes[f];
            for (let u = 0; u < types.length; u++) {
              const types_elem = types[u];
              if (include === types_elem){
                let long_name= element.long_name;
                console.log('loaded: ',loaded);
                if (!loaded){
                  console.log('loaded: ',loaded);
                  console.log('long_name: ',long_name);
                  let data = await searchCandidates(`${long_name}`);
                  console.log('res: ',data.body);
                  if (data.body && data.body.length > 0){
                    loaded=true;
                    console.log('loaded: ',loaded);
                    let body = data.body;
                    $('#candidates_results').empty();
                    $("#candidates-response").empty();
                    // RENDER TEXT
                    template_notify = `
                      <div class="col-lg-6">
                          <div class="section_title text-center mb-55">
                              <h3><span>Encontramos ${data.body.length} resultados</span></h3>
                              <p>Si no està tu candidato, for favor escribenos a <a href="mailto:sevanhello@gmail.com">sevanhello@gmail.com</a> </p>
                          </div>
                      </div>
                    `;
                    $("#candidates-response").append(template_notify);

                    let candidate_cargo = '';
                    for (let o = 0; o < body.length; o++) {
                      const candidate = body[o];
                      console.log(candidate_cargo == candidate.cargo);
                      if (candidate_cargo !== candidate.cargo){
                        candidate_cargo = candidate.cargo;
                        $('#candidates_results').append(`<div class="row justify-content-center">
                            <div class="col-lg-6">
                                <div class="section_title text-center mb-55">
                                    <h3><span>${candidate_cargo}</span></h3>
                                </div>
                            </div>
                        </div>`);
                        $('#candidates_results').append(`<div class="row" id="res_${candidate.cargo}"></div>`);
                      }
                      let image = 'img/profile.png';
                      if (candidate.profile_img){
                        image = candidate.profile_img;
                      }
                      let link = '';
                      if (candidate.propuesta_url){
                        link = `<a href="${candidate.propuesta_url}" target="_blank" class="read_more">Propuestas</a>`;
                      }
                      let party_img = '';
                      switch(candidate.partido) {
                        case 'PARTIDO ALIANZA PAIS':
                          party_img = 'https://upload.wikimedia.org/wikipedia/commons/4/40/ALPAIS.png';
                          break;
                        case 'PARTIDO DE LA LIBERACION DOMINICANA':
                          party_img = 'https://upload.wikimedia.org/wikipedia/commons/0/02/PLD_flag.jpeg';
                          break;
                        case 'PARTIDO DEMOCRATA INSTITUCIONAL':
                          party_img = 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/83264110_3996676567016463_1558157188017422336_n.jpg?_nc_cat=102&_nc_ohc=OhbnNN-fd-EAX8CMOur&_nc_ht=scontent-mxp1-1.xx&oh=4fedfd7cabeaedbe4d5645a04397e937&oe=5EC3DFF6';
                          break;
                        case 'PARTIDO REFORMISTA SOCIAL CRISTIANO':
                          party_img = 'https://upload.wikimedia.org/wikipedia/en/0/0f/Social_Christian_Reformist_Party.png';
                          break;
                        case 'PARTIDO REVOLUCIONARIO DOMINICANO':
                          party_img = 'https://upload.wikimedia.org/wikipedia/en/f/fa/Dominican_Revolutionary_Party.png';
                          break;
                        case 'PARTIDO REVOLUCIONARIO MODERNO':
                          party_img = 'https://upload.wikimedia.org/wikipedia/commons/9/9b/PRM_%28Dominican_Republic%29_logo.png';
                          break;
                        case 'PARTIDO VERDE DOMINICANO':
                          party_img = 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/26805106_206300046608373_8059488246781421598_n.jpg?_nc_cat=101&_nc_ohc=NkisFVmFxloAX9qIILL&_nc_ht=scontent-mxp1-1.xx&oh=b61dbdb1f9ccf16258ac1c89997a88cb&oe=5EF7F5F5';
                          break;
                        case 'PARTIDO CIVICO RENOVADOR':
                            party_img = 'https://upload.wikimedia.org/wikipedia/commons/4/40/Bandera_PCR.jpg';
                            break;
                        case 'PARTIDO NACIONAL VOLUNTAD CIUDADANA':
                            party_img = 'http://www.pnvc.org.do/wp-content/uploads/2019/08/WhatsApp-Image-2019-04-10-at-16.37.15-300x300.jpeg';
                            break;
                        case 'PARTIDO PAIS POSIBLE':
                            party_img = 'https://paisposible.org/wp-content/uploads/2019/02/Logo-Pais-Posible-e1550179111386-1024x1024.png';
                            break;
                        case 'PARTIDO UNION DEMOCRATA CRISTIANA':
                            party_img = 'https://www.udc.org.do/images/udc_logo.png';
                            break;
                        case 'PARTIDO REVOLUCIONARIO SOCIAL DEMOCRATA':
                            party_img = 'https://pbs.twimg.com/profile_images/1202950500188065792/OF8Exkcf_400x400.jpg';
                            break;
                        case 'PARTIDO MOVIMIENTO DEMOCRATICO ALTERNATIVO':
                            party_img = 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/13001132_1209563702409021_3883137723025791223_n.png?_nc_cat=106&_nc_ohc=VSbaRub0cDYAX9FOGpp&_nc_ht=scontent-mxp1-1.xx&oh=034d45c7ec9d37e95ff1e70f2a5cc5e2&oe=5EF0954B';
                            break;
                        case 'BLOQUE INSTITUCIONAL SOCIAL DEMOCRATA':
                            party_img = 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/26233_386865390675_1791773_n.jpg?_nc_cat=106&_nc_ohc=bUuxQjqPzBgAX9mVGQY&_nc_ht=scontent-mxp1-1.xx&oh=71628e1e2defa6ff1114de5314c338d8&oe=5EFB6A2D';
                            break;
                        case 'PARTIDO DEMOCRATA INSTITUCIONAL':
                            party_img = '';
                            break;
                        case 'PARTIDO FUERZA DEL PUEBLO':
                            party_img = '';
                            break;
                        case 'PARTIDO HUMANISTA DOMINICANO':
                            party_img = '';
                            break;
                        case 'PARTIDO QUISQUEYANO DEMOCRATA CRISTIANO':
                            party_img = '';
                            break;
                        case 'PARTIDO REVOLUCIONARIO DOMINICANO':
                            party_img = '';
                            break;
                        case 'PARTIDO REVOLUCIONARIO INDEPENDIENTE':
                            party_img = 'https://scontent-mxp1-1.xx.fbcdn.net/v/t31.0-8/p960x960/26951711_1925824597732565_1669622379159076187_o.jpg?_nc_cat=108&_nc_ohc=tjC8IOeM_xYAX_s9kBA&_nc_ht=scontent-mxp1-1.xx&_nc_tp=6&oh=bd3c017520000bff0330df20e16e1449&oe=5EF72FDB';
                            break;
                        case 'MOVIMIENTO POLITICO AGUILA':
                            party_img = '';
                            break;
                        case 'MOVIMIENTO INDEPENDIENTE POR EL RESCATE DE BARAHONA':
                            party_img = '';
                            break;
                        case 'FRENTE AMPLIO':
                            party_img = '';
                            break;
                        case 'PARTIDO LIBERAL REFORMISTA':
                            party_img = 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/11230601_1022814961095864_9091042611340815795_n.jpg?_nc_cat=101&_nc_ohc=_wcWYafu7hMAX9nyp7M&_nc_ht=scontent-mxp1-1.xx&oh=3eedeac3f8bb9aaa4e05a9b938563a23&oe=5EFFDB1E';
                            break;
                        case 'PARTIDO DOMINICANOS POR EL CAMBIO':
                            party_img = '';
                            break;
                        case 'PARTIDO DEMOCRATA POPULAR':
                            party_img = '';
                            break;
                        case 'ALIANZA POR LA DEMOCRACIA':
                            party_img = '';
                            break;
                        case 'PARTIDO DE UNIDAD NACIONAL':
                            party_img = '';
                            break;
                        case 'PARTIDO POPULAR CRISTIANO':
                            party_img = '';
                            break;
                        case 'MOVIMIENTO COMUNITARIO POLITICO NOSOTROS PA\' CUANDO':
                            party_img = '';
                            break;
                        case 'MOVIMIENTO INDEPENDIENTE UNIDAD Y PROGRESO':
                            party_img = '';
                            break;
                        case 'MOVIMIENTO INDEPENDIENTE NIGUA POR EL CAMBIO':
                            party_img = '';
                            break;
                        case 'CONFRATERNIDAD CIUDADANA DOMINICANA':
                            party_img = '';
                            break;
                        default:
                          party_img = '';
                      }

                      let template = `
                        <div class="candidates-card">
                            <div class="single_reson">
                                <div class="thum">
                                    <div class="thum_1" style="background-image: url(${image})">
                                    </div>
                                    <div class="party_img" style="background-image: url(${party_img})"></div>
                                </div>
                                <div class="help_content">
                                    <div class="title">
                                        <h4><span>${candidate.nombre}</span></h4>
                                    </div>
                                    <div class="cargo">
                                        <p>${candidate.cargo}</p>
                                    </div>
                                    <div class="partido">
                                        <p>Posicion Boleta: ${candidate.posicion_boleta}</p>
                                    </div>
                                    ${link}
                                </div>
                            </div>
                        </div>
                        `;
                        $(`#res_${candidate_cargo}`).append(template);   
                        
                    }

                  } else {
                    if (loaded){
                      $('#candidates_results').empty();
                      $("#candidates-response").empty();
                      // RENDER TEXT
                      template_notify = `
                      <div class="col-lg-6">
                          <div class="section_title text-center mb-55">
                              <h3><span>Lamentablemente no encontramos resultados en tu area</span></h3>
                              <p>Si no està tu candidato, for favor escribenos a <a href="mailto:sevanhello@gmail.com">sevanhello@gmail.com</a> </p>
                          </div>
                      </div>
                      `;
                      $("#candidates-response").append(template_notify);
                    } 
                    
                     
                  }

                  
                }
                
              }
            } 
          }
      }
      
      //return;
      
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