simply.current_width;
simply.paginationCountTotal = 7;
simply.paginationCurrent = 1;
// Events
simply.clickEvent = function() { 
  $(".swatch-element img").click(function(event) {
    /* Act on the event */
    $(".swatch-element img").removeClass('active_border');
    $(this).addClass('active_border');
  });
  //click
  $(".discount_wrapper .apply_btn").click(function(event) {
    var value = $(".discount_input").val();
    simply.discountCalc(value);
    switchcurrency();
    
//   var discountcode = "discountcode";
//      discountcode = simply.getCookie(discountcode);
//      if(discountcode=='HOLIDAY' || discountcode=='Holiday' || discountcode=='holiday'){
//        $('.discount_text_wrapper').hide();
//        $('.bogo_wrapper').show();
//      }else{
//        $('.bogo_wrapper').hide();
//      }
    
  });
  $(".top_bar_discount.click .images img").click(function() {
    $(this).hide();
    var dis_code = $(".top_bar_discount .discount_code").text();
    simply.setCookie("discountcode", dis_code);
    $(".top_bar_discount .success_msg").show();
  });
  $(".top_bar_discount.click .close").click(function(e) {
    e.stopPropagation();
    $(".top_bar_discount .images").hide();
    if ($(this).hasClass("s_open")) {
      $(".top_bar_discount .success_msg").slideUp();
    } else {
      $(".top_bar_discount .success_msg").show();
      $(this).addClass("s_open");
    }
  });

  $(".new_home_loctor .locator_arrow").click(function() {
    $(".desk_locator, .locate_tabs").animate({
      scrollTop: $(".locate_tabs li:nth-child(4)").offset().top
    }, 2000);
    $(this).hide();
  });

  $(".product_store_locator .product_locator_arrow").click(function() {
    $(".product_store_locator .location_tab").animate({
      scrollTop: $(".location_tab li:nth-child(4)").offset().top
    },
                                                      2000);
    $(this).hide();
  });

  $("#product_page .lens_info .text").click(function() {
    var parent = $(this).closest(".lens_info");
    $(".action_btn", parent).click();
  });
  //work tab
  $("#product_work_play .work_tab").click(function(event) {
    var image_xs;
    var image;
    if ($(this).attr("data-name") == "men") {
      image = simply.collageMen.collage;
      image_xs = simply.collageMen.collage_mobile;
    } else {
      image = simply.collageWomen.collage;
      image_xs = simply.collageWomen.collage_mobile;
    }
    var gender = $(this).attr("data-name");

    if (!cn(image)) {
      $("#product_work_play .images .xs-hide .gender").hide();
      $("#product_work_play .images .xs-hide")
      .find("." + gender)
      .fadeIn(1000);
    }
    if (!cn(image_xs)) {
      $("#product_work_play .images .xs-show .gender").hide();
      $("#product_work_play .images .xs-show")
      .find("." + gender)
      .fadeIn(1000);
    }
    if (!cn(image) || !cn(image_xs)) {
      $("#product_work_play .work_tab").removeClass("active");
      $(this).addClass("active");
    }
  });

  $(".fake_popup_cart").click(function() {
    $.fancybox.close();
    $("#AddToCart").click();
  });

  $(".grid-structure .struct").click(function(e) {
    e.stopPropagation();
    var val = $(this).attr("data-value");
    var link = $(this).attr("data-href");
    var obj = {
      Url: link
    };
    history.pushState(obj, null, obj.Url);
    var grid_class = $("#product_grid_cls").val();
    if (val == "list") {
      $(".collection ul.list").addClass("list_cls");
      $(".collection ul.list li").removeClass(grid_class);
      $(".collection ul.list li").addClass("col-sm-12");
    } else {
      $(".collection ul.list").removeClass("list_cls");
      $(".collection ul.list li").removeClass("col-sm-12");
      $(".collection ul.list li").addClass(grid_class + " item");
    }
  });

  $(".product_store_locator .select_wrapper select").change(function(event) {
    var target = $(this).val();
    var parent = $(this).closest(".mobile_version");
    $(".images .img", parent).hide();
    $(".addresses .address", parent).hide();
    $(".images .img.img_" + target, parent).fadeIn();
    $(".addresses .address.address_" + target, parent).fadeIn();
  });
  $(".new_home_loctor .locate_tabs .a").click(function(event) {
    var target = $(this).attr("data-target");
    target = $(".locator_img_wrapper .img.img_" + target);
    $(".locator_img_wrapper .img").hide();
    target.fadeIn("fast");
    $(".new_home_loctor .locate_tabs a").removeClass("active");
    $(this).addClass("active");
    $(this)
    .next(".locator_img")
    .fadeIn();
  });
  $(".new_home_loctor .select_wrapper select").change(function(event) {
    var target = $(this).val();
    var parent = $(this).closest(".mobile_version");
    $(".images .img", parent).hide();
    $(".addresses .address", parent).hide();
    $(".images .img.img_" + target, parent).fadeIn();
    $(".addresses .address.address_" + target, parent).fadeIn();
  });
  $(".locator_form form").submit(function(event) {
    event.preventDefault();
    var number = $(".number-input", this);
    var error = $(".error_msg", this);
    if (number.val().length != 10) {
      error.fadeIn();
    } else {
      error.hide();
      $("button[type='submit']", this).text("Please wait..");
      simply.ajaxForm($(this), simply.productCallFromCallback);
    }
  });
  $(".contact_us").click(function(event) {
    $.fancybox([$(".locator_form")], {
      padding: 0
    });
  });

  //spinner
  $(document).on("click", ".spinner .plus", function() {
    var target = $(this).siblings("input");
    var value = parseInt(target.val()) + 1;
    target.val(value).trigger("change");
    jQuery(".cart_update_btn").trigger("click");
    jQuery(".cart-loader-action").removeClass("hide");
  });
  $(document).on("click", ".spinner .min", function() {
    var target = $(this).siblings("input");
    var value = parseInt(target.val());
    if (value > 0) {
      var value = value - 1;
      target.val(value);
      target.val(value).trigger("change");
      jQuery(".cart_update_btn").trigger("click");
      jQuery(".cart-loader-action").removeClass("hide");
    }
  });
  $("#extra_product  .header").click(function() {
    if (simply.current_width < 768) {
      $(".side_btn i", $(this))
      .toggleClass("fa-minus")
      .toggleClass("fa-plus");
      var parent = $(this).parent();
      $(".content", parent)
      .stop()
      .slideToggle();
    }
  });
  //mobile menu glasses
  $(document).on("click", "#mobile_drawer .glasses .block", function() {
    var parent = $("#mobile_drawer");
    $("#mobile_drawer .glass").show();
    $("#mobile_drawer .showcase").hide();
    $(".glass", this).hide();
    $(".showcase", parent).hide();
    $(".showcase", this).fadeIn();
  });
  $(document).on("click", "#mobile_drawer .glasses .block .showcase", function(
                 w) {
    w.stopPropagation();
  });
  $(".flat-toggle").click(function() {
    simply.toggleButton(
      $(this),
      simply.collectionToggleOne,
      simply.collectionToggleTwo);
  });
  //mobile_menu
  $(".mobile_menu_btn>a").click(function(e) {
    e.stopPropagation();
    simply.openMobileMenu();
  });
  $("#mobile_drawer .drawer_close").click(function() {
    simply.closeMobileMenu();
  });

  $(document).on("click", "#mobile_drawer .li a", function(e) {
    e.stopPropagation();
    var parent = $(this).closest(".li");
    var i = $(".icon i", parent);
    i.toggleClass("fa-minus");
    parent.find(".child_menu").slideToggle();
  });

  $(document).on("click", "#mobile_drawer .li a", function(e) {
    e.stopPropagation();
  });
  $(document).on("click", "#mobile_drawer .child_li", function(e) {
    e.stopPropagation();
    var li = $(this);
    $(".link_data", li).slideToggle();
  });

//   $(".header_mini_serach").click(function() {
//     var target = $(this).next(".fancy_search");
//     $.fancybox(target, {
//       helpers: {
//         overlay: {
//           opacity: 0.6,
//           css: {
//             background: "rgba(255, 255, 255, 0.59)"
//           }
//         }
//       }
//     });

//     $("input", target).focus();
//   });
  
  $(".header_mini_serach").click(function(e) {
    $('.fancy_search_new').show();
    $('.searchoverlay').show();
    $('.fancy_search_new .input_box').focus();
  });
  $(".searchclose").click(function(e) {
    $('.fancy_search_new').hide();
    $('.searchoverlay').hide();
  });
  
  //benchmarkform cookie
  $(".benchmark_form .btn").click(function() {
    simply.setCookie("subscriber", "user", simply.welcomeCookieExpire);
  });

  $(document).click(function() {
    $("#collection_page .filter_data")
    //.slideUp()
    .attr("data-status", "0");
  });
  // color span
  $(".color_span").click(function() {
    var location = $(this)
    .next("a")
    .attr("href");
    //window.location.href = location;
  });
  //sunglass open direct popup
  //sunglass lens add product
  $(".sunglass_lens .checkout").click(function(event) {
    //$.fancybox.showLoading();
    var time = simply.generateUniqueId();
    var obj = {};
    var current_id = $(this).attr("data-product");
    var child_form = $("<form><input name='id' value='" + current_id + "'><input name='quantity' value='1'><input value='Lens' name='properties[Type]'><input value='" + time + "' name='properties[Bundle]'></form>");
    var master_form = $("#AddToCartForm");
    var master_time_stampp = $("<input value='" + time + "' name='properties[Bundle]'>");
    master_form.append(master_time_stampp);
    obj.master_form = master_form;
    obj.child_form = child_form;

    simply.addSunLens(obj);
  });

  //   smooth scroll
  $('a[rel="scroll"]').click(function() {
    var target = $(this).attr("href");
    target = $(target);
    target.show();
    $("html, body").animate({
      scrollTop: target.offset().top
    },
                            500);
    return false;
  });

  //gift page from
  $("#gift_card .gift_input").click(function() {
    var parent = $(this).attr("data-parent");
    parent = $("#gift_card #" + parent);
    var target = $(this).attr("data-target");
    target = $("#gift_card ." + target);
    var value = $(this).attr("data-value");
    value = value.replace("<br/>", "");
    value = value.replace("<br/>", "");
    target.val(value);
    $(".gift_input", parent).removeClass("active");
    $(this).addClass("active");
  });

  $(".round_large_btn.gift_input").click(function() {
    var target = $(this).attr("href");
    $("#gift_card .gift_images").hide();
    $(target).show();
  });
  $("#gift_card .form_hide").click(function() {
    $("#gift_form").addClass("text-center");
    $("#gift_form .section .fields").hide();
  });
  $("#gift_card .form_show").click(function() {
    $("#gift_form .section .fields").show();
    $("#gift_form").removeClass("text-center");
  });
  //ajax cart
  $(document).on("click", "#AddToCart", function(e) {
    if ($(".unique_collection").length > 0) {
      $(".process_cart").click();
      return false;
    }
    e.preventDefault();
    if ($(window).width() < 1025) {
      $(".proceed_block").show();
    }
    var fast_cart = $(this).attr("data-fast");
    if (
      jQuery(".power-box.box_1")
      .siblings(".npw")
      .css("display") === "none") {
      jQuery(".power-box.box_1.first-open label").trigger("click");
    }
    if ($(window).width() < 767) {
      jQuery("#livechat-compact-container").addClass("hide");
      //       jQuery(this).parent('.product-single__add-to-cart').addClass('hide');
    }
    if (cn(fast_cart)) {
      simply.openSideOption();
    } else {
      $(".ajaxCart").submit();
    }
  });

  //recover password
  $("#RecoverPassword").click(simply.toggleRecoverPasswordForm);
  $("#HideRecoverPasswordLink").click(simply.toggleRecoverPasswordForm);

  //filter
  $(".advance_filter.mob .widget-wrapper-mob").click(function(e) {
    e.stopPropagation();
    simply.openMegaFilter();
    $(".filter-tag").fadeIn();
    $(".filter_data").hide();
    $(".filter_data_1").fadeIn();
    $(".advance_filter .widget-wrapper").removeClass("active");
    var index = $(this).attr("data-index");
    $(".advance_filter .widget-wrapper_" + index).addClass("active");
    $(".advance_filter .widget-wrapper_" + index + ".active").click();

    if ($(window).width() < 768) 
    { $(".advance_filter.mob").hide(); }  
  });

  $(".mega_filter").click(function(e) {
    e.stopPropagation();
    simply.openMegaFilter();
    $(".filter-tag").fadeIn();
    $(".filter_data").hide();
    $(".filter_data_1").fadeIn();
    $(".advance_filter .widget-wrapper").removeClass("active");
    $(".advance_filter .widget-wrapper:first").addClass("active");
  });
  $(" .mega_filter_close").click(function(e) {
    e.stopPropagation();
    simply.closeMegaFilter();
    $(".filter-tag").hide();
    if ($(window).width() < 768) 
    { $(".advance_filter.mob").show(); } 
  });

  $(".filter_menu .filter_xs").click(function() {});
  $(".advance_filter .widget-wrapper").click(function(e) {
    e.stopPropagation();
    $(".advance_filter .widget-wrapper").removeClass("active");
    $(this).addClass("active");
    var target = $(this).attr("data-index");
    target = $(".filter_data_" + target);
    var check = target.attr("data-status");
    if ($(window).width() > 767) {
      $(".filter_data")
      .not(target)
      .slideUp()
      .attr("data-status", "0");
    } else {
      $(".filter_data")
      .not(target)
      .hide();
    }
    if (check == "0") {
      if ($(window).width() > 767) {
        target.slideDown();
      }
      target.attr("data-status", "1");
    } else {
      if ($(window).width() > 767) {
        target.slideUp();
      } else {
        // target.hide();
      }
      target.attr("data-status", "0");
    }
    if ($(window).width() < 768) {
      target.fadeIn();
    }
  });
  $(".advance_filter .widget-wrapper ul").click(function(e) {
    e.stopPropagation();
  });
  //Close filter menu on click out side of menu
  $('body').click(function(e) {
      if (!$(e.target).closest('.filter_data ').length){
        $(".filter_data ").slideUp();
      }
    });
  
  //mini cart open
  $(document).on("click", ".side_cart", function() {
    simply.miniCartOpen();
  });
  //   filter open
  $("#collection_page .filter_btn").click(function() {
    simply.filterOpen();
  });
  //mini cart and filter close
  $(document).on("click", ".black_bg", function() {
    simply.miniCartClose();
    simply.filterClose();
    simply.closeSideOption();
    simply.closeMobileMenu();
  });
  $("#product_page .side_option .close").click(function() {
    simply.closeSideOption();
  });
  $(document).on("click", "#side_cart .close", function() {
    //mini cart close
    simply.miniCartClose();
  });
  $(".advance_filter .filter_title .close").click(function() {
    //filter close
    simply.filterClose();
  });
  //mini cart update
  $(document).on("click", "#side_cart .update", function() {
    var form = $("#side_cart form");
    var checkout = $(this).attr("data-checkout");
    if (form.find(".items").length == 0) {
      $("#side_cart .no_data").fadeIn();
    } else {
      $("#side_cart .no_data").fadeOut();
      if (cn(checkout)) {
        $(this).text("Updating");
      } else {
        $(this).text("Please wait");
      }
      simply.miniCartUpdate(form, checkout);
    }
  });
  //mini cart remove product
  $(document).on("click", "#side_cart .remove", function() {
    $(this).text("Removing...");
    var input = $(this)
    .parent()
    .find("input");
    input.val(0);
    var form = $("#side_cart form");
    var remove = $(this);
    simply.miniCartUpdate(form);
  });

  //mobile search
  $(".mobile_search_icon .search").click(function() {
    $(".mobile_search").removeClass("hide");
    $(".mobile_search input").attr("autofocus", true);
  });
  $(".mobile_search .close").click(function() {
    $(".mobile_search").addClass("hide");
  });

  //product swatches
  $(document).on("click", "#product_card .swatch-element", function(e) {
    e.stopPropagation();
    simply.productSwatchesChange($(this), true);
  });

  //collection swatches
  $(document).on("click", "#collection_page .color.swatch-element", function() {
    simply.collectionSwatchesChange($(this));
  });
  $(document).on("click", "#search_page .color.swatch-element", function() {
    simply.collectionSwatchesChange($(this));
  });
  $(document).on("click", "#home_products .color.swatch-element", function() {
    simply.collectionSwatchesChange($(this));
  });

  //power collection - product page
  $("#extra_product label").click(function() {
    $("#extra_product label").removeClass("active");
    $(this).addClass("active");
  });

  $("#product_card .power_section .power-box label.eg,#product_card .power_section .power-box .sg").click(function() {
    $("#product_card .power_section .power-box label.eg")
    .not($(this)).removeClass("active");
    $(this).toggleClass("active");
    var np = $(this).attr("data-power");
    var parent = $("#product_card .power_section");
    $(".full-btn", parent).attr("disabled", false);
    var form_check = $(this).attr("data-form");
    if (!cn(form_check)) {
      $(".full-btn", parent).attr("data-form", form_check);
    }
    $(".zero_detail").stop().slideUp();
    if (cn(np)) {
      // $(".npw",parent).slideUp();
      $(this).parent().next().slideUp();
      $(".npw label", parent).removeClass("active");
      $(".full-btn", parent).text("Check out").show();
    } else {
      var target_li = $(this)
      .parent()
      .next();
      $(".npw")
      .not(target_li)
      .slideUp();
      target_li.slideToggle();
      $(".full-btn", parent).hide();
    }
    var auto_call = $(this).hasClass("sg_checkout");
    if (auto_call) {
      // $(".action_btn.checkout_btn").click();
    }
  });

  $("#product_page .process_cart").click(function(event) {
    $('.custom-form-wrapper input[type=button]').click();
     $('.custom-form-wrapper input[type=button]').hide(); 
     $(this).find('.loading').fadeIn().css('display','inline-block');
    
    $(this).addClass("active");
    var parent = $(".choose_lense_text input[type=radio]:checked").closest(".lens_info"); 

    if($('#Zero-Power').is(':checked')){
      //e.stopPropagation();       
    }
    $(".action_btn", parent).click();
  });


  $("#product_page .side_option .action_btn,#extra_product .action_btn").click(

    function(e) {
      var lense_type = $(this).closest('.form-group').data('lens');
      console.log(lense_type);
      //  06-02-19 --------start---
      if(!cn(lense_type)){
        $(".form-group[data-lens='"+lense_type+"'] .lens_info").find('input[type=radio]').prop("checked", false);
        $(this).closest(".lens_info").find("input[type=radio]").prop("checked", true);
      }
      // $(".form-group .lens_info").find('input[type=radio]').prop("checked", false);
      //  06-02-19 --------end---

      e.stopPropagation();

      var currentLens = $(this).closest(".lens_info").find("label .text").text().trim();
      $("#product_page .side_option .action_btn").each(function(index, lenses) {
        var index = index + 1;
        if (lenses.textContent.trim() == currentLens && typeof simply.productJson != "undefined" && simply.productJson.type == "Eyeglasses") {
          ga('send', {
            hitType: 'event',
            eventCategory: 'Lens Page',
            eventAction: 'lens ' + index,
            eventLabel: lenses.textContent.trim()
          });
        }
      });
      if ($(".process_cart.active").length == 0 && simply.productJson.type == "Eyeglasses" || $(".process_cart.active").length == 0 && simply.productJson.type == "Sunglasses") {
        return false;
      }

      if ($(".process_cart.active").length == 0 && simply.productJson.type == "Child") {
        return false;      
      }

      //$.fancybox.showLoading();
      var parent = $(this).attr("data-product");
      parent = $("." + parent);
      var form = $("form.ajaxCart", parent);
      var change_lens = $(this).attr("data-vid");
      if (!cn(change_lens)) {
        form.attr("data-lens", change_lens);
      }
      var type = form.attr("data-type");
      var zero_power = $(this).attr("data-zero");
      if (!cn(zero_power)) {
        $("input[name='properties[prescription_type]']").val("ZERO_POWER");
        var zero_input = $("<input type='hidden' name='properties[zero-power]' value='true'>");
        form.append(zero_input);
      }
      var npw_value = $(this).attr("data-value");
      var power_form_check = $(this).attr("data-form");
      var sunglass_lens;
      if (power_form_check == "Yes") {
        sunglass_lens = $(this).attr("data-sun-power");
      } else {
        sunglass_lens = "";
      }
      if (npw_value == "none") {
        simply.setCookie("npw_type", npw_value, - 1);
      } else {
        simply.setCookie("npw_type", npw_value, 1);
      }
      var obj = {};
      obj.form = form;
      obj.type = type;
      obj.form_check = power_form_check;
      obj.npw = npw_value;
      obj.sun_lens = sunglass_lens;
      simply.powerCheck(obj);
    });
};

