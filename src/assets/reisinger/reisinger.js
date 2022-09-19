/*
* General Scripts
*/

$(document).ready(function(){

    var loader = false;
    if($('body').hasClass('page-index')){
         if(  performance.navigation.type != performance.navigation.TYPE_RELOAD &&
              document.referrer == '')
              {
              var loader = true;
              Pace.start();
         }
    }

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
         //If device
         $('html').addClass('device');

         //Loader
         if($('.pace').length && loader == true){
              Pace.on('done', function(){
                  $('#loader, #tagline').fadeOut(500);
              });
         }else{
              $('#loader, #tagline').fadeOut(500);
         }

         //Pause autoplay videos on devices
         $('.module-full-width video').removeAttr('autoplay');
         $('.module-two-columns video').removeAttr('autoplay');
    }else{
         //If Desktop
         $('html').addClass('desktop');

         //Loader
         if($('.pace').length && loader == true){
              Pace.on('done', function(){
                  $('#loader').fadeOut(500);
              });
         }else{
              $('#loader').fadeOut(500);
         }

         $('.page-index .thumbnail video').removeAttr('autoplay');
         $('#related video').removeAttr('autoplay');
         //Play Videos on hover
         $('video:not([autoplay])').hover(function(){
              $(this)[0].play();
         }, function () {
              $(this)[0].pause();
         });
         //Hide Tagline on desktop
         $(window).scroll(function(){
              var h = $('#tagline').outerHeight();
              if($(window).scrollTop() == 0){
                   var timerT = setTimeout(function(){
                        $('#tagline').slideDown('slow', 'easeInOutQuint');
                   }, 500);
              }else if($(window).scrollTop() > h){
                   clearTimeout(timerT);
                   $('#tagline').slideUp('slow', 'easeInOutQuint');
              }
         });
    }

    //Hide Tagline if anchor to Header
    // $(function(){
    //      if (document.location.href.indexOf('#header') > -1 ){
    //           $('#tagline').remove();
    //      }
    // });

    //Back to top
    $('#top').click(function() {
         if($('main').hasClass('scroll')){
              $('#scroll-wrapper').animate({
                   scrollTop: 0
              }, 'slow', 'easeInOutQuint' );
         }else{
              $('html, body').animate({
                   scrollTop: 0
              }, 'slow', 'easeInOutQuint' );
         }
    });

    //Projects style
    $('nav div').click(function(){
         window.scrollTo(0,0);
         var style = $(this).attr('id');
         if(style != 'scroll'){
              $('body').removeClass('scroll-active');
         }
         $('nav div').removeClass();
         $(this).addClass('active');
         $('main').removeClass().addClass(style);
         $('main').find('.trigger').next().slideUp('slow', 'easeInOutQuint');
         $('main .trigger').removeClass('active');
    });

    //Cookies Views
    $('#covers').click(function(){
         Cookies.remove('Grid');
         Cookies.remove('List');
         Cookies.remove('Scroll');
         Cookies.set('Covers', '1');
    });
    $('#grid').click(function(){
         Cookies.remove('Covers');
         Cookies.remove('List');
         Cookies.remove('Scroll');
         Cookies.set('Grid', '1');
    });
    $('#list').click(function(){
         Cookies.remove('Covers');
         Cookies.remove('Grid');
         Cookies.remove('Scroll');
         Cookies.set('List', '1');
    });
    $('#scroll').click(function(){
         $('body').addClass('scroll-active');
         $('#scroll-wrapper').scrollTop(0);
         $('main.scroll .project:first-child .thumbnail').css('width', '100%');
         Cookies.remove('Covers');
         Cookies.remove('Grid');
         Cookies.remove('List');
         Cookies.set('Scroll', '1');
         if($('#search-tags').hasClass('active')){
              $('#search-tags').removeClass('active');
              $('#search-tags').next().slideUp('slow', 'easeInOutQuint');
         }
    });
    if (Cookies.get('Covers')){
         $('nav div').removeClass();
         $('#covers').addClass('active');
         $('main').removeClass().addClass('covers');
    }else if(Cookies.get('Grid')){
         $('nav div').removeClass();
         $('#grid').addClass('active');
         $('main').removeClass().addClass('grid');
    }else if(Cookies.get('List')){
         $('nav div').removeClass();
         $('#list').addClass('active');
         $('main').removeClass().addClass('list');
    }else if(Cookies.get('Scroll')){
         $('body').addClass('scroll-active');
         $('nav div').removeClass();
         $('#scroll').addClass('active');
         $('main').removeClass().addClass('scroll');
    }

    //Project images
    $('.desktop main .trigger').each(function(index){
         var target = $(this);
         var video = target.prev('.thumbnail').find('video');
         var timer;
         target.on('mouseleave', function(e){
              if(video.length){
                   video[0].pause();
              }
              timer = setTimeout(function(){
                   target.prev('.thumbnail').fadeOut();
              }, 250);
         });
         target.on('mousemove', function(e){
              clearTimeout(timer);
              if(video.length){
                   video[0].play();
              }
              target.prev('.thumbnail').show().css({
                   left:e.pageX,
              });
         });
    });

    //Display menu
    if($(window).width() > 600){
         $('menu .trigger:first-of-type').next().show();
    }else{
         $('.trigger').removeClass('active');
    }
    $('.trigger').click(function(){
         var target = $(this);
         var triggers = $(this).parent().parent().find('.trigger');
         if(triggers.hasClass('active') && !target.hasClass('active')){
              triggers.removeClass('active');
              target.addClass('active');
              triggers.next().slideUp('slow', 'easeInOutQuint');
              target.next().slideDown('slow', 'easeInOutQuint');
         }else if(target.hasClass('active')){
              target.removeClass('active');
              target.next().slideUp('slow', 'easeInOutQuint');
         }else{
              target.addClass('active');
              target.next().slideDown('slow', 'easeInOutQuint');
         }
    });

    //Close Filters
    $('menu .trigger, #scroll').click(function(){
         var filters = $('#filters').children().length;
         if(filters > 0){
              $('main').removeClass('filter-active');
              $('#filters').slideUp('slow', 'easeInOutQuint', function(){
                   $('.tag').removeClass('active');
                   $('.project').removeClass('filter-active');
                   $('#filters span').remove();
              });
         }
    });

    //Filter functions
    $('.tag').click(function(){
         var value = $(this).children('span:first-of-type').text();
         var slug = $(this).children('span:first-of-type').attr('id');
         var filters = $('#filters').children().length;
         // $('.project').hide().filter(slug).show();
         if($(this).hasClass('active')){
              $(this).removeClass('active');
              $('.project.'+ slug ).removeClass('filter-active');
              if(filters == 1){
                   $('main').removeClass('filter-active');
                   $('.project' ).removeClass('filter-active');
                   $('#filters').slideUp('slow', 'easeInOutQuint', function(){
                        $('#filter' + slug).remove();
                   });
              }else{
                   $('#filter' + slug).remove();
              }
         }else{
              $(this).addClass('active');
              $('.project.'+ slug ).addClass('filter-active');
              if(filters == 0){
                   $('main').addClass('filter-active');
                   $('#filters').append('<span id="filter' + slug + '">' + value + '</span>' );
                   $('#filters').slideDown('slow', 'easeInOutQuint');
              }else{
                   $('#filters').append('<span id="filter' + slug + '">' + value + '</span>' );
              }
         }
    });
});

