const express = require("express");
const loomEmbed = require("@loomhq/loom-embed");

const app = express();
app.use(express.json());

// Root route to confirm server is running
app.get("/", (req, res) => {
  res.send("Server is running. Use POST /getGifEmbed to get the GIF embed code.");
});

// Endpoint to retrieve GIF embed code
app.post("/getGifEmbed", async (req, res) => {
  const { loomUrl } = req.body;
  if (!loomUrl) {
    return res.status(400).json({ error: "Loom URL is required" });
  }

  try {
    // Fetch the GIF embed code using the Loom Embed SDK
    const gifEmbedCode = await loomEmbed.gifEmbed(loomUrl);
    res.json({ gifEmbedCode });
  } catch (error) {
    console.error("Error fetching GIF embed code:", error);
    res.status(500).json({ error: "Failed to fetch GIF embed code" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