simply.hoverEvent = function() {
  //hover
  $("#team_details .team_info .image").mouseenter(function() {
    $(this)
    .find(".personal_details")
    .stop()
    .fadeIn();
  });
  $("#team_details .team_info .personal_details").mouseleave(function() {
    $(this)
    .stop()
    .fadeOut();
  });

  //acount menu
  $(".side_menu .account").hover(

    function() {
      $(this).find(".account_menu").stop().fadeIn();
    },
    function() {
      $(this).find(".account_menu").stop().fadeOut();
    });

  $(".main_menu .ul .li").hover(

    function() {
      //menu

      var mega = $(this).hasClass("no_relative");
      if (mega) {
        $("#header_header").addClass("mega_active");
        $(this)
        .find(".child_menu")
        .stop()
        .show();
      } else {
        $(this)
        .find(".child_menu")
        .stop()
        .fadeIn();
      }
    },

    function() {
      var mega = $(this).hasClass("no_relative");
      if (mega) {
        $(this)
        .find(".child_menu")
        .stop()
        .hide();
        $("#header_header").removeClass("mega_active");
      } else {
        $(this)
        .find(".child_menu")
        .stop()
        .fadeOut();
        $("#header_header").removeClass("mega_active");
      }
    });
  $(".main_menu .ul .li .child_li ").hover(

    function() {
      $(this)
      .find(".third_menu")
      .stop()
      .fadeIn();
    },

    function() {
      $(this)
      .find(".third_menu")
      .stop()
      .fadeOut();
    });
  if (simply.current_width > 1024) {
    $(document).on("mouseover", ".double_img.product_img", function() {
      //image switch
      $(this).animate({
        opacity: 0
      });
      $(this)
      .next(".alter_img")
      .stop()
      .show();
    });
    $(document).on("mouseleave", ".double_img.product_img", function() {
      //image switch
      $(this).animate({
        opacity: 1
      });
      $(this)
      .next(".alter_img")
      .stop()
      .hide();
    });
  }
  $(".product_main").hover(

    function() {
      //quick view banner
      $(this)
      .find(".quick_view")
      .stop()
      .fadeIn();
    },

    function() {
      $(this)
      .find(".quick_view")
      .stop()
      .fadeOut();
    });
  $(document).on("touchmove", ".main_rotate_img", function(event) {
    if ($(".main_rotate_img").length > 0) {
      var img_count = 7;
      var width = $(".degree_section").width();

      var min_x = width * 0.1;
      var max_x = width * 0.9;
      var one_block = (max_x - min_x) / 7;
      var eventX = event.originalEvent.touches[0].pageX;
      var eventX = eventX - $(".main_rotate_img").offset().left;
      if (eventX < 0) {
        eventX = 0;
      }
      console.log(eventX);
      var attr_val = parseInt((eventX - min_x) / one_block);
      console.log(attr_val);
      if (attr_val < 1) attr_val = 1;
      if (attr_val > 6) attr_val = 6;
      var img = $(".large_img");
      attr_val = parseInt(attr_val);
      var left = -(attr_val * width);
      console.log("left is:" + left);
      if (left == width * -1) {
        left = 0;
      }
      img.css("left", left);
    }
  });
  $(document).on("mouseenter", ".rotate_child", function(event) {
    var width = $(".degree_section").width();
    var img = $(".large_img");
    var attr_val = $(this).attr("data-index");
    attr_val = parseInt(attr_val);
    var left = -(attr_val * width);
    if (attr_val == 1) {
      img.css("left", 0);
    } else {
      img.css("left", left);
    }
  });
};

simply.bannerVideoSection = function() {
  var selector;
  if ($(window).width() > 767) {
    selector = $(".li-1 .image .fancybox");
  } else {
    selector = $(".mobile_banner_image .fancybox");
  }
  selector.attr('rel', 'gallery')
  .fancybox({
    padding: 0,
    margin: [20, 60, 20, 60]
  });
};

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

