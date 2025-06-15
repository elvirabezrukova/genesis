$(document).ready(function () {
  $(".sidebar__head").click(function () {
    if ($(this).parent().hasClass("active")) {
      $(".sidebar__block").removeClass("active");
      $(".sidebar__drop").slideUp(250);
    } else {
      $(".sidebar__block").removeClass("active");
      $(".sidebar__drop").slideUp(250);
      $(this).parent().addClass("active");
      $(this).next().slideToggle(250);
    }
  });

  $(".header__burger").click(function () {
    $(".header__search-drop").removeClass("active");
    $(".header__burger a").toggleClass("active");
    $(".header__drop").toggleClass("active");
    $("body").toggleClass("fixed");
    return false;
  });

  $(".header__search-head").click(function () {
    $(".header__search-drop").toggleClass("active");
    $(".header__drop").removeClass("active");
    $(".header__burger a").removeClass("active");
    $("body").removeClass("fixed");
  });

  /* $(".sidebar__drop li a").on("click", function () {
    $("body").removeClass("fixed");
    $(".header__drop").removeClass("active");
    $(".header__burger a").removeClass("active");
    var $el = $(this),
      id = $el.attr("href");

    $("html, body").animate(
      {
        scrollTop: $(id).offset().top,
      },
      1000
    );

    return false;
  }); */

  $(".sidebar__drop li a").on("click", function () {
    $("body").removeClass("fixed");
    $(".header__drop").removeClass("active");
    $(".header__burger a").removeClass("active");

    let headerouterHeight = $(".header").height();

    if ($(window).width() > 1024) {
      headerouterHeight = 0;
    }

    var $el = $(this),
      id = $el.attr("href");

    $("html, body").animate(
      {
        scrollTop: $(id).offset().top - headerouterHeight,
      },
      1000
    );

    return false;
  });

  AOS.init();

  $(".sidebar__search input").on("input", function () {
    const searchTerm = $(this).val().trim().toLowerCase();
    const $content = $(".content");

    if (searchTerm.length < 3) return;

    let found = false;

    function searchInNode(node) {
      if (found) return;

      if (node.nodeType === 3) {
        const text = node.nodeValue;
        const index = text.toLowerCase().indexOf(searchTerm);
        if (index !== -1) {
          found = true;
          const range = document.createRange();
          range.setStart(node, index);
          range.setEnd(node, index + searchTerm.length);
          const rect = range.getBoundingClientRect();
          window.scrollTo({
            top: window.scrollY + rect.top - 100,
            behavior: "smooth",
          });
        }
      } else if (node.nodeType === 1 && node.childNodes) {
        $(node.childNodes).each(function () {
          searchInNode(this);
        });
      }
    }

    $content.each(function () {
      searchInNode(this);
    });
  });

  $(".header__search-btn").on("click", function (e) {
    e.preventDefault();

    const searchTerm = $(".header__search-input").val().trim().toLowerCase();
    const $content = $(".content");

    // Скрываем выпадающий поиск
    $(".header__search-drop").removeClass("active");

    if (searchTerm.length < 3) return;

    let found = false;

    function searchInNode(node) {
      if (found) return;

      if (node.nodeType === 3) {
        const text = node.nodeValue;
        const index = text.toLowerCase().indexOf(searchTerm);
        if (index !== -1) {
          found = true;
          const range = document.createRange();
          range.setStart(node, index);
          range.setEnd(node, index + searchTerm.length);
          const rect = range.getBoundingClientRect();
          window.scrollTo({
            top: window.scrollY + rect.top - 100,
            behavior: "smooth",
          });
        }
      } else if (node.nodeType === 1 && node.childNodes) {
        $(node.childNodes).each(function () {
          searchInNode(this);
        });
      }
    }

    $content.each(function () {
      searchInNode(this);
    });
  });
});
