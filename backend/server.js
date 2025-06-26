const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/helmetDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const commandSchema = new mongoose.Schema({
  command: String,
  timestamp: { type: Date, default: Date.now },
});

const Command = mongoose.model("Command", commandSchema);

app.post("/api/commands", async (req, res) => {
  try {
    const { command } = req.body;
    const newCommand = new Command({ command });
    await newCommand.save();
    res.status(201).json({ message: "Command saved", command: newCommand });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save command" });
  }
});

app.get("/api/commands", async (req, res) => {
  try {
    const commands = await Command.find().sort({ timestamp: -1 });
    res.json(commands);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch commands" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