simply.submitEvent = function() {
  $(".call_form form").submit(function(e) {
    e.preventDefault();
    var error = $(".error_msg", this);

    var input = $(".number-input", this);
    var passed = false;
    if (input.length > 0) {
      var check_length = input.val().length;
      if (check_length == 10) {
        passed = true;
        localStorage.setItem('cartNumber', input.val());
      }
    } else {
      var input = $(".email-input", this);
      var email_val = input.val();
      if (validateEmail(email_val)) {
        passed = true;
      }
    }
    if (passed) {
      $("button[type='submit']", this).prop("disabled", true);
      simply.ajaxForm($(this), simply.productCallFromCallback);
      error.hide();
    } else {
      error.show();
    }
  });

  $(".bifocal_form form").submit(function(e) {
    e.preventDefault();
    var error = $(".error_msg", this);
    var input = $(".number-input", this);
    var passed = false;
    if (input.length > 0) {
      var check_length = input.val().length;
      if (check_length == 10) {
        passed = true;
      }
    } else {
      var input = $(".email-input", this);
      var email_val = input.val();
      if (validateEmail(email_val)) {
        passed = true;
      }
    }
    if (passed) {
      $("button[type='submit']", this).prop("disabled", true);
      simply.ajaxForm($(this), simply.productCallFromCallback);
      error.hide();
    } else {
      error.show();
    }
  });
};
simply.productCallFromCallback = function(data) {
  $(".locator_form .number-input").val("");
  $(".locator_form button[type='submit']").text("Submit");
  var parent = $(".call_form");
  var btn = $("button[type='submit']", parent);
  if (data.status == "0") {
    var text = "We will contact you as soon as possible.<br/> Thank you";
    $(".number-input", parent).prop("disabled", true);
    btn.text("submitted");
  } else {
    var text = "Something went wrong.<br/> Please try again.";
    btn.text("submit");
    btn.prop("disabled", false);
  }
  var div = $("<div id='quick_error'></div>");
  div.html("");
  div.append("<h6>" + text + "</h6>");
  $.fancybox(div);
};
simply.lensRadioCheck = function(lense_type){
  if($(".form-group[data-lens='"+lense_type+"'] .lens_input:checked").length == 0){
    $(".choose_lense_text .lens_input").prop("checked",false);
    $(".form-group[data-lens='"+lense_type+"'] .lens_input:first").prop("checked",true);
  }
};
simply.changeEvent = function() {

  $(document).on('click','.checkbox_block .form-group-cus .head',function(){
    $('.frame_only-container input[type="radio"]').prop('checked',false);
    $('.checkbox_block').find('.form-group').hide();
    $(".frame_only-container").hide();
    $('.prescr-form').hide();
    var lense_type = $(this).closest('.head').data('lens');
    var id = $(this).find('input[type="radio"]').attr('id');
    //  06-02-19 --------start---
    if(!cn(lense_type)){
      $(".form-group[data-lens='"+lense_type+"']").css('display','inline-flex');
    }
    simply.lensRadioCheck(lense_type);
    switch(lense_type){
      case 'powered-specs':
        $('.product_form .top_tab .tab.choose_lense').show();
        $('.product_form .top_tab .choose_lensespan').show();
        $('.product_form .top_tab .tab.power_detail').show();
        $('.product_form .top_tab .tab.place-order').show();
        $('.product_form .top_tab .place-orderspan').show();
        $('.product_form .btn_next').show();
        $('.product_form .btn_proceed').hide();
        $('#egbtntemp1').hide();
         $('#egbtntemp').show();
        break;
        
      case 'computer-glasses':
        $(".product_form .top_tab .tab.power_detail").hide();
        $('.product_form .top_tab .tab.choose_lense').hide();
        $('.product_form .top_tab .choose_lensespan').hide();
        $('.product_form .top_tab .tab.place-order').hide();
        $('.product_form .top_tab .place-orderspan').hide();
        $('.product_form .btn_next').hide();
        $('.product_form .btn_proceed').show();
        $('#egbtntemp').hide();
         $('#egbtntemp1').show();
        break;
        
        case 'bifocal-glasses':
        $(".product_form .top_tab .tab.power_detail").show();
        $('.product_form .top_tab .tab.choose_lense').show();
        $('.product_form .top_tab .choose_lensespan').show();
        $('.product_form .top_tab .tab.place-order').show();
        $('.product_form .top_tab .place-orderspan').show();
        $('.product_form .btn_next').show();
        $('.product_form .btn_proceed').hide();
         $('#egbtntemp1').hide();
         break;
        
        case 'sun_withpower':
        $(".sg_next_btn").removeClass('hideimp');
        $(".sg_addtocart_btn").addClass('hideimp');
        $(".choose_lense-sun ").removeClass('hideimp');
        $('.product_form .top_tab .tab.place-order').show();
        $('.product_form .top_tab .place-orderspan').show();
         $('.product_form .top_tab .choose_lensespan').show();
        $(".product_form .top_tab .tab.power_detail").show();
        break;
        
        case 'sun_withpower_pro':
        $(".sg_next_btn").removeClass('hideimp');
        $(".sg_addtocart_btn").addClass('hideimp');
        $(".choose_lense-sun ").removeClass('hideimp');
        $('.product_form .top_tab .tab.place-order').show();
        $('.product_form .top_tab .place-orderspan').show();
         $('.product_form .top_tab .choose_lensespan').show();
        $(".product_form .top_tab .tab.power_detail").show();
        
       
        break;
        
        case 'sun_withoutpower':
        $(".sg_next_btn").addClass('hideimp');
        $(".sg_addtocart_btn").removeClass('hideimp');
        $(".choose_lense-sun ").addClass('hideimp');
        $('.product_form .top_tab .tab.place-order').hide();
        $('.product_form .top_tab .place-orderspan').hide();
        $('.product_form .top_tab .power_detailspan').hide();
         $('.product_form .top_tab .choose_lensespan').hide();
        $(".product_form .top_tab .tab.power_detail").hide();
        
        break;
        
    }
    if(id == 'Frame-Only'){
      $('.product_form .top_tab .tab.choose_lense').hide();
      $('.product_form .top_tab .choose_lensespan').hide();
      $(".product_form .top_tab .tab.power_detail").hide();
      $('.product_form .top_tab .tab.place-order').hide();
      $('.product_form .top_tab .place-orderspan').hide();
      //$('.product_form .top_tab .tab.power_detail,.product_form .top_tab .tab.choose_lense').hide();
      $(".choose_lense_text .lens_input").prop("checked",false);
      $('.frame_only-container input[type="radio"]').prop('checked',true);
      $(".frame_only-container,.frame_only-container .form-group").hide();
      $('.product_form .btn_next').hide();
      $('.product_form .btn_proceed').show();
      $('#egbtntemp').hide();
      $('#egbtntemp1').show();
    }
    // $(".form-group .lens_info").find('input[type=radio]').prop("checked", false);
    //  06-02-19 --------end---

  });

  $(window).resize(function(event) {
    shrinkName();
  });
  shrinkName();
  function shrinkName(){
    if($(window).width() < 1025){
      $('.product_form .top_tab .tab').each(function(){
        var text = $(this).data('text');
        $(this).text(text);
      });
    } else {
      $('.product_form .top_tab .tab').each(function(){
        var fulltext = $(this).data('fulltext');
        $(this).text(fulltext);
      });
    }
  }

  $(document).on('click','.product_form .top_tab .tab',function(e){
    e.preventDefault();
    var index = parseInt($(this).data('index'));
    if(index == 10){      
      if($('#sun_withpower').is(':checked')){
        $(".sg_next_btn").removeClass('hideimp');
        $(".sg_addtocart_btn").addClass('hideimp');
        $(".choose_lense-sun").removeClass('hideimp');        
      }
      else if($('#sun_withpower_pro').is(':checked')){
        $(".sg_next_btn").removeClass('hideimp');
        $(".sg_addtocart_btn").addClass('hideimp');
        $(".choose_lense-sun").removeClass('hideimp');        
      }
      else{
        $(".sg_next_btn").addClass('hideimp');
        $(".sg_addtocart_btn").removeClass('hideimp');
        $(".choose_lense-sun ").addClass('hideimp');
      }      
    }

    if(index == 11){
      $(".sg_next_btn").addClass('hideimp');
      $('.form-group-cus .top_tab').animate({scrollLeft: "+=150px"}, "slow");
    }

    if(index == 21){
      //$(".sg_next_btn").addClass('hideimp');
      return false;
    }
    if(index == 2){return false;
      if(!$('.choose_lense').hasClass('visited')){
        console.log(index);
        //return false;
      }
    }
    $(this).addClass('active').siblings('.tab').removeClass('active');
    $('.product_form .btn_next').attr('data-index',index);
    $('.product_form .toggle_div').hide();
    $('.product_form .toggle_div[data-index='+index+']').show();
    if(index == 2){
      $('.product_form .btn_next').hide();
      $('.product_form .btn_proceed').hide();
      console.log(index);
    } else {
      if(index == 1){
        $(this).addClass('visited');
        if($('#Frame-Only').is(':checked') || $('#Zero-Power').is(':checked')){
          $('.product_form .btn_next').hide();
          //$('.product_form .btn_proceed').show().css('display','flex');
        } else {
          $('.product_form .btn_next').hide();
          $('.product_form .btn_proceed').hide();
          $('.form-group-cus .top_tab').animate({scrollLeft: "+=150px"}, "slow");
        }
      } else {
        $('.product_form .btn_next').show();
        $('.product_form .btn_proceed').hide();
      }
      if(index == 0){
        if($('#Frame-Only').is(':checked') || $('#Zero-Power').is(':checked')){
          $('.product_form .btn_next').hide();
        } 
      }
    }

  })

  $(document).on('click','.product_form .btn_next',function(){
    var index = parseInt($('.product_form .top_tab .tab.active').data('index'));
    index+=1;
    $('.product_form .toggle_div').hide();
    $('.product_form .toggle_div[data-index='+index+']').show();
    $('.product_form .top_tab .tab[data-index='+index+']').addClass('active').siblings('.tab').removeClass('active');
    if(index == 2){
      var total_price = parseInt($(".sidecart_price").attr("data-price")) + parseInt($(".choose_lense_text .lens_input:checked").attr("data-price"));
      if(!isNaN(total_price)){
        total_price = Shopify.formatMoney(total_price, simply.moneyFormat).replace(/((\,00)|(\.00))$/g, "");
        // $("#AddToCart .orignal").text(total_price);
        $(".sidecart_price").text(total_price);
      } 
      $('.checkbox_block .prescr-form').show();
      // $(this).hide().closest('.btn_proceed').show();
      $(this).hide();
      $('.product_form .btn_proceed').show().css('display','flex');
    } else {
      if(index == 1){
        $('.product_form .top_tab .tab.choose_lense').addClass('visited');
        if($('#Frame-Only').is(':checked')){
          $('.product_form .btn_next').hide();
          $('.product_form .btn_proceed').show().css('display','flex');
        }

        if($('#single-vision').is(':checked')){
          $('.product_form .btn_next').hide();        
  		  $('.form-group-cus .top_tab').animate({scrollLeft: "+=150px"}, "slow");         
        }
        
        if($('#near-vision').is(':checked')){
          $('.product_form .btn_next').hide();        
  		  $('.form-group-cus .top_tab').animate({scrollLeft: "+=150px"}, "slow");         
        }
        
        if($('#bifocal-power').is(':checked')){
          $('.product_form .btn_next').hide();
          $('.form-group-cus .top_tab').animate({scrollLeft: "+=150px"}, "slow");
        }

        if($('#Zero-Power').is(':checked')){
          $('.product_form .btn_proceed').hide(); 
          $('.product_form .btn_next').hide();
        }

      } else {
        $('.product_form .btn_next').hide();
        $('.product_form .btn_proceed').hide();
      }
    }
  });
};

simply.openMegaFilter = function() {
  $("body").addClass("overflow_hidden");
  $("html").addClass("overflow_hidden");
};
simply.closeMegaFilter = function() {
  $("body").removeClass("overflow_hidden");
  $("html").removeClass("overflow_hidden");
};
simply.giftDate = function(d1, d2) {
  var date = d1 + d2;
  date = parseInt(date);
  if (date > 31) {
    $("#gift_card .date_error").fadeIn();
  } else {
    $("#gift_card .date_error").fadeOut();
  }
};
simply.giftMonth = function(m1, m2) {
  var month = m1 + m2;
  date = parseInt(month);
  if (month > 12) {
    $("#gift_card .month_error").fadeIn();
  } else {
    $("#gift_card .month_error").fadeOut();
  }
};
simply.giftYear = function(y1, y2) {
  var year = y1 + y2;
  year = parseInt(year);
  if (year > 16 && year < 99) {
    $("#gift_card .year_error").fadeOut();
  } else {
    $("#gift_card .year_error").fadeIn();
  }
};
simply.queryString = function() {
  var vars = [],
      hash;
  var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1)
  .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
};
// end of events
simply.powerCheck = function(obj) {
  try {
    var form = obj.form;
    var npw = obj.npw;
    var sun_lens = obj.sun_lens;
    var value = obj.form_check;
    var ps = $("#product_page .side_option");
    var type;
    if (npw == "frame_only") {
      type = "frame_only";
    }
    var input = $("<input type='hidden' value='" + value + "' name='properties[Prescription-form1]'>");
    //form.append(input);
    if (type == "frame_only") {
      if (cn(sun_lens)) {
        //simply.closeSideOption();
        //$.fancybox.showLoading();
        simply.ajaxCart(form);
      } else {
        simply.openSunLens(form);
      }
    } else {
      var link = ps.attr("data-link");
      link = link + "?user=true";
      var time = simply.generateUniqueId();
      var time_input = $("<input value='" + time + "' name='properties[Bundle]'>");
      form.append(time_input);
      var child_id = form.attr("data-lens");
      var master_form = form.serialize();
      var d_form = $("<form></form>");
      var d_input_id = $("<input name='id' value='" + child_id + "'>");
      var d_input_qty = $("<input name='quantity' value='1'>");
      var d_type = $("<input value='Lens' name='properties[Type]'>");
      d_form.append(d_input_id);
      d_form.append(d_input_qty);
      d_form.append(time_input);
      d_form.append(d_type);
      d_form = d_form.serialize();
      simply.ajaxCartPower(d_form, master_form);
      console.log('powerCheck');
    }
  } catch (e) {
    console.log(e);
  }
};
simply.localStoreSupport = function() {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
};
simply.openSunLens = function(form) {
  simply.closeSideOption();
  $.fancybox("#product_page .sunglass_lens");
  //sun glass add lens
  $(".sunglass_lens .checkout").attr("data-form", form);
};
simply.addSunLens = function(obj) {
  var master_form = obj.master_form.serialize();
  var child_form = obj.child_form;
  child_form = child_form.serialize();
  simply.ajaxCartPower(child_form, master_form);
};
simply.sortByActive = function() {
  if ($(".advanced-filters.sort_list").length > 0) {
    var url = simply.queryString("sort_by").sort_by;
    var li;
    $(".advanced-filters.sort_list li").removeClass("active-filter");
    $(".advanced-filters.sort_list li").each(function(index, item) {
      if ($(item).attr("data-sort") == url) {
        li = $(item);
      }
    });
    if (!cn(li)) {
      li.addClass("active-filter");
    }
  }
};
// simply.mailChimpCallback = function(resp) {
//   var cookieExpire = simply.welcomeCookieExpire;
//   var $div = $("<div id='mail_chimp_result'></div>");
//   $div.html("<h6 class='text-center'>" + resp.msg + "</h6>");
//   simply.setCookie("subscriber", "user", cookieExpire);
//   $.fancybox($div);
// };
simply.ajaxForm = function(selector, callback) {
  //Ajax Submit Form
  var form = selector;
  var data = form.serialize();
  if (form.length > 0) {
    var url = form.attr("action");
    var params = {
      type: "POST",
      url: url,
      data: data,
      success: function(line_item) {
        var data = JSON.parse(line_item);
        callback(data);
      },
      error: function(XMLHttpRequest, textStatus) {
        var error = JSON.parse(XMLHttpRequest.responseText).description;
        var error_popup = $("<div id='quick_error'></div>");
        error_popup.html("");
        error_popup.append("<h6>" + error + "</h6>");
        $.fancybox(error_popup);
      }
    };
    jQuery.ajax(params);
  }
};
simply.ajaxFormShopify = function(selector, callback) {
  //Ajax Submit Form
  var form = selector;
  var data = form.serialize();
  if (form.length > 0) {
    var url = form.attr("action");
    var params = {
      type: "POST",
      url: url,
      data: data,
      dataType: "json",
      success: function(line_item) {
        callback(data);
      },
      error: function(XMLHttpRequest, textStatus) {
        var error = JSON.parse(XMLHttpRequest.responseText).description;
        var error_popup = $("<div id='quick_error'></div>");
        error_popup.html("");
        error_popup.append("<h6>" + error + "</h6>");
        $.fancybox(error_popup);
      }
    };
    jQuery.ajax(params);
  }
};
simply.ajaxCart = function(form, szform) {
  var data;
  if (cn(form)) {
    data = szform;
  } else {
    data = form.serialize();
  }
  var params = {
    type: "POST",
    url: "/cart/add.js",
    data: data,
    dataType: "json",
    success: function(line_item) {
      simply.updateCartCount();
      if (simply.sideCartCheck == 0) {
        simply.miniCartInit(line_item.quantity);
        window.location.href = "/cart";
      } else {
        simply.miniCartInit("open");
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      var error = JSON.parse(XMLHttpRequest.responseText).description;
      var error_popup = $("<div id='quick_error'></div>");
      error_popup.html("");
      error_popup.append("<h6>" + error + "</h6>");
      $.fancybox(error_popup);
    }
  };
  jQuery.ajax(params);
};
simply.ajaxCartPower = function(d_form, m_form) {
  var params = {
    type: "POST",
    url: "/cart/add.js",
    data: d_form,
    dataType: "json",
    success: function(line_item) {
      simply.ajaxCart("", m_form);
    },
    error: function(XMLHttpRequest, textStatus) {
      var error = JSON.parse(XMLHttpRequest.responseText).description;
      var error_popup = $("<div id='quick_error'></div>");
      error_popup.html("");
      error_popup.append("<h6>" + error + "</h6>");
      $.fancybox(error_popup);
    }
  };
  jQuery.ajax(params);
};
simply.updateCartCount = function(qty) {
  var cart = $("#top_bar .menu a.cart .count");
  if (cart.length > 0) {
    var cart_value = cart.text();
    cart_value = parseInt(cart_value) + parseInt(qty);
    $(".cart .count").html(cart_value);
  }
};
simply.miniCartInit = function(open) {
  if (simply.sideCartCheck != 0) {
    var cart;
    var url = "/cart?view=sidecart";
    $.ajax({
      url: url,
      success: function(cartpage) {
        if ($("#side_cart").length > 0) {
          $("#side_cart").html("");
          cartpage = $(cartpage)
          .filter("#side_cart")
          .html();
          $("#side_cart").append(cartpage);
          var count = $(".count.hide").text();
          $(".cart .count").html(count);
        } else {
          $(cartpage).insertBefore("body .black_bg");
        }
        simply.imgBlur();
        if (!cn(open)) {
          $.fancybox.close();
          simply.miniCartOpen();
        }
      }
    });
  }
};

simply.miniCartUpdate = function(form, checkout) {
  var params = {
    type: "POST",
    url: "/cart",
    data: form.serialize(),
    dataType: "json",
    success: function(line_item) {
      if (!cn(checkout)) {
        window.location.href = "/checkout";
      } else {
        var cart_count = line_item.item_count;
        $(".cart .count").html(cart_count);
        $("#side_cart .update:first").text("Update");
      }
      simply.miniCartInit();
    },
    error: function(XMLHttpRequest, textStatus) {
      var error = JSON.parse(XMLHttpRequest.responseText).description;
      error = "<h6>" + error + "</h6>";
      $("#fancy_msg")
      .html("")
      .append(error);
      $.fancybox("#fancy_msg");
      $("#side_cart .update:first").text("Update");
    }
  };
  $("#side_cart .no_data").fadeOut();
  jQuery.ajax(params);
};
simply.openSideOption = function() {
  $("#product_page .side_option").addClass("active");
  if (typeof simply.productJson != "undefined" && simply.productJson.type == "Eyeglasses") {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Lens Page',
      eventAction: 'Add To Cart',
      eventLabel: jQuery(".swatch-element.active").attr("data-sku")
    });
  }
  simply.blankBgOpen();
  window.current_width = $(window).width();
  if (window.current_width < 768) {
    if ($("#product_page .side_option").hasClass("active")) {
      $("#product_page .product_form .product-single__add-to-cart").hide();
    }
  }
};

