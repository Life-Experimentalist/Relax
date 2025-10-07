/**
 * Relax - Stress Buster App
 * Main JavaScript with jQuery for DOM manipulation and API calls
 */

$(document).ready(function () {
  // API endpoints
  const API = {
    quote: "/api/quote",
    gif: "/api/gif",
    meme: "/api/meme",
  };

  // State
  let breathingInterval = null;
  let breathingCycle = 0;
  let maxCycles = 3;

  /**
   * Utility Functions
   */
  function showLoading(element) {
    $(element).html('<div class="loading"></div>');
  }

  function showError(element, message) {
    $(element).html(`
            <div class="alert alert-warning" role="alert">
                <i class="bi bi-exclamation-triangle"></i> ${message}
            </div>
        `);
  }

  /**
   * Load a random quote
   */
  function loadQuote() {
    showLoading("#quote-text");
    $("#quote-author").text("Loading...");

    $.ajax({
      url: API.quote,
      method: "GET",
      timeout: 5000,
      success: function (data) {
        $("#quote-text").hide().text(data.text).fadeIn(600);

        $("#quote-author")
          .hide()
          .html(`<cite title="Author">${data.author || "Anonymous"}</cite>`)
          .fadeIn(600);
      },
      error: function () {
        showError("#quote-text", "Could not load quote. Please try again.");
        $("#quote-author").text("");
      },
    });
  }

  /**
   * Load a calming GIF
   */
  function loadGif() {
    const $reliefSection = $("#relief-section");

    $reliefSection
      .html(
        `
            <div class="card shadow-sm relief-card">
                <div class="card-body text-center">
                    <div class="loading mb-3"></div>
                    <p>Loading calming visual...</p>
                </div>
            </div>
        `
      )
      .hide()
      .fadeIn(400);

    $.ajax({
      url: API.gif,
      method: "GET",
      timeout: 10000,
      success: function (data) {
        // Build badge only if source is giphy
        const badgeHtml =
          data.source === "giphy"
            ? '<div class="giphy-badge">Powered by <img src="/static/images/giphy-powered.svg" alt="GIPHY"/></div>'
            : "";

        $reliefSection
          .html(
            `
          <div class="card shadow-sm relief-card">
            <div class="image-container">
              <img src="${data.url}" alt="Calming GIF" loading="lazy" onload="adjustImageSize(this)">
              ${badgeHtml}
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">
                <i class="bi bi-image"></i> Take a Moment to Breathe
              </h5>
              <p class="card-text text-muted">Watch this peaceful visual and let your worries fade away.</p>
            </div>
          </div>
        `
          )
          .hide()
          .fadeIn(400);
      },
      error: function () {
        showError($reliefSection, "Could not load GIF. Please try again.");
      },
    });
  }

  /**
   * Load a wholesome meme
   */
  function loadMeme() {
    const $reliefSection = $("#relief-section");

    $reliefSection
      .html(
        `
            <div class="card shadow-sm relief-card">
                <div class="card-body text-center">
                    <div class="loading mb-3"></div>
                    <p>Loading wholesome meme...</p>
                </div>
            </div>
        `
      )
      .hide()
      .fadeIn(400);

    $.ajax({
      url: API.meme,
      method: "GET",
      timeout: 10000,
      success: function (data) {
        const badgeHtml =
          data.source === "giphy"
            ? '<div class="giphy-badge">Powered by <img src="/static/images/giphy-powered.svg" alt="GIPHY"/></div>'
            : "";

        $reliefSection
          .html(
            `
                    <div class="card shadow-sm relief-card">
                        <div class="image-container">
                            <img src="${
                              data.url
                            }" alt="Wholesome Meme" loading="lazy" onload="adjustImageSize(this)">
                            ${badgeHtml}
                        </div>
                        <div class="card-body text-center">
                            <h5 class="card-title">
                                <i class="bi bi-emoji-laughing"></i> ${
                                  data.title ||
                                  "Here's Something to Make You Smile"
                                }
                            </h5>
                            <p class="card-text text-muted">Sometimes a good laugh is the best medicine.</p>
                        </div>
                    </div>
                `
          )
          .hide()
          .fadeIn(400);
      },
      error: function () {
        showError($reliefSection, "Could not load GIF. Please try again.");
      },
    });
  }

  /**
   * Load a wholesome meme
   */
  function loadMeme() {
    const $reliefSection = $("#relief-section");

    $reliefSection
      .html(
        `
            <div class="card shadow-sm relief-card">
                <div class="card-body text-center">
                    <div class="loading mb-3"></div>
                    <p>Loading wholesome meme...</p>
                </div>
            </div>
        `
      )
      .hide()
      .fadeIn(400);

    $.ajax({
      url: API.meme,
      method: "GET",
      timeout: 10000,
      success: function (data) {
        const badgeHtml =
          data.source === "giphy"
            ? '<div class="giphy-badge">Powered by <img src="/static/images/giphy-powered.svg" alt="GIPHY"/></div>'
            : "";

        $reliefSection
          .html(
            `
                    <div class="card shadow-sm relief-card">
                        <img src="${
                          data.url
                        }" class="card-img-top" alt="Wholesome Meme" loading="lazy">
                        <div class="image-container">${badgeHtml}</div>
                        <div class="card-body text-center">
                            <h5 class="card-title">
                                <i class="bi bi-emoji-laughing"></i> ${
                                  data.title ||
                                  "Here's Something to Make You Smile"
                                }
                            </h5>
                            <p class="card-text text-muted">Sometimes a good laugh is the best medicine.</p>
                        </div>
                    </div>
                `
          )
          .hide()
          .fadeIn(400);
      },
      error: function () {
        // Fallback to GIF if meme fails
        loadGif();
      },
    });
  }

  /**
   * Breathing Exercise Timer
   */
  function startBreathingExercise() {
    breathingCycle = 0;
    $("#relief-section").empty();
    $("#breathing-timer").removeClass("d-none").hide().fadeIn(400);

    runBreathingCycle();
  }

  function runBreathingCycle() {
    if (breathingCycle >= maxCycles) {
      stopBreathingExercise();
      return;
    }

    breathingCycle++;
    updateBreathingCount();

    const $circle = $("#breathing-circle");
    const $instruction = $("#breathing-instruction");

    // Breathe In (4 seconds)
    $instruction.text("Breathe In");
    $circle.removeClass("breathe-out hold").addClass("breathe-in");

    setTimeout(() => {
      // Hold (4 seconds)
      $instruction.text("Hold");
      $circle.removeClass("breathe-in").addClass("hold");

      setTimeout(() => {
        // Breathe Out (4 seconds)
        $instruction.text("Breathe Out");
        $circle.removeClass("hold").addClass("breathe-out");

        setTimeout(() => {
          // Reset and next cycle
          $circle.removeClass("breathe-out");
          setTimeout(runBreathingCycle, 1000);
        }, 4000);
      }, 4000);
    }, 4000);
  }

  function updateBreathingCount() {
    $("#breathing-count").text(`Cycle ${breathingCycle} of ${maxCycles}`);
  }

  function stopBreathingExercise() {
    if (breathingInterval) {
      clearInterval(breathingInterval);
    }

    $("#breathing-timer").fadeOut(400, function () {
      $(this).addClass("d-none");
      $("#breathing-circle").removeClass("breathe-in breathe-out hold");

      // Show a completion message
      $("#relief-section")
        .html(
          `
                <div class="card shadow-sm relief-card">
                    <div class="card-body text-center p-5">
                        <i class="bi bi-check-circle text-success fs-1"></i>
                        <h5 class="card-title mt-3">Great Job!</h5>
                        <p class="card-text">You've completed your breathing exercise.
                        How do you feel?</p>
                        <button class="btn btn-primary mt-3" onclick="location.reload()">
                            <i class="bi bi-arrow-clockwise"></i> Start Fresh
                        </button>
                    </div>
                </div>
            `
        )
        .hide()
        .fadeIn(400);
    });
  }

  /**
   * Stress Relief - Random choice
   */
  function handleStressRelief() {
    // Randomly choose between GIF (40%), Meme (40%), or Breathing (20%)
    const random = Math.random();

    if (random < 0.4) {
      loadGif();
    } else if (random < 0.8) {
      loadMeme();
    } else {
      startBreathingExercise();
    }

    // Scroll to relief section
    $("html, body").animate(
      {
        scrollTop: $("#relief-section").offset().top - 100,
      },
      500
    );
  }

  /**
   * Theme Toggle (Manual dark mode)
   */
  function toggleTheme() {
    $("body").toggleClass("dark-mode");
    const isDark = $("body").hasClass("dark-mode");

    // Update icon
    $("#theme-toggle i")
      .removeClass("bi-moon-stars bi-sun-fill")
      .addClass(isDark ? "bi-sun-fill" : "bi-moon-stars");

    // Save preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  /**
   * Load saved theme preference
   */
  function loadThemePreference() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      $("body").addClass("dark-mode");
      $("#theme-toggle i").removeClass("bi-moon-stars").addClass("bi-sun-fill");
    }
  }

  /**
   * Adjust image size based on dimensions
   */
  window.adjustImageSize = function (img) {
    const $img = $(img);
    const width = img.naturalWidth;
    const height = img.naturalHeight;

    // Mark small images for special handling
    if (width < 400 || height < 300) {
      $img.attr("data-small", "true");
    }

    // Remove loading class from container
    $img.closest(".image-container").removeClass("loading");
  };

  /**
   * Form Validation Example (can be extended)
   */
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * Theme Toggle (Manual dark mode with Dark Reader compatibility)
   */
  function toggleTheme() {
    const $body = $("body");
    const $html = $("html");

    // Toggle dark mode
    $body.toggleClass("dark-mode");
    const isDark = $body.hasClass("dark-mode");

    // Set data-theme attribute for Dark Reader compatibility
    $html.attr("data-theme", isDark ? "dark" : "light");

    // Update icon
    $("#theme-toggle i")
      .removeClass("bi-moon-stars bi-sun-fill")
      .addClass(isDark ? "bi-sun-fill" : "bi-moon-stars");

    // Save preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  /**
   * Load saved theme preference
   */
  function loadThemePreference() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const $body = $("body");
    const $html = $("html");

    // Determine if we should use dark mode
    const useDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (useDark) {
      $body.addClass("dark-mode");
      $html.attr("data-theme", "dark");
      $("#theme-toggle i").removeClass("bi-moon-stars").addClass("bi-sun-fill");
    } else {
      $html.attr("data-theme", "light");
    }
  }

  /**
   * Detect Dark Reader and adjust accordingly
   */
  function detectDarkReader() {
    // Check if Dark Reader is active
    const isDarkReaderActive =
      document.querySelector('meta[name="darkreader"]') !== null;

    if (isDarkReaderActive) {
      console.log("Dark Reader detected - compatibility mode active");
      // Dark Reader handles the theme, so we just track state
      $("html").attr("data-darkreader", "true");
    }
  }

  /**
   * Event Handlers
   */

  // Load initial quote on page load
  loadQuote();

  // Load theme preference on page load
  loadThemePreference();

  // Detect Dark Reader
  detectDarkReader();

  // Refresh quote button
  $("#refresh-quote").on("click", function () {
    $(this).prop("disabled", true);
    loadQuote();
    setTimeout(() => {
      $(this).prop("disabled", false);
    }, 1000);
  });

  // Stress relief button with debounce
  let stressButtonTimeout;
  $("#im-stressed").on("click", function () {
    clearTimeout(stressButtonTimeout);
    $(this).prop("disabled", true);

    handleStressRelief();

    stressButtonTimeout = setTimeout(() => {
      $(this).prop("disabled", false);
    }, 2000);
  });

  // Stop breathing exercise button
  $("#stop-breathing").on("click", function () {
    stopBreathingExercise();
  });

  // Theme toggle button
  $("#theme-toggle").on("click", function () {
    toggleTheme();
  });

  // Load theme preference
  loadThemePreference();

  /**
   * Smooth scroll for navigation links
   */
  $('a[href^="#"]').on("click", function (e) {
    const target = $(this.getAttribute("href"));
    if (target.length) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 70,
        },
        500
      );
    }
  });

  /**
   * Accessibility: Keyboard navigation
   */
  $(document).on("keydown", function (e) {
    // Press 'S' to trigger stress relief
    if (e.key === "s" || e.key === "S") {
      if (!$(e.target).is("input, textarea")) {
        $("#im-stressed").trigger("click");
      }
    }

    // Press 'Q' to refresh quote
    if (e.key === "q" || e.key === "Q") {
      if (!$(e.target).is("input, textarea")) {
        $("#refresh-quote").trigger("click");
      }
    }
  });

  console.log("Relax App initialized ✨");
});
