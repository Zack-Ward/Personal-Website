const popup = document.getElementById("popup");
function show(){ 
    popup.style.visibility = "visible";
}
function remove(){ 
    popup.style.visibility = "hidden";
}

// CONTACT FORM SUBMISSION
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "33690d54-98e2-484e-ab76-43095d5ad2aa");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// SQUARE APPOINTMENT BOOKINGS
// This script needs to support redirects from urls like weebly's

(function() {
  function getScriptTag() {
    return document.currentScript || currentScriptPolyfill();
  }

  // IE does not support document.currentScript, attempt to support it.
  // This will fail if for example the script is dynamically inserted in to the DOM or loaded with defer or async
  function currentScriptPolyfill() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  }

  function takeOverIframe() {
    // Some site editors, notably WIX, embed our JS inside an iframe with no other content.
    // In this case, to provide a good UI, we'll take over the parent frame.
    // However, we also want to allow merchants to embed us inside the content of an iframe if they want to.
    // The code below tries to detect the WIX style situation.
    var scriptTag = getScriptTag();
    var parentTags = { HEAD: 1, HTML: 1}
    return !scriptTag.parentNode || parentTags[scriptTag.parentNode.tagName]
  }

  function embedIframe() {
    var scriptTag = getScriptTag();

    var iframe = document.createElement('iframe');
    var isSquareOnline = ((document.querySelector('meta[name="generator"]') || {}).content || '').includes('Square Online');

      var width = "100%";
      var height = "100%";
      iframe.style.minHeight = isSquareOnline ? "auto" : "500px";

    iframe.style.width = width;
    iframe.style.height = height;
    iframe.style.border = 'none';
    iframe.src = 'https://app.squareup.com/appointments/buyer/widget/8s9frsb6zgdurt/L0Z0Q3N47YZYD';

    // allow Apple Pay & Google Pay to work from within iframe
    iframe.allow = 'payment app.squareup.com';

    scriptTag.parentNode.insertBefore(iframe, scriptTag);
  }

  function embedBookingButton() {
    var scriptTag = getScriptTag();

    var container = document.createElement('div');
    var button = document.createElement('a');

    button.setAttribute("style", "background-color: #006aff; color: white; height: 40px; line-height: 38px; " +
            "padding: 0 28px; border-radius: 3px; font-weight: 500; font-size: 14px; cursor: pointer; " +
            "display: inline-block; text-decoration: none");
    button.setAttribute("href", 'https://app.squareup.com/appointments/book/8s9frsb6zgdurt/L0Z0Q3N47YZYD/start');
    button.textContent = 'Book Appointment Now';

    container.setAttribute("style", "text-align: center");
    container.appendChild(button);
    scriptTag.parentNode.insertBefore(container, scriptTag);
  }

  function scriptParentWidth() {
    try {
      var scriptParent = getScriptTag().parentNode;
      var computedStyle = getComputedStyle(scriptParent);
      var paddingX = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
      var borderX = parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
      return scriptParent.offsetWidth - paddingX - borderX;
    } catch (e) { // above not certain to work in all browser + tag scenarios, fall back to document
      return document.body.clientWidth;
    }
  }

  if (takeOverIframe()) {
    window.location = 'https://app.squareup.com/appointments/buyer/widget/8s9frsb6zgdurt/L0Z0Q3N47YZYD';
  } else {
    if (scriptParentWidth() < 280) {
      embedBookingButton();
    } else {
      embedIframe();
    }

  }

})();