simply.closeSideOption = function() {
  $("#product_page .side_option").removeClass("active");
  simply.blankBgClose();
  window.current_width = $(window).width();
  if (window.current_width < 768) {
    $("#product_page .product_form .product-single__add-to-cart").show();
    jQuery("#livechat-compact-container").removeClass("hide");
  }
};
simply.filterOpen = function() {
  if ($(".filter_btn").length > 0) {
    simply.miniCartClose();
    $(".fixed_filter").addClass("active");
    simply.blankBgOpen();
  }
};
simply.filterClose = function() {
  if ($(".filter_btn").length > 0) {
    $(".fixed_filter").removeClass("active");
    simply.blankBgClose();
  }
};
simply.miniCartOpen = function() {
  $("#side_cart").addClass("active");
  simply.blankBgOpen();
  $(".mm-page").addClass("active");
  $("header.main_header.fixed").addClass("active");
};
simply.miniCartClose = function() {
  $("#side_cart").removeClass("active");
  simply.blankBgClose();
  $(".mm-page").removeClass("active");
  $("header.main_header.fixed").removeClass("active");
};
simply.blankBgOpen = function() {
  $(".black_bg").fadeIn();
  $("html").addClass("overflow_hidden");
  $("body").addClass("overflow_hidden");
};
simply.blankBgClose = function() {
  $(".black_bg").fadeOut();
  $("html").removeClass("overflow_hidden");
  $("body").removeClass("overflow_hidden");
};
simply.product_page_slider = null;
simply.initProductSlider = function(quick_view) {
  var selector = "#product_card .image_block .images ul.list";
  if (!cn(quick_view)) {
    var selector = "#quick_view #product_card .image_block .images ul.list";
  }
  var ad_height = $(selector).attr("data-height");
  var full_height;
  if (cn(ad_height)) {
    full_height = false;
  } else {
    full_height = true;
  }
  var thumbWidth;
  if (simply.current_width < 768) {
    thumbWidth = 5;
  } else {
    thumbWidth = 6;
  }
  if ($(selector).length > 0 && $("#product_card .image_block .lSSlideOuter").length == 0) {
    simply.product_page_slider = $(selector).lightSlider({
      gallery: true,
      item: 1,
      thumbItem: thumbWidth,
      slideMargin: 0,
      loop: false,
      auto: false,
      controls: true,
      adaptiveHeight: full_height,
      enableTouch: true,
      enableDrag: false,
      prevHtml: '<span class="custom-prev-html"><img src="https://cdn.shopify.com/s/files/1/1276/5299/files/back.svg?12072168514005081447" /></span>',
      nextHtml: '<span class="custom-next-html"><img src="https://cdn.shopify.com/s/files/1/1276/5299/files/right-arrow.svg?12072168514005081447" /></span>',
      onSliderLoad: function(el) {
        $("#ProductImages .v_hide").removeClass("v_hide");
        $(".fake_pagination.current").remove();
        if ($(".image_block .fake_pagination.current").length == 0) {
          var fakePagi = $(".fake_pagination").clone();
          fakePagi.removeClass("hide").addClass("current");
          fakePagi.insertAfter(".image_block .lSSlideWrapper");
        }
        if (!cn(simply.product_page_slider)) {
          $("#product_card .images").css({
            height: "auto"
          });
          simply.product_page_slider.refresh();
        }
        simply.productZoom();
        dittoEnable = false;
        if (typeof simply.productJson != "undefined") {
          $(simply.productJson.tags).each(function(i, value) {
            if (value == 'dittoEnable') {
              dittoEnable = true;
            }
          });
        }
        if (dittoEnable && simply.getCookie('dittoId') != "") {
          if (!jQuery('.product_banner_div').length) {
            jQuery('.lSSlideWrapper').addClass('without_modal hide');
            jQuery('.lSSlideOuter').addClass('with_ditto');
          } else {
            jQuery('.ditto_panel').removeClass('hide');
            jQuery('.product_banner_div').addClass('hide');
          }
        }
      },
      onAfterSlide: function(el) {
        var current = $(".lslide.active").attr("data-index");
        var fp = $(".fake_pagination.current");
        $("span", fp).removeClass("active");
        $("span.dot_" + current, fp).addClass("active");
        $('.lSSlide').removeClass('screen-hide');
        if (!jQuery('.product_banner_div').length) {
          jQuery('.without_modal').removeClass('hide');
          jQuery('.ditto_panel').addClass('hide');
        }
        jQuery('.re_try_ditto').addClass('hide');
        jQuery('.with_ditto .fake_pagination').removeClass('hide');
      }
    });
  }
};
simply.initMenuAutoResize = function() {
  var cw = $(".main_nav").width();
  var total = 0;
  $(".main_nav>.ul>.li").each(function(index, item) {
    total = total + $(item).width();
  });
  total = parseInt(total) + 10;
  if (cw < parseInt(total)) {
    $(".main_menu .main_nav").addClass("hide_menu");
    $(".mobile_menu_btn").show();
  } else {
    $(".main_menu .main_nav").removeClass("hide_menu");
    $(".mobile_menu_btn").hide();
  }
};
simply.initMobileMenu = function() {
  var data = $("#mobile_drawer");
  $("body").append(data);
};
simply.miniHeightAction = function(selector) {
  var min_height = 0;
  $(selector).each(function() {
    var height = $(this).height();
    if (height > min_height) {
      min_height = height;
    }
  });
  return min_height;
};
simply.miniHeight = function(parent, select) {
  if ($(parent).length > 0) {
    var result = simply.miniHeightAction(select);
    $(parent).css("height", result);
  }
};
simply.productZoom = function() {
  var images = "#product_card .image_block .images .zoom";
  window.current_width = $(window).width();
  if (window.current_width > 1024) {
    if ($(images).length > 0) {
      $(images).zoom();
    }
  }
};

