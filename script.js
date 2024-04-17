$(document).ready(function () {
  // Function to display cookie consent message
  function displayCookieConsent() {
    // Create a div element for the message
    var cookieConsentDiv = $("<div>").addClass("cookie-consent");

    // Add message text
    var message =
      "This website uses cookies to ensure you get the best experience. By continuing to use this site, you accept our use of cookies.";

    // Create accept and deny buttons
    var acceptButton = $("<button>")
      .addClass("cookie-consent-accept")
      .text("Accept");
    var denyButton = $("<button>").addClass("cookie-consent-deny").text("Deny");

    // Append message and buttons to the div
    cookieConsentDiv.append(message, acceptButton, denyButton);

    // Append the div to the body
    $("body").append(cookieConsentDiv);

    // Event listener for accepting cookies
    $(".cookie-consent-accept").click(function () {
      // Set a cookie to indicate user acceptance
      setCookie("cookieConsent", "accepted", 365); // Expires in 365 days
      // Remove the consent message
      $(".cookie-consent").remove();
    });

    // Event listener for denying cookies
    $(".cookie-consent-deny").click(function () {
      // Remove the consent message
      $(".cookie-consent").remove();
    });
  }

  // Function to check if the user has already consented to cookies
  function checkCookieConsent() {
    var cookieConsent = getCookie("cookieConsent");
    if (!cookieConsent) {
      // If no consent cookie is found, display the consent message
      displayCookieConsent();
    }
  }

  // Check cookie consent when the document is ready
  checkCookieConsent();

  // Check if local storage is available
  if (typeof Storage !== "undefined") {
    // Retrieve stored data
    var userData = localStorage.getItem("userData");

    // Check if user data exists
    if (userData) {
      // Parse stored data and use it as needed
      userData = JSON.parse(userData);
      console.log("Retrieved user data:", userData);
      // Apply stored theme preference
      $("body").addClass(userData.preferences.theme);
    } else {
      // If no user data exists, initialize it
      var initialData = {
        username: "Guest",
        preferences: {
          theme: "light",
          fontSize: "medium",
        },
      };
      // Store initial data in local storage
      localStorage.setItem("userData", JSON.stringify(initialData));
      console.log("Initialized user data:", initialData);
    }
  } else {
    // Handle case where local storage is not available
    console.log("Local storage is not available.");
  }

  // Theme switcher functionality
  $(".theme-switch").click(function () {
    // Toggle between dark and light themes
    $("body").toggleClass("dark");

    // Update user preferences in local storage
    var newTheme = $("body").hasClass("dark") ? "dark" : "light";
    updateUserPreferences({ theme: newTheme });
  });

  // Cookie handling functions
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Adding a class on mouse enter in the board
  $(".board").hover(
    function () {
      $(this).addClass("selected").siblings();
    },
    function () {
      $(this).removeClass("selected");
    }
  );

  // Adding hover effect on pie charts
  $(".piechart").hover(
    function () {
      $(this).css("transform", "scale(1.05)");
    },
    function () {
      $(this).css("transform", "scale(1)");
    }
  );

  // Setting perspective for pie charts
  $(".piechart").css({
    perspective: "1000px",
    "perspective-origin": "center center",
  });

  // Function to detect active slide
  function detectActive() {
    // Get active slide
    var getActive = $("#dp-slider .dp_item:first-child").data("class");
    $("#dp-dots li").removeClass("active");
    $("#dp-dots li[data-class=" + getActive + "]").addClass("active");
  }

  // Next slide button functionality
  $("#dp-next").click(function () {
    $("#dp-slider .dp_item:first-child").hide().appendTo("#dp-slider").fadeIn();
    $.each($(".dp_item"), function (index, dp_item) {
      $(dp_item).attr("data-position", index + 1);
    });
    detectActive();
  });

  // Previous slide button functionality
  $("#dp-prev").click(function () {
    $("#dp-slider .dp_item:last-child").hide().prependTo("#dp-slider").fadeIn();
    $.each($(".dp_item"), function (index, dp_item) {
      $(dp_item).attr("data-position", index + 1);
    });
    detectActive();
  });

  // Dot navigation functionality
  $("#dp-dots li").click(function () {
    $("#dp-dots li").removeClass("active");
    $(this).addClass("active");
    var getSlide = $(this).attr("data-class");
    $("#dp-slider .dp_item[data-class=" + getSlide + "]")
      .hide()
      .prependTo("#dp-slider")
      .fadeIn();
    $.each($(".dp_item"), function (index, dp_item) {
      $(dp_item).attr("data-position", index + 1);
    });
  });

  // Slide item click functionality
  $("body").on("click", "#dp-slider .dp_item:not(:first-child)", function () {
    var getSlide = $(this).attr("data-class");
    $("#dp-slider .dp_item[data-class=" + getSlide + "]")
      .hide()
      .prependTo("#dp-slider")
      .fadeIn();
    $.each($(".dp_item"), function (index, dp_item) {
      $(dp_item).attr("data-position", index + 1);
    });
    detectActive();
  });

  // Function to handle user preferences and update local storage
  function updateUserPreferences(preferences) {
    var userData = JSON.parse(localStorage.getItem("userData"));
    userData.preferences = preferences;
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("Updated user preferences:", userData.preferences);
  }

  // Add hover effect to icons
  const icons = document.querySelectorAll(".icon");

  icons.forEach((icon) => {
    icon.addEventListener("mouseover", () => {
      icon.style.transform = "scale(1.2)";
    });

    icon.addEventListener("mouseout", () => {
      icon.style.transform = "scale(1)";
    });
  });

  // Donate button click functionality
  $("#donate-btn").click(function () {
    // Display donation details pop-up message
    var donationMessage =
      "Thank You for Choosing to Support Us. You can send your donations to the following account number.\n\nMpesa Paybill: 247247\nAccount number: 0796502241\n\nYour Support Will be Highly Appreciated!";
    alert(donationMessage);
  });

  // Subscribe form submission
  $(".subscribe-form").submit(function (event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve the email input value and trim whitespace
    var email = $(this).find(".email-input").val().trim();

    // Check if email is empty
    if (email === "") {
      // Display message to enter email first
      alert("Enter your email first");
    } else {
      // Display subscription message
      alert("You have been subscribed");

      // Clear form fields
      $(this).trigger("reset");
    }
  });

  // When the user scrolls the page, execute myFunction
  window.onscroll = function () {
    myFunction();
  };

  // Get the navbar
  var navbar = document.getElementById("navbar");

  // Get the offset position of the navbar
  var sticky = navbar.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }
});