//Lazy Loading for images
// document.addEventListener("DOMContentLoaded", function() {
//      const imageObserver = new IntersectionObserver((entries, imgObserver) => {
//           entries.forEach((entry) => {
//                if (entry.isIntersecting) {
//                     const lazyImage = entry.target
//                     lazyImage.src = lazyImage.dataset.src
//                }
//           })
//      });
//      const arr = document.querySelectorAll('img.lazy')
//      arr.forEach((v) => {
//           imageObserver.observe(v);
//      })
// })

//Lazy Loading
document.addEventListener("DOMContentLoaded", function() {
    L = [].slice.call(document.querySelectorAll('.lazy'));
   if('IntersectionObserver' in window){
       let o = new IntersectionObserver(function(E, observer){
           E.forEach(function(e){
               if(e.isIntersecting){
                        let l = e.target;
                        if(l.tagName == 'IMG'){
                             l.src = l.dataset.src;
                        }
                        if(l.tagName == 'VIDEO'){
                             var promise = l.play();
                             if(promise !== undefined){
                                  promise.catch(error => {
                                       l.controls = true;
                                       l.classList.add('no-autoplay');
                                  });
                             }
                        }
                        l.classList.remove('lazy');
                        o.unobserve(l);
                  }
            });
           });
       L.forEach(function(l){
           o.observe(l);
       });
     }
});
/*
window.addEventListener('load', function() {
   var video = document.querySelector('#video');
   var preloader = document.querySelector('.preloader');
   function checkLoad() {
       if (video.readyState === 4) {
           preloader.parentNode.removeChild(preloader);
       } else {
           setTimeout(checkLoad, 100);
       }
   }
   checkLoad();
}, false);*/