simply.imgBlur = function(callback) {
  var length = $(".img_blur.img_load").length;

  $(".img_blur.img_load").each(function() {
    var primary_img = new Image();
    var img = $(this);
    var orignal_size = img.attr("data-img");
    var mobile_size = img.attr("data-img-xs");
    var ww = simply.current_width;
    primary_img.onload = function() {
      if (ww > 767) {
        img.attr("src", orignal_size);
      } else {
        if (cn(mobile_size)) {
          img.attr("src", orignal_size);
        } else {
          img.attr("src", mobile_size);
        }
      }
      img.removeClass("img_load");
      length--;
      if (length == 0) {
        if (!cn(callback)) {
          callback.forEach(function(entry) {
            entry();
          });
        }
      }
    };
    primary_img.src = orignal_size;
  });
};
simply.imgBlurCallback = function() {
  var blur_callback = [];
  blur_callback.push(simply.productZoom);
  simply.imgBlur(blur_callback);
};
simply.productVariantInitialize = function() {
  if (!cn(simply.productJson)) {
    var selectProductId = "ProductSelect_" + simply.productJson.id;
    if ($("#" + selectProductId).length > 0) {
      var callBack = window["selectCallback_" + simply.productJson.id];
      new Shopify.OptionSelectors(selectProductId, {
        product: simply.productJson,
        onVariantSelected: callBack,
        enableHistoryState: true
      });
      var parent = $(".card_" + simply.productJson.id);
      simply.productSelectHide();
      simply.productSwatchesInit(parent);
      $("#product_card .selector-wrapper select").each(function(index, item) {
        if ($(item).children().length > 1) {
          $(item)
          .parent()
          .show();
        } else {
          $(item)
          .parent()
          .hide();
        }
      });
    }
  }
};
simply.productCallback = function(options) {
  var moneyFormat = options.money_format,
      variant = options.variant,
      selector = options.selector,
      translations = options.translations;
  // Selectors
  var parent_id = $("#" + options.selector.domIdPrefix).data("productid");
  var parent = $(".card_" + parent_id);
  var $addToCart = parent.find("#AddToCart .buy_from"),
      $productPrice = parent.find("#AddToCart .orignal"),
      $comparePrice = parent.find("#ComparePrice"),
      $inventory = parent.find("#ProductInventory"),
      $priceWrapper = parent.find(".product-single__price--wrapper"),
      $quantityElements = parent.find(".js-quantity-selector, label + .js-qty"),
      $product_img = parent.find("#ProductImages"),
      $addToCartText = parent.find("#AddToCartText");
  var variant_handle = variant.title;
  simply.variant_handle = simply.handleize(variant_handle);
  if (cn(simply.product_page_slider)) {
    simply.initProductSlider();
  }
  if (variant) {
    $(".variant_title").text(variant.title);
    var checkWomen = false;
    var hasWomenimg = $('#product_page .degree_btn ').attr('women');
    if ($("#product_page").hasClass("product_page_women")) {
      checkWomen = true;
    }
    if (checkWomen && (!cn(hasWomenimg))) {
      $(".degree_btn").removeClass("active");
      $(".degree_btn.women").addClass("active");
      checkWomen = true;
      simply.currentDegreeImage = "women";
    } else {
      checkWomen = false;
    }

    var collage_image = null;
    var collage_tab = null;
    if (checkWomen) {
      head_image = simply.headWomen;
      if (cn(head_image)) {
        head_image = simply.headMen;
      }
      collage_image = simply.collageWomen;
      collage_tab = "women";
    } else {
      head_image = simply.headMen;
      if (cn(head_image)) {
        head_image = simply.headWomen;
      }
      collage_image = simply.collageMen;
      collage_tab = "men";
    }
    if (!cn(head_image)) {
      h_image = head_image[simply.variant_handle];
    }
    if (h_image) {
      var h_image = h_image.split("?t=");
      var h_image = h_image[0];

      $(".product_banner_div").html(simply.srcsetMake(h_image));
      $(".product_banner_thubnail").html(simply.srcsetMake(h_image));

    }
    if (collage_image) {
      $(".work_tab[data-name='" + collage_tab + "']").addClass("active");
      $("#product_work_play .title").hide();
      if (collage_image.collage) {
        if (simply.current_width > 767) {
          $("#product_work_play .title").show();
        }
        $("#product_work_play .images .xs-hide .gender").css("display", "none");
        if (collage_tab == "men") {
          $("#product_work_play .images .xs-hide .men").css("display", "block");
        } else {
          $("#product_work_play .images .xs-hide .women").css("display", "block");
        }
      }
      if (collage_image.collage_mobile) {
        $("#product_work_play .images .xs-show .gender").css("display", "none");
        if (collage_tab == "men") {
          $("#product_work_play .images .xs-show .men").css("display", "block");
        } else {
          $("#product_work_play .images .xs-show .women").css("display", "block");
        }

        if (simply.current_width < 768) {
          $("#product_work_play .title").show();
        }
      }
    }
    $("#iStock-wrapper").removeClass("show");

    // Update variant image, if one is set
    if (variant.featured_image) {
      var imgObj = variant.featured_image;
      var new_img = imgObj.id;
      new_img = ".id_" + new_img;
      var index = $product_img.find(new_img).attr("data-index");
      if (!cn(index)) {
        index = parseInt(index) - 1;
        simply.product_page_slider.goToSlide(index);
      }
    }
    for (var i = 0, length = variant.options.length; i < length; i++) {
      var option = variant.options[i];
      var swatch = $('.swatch-element[data-value="' + option + '"]', parent);
      simply.productSwatchesChange(swatch, false);
    }

    var chat_href = $(".store_locator .prescription-logo").attr("data-href");
    var data_url = $(".store_locator .prescription-logo").attr("data-url");
    var vid = variant.id;
    data_url = data_url + "?variant=" + vid;

    chat_href = chat_href + encodeURIComponent(data_url);
    $(".store_locator .prescription-logo").attr("href", chat_href);

    // Select a valid variant if available 
    if (variant.available) {


      if (!cn(variant.inventory_management)) {
        $inventory.html(
          variant.inventory_quantity + " " + translations.inStock);
      }

      // Available, enable the submit button, change text, show quantity elements
      $addToCart.removeClass("disabled").prop("disabled", false);
      //$addToCartText.html(translations.addToCart +'<span class="original">'+$addToCart.find('.orignal').text()+'</span>');
      $quantityElements.show();
      $quantityElements.attr("disabled", false);
      jQuery('#out-of-stock-panel').addClass('hide');
    } else {


      // Sold out, disable the submit button, change text, hide quantity elements
      $addToCart.addClass("disabled").prop("disabled", true);
      $addToCartText.html(translations.soldOut);
      $quantityElements.attr("disabled", true);
      jQuery('#out-of-stock-panel').removeClass('hide');
      if (!cn(variant.inventory_management)) {
        $inventory.html("");
      }
      if ($(".soldout_product").length == 0) {
        $("#product_card  .swatch-element:first").click();
      }
    }
    $productPrice.html(
      Shopify.formatMoney(variant.price, moneyFormat).replace(/((\,00)|(\.00))$/g, ""))
    .show();
    // Also update and show the product's compare price if necessary
    if (variant.compare_at_price > variant.price) {
      $comparePrice.html(
        Shopify.formatMoney(variant.compare_at_price, moneyFormat).replace(/((\,00)|(\.00))$/g, ""));
      $priceWrapper.show();
      $productPrice.addClass("on-sale");
      $comparePrice.appendTo($productPrice);
    } else {
      $priceWrapper.hide();
      $productPrice.removeClass("on-sale");
    }
  } else {
    $addToCart.addClass("disabled").prop("disabled", true);
    $addToCartText.html(translations.unavailable);
    $quantityElements.attr("disabled", true);
    $("#iStock-wrapper").addClass("show");
  }
  if (!cn(simply.variant_src)) {
    if (simply.variant_src[simply.variant_handle]) {
      var ul = $("#ProductImages");

      var loading = $(".image_block_loading .loading");
      var parent = ul.closest(".images");
      var ul_height = parent.outerHeight();
      loading.show();

      var varaint_array = [];
      varaint_array = simply.variant_src[simply.variant_handle].split(",");
      if (!cn(simply.product_page_slider)) {
        simply.product_page_slider.destroy();
        simply.product_page_slider = null;
      }
      ul.html("");
      ul.addClass("overflow_hidden");
      parent.css({
        height: ul_height,
        opacity: "0"
      });
      for (var i = 0; i < varaint_array.length; i++) {
        var img = varaint_array[i];
        var img_xs = simply.imgURL(img, "large");
        var img_small = simply.imgURL(img, "small");
        var img_blur = simply.imgURL(img, "100x");
        if (i == 0) {
          $(".side_option img").attr("src", img_xs);
        }

        if (i == 2) {
          if (simply.current_width > 767) {
            $(".second_image").css({
              "background-repeat": "no-repeat, repeat",
              "background-image": "url(" + varaint_array[i] + ")",
              "background-size": "100%",
              "background-position": "-160px -4px"
            });
          } else {
            $(".second_image").css({
              "background-repeat": "no-repeat, repeat",
              "background-image": "url(" + varaint_array[i] + ")",
              "background-size": "150%",
              "min-height": "250px",
              "background-position": "-185px -31px"
            });
          }
        }
        var variant_src_image = simply.srcsetMake(img);
        variant_src_image.addClass("product_image");
        var li = $("<li data-index='" + (i + 1) + "' data-thumb='" + img_small + "'>");
        var img_div = $("<div class='img zoom'>");
        img_div.append(variant_src_image);
        li.append(img_div);
        ul.append(li);
        if (i == varaint_array.length - 1) {
          var image = new Image();
          image.onload = function() {
            loading.hide();
            simply.initProductSlider();
            simply.imgBlur();
            parent.animate({
              opacity: 1
            }, "slow");
          };
          image.src = img_blur;
        }
      }
    }
  }

  var color_name = $(".swatch-element.active.color").attr("data-value");
  $(".select_swatch_name").text(color_name);
  $(".select_swatch_name_title").text(variant.option1);
  var sku = $(".swatch-element.active.color").attr("data-sku");
  $(".product_id").text(variant.sku);
  $("#product_page").attr("data-color", color_name);
  var gender = $("#product_page").attr("data-gender");
  var coll = $("#product_page").attr("data-collection");
  var color = $("#product_page").attr("data-color");
  var type = $("#product_page").attr("data-type");
  var shape = $("#product_page").attr("data-shape");
  var model_title = gender + "-" + coll + "-" + shape + "-" + color + "-" + type;
  var product_title = coll + "-" + shape + "-" + color + "-" + type;
  $(".product_banner_div img").attr("title", model_title);
  $("#product_card .image_block img").attr("title", product_title);
  $(".product_banner_div img").attr("alt", model_title);
  $("#product_card .image_block img").attr("alt", product_title);
  simply.productPriceSize();
};
simply.customerAddressForm = function() {
  var $newAddressForm = $("#AddressNewForm");

  if (!$newAddressForm.length) {
    return;
  }

  // Initialize observers on address selectors, defined in shopify_common.js
  new Shopify.CountryProvinceSelector("AddressCountryNew", "AddressProvinceNew", {
    hideElement: "AddressProvinceContainerNew"
  });

  // Initialize each edit form's country/province selector
  $(".address-country-option").each(function() {
    var formId = $(this).data("form-id");
    var countrySelector = "AddressCountry_" + formId;
    var provinceSelector = "AddressProvince_" + formId;
    var containerSelector = "AddressProvinceContainer_" + formId;

    new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
      hideElement: containerSelector
    });
  });

  // Toggle new/edit address forms
  $(".address-new-toggle").on("click", function() {
    $newAddressForm.toggleClass("hide");
  });

  $(".address-edit-toggle").on("click", function() {
    var status = $(this).attr("data-toggle");

    var editFormSelector = $("#address_page .edit_form");
    var formId = $(this).data("form-id");
    if (status == "0") {
      var data = $("#EditAddress_" + formId).html();
      editFormSelector.html("");
      editFormSelector.html(data);
      $(".address-edit-toggle").attr("data-toggle", "0");
      $(this).attr("data-toggle", "1");
    } else {
      editFormSelector.html("");
      $(this).attr("data-toggle", "0");
    }
  });
  $(document).on("click", "#address_page .cancel_btn", function() {
    var parent = $(this)
    .parent()
    .parent();
    $(".address-edit-toggle[data-toggle='1']").click();
  });
  $(".address-delete").on("click", function() {
    var $el = $(this);
    var formId = $el.data("form-id");
    var confirmMessage = $el.data("confirm-message");
    if (
      confirm(confirmMessage || "Are you sure you wish to delete this address?")) {
      Shopify.postLink("/account/addresses/" + formId, {
        parameters: {
          _method: "delete"
        }
      });
    }
  });
};
simply.productPriceSize = function() {

};
simply.checkUrlHash = function() {
  var hash = simply.getHash();

  // Allow deep linking to recover password form
  if (hash == "#recover") {
    simply.toggleRecoverPasswordForm();
  }
};
simply.toggleRecoverPasswordForm = function() {
  $("#RecoverPasswordForm").toggleClass("hide");
  $("#CustomerLoginForm").toggleClass("hide");
};
simply.getHash = function() {
  return window.location.hash;
};
simply.handleize = function(str) {
  return str.toLowerCase()
  .replace(/[^\w\u00C0-\u024f]+/g, "-")
  .replace(/^-+|-+$/g, "");
};
simply.resetPassword = function() {
  if ($("#login_page").length > 0) {
    if ($(".reset-password-success").length > 0) {
      $("#ResetSuccess").removeClass("hide");
    }
  }
};

