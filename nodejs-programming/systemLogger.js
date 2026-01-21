// systemLogger.js

const os = require("os");
const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "system-info.log");

function logSystemInfo() {
  const timestamp = new Date().toISOString();

  const cpuModel = os.cpus()[0].model;
  const cpuCores = os.cpus().length;

  const totalMemory = (os.totalmem() / 1024 ** 3).toFixed(2);
  const freeMemory = (os.freemem() / 1024 ** 3).toFixed(2);

  const platform = os.platform();
  const arch = os.arch();

  const logEntry = `
[${timestamp}]
Platform: ${platform} (${arch})
CPU: ${cpuModel} (${cpuCores} cores)
Memory: ${freeMemory} GB free / ${totalMemory} GB total
----------------------------------------
`;

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error("Error writing log file:", err.message);
    }
  });
}

// Log every 5 seconds
setInterval(logSystemInfo, 5000);

console.log("System information logger started...");
