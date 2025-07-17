(function () {
  const sessionId = Math.random().toString(36).substr(2, 9);
  const domain = window.location.hostname;

  // Call your backend to get the siteId for the current domain
  fetch(`https://backend-tmo1.onrender.com/api/sites/domain/${domain}`)
    .then((res) => res.json())
    .then((data) => {
      const siteId = data._id;

      if (!siteId) {
        console.warn("No site ID found for this domain.");
        return;
      }

      function sendEvent(type, x, y) {
        fetch("https://backend-tmo1.onrender.com/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            siteId,
            type,
            x,
            y,
            screen: { width: window.innerWidth, height: window.innerHeight },
            sessionId,
          }),
        });
      }

      // Track click events
      document.addEventListener("click", (e) =>
        sendEvent("click", e.pageX, e.pageY)
      );

      // You can also track scroll, mousemove etc. (optional)
      // Example: Scroll
      window.addEventListener("scroll", () => {
        sendEvent("scroll", window.scrollX, window.scrollY);
      });
    })
    .catch((err) => {
      console.error("Error loading site ID:", err);
    });
})();