simply.getCookie = function(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
simply.setCookie = function(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

simply.welcomePopup = function() {
  if ($("#welcome_popup").length > 0) {
    var user = simply.getCookie("subscriber");
    if (cn(user)) {
      setTimeout(function() {
        $.fancybox.open([{
          href: "#welcome_popup",
          padding: 0,
          helpers: {
            overlay: {
              closeClick: true,
              locked: true
            }
          },
          afterClose: function() {
            simply.setCookie("subscriber", "user",
                             simply.welcomeCookieExpire);
          }
        }]);
      }, 60000);
      simply.imgBlur();
    }
  }
};
simply.collectionTopbar = function(bt) {
  var topbar = $("#collection_page .collection_top");
  var wt = $(window).scrollTop(); //wt = window top
  var top_postion = 0;
  if ($(".main_header.fixed").length > 0) {
    var header = $(".main_header.fixed").outerHeight();
    wt = parseInt(wt) + parseInt(header);
    top_postion = header;
  }
  if (wt > bt) {
    topbar.addClass("fixed");
    topbar.css("top", top_postion);
    if (topbar.find(".container").length == 0) {
      topbar.find(".table_view_xs").wrap("<div class='container'></div>");
    }
  } else {
    topbar.removeClass("fixed");
    if (topbar.find(".container").length > 0) {
      topbar.find(".table_view_xs").unwrap();
    }
  }
};
simply.productSelectHide = function() {
  if ($("#product_card .swatches").length > 0) {
    $("#product_card .swatches .swatch").each(function(index, item) {
      var target = $(item).attr("data-option-index");
      target = parseInt(target) + 1;
      target = "option" + target;
      $(".single-option-selector[data-option='" + target + "']")
      .parent()
      .addClass("hide");
    });
  }
};
simply.productSwatchesChange = function(selector, trigger) {
  selector.siblings().removeClass("active");
  selector.addClass("active");
  if (trigger) {
    var target = selector.attr("data-value");
    var parent = selector.parent();
    var product = parent.attr("data-id");
    var oi = parent.attr("data-option-index");
    oi = parseInt(oi) + 1;
    oi = "option" + oi;
    var select = $("." + product).find(".single-option-selector[data-option='" + oi + "']");
    select.val(target).trigger("change");
    selector.closest('#product_page').attr("data-color", target);
  }
};
simply.collectionSwatchesChange = function(selector) {
  var parent_id = selector.parent().attr("data-id");
  var parent = $(selector).closest(".product_main");
  var loading = parent.siblings(".loading");
  var current_img = parent.find(".product_img");
  var new_img = selector.find("label").attr("data-img");
  // change src of img 
  var product_name = selector.attr("product-title");
  var variant_name = selector.attr('data-tip');
  var variant_id = selector.find("label").attr("data-vid");
  var prod_src = selector.closest(".product_main").find(".image .product_link");
  var href = prod_src.attr("data-href");
  href = href.split("?");
  //   href.remove("?variant");
  var src = href[0] + "?variant=" + variant_id;
  var alt_src = selector.find("label").attr("data-switch-img");
  prod_src.attr("href", src);
  prod_src.find(".alter_img").attr("src", alt_src);
  var final_product = product_name + " - " + variant_name;
  var prod_title = selector.closest(".text").find(".product_link");
  prod_title.attr("href", src);
  var prod_variant = prod_title.find("span");
  prod_variant.text(final_product);
  // end

  selector.siblings().removeClass("active");
  selector.addClass("active");
  if (!cn(new_img)) {
    parent.addClass("disabled");
    loading.show();
    var image = new Image();
    image.onload = function() {
      current_img.removeAttr("srcset");
      current_img.removeAttr("data-srcset");
      current_img.attr("src", new_img);
      loading.hide();
      parent.removeClass("disabled");
      simply.miniHeight(simply.product_img_parent, simply.product_img_child);
    };

    image.src = new_img;
  }
};
simply.productSwatchesInit = function(parent) {
  if ($("#product_card .swatches").length > 0) {
    parent.find(".single-option-selector").each(function(index, item) {
      var value = $(item).val();
      var target = $(item).attr("data-option");
      target = target.replace("option", "");
      target = parseInt(target) - 1;
      var select = parent.find(".swatch[data-option-index='" + target + "']");
      select.find(".swatch-element[data-value='" + value + "']")
      .addClass("active");
      var color_name = $(".swatch-element.active.color").attr("data-value");
      var color_name_img = $(".swatch-element.active.color").attr("data-value");
      $(".select_swatch_name").text(color_name);
      $(".select_swatch_name_title").text(color_name_img);
      var sku = $(".swatch-element.active.color").attr("data-sku");
      $(".product_id").text(sku);
    });
    parent.find(".swatches").each(function() {
      if ($(this).find(".swatch-element").length < 2) {
        //         $(this).hide();
      }
    });
    //     simply.linkOptionSelectors(simply.productJson);
  }
};
simply.productoptionsMap = {};
simply.updateOptionsInSelector = function(selectorIndex, product_id) {
  var parent = $(".card_" + product_id);
  var optionsMap = simply.productoptionsMap[product_id];
  switch (selectorIndex) {
    case 0:
      var key = "root";
      var selector = $(".single-option-selector:eq(0)", parent);
      break;
    case 1:
      var key = $(".single-option-selector:eq(0)", parent).val();
      var selector = $(".single-option-selector:eq(1)", parent);
      break;
    case 2:
      var key = $(".single-option-selector:eq(0)", parent).val();
      key += " / " + $(".single-option-selector:eq(1)", parent).val();
      var selector = $(".single-option-selector:eq(2)", parent);
  }

  var initialValue = selector.val();
  selector.empty();
  var availableOptions = optionsMap[key];
  if (!cn(availableOptions)) {
    for (var i = 0; i < availableOptions.length; i++) {
      var option = availableOptions[i];
      var newOption = jQuery("<option></option>")
      .val(option)
      .html(option);
      selector.append(newOption);
    }
    $('.swatch[data-option-index="' + selectorIndex + '"] .swatch-element',
      parent).each(function() {
      if (jQuery.inArray($(this).attr("data-value"), availableOptions) !== -1) {
        $(this)
        .removeClass("soldout")
        .find(":radio")
        .removeAttr("disabled", "disabled")
        .removeAttr("checked");
      } else {
        $(this)
        .addClass("soldout")
        .find(":radio")
        .removeAttr("checked")
        .attr("disabled", "disabled");
      }
    });
    if ($.inArray(initialValue, availableOptions) !== -1) {
      selector.val(initialValue);
    }
    selector.trigger("change");
  }
};

simply.linkOptionSelectors = function(product) {
  var product_id = product.id;
  var parent = $(".card_" + product_id);
  // Building our mapping object.
  var optionsMap = {};
  simply.productoptionsMap[product_id] = optionsMap;
  for (var i = 0; i < product.variants.length; i++) {
    var variant = product.variants[i];
    if (variant.available) {
      // Gathering values for the 1st drop-down.
      optionsMap["root"] = optionsMap["root"] || [];
      optionsMap["root"].push(variant.option1);
      optionsMap["root"] = Shopify.uniq(optionsMap["root"]);
      // Gathering values for the 2nd drop-down.
      if (product.options.length > 1) {
        var key = variant.option1;
        optionsMap[key] = optionsMap[key] || [];
        optionsMap[key].push(variant.option2);
        optionsMap[key] = Shopify.uniq(optionsMap[key]);
      }
      // Gathering values for the 3rd drop-down.
      if (product.options.length === 3) {
        var key = variant.option1 + " / " + window["variant" + product_id].option2;
        optionsMap[key] = optionsMap[key] || [];
        optionsMap[key].push(variant.option3);
        optionsMap[key] = Shopify.uniq(optionsMap[key]);
      }
    }
  }
  // Update options right away.
  simply.updateOptionsInSelector(0, product_id);
  if (product.options.length > 1) simply.updateOptionsInSelector(1, product_id);
  if (product.options.length === 3) simply.updateOptionsInSelector(2, product_id);
  // When there is an update in the first dropdown.
  parent.find(".single-option-selector:eq(0)").change(function() {
    simply.updateOptionsInSelector(1, product_id);
    if (product.options.length === 3) simply.updateOptionsInSelector(2, product_id);
    return true;
  });
  // When there is an update in the second dropdown.
  parent.find(".single-option-selector:eq(1)").change(function() {
    if (product.options.length === 3) simply.updateOptionsInSelector(2, product_id);
    return true;
  });
};
simply.generateUniqueId = function() {
  return ("b_" + new Date().valueOf() + Math.random()
          .toFixed(16)
          .substring(2));
};

simply.sliderCallback = function(parent) {
  $(parent + " .v_hide").removeClass("v_hide");
};

simply.imageRotate = function(r_image) {
  var div = $(".rotate_img");
  var pw = $(".degree_section").width(); //parent width
  var loading = $(".rotate_loading .loading");
  var div_height = div.height();
  var src;
  if (cn(r_image)) {
    src = $("img", div).attr("src");
  } else {
    src = r_image;
  }
  div.html("");
  div.css({
    "min-height": div_height,
    opacity: "0"
  });
  loading.show();
  var image = $("<img class='large_img' src='" + src + "'>");
   var wrap_div = $("<div class='img main_rotate_img relative overflow_hidden'>");
  //var wrap_div = $("<div class='img main_rotate_img relative overflow_hidden'><div class='rotate_180_swipe'><span class='left-arr'>&#10229;</span> Swipe for 180 view <span class='right-arr'>&#10230;</span></div>");
  wrap_div.append(image);
  $(".rotate_img").append(wrap_div);
  $(".large_img", div).css("left", 0);
  pw = parseInt(pw);
  var div_width = pw / 7;
  div_width = div_width - 1;
  var img = new Image();
  img.onload = function() {
    var width = pw * 7;
    div.find("img").css("width", width);
    loading.hide();
    div.css("min-height", "auto");
    div.animate({
      opacity: 1
    }, "slow");
    var height = $(".rotate_img img").height();
    $(".main_rotate_img", div).css("height", height);
    if ($(".rotate_child").length == 0) {
      for (var i = 0; i < 7; i++) {
        var element = $("<div class='rotate_child' data-index=" + i + ">");
        $(".img", div).append(element);
      }
    }
    $(".rotate_child", div)
    .css("width", div_width)
    .css("height", height);
  };
  if (!cn(src)) {
    img.src = src;
  }
};
simply.normalRotate = function(n_image) {
  var div = $(".normal_rotate_img");
  var loading = $(".rotate_loading .loading");
  loading.show();
  if ($("img", div).length > 0) {
    $("img", div).css("opacity", "0.7");
  }
  var main_image = $("<img src='" + n_image + "' class='img_blur'>");
  var image = new Image();
  image.onload = function() {
    div.html("");
    div.append(main_image);
    $("img", div).css("opacity", "1");
    loading.hide();
  };
  image.src = n_image;
};
simply.tabs = function() {
  var loadScript = function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";

    // If the browser is Internet Explorer.
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
      // For any other browser.
    } else {
      script.onload = function() {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  var myAppJavaScript = function($) {
    var sptabboxwidth;
    $(document).ready(function() {
      function switchbasedonwidth() {
        var sptabbox = $(".spt-box");
        var sptboxcontainer = $(".spt-box-container");
        var sptabs = $("ul.spt-tabs li");
        var spaccord = $(".spt-accordian");
        var format = sptabbox.attr("data-format");
        if (format == "TAB") {
          var w = 0;
          sptabs.each(function() {
            w = w + $(this).outerWidth();
          });
          if (w >= sptabboxwidth) {
            sptabboxwidth = w;
          }
          var sptabs = sptabbox.width();
          var sptboxcontainerwidth = sptboxcontainer.width();
          if (sptabboxwidth > sptabs && sptboxcontainerwidth < sptabboxwidth) {
            sptabbox.hide();
            spaccord.show();
          } else {
            sptabbox.show();
            spaccord.hide();
          }
        }
      }
      sptabboxwidth = $(".spt-box").width();
      $(window).resize(function(e) {
        e.preventDefault();
      });
      $(".spt-accordian>li>h5").click(function() {
        alert();
        $(this).toggleClass("expanded");
        $(this).next().slideToggle();
      });
      $("ul.spt-tabs").each(function() {
        var active,
            content,
            links = $(this).find("a");
        active = links.first().addClass("active");
        content = $(active.attr("href"));
        links.not(":first").each(function() {
          $($(this).attr("href")).hide();
        });
        $(this)
        .find("a")
        .click(function(e) {
          active.removeClass("active");
          content.hide();
          active = $(this);
          content = $($(this).attr("href"));
          active.addClass("active");
          content.show();
          return false;
        });
      });
    });
  };
  if (typeof jQuery === "undefined" || parseFloat(jQuery.fn.jquery) < 1.7) {
    loadScript("//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js",

               function() {
      jQuery1111 = jQuery.noConflict(true);
      myAppJavaScript(jQuery1111);
    });
  } else {
    myAppJavaScript(jQuery);
  }
};
simply.openMobileMenu = function() {
  $("#mobile_drawer").addClass("active");
  $(".body_wrapper").addClass("active-left active");
  simply.blankBgOpen();
};
simply.closeMobileMenu = function() {
  $("#mobile_drawer").removeClass("active");
  $(".body_wrapper").removeClass("active-left active");
  simply.blankBgClose();
};
simply.toggleButton = function(selector, fun1, fun2) {
  selector.toggleClass("on");
  $("span", selector).toggleClass("color");
  if (selector.hasClass("on")) {
    fun2();
  } else {
    fun1();
  }
};
simply.collectionToggleOne = function() {
  var url = $(".flat_one_anchor").attr("data-url");
  window.location.href = url;
};
simply.collectionToggleTwo = function() {
  var url = $(".flat_two_anchor").attr("data-url");
  window.location.href = url;
};
simply.toggleOnPageLoad = function() {
  var url = simply.queryString("switch_toggle").switch_toggle;
  if (url == "true") {
    $(".flat-toggle").toggleClass("on");
    $(".flat-toggle span").toggleClass("color");
  }
};
$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 400) {
         $(".home_shopforwomen .btn").addClass("sticyr");
      $(".home_shopformen .btn").addClass("sticyl");
      //pp addtocar btn
      $(".product_form #AddToCart").addClass("addtocartsticky");
    } else {
        $(".home_shopforwomen .btn").removeClass("sticyr");
      $(".home_shopformen .btn").removeClass("sticyl");
      $(".product_form #AddToCart").removeClass("addtocartsticky");
    }
});

simply.stickyFilter = function(bt) {
  var topbar = $("#collection_page .filter_menu");
  var clone = $("#collection_page .filter_clone");
  if ($(window).width() < 768) {
    topbar = $("#collection_page .xs-show.mob-filter");
    clone = $("#collection_page .mob-filter-clone");
  }
  var th = topbar.outerHeight(); //collection topbar height
  bt = parseInt(th) + bt;
  var wt = $(window).scrollTop(); //wt = window top

  if ($(window).width() < 1211 && $(window).width() > 767)
  {
    var top_postion = 0;
  }
  else
  {
    var top_postion = 0;
  }
  var show_filter = parseInt(bt) + 20;
  if (wt > bt) {
    clone.css("height", th);
    topbar.addClass("fixed");
    if ($(window).width() < 992){
    $('#bte_size_mob').css('display','block');
  }
    //counting products on scroll
    var countdiv = $("<div class='collection_float_count'></div>");
    countdiv.html($(".collection_total_count:first").text());
    $('body').append(countdiv);
  } else {
    clone.css("height", 0);
    topbar.removeClass("fixed");
    if ($(window).width() < 992){
    $('#bte_size_mob').css('display','none');
  }
    $(".collection_float_count").css("display", "none");
  }
  if (wt > show_filter) {
    topbar.css("top", top_postion);

    if ($(window).width() < 1211 && $(window).width() > 767)
    {
      $(".formytwobutton-col").addClass("buttonpolarfix");
    }
    if ($(window).width() < 768) {
      topbar.css("top", 35); 
      $(".filter_menu").addClass("filter_menufix");   
      $(".polarbutton-con2").addClass("mobilepolarfix");  
      $(".collection_count").addClass("topcounter"); 
      $(".findyourfit").css("display","block"); 
      $(".wlsticky").css("display","block");     
    }  
    else 
    {
      topbar.css("top", top_postion);       
    }
  } 
  else {
    topbar.css("top", "-100%");
    if ($(window).width() < 1211 && $(window).width() > 767)
    {
      $(".formytwobutton-col").removeClass("buttonpolarfix");
    }
    if ($(window).width() < 768) {
      $(".filter_menu").removeClass("filter_menufix");   
      $(".polarbutton-con2").removeClass("mobilepolarfix");   
      $(".collection_count").removeClass("topcounter"); 
      $(".findyourfit").css("display","none"); 
      $(".wlsticky").css("display","none");      
    }
  }
};
simply.cartMasterChild = function(selector) {
  var master = $(selector).attr("data-item");
  master = ".item_" + master;
  master = $(master);
  var child = $(".timeStamp", master).attr("data-time");
  child = $(".child.timeStamp[data-time='" + child + "']").attr("data-item");
  child = ".item_" + child;
  child = $(child);
  var obj = {};
  obj.master = master;
  obj.child = child;
  return obj;
};
simply.clearCartLens = function() {
  var update_cart = false;
  $(".child.items").each(function(index, item) {
    var bundle = $(this).attr("data-bundle");
    var length = $(".item_" + bundle).length;
    var master = $(".master.item_" + bundle);
    if (length != 2) {
      var parent = $(this).closest(".items");
      $(".qty_input", parent).val(0);
      $(".qty_input", master).val(0);
      update_cart = true;
    }
  });
  if (update_cart) {
    $(".cart_update_btn").click();
  }
};
simply.cartScript = function() {
  simply.discountCalc(simply.getCookie("discountcode"));
  $(".fake_qty").change(function(event) {
    var target = $(this).attr("data-target");
    target = $("#" + target);
    target.val($(this).val());
  });
  simply.clearCartLens();
  
  $(".remove_bundle").click(function() {
    var master = $(this).closest(".items");
    var bundle = master.attr("data-bundle");
    var child = $(".child.item_" + bundle);
    $(".qty input", master).val(0);
    $(".qty input", child).val(0);
    $(".cart_update_btn").click();
    jQuery(".cart-loader-action").removeClass("hide");
  });
  $(".bundle_qty").change(function() {
    var master = $(this).closest(".items");
    var bundle = master.attr("data-bundle");
    var child = $(".child.item_" + bundle);
    var value = $(".qty_input", master).val();
    $(".qty_input", child).val(value);
  });
  switchcurrency();
};

