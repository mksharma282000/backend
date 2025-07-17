(function () {
  // Get siteId from query string (e.g., ?siteId=6878a4918224888081193f7d)
  const urlParams = new URLSearchParams(window.location.search);
  const siteId = urlParams.get("siteId");

  if (!siteId) {
    console.warn("🔥 Heatmap Tracker: 'siteId' is missing in the script URL!");
    return;
  }

  const sessionId = Math.random().toString(36).substr(2, 9);

  function sendEvent(type, x, y) {
    fetch("https://heatmap-api.onrender.com/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteId,
        type,
        x,
        y,
        screen: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        sessionId
      })
    }).catch((err) =>
      console.error("🔥 Heatmap Tracker: Error sending event", err)
    );
  }

  document.addEventListener("click", (e) => {
    sendEvent("click", e.pageX, e.pageY);
  });
})();
