(function () {
  const sessionId = Math.random().toString(36).substr(2, 9);
  const domain = window.location.hostname;

  // Get the siteId for this domain
  fetch(`https://backend-tmo1.onrender.com/api/sites/domain/${domain}`)
    .then((res) => res.json())
    .then((data) => {
      const siteId = data.siteId; // ✅ FIXED

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
            screen: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
            sessionId,
          }),
        });
      }

      // Track click events
      document.addEventListener("click", (e) =>
        sendEvent("click", e.pageX, e.pageY)
      );

      // Track scroll events (optional)
      window.addEventListener("scroll", () => {
        sendEvent("scroll", window.scrollX, window.scrollY);
      });
    })
    .catch((err) => {
      console.error("Error loading site ID:", err);
    });
})();