simply.lensRemove = function() {
  $.get("/cart?view=js", function(data) {
    var data = $(data);
    var vid = $(".deleting").attr("data-line");
    var bundle = $(".deleting").attr("data-bundle");
    var href = $(".child.item_" + bundle + "[data-line='" + vid + "'] .remove_bundle",
                 data).attr("href");
    if (cn(href)) {
      window.location.href = "/cart";
    } else {
      window.location.href = href;
    }
  });
};
//$(".cart_extra_product .lens_input").click(function(event) {});
simply.lensPrice = function() {
  $(".items.child").each(function(index, el) {
    var price = $(this).attr("data-price");
    var name = $(this).attr("data-name");
    var target = $(this).attr("data-bundle");
    target = $(".master.item_" + target);
    var item_total = $(".item_total", target);
    // var prepaid = 250;
    var item_total_price = parseInt(item_total.attr("data-price")) + parseInt(price);
    if (!cn(name)) {
      $(".lens_name", target).html(name);
    }
    $(".lens_price", target).html(Shopify.formatMoney(price, simply.moneyFormat));
    item_total.html(Shopify.formatMoney(item_total_price, simply.moneyFormat))
    .attr("data-price", item_total_price);
  });
  //switchcurrency();
};
simply.lensKnowmore = function() {
  $("#cart_page .know_more").click(function(event) {
    var parent = $(this).closest(".form-group");
    $.fancybox($(".popup", parent));
  });
};
simply.cartConfused = function() {
  $("#cart_page .confused,#product_page .confused").click(function(event) {
    var width = $(window).width();
    var width = width - width * 0.12;
    var child = $(this).closest(".items");
    var bundle = child.attr("data-bundle");
    var master = $(".master.item_" + bundle);
    var target = $("#extra_product");
    var target_items = target.closest(".items");
    child.each(function() {
      $.each(this.attributes, function() {
        // this.attributes is not a plain object, but an array
        // of attribute nodes, which contain both the name and value
        if (this.specified) {
          target_items.attr(this.name, this.value);
        }
      });
    });
    if ($(window).width() > 767) {
      target.width(width);
    } else {
      if (
        $(".lens_table .tbody_wrapper")
        .first()
        .find("h3 i.fa-plus").length > 0) {
        $(".lens_table .tbody_wrapper")
        .first()
        .find("h3")
        .click();
      }
      target.width("auto");
    }

    var zero_check = $(this).attr("data-zero");
    if (!cn(zero_check)) {
      $(".product_treat", target_items).hide();
    } else {
      $(".product_treat", target_items).show();
    }
    $.fancybox(target);
  });
};

simply.discountSubTotalCalc = function(sub_price) {
  var subtotal = $(".cart_subtotal_price");
  var tax = $(".cart_tax_price");
  var total = $(".cart_total_price");
  var tax_price = sub_price * 0;
  var total_price = sub_price + tax_price;
  //   subtotal.html(Shopify.formatMoney(sub_price, simply.moneyFormat));
  tax.html(Shopify.formatMoney(tax_price, simply.moneyFormat));
  total.html(Shopify.formatMoney(total_price, simply.moneyFormat));
};


simply.cartPageScript = function() {
  if ($("#cart_page").length > 0) {
    $("#cart_page .items.border")
    .not($("#cart_page .items.border:last"))
    .addClass("active");
    //simply.cartConfused();
    //simply.lensKnowmore();
    //simply.lensSelect();
    simply.lensPrice();
     //    simply.cartFakeDiscount();
    if ($("#cart_page").length > 0) {
      simply.cartScript();
    }
    //simply.leavingFormSubmit();
    console.log('cartPageScript');

  }
};
simply.imgURL = function(src, size) {
  // remove any current image size then add the new image size
  return src.replace(/_(pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master)+\./g, ".")
  .replace(/\.jpg|\.png|\.gif|\.jpeg/g, function(match) {
    return "_" + size + match;
  });
};
simply.srcsetMake = function(src) {
  var lazy_array = [300, 480, 765, 900, 1000];
  var srcset = "";
  var image = $("<img>");
  for (var l = 0; l < lazy_array.length; l++) {
    var i_size = lazy_array[l] + "x";
    var i_w = lazy_array[l] + "w";
    srcset = srcset + simply.imgURL(src, i_size) + " " + i_w + ",";
  }
  image.attr("data-src", simply.imgURL(src, "1024x"));
  image.attr("src", simply.imgURL(src, "100x"));
  image.attr("data-srcset", srcset).addClass("lazyload img_blur");
  return image;
};
simply.collectionListDesc = function() {
  var parent = "#collection_list .desc_wrap";
  var child = "#collection_list .desc";
  simply.miniHeight(parent, child);
};
simply.PrependSort = function(selector) {
  var parent = selector.parent();
  parent.prepend(selector);
};
simply.filterSorting = function() {
  var fArray = ["shape_clubmaster", "shape_aviator", "shape_cat-eye", "shape_round", "shape_rectangle", "shape_wayfarer"];

  for (var i = 0; i < fArray.length; i++) {
    simply.PrependSort(
      $('.advanced-filters li[data-handle="' + fArray[i] + '"]'));
  }
  var mArray = ["material_titanium", "material_stainless-steel", "material_italian-acetate", "material_tr90", "material_bull-horn"];
  mArray = mArray.reverse();
  for (var i = 0; i < mArray.length; i++) {
    simply.PrependSort(
      $('.advanced-filters li[data-handle="' + mArray[i] + '"]'));
  }
  var sArray = ["size_small", "size_medium", "size_large"];
  sArray = sArray.reverse();
  for (var i = 0; i < sArray.length; i++) {
    simply.PrependSort(
      $('.advanced-filters li[data-handle="' + sArray[i] + '"]'));
  }
};
simply.collectionScript = function() {
  if (cn($("#collection_page .collection ul .item:first").attr("data-item"))) {
    $("#collection_page .collection ul .item").each(function(index, el) {
      $(el).attr("data-item", index + 1);
    });
  }
  simply.productsCount = function() {
    var count_c = $(".collection ul").children().length;
    if(count_c == 0){ 
      $('.collection-loader .load_more').hide();
      $('#collection_page .noproduct').show();
    }
    $(".collection").attr("data-count", count_c);
    var collectionList = $(".collection ul.list li");
    $.each(collectionList, function(index, itemCount) {
      index = index + 1;
      $(itemCount).attr({
        "data-product-count": index
      });
    });
    collectionItemCount(collectionList);
  };
  simply.productsCount();
  simply.collectionMobileBanner = function() {
    var w = $(window).width();
    if (w < 768) {
      var call = $(".collection_call_form:first");
      var no;
      $(".collection_extra_content").each(function(index, item) {
        var banner = $(this);
        var no = (index + 1) * 5;
        if (index == 1) {
          var target2 = $("#collection_page .collection ul .item[data-item='" + no + "']:first");
          call.insertAfter(target2);
          call.show();
          no = no + 5;
          var target2 = $("#collection_page .collection ul .item[data-item='" + no + "']:first");
          banner.insertAfter(target2);
          banner.show();
        }

        var target = $("#collection_page .collection ul .item[data-item='" + no + "']:first");
        banner.insertAfter(target);
        banner.show();
        if ($(".collection_extra_content").length == 1) {
          no = (index + 2) * 5;
          var target2 = $("#collection_page .collection ul .item[data-item='" + no + "']:first");
          call.insertAfter(target2);
          call.show();
          no = no + 5;
          var target2 = $("#collection_page .collection ul .item[data-item='" + no + "']:first");
          var call_clone = call.clone();
          call_clone.insertAfter(target2);
          call_clone.show();

        }
      });
      simply.missCallClone();
    }
  };
  simply.missCallClone = function() {
    var call = $(".collection_call_form:first");
    var limit = $("#collection_page .collection ul .item").length;
    for (var i = 10; i < limit; i += 10) {
      var target2 = $("#collection_page .collection ul .item[data-item='" + i + "']:first");
      var call_clone = call.clone();
      call_clone.insertAfter(target2);
      call_clone.show();
    }
  };
  if (document.location.href.indexOf("gold-collection") == -1) {
    simply.collectionMobileBanner();
  }
  var count = 0;
  var on_work = false;

  function loadMoreItem() {
    if ($(".variant_separate").length > 0) {
      var variant_separate = true;
    } else {
      var variant_separate = false;
    }
    if (!on_work) {
      on_work = true;
      var nexturl = $("#loadmore").attr("data-next");
      if (variant_separate) {
        nexturl = nexturl + "&variant=" + simply.paginationCurrent;
      }
      $.get(nexturl, function(data) {
        var collection_item = $(data).find(".collection ul.list li").not(".no_product");
        $.each(collection_item, function(index, item) {
          index = index + 1;
          
          $(".collection ul.list").append(item);
          if(index % 9 == 0){
            $(".collection ul.list").append('<div class="hb">jvjh</div>');
          }
          var currentSkuId = $(item).attr("data-sku");
          //console.log(currentSkuId); // calling after each load
          
          if (simply.current_width < 768) {
            if (index % 10 == 0) {
              $(".collection ul.list").append(
                $(".collection_call_form:first").clone());
            }
          }
        });
        fillwishlist(); //yotpo.initWidgets(); // calling functions after all loaded 
        // $('.collection ul.list').append(collection_item);
        switchcurrency();
        simply.productsCount();
        // simply.collTopScroll();
        var loadmore = $(data).find("#loadmore");
        if (loadmore.length == 0) {
          if (variant_separate) {
            $("#loadmore").remove();
          } else {
            $("#loadmore").remove();
          }
          console.log('end');
          $('#shopify-section-footer').show();
        }
        if (loadmore.length > 0) {
          $("#loadmore").attr("data-next", loadmore.attr("data-next"));
          $(".collection_desc").show();
        }
        on_work = false;
        count++;
         simply.try3d = simply.getCookie('try3d');
	if(!cn(simply.try3d)){
      simply.showCollectionWithDitto();
    }        
      }); 
    }
  }
  $(window).scroll(function() {
    if ($("#loadmore").length > 0) {
      var target = $("#loadmore").offset().top;
      target = target - 300;
      var wo = $(window).scrollTop() + $(window).height();
      if (wo > target) {
        loadMoreItem();
        $('#shopify-section-footer').hide();
      }
    }
  });
};

simply.init = function() {
  simply.initMobileMenu();
  //   simply.imgBlur();
  simply.clickEvent();
  simply.hoverEvent();
  simply.submitEvent();
  simply.changeEvent();
  simply.topbarDiscount();
  simply.bannerVideoSection();
  if ($("#collection_list".length > 0)) {
    //     simply.collectionListDesc();
  }
  if ($("#product_page".length > 0)) {
    // $(".single_vision .desc_tagbased").append($(".desc_product.section_desc"));
    $(".lens_input").prop("checked", false);
    if ($("#product_page[data-type=EG]").length > 0) {
      $(".lens_input:first").prop("checked", true);
    }
    if ($("#product_page[data-type=SG]").length > 0) {
      $(".lens_input:first").prop("checked", true);
    }

    if ($("#product_page[data-type=KD]").length > 0) {
      $(".lens_input:first").prop("checked", true);
    }

    simply.productVariantInitialize();
    simply.cartConfused();
  }

  simply.customerAddressForm();
  simply.checkUrlHash();
  simply.resetPassword();
  simply.miniCartInit();
  simply.tabs();
  simply.sortByActive();
  if ($("#collection_page").length > 0) {
    simply.collectionScript();
    simply.fitlerOffset();
    simply.filterSorting();
  }
  simply.toggleOnPageLoad();
  simply.saveAdmitadUid();
  simply.productPriceSize();
  simply.cartPageScript();

};
simply.saveAdmitadUid = function() {
  //admitad_uid
  params = simply.queryString();
  admitad_uid = params["admitad_uid"];
  if (admitad_uid) {
    simply.setCookie("admitad_uid", admitad_uid, 30);
  }
  admitad_uid = params["aff"];
  if (admitad_uid) {
    simply.setCookie("aff", admitad_uid, 30);
  }
};
simply.cartFakeDiscountArray = function(array) {
  for (var i = 0; i < array.length; i++) {
    var singleItem = array[i];
    var price = parseInt($(".sub_price:first", singleItem).attr("data-price"));
    if (isNaN(price)) {
      price = parseInt($(".item_total", singleItem).attr("data-price"));
    }
    var zero_price = false;
    if (i % 2 != 0) {
      zero_price = true;
    }
    $(".item_total", singleItem).each(function(index, item) {
      var item_total = parseInt($(this).attr("data-price")) + price;
      if (zero_price) {
        item_total = parseInt($(this).attr("data-price")) - price;
      }
      $(item)
      .attr("data-price", item_total)
      .html(Shopify.formatMoney(item_total, simply.moneyFormat));
    });
    $(".sub_price", singleItem).each(function(index, item) {
      var new_price = price * 2;
      if (zero_price) {
        new_price = 0;
      }
      $(".price", $(item))
      .attr("data-price", new_price)
      .html(Shopify.formatMoney(new_price, simply.moneyFormat));
    });
  }
};
simply.cartFakeDiscount = function() {
  var eyeglassCollection = [];
  var sunglassCollection = [];
  var mixCollection = [];
  var tempArray = [];
  $("#cart_page .cart_main .items").each(function(index, item) {
    if (cn($(item).attr("data-nodiscount"))) {
      var product_item = $(item).attr("data-product-type");
      if (product_item == "Eyeglasses") {
        eyeglassCollection.push($(item));
      } else if (product_item == "Sunglasses") {
        sunglassCollection.push($(item));
      }
    }
  });
  if (eyeglassCollection.length % 2 != 0) {
    var tempArray = [];
    tempArray = eyeglassCollection.pop();
    mixCollection.push(tempArray);
  }
  if (sunglassCollection.length % 2 != 0) {
    var tempArray = [];
    tempArray = sunglassCollection.pop();
    mixCollection.push(tempArray);
  }
  if (mixCollection.length % 2 != 0) {
    mixCollection.pop();
  }
  if (eyeglassCollection.length > 0) {
    simply.cartFakeDiscountArray(eyeglassCollection);
  }
  if (sunglassCollection.length > 0) {
    simply.cartFakeDiscountArray(sunglassCollection);
  }
  if (mixCollection.length > 0) {
    simply.cartFakeDiscountArray(mixCollection);
  }
};
simply.topbarDiscount = function() {
  var disCookie = simply.getCookie("discountcode");
   $("#cart_page input.topbar_dis").attr("value", disCookie);
  if (!cn(disCookie)) {
    $("#cart_page input.topbar_dis").attr("value", disCookie);
  }
  
};
simply.load = function() {
  var disCookie = simply.getCookie("discountcode");
   $("#cart_page input.topbar_dis").attr("value", disCookie);
  if (!cn(disCookie)) {
    $("#cart_page input.topbar_dis").attr("value", disCookie);
  }
  var home_collection_parent = "#home_collections ul.list li .image";
  var home_collection_child = "#home_collections ul.list li .img a";
  var article_parent = "ul.article_list>li";
  var article_child = "ul.article_list>li .article";
  var locator_parent = "#store_locator_page ul.list li";
  var locator_child = "#store_locator_page ul.list li .content";
  simply.current_width = $(window).width();

  $("#product_card .selector-wrapper").css("opacity", "1");
  $(window).load(function() {
    //window load 
    // simply.popupTimeSpent();
    $(".spt-box-container").css("visibility", "visible");

    simply.miniHeight(simply.product_img_parent, simply.product_img_child);
    simply.miniHeight(home_collection_parent, home_collection_child);

    if (simply.current_width > 767) {
      simply.miniHeight(article_parent, article_child);
      simply.miniHeight(locator_parent, locator_child);
    } else {
      $(article_parent).css("height", "auto");
    }
  });
  $(window).resize(function() {
    //window resize
    if ($(window).width() == simply.current_width) {
      return;
    }
    simply.fitlerOffset();
    simply.current_width = $(window).width();
    if ($("#product_card .rotate_img").length > 0) {
      simply.imageRotate();
    }

    simply.miniHeight(simply.product_img_parent, simply.product_img_child);

    simply.miniHeight(home_collection_parent, home_collection_child);
    if (simply.current_width > 767) {
      simply.miniHeight(article_parent, article_child);
      simply.miniHeight(locator_parent, locator_child);
    } else {
      $(article_parent).css("height", "auto");
    }
    simply.initMenuAutoResize();
  });
};
simply.fitlerOffset = function() {
  if ($("#collection_page .filter_menu").length > 0) {
    simply.mobile_filter = $("#collection_page .filter_menu").offset().top;
  }
};
simply.scroll = function() {
  $(window).scroll(function() {
    if ($(".filter_menu").length > 0 && !cn(simply.mobile_filter)) {
      simply.stickyFilter(simply.mobile_filter);
    }
    if ($("#collection_page").length == 0) {
      simply.headerFix();
    }
  });
};

// locatortab
simply.locatortab = function() {
  $("ul.location_tab").each(function() {
    var active, active_li, content, links;
    links = $(this).find("a");
    active_li = links.parent().addClass("bg_active");
    active = links.first().addClass("active");
    content = $(active.attr("href"));
    content.show();
    links.not(":first").each(function() {
      $($(this).attr("href")).hide();
      $($(this).parent()).removeClass("bg_active");
    });
    $(this)
    .find("a")
    .click(function(e) {
      active.removeClass("active");
      links.parent().removeClass("bg_active");
      content.hide();
      active = $(this);
      content = $($(this).attr("href"));
      active.addClass("active"); 
      $(this)
      .parent()
      .addClass("bg_active");
      var city = $(this).attr("data-city");
      content.show();
      simply.initMap(simply.location_map_from, simply.jjCity[city]);
      return false;
    });
  });
};
simply.productPopup = function() {
  //simply.leavingFormSubmit();
  $("#product_leaving_popup .leaving_btn").click(function() {
    $(".leaving_form").slideDown();
  });
  $(document).mouseleave(function(e) {
    if (jQuery('#creation').hasClass('hide') && jQuery('#dittoSharing').css('display') == 'none') {
      var productCookie = simply.getCookie("product-cookie");
      if (
        e.clientY < 5 && cn(productCookie) && $("#product_leaving_popup").length > 0) {
        if ($(".fancybox-outer #product_leaving_popup").length == 0) {
          $.fancybox.open([{
            href: "#product_leaving_popup",
            padding: 0,
            helpers: {
              overlay: {
                closeClick: true,
                locked: true
              }
            },
            afterClose: function() {
              simply.setCookie("product-cookie", "true", 1);
            }
          }]);
        }
      }
    }
  });
};
simply.collectionSeoHeader = function() {
 
  var copyheader = $(".seo_header");
  $(".collection_header .main_h1").append(copyheader);
  var copycount = $(".collection_total");
  $(".collection_header .main_h1").append(copycount);
};
simply.headerFix = function() {
  var header = $("header.main_header");
  var height = header.outerHeight();
  var colne = $(".header_clone");
  var fix_height = parseInt(height) + 10;
  var active_height = parseInt(height) + 100;
  var wt = $(window).scrollTop();
  if (wt > fix_height) {
    header.addClass("fixed");
    colne.css("height", height);
  } else {
    header.removeClass("fixed");
    colne.css("height", 0);
  }
  //if (wt > active_height && wt < simply.lastScrollTop) {
  if (wt > active_height) {
    header.addClass("active");
  } else {
    //header.removeClass("active");
  }
  simply.lastScrollTop = wt;
};
$(document).ready(function() {

  // variables
  simply.lastScrollTop = 0;
  simply.lastScrollTopFilter = 0;
  simply.powerSlider = "";
  simply.variant_handle = "";
  simply.current_width = $(window).width();
  simply.sideCartCheck = $(".side_cart").length;
  simply.welcomeCookieExpire = $("#welcome_popup").attr("data-day");
  simply.product_img_parent = ".product_main .image";
  simply.product_img_child = ".product_main .image .img>.product_link";
  simply.mobile_filter = "";
  simply.currentDegreeImage = "male";
  //   end of variables
  simply.init();
  simply.load();
  //Ditto try on function
  
  jQuery(document).on('click', '.product_banner_thubnail', function() {
    jQuery('.product_banner_div').removeClass('hide');
    jQuery('.ditto_panel').addClass('hide');
    jQuery('.re_try_ditto').addClass('hide');
  });

  jQuery('#ditto-thumbnail').click(function() {
    jQuery('.ditto_panel').removeClass('hide');
    jQuery('.re_try_ditto').removeClass('hide');
    if (jQuery('.product_banner_div').length) {
      jQuery('.product_banner_div').addClass('hide');
    } else {
      jQuery('.without_modal').addClass('hide');
      jQuery('.with_ditto .fake_pagination').addClass('hide');
    }
  });
  if (simply.getCookie('dittoId') != "") {
    jQuery('.product_banner_thubnail').removeClass('hide');
  }
  if (typeof BKCustomer != "undefined" && BKCustomer.id && simply.getCookie('dittoId') == "" && simply.getCookie('guestDittoId') == "") {
    getDitto();
  }

  dittoEnable = false;
  if (typeof simply.productJson != "undefined") {
    $(simply.productJson.tags).each(function(i, value) {
      if (value == 'dittoEnable') {
        dittoEnable = true;
      }
    });
  }
  var currentSkuId = jQuery(".swatch-element.active").attr("data-sku");
  
  if (simply.getCookie('dittoId') != "" && dittoEnable) {
    createDitto(currentSkuId);
  }
 
  //Ditto try on function
  simply.scroll();
  simply.locatortab();
  // simply.welcomePopup();
  $(".fancybox").fancybox();
  simply.collectionSeoHeader();
  var collectionList = $(".collection ul.list li");
  var totalProducts = collectionList.length;
  collectionItemCount(collectionList);
});

$(".bifocal_input button").click(function(e) {
  e.preventDefault();
  var input = $(".bifocal_input input");
  if (input.val().length < 9) {
    $(".bifocal_error").removeClass("hide");
  } else {
    simply.ajaxForm($(this), simply.productCallFromCallback);
    $(".bifocal_error").addClass("hide");
  }
});

// create popup function
function createPopup(modalBox) {
  var appendthis = ('<div class="modal-overlay js-modal-close ' + modalBox + '"></div>');
  jQuery("body").append(appendthis);
  jQuery(".modal-overlay").show();
  jQuery('#' + modalBox).fadeIn();
  jQuery(".modal-box").css({
    left: (jQuery(window).width() - jQuery(".modal-box").outerWidth()) / 2
  });
  if (jQuery(window).width() < 1400) {
    var screenTop = jQuery(document).scrollTop();
    jQuery('.modal-box').css('top', screenTop);
  } else {
    jQuery(".modal-box").addClass('BigScreen').css({
      top: (jQuery(window).height() - jQuery(".modal-box").outerHeight()) / 2
    });
  }
}

function modalClose(id) {
  jQuery('#' + id).fadeOut(500);
  jQuery('.' + id).remove();
}

var viewHeight = $(window).height();

function collectionItemCount(collectionLists) {
  if (simply.current_width < 768) {
    var minus = $(window).scrollTop();
    for (i = 0; i < collectionLists.length; i++) {
      var collectionList = $(collectionLists[i]);
      var elemOffset = collectionList.offset().top - minus;
      if (elemOffset < (viewHeight - $(".collection ul.list li").height())) {
        var count = $(collectionList).data('productCount');
        $('.collection_item_count').text(count);
      }
    }
  }
}
$(document).on('scroll', function(e) {
  var collectionList = $(".collection ul.list li");
  collectionItemCount(collectionList);
});

simply.fake_pagination_dot = function(){
  var total_child = $('.product_img_sec .lightSlider > li').length;
  var dot_markup = '';
  for(var i=1; i<=total_child;i++){
    dot_markup += '<span class="dot_'+i+' dot"></span>'
  }
  console.log(dot_markup);
  $('.product_img_sec .fake_pagination').html('');
  $('.product_img_sec .fake_pagination').append(dot_markup)
  $('.product_img_sec .fake_pagination .dot:first').addClass('active');
}


function countDown() {
  if (countTimeLeft == 0) {
    clearTimeout(countdownId);
    jQuery('.otp_resend').removeClass('hide');
    jQuery('.resend_timer').addClass('hide');
  } else {
    jQuery('.resend_timer').html(countTimeLeft);
    countTimeLeft--;
  }
}
/*Select variant on the select off product page sidebar options */
$(document).ready(function(){ 

  simply.dittoId = simply.getCookie('d_id');


});

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isIE7=-1!==c.indexOf("MSIE 7."),b.isIE8=-1!==c.indexOf("MSIE 8."),b.isLowIE=b.isIE7||b.isIE8,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",b.ev=c.mainEl&&c.mainEl.length?c.mainEl.eq(0):d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.wrap.css(b.fixedContentPos?{overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}:{top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),b.currTemplate[d]=f?a(f):!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||2!==c.which&&!c.ctrlKey&&!c.metaKey){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(a,c){if(void 0===c||c===!1)return!0;if(e=a.split("_"),e.length>1){var d=b.find(p+"-"+e[0]);if(d.length>0){var f=e[1];"replaceWith"===f?d[0]!==c[0]&&d.replaceWith(c):"img"===f?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(p+"-"+a).html(c)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close" onClick="backoverflow()">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery",g=Boolean(a.fn.mfpFastClick);return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s),h=g?"mfpFastClick":"click";e[h](function(){b.prev()}),f[h](function(){b.next()}),b.isIE7&&(x("b",e[0],!1,!0),x("a",e[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowLeft&&g&&b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){v.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g,h=a(this);if(c){var i,j,k,l,m,n;h.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,v.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0],(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)&&(l=!0,d())}).on("touchend"+f,function(a){d(),l||n>1||(g=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){g=!1},b),e())})})}h.on("click"+f,function(){g||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&v.off("touchmove"+f+" touchend"+f)}}(),A()});

$(document).ready(function(){ 
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
        panel.style.marginTop = 0 + "px";
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.marginTop = 20 + "px";
      } 
    });
  }
});

 $(document).ready(function(){
   $('.size-chart-open-popup').magnificPopup({
     type:'inline',
     midClick: true
   });
   
   if ($(window).width() < 769) {
   $(".size-chart-open-popup").click(function(){ 
     $('body').css('overflow','hidden');
   });     
   }
     
   $('.power-indexpop').magnificPopup({
     type:'inline',
     midClick: true
   });
 });

 function backoverflow(){
        $('body').css('overflow','auto');     
    }
    
    
//   stickey header js  
    
    $(window).scroll(function(){
    if ($(window).scrollTop() >= 150) {
        $('.main_header').addClass('fixed');
    }
    else {
        $('.main_header').removeClass('fixed');
    }
});

$(window).scroll(function(){
    if ($(window).scrollTop() >= 170) {
        $('.main_header').addClass('active');
    }
    else {
        $('.main_header').removeClass('active');
    }
});