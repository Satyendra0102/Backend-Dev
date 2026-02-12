const os = require("os");
const fs = require("fs");

const totalMemory =os.totalmem()/(1024*1024*1024);
const freeMemory=os.freemem()/(1024*1024*1024);

const platform =os.platform()
const uptime=os.uptime()/(3600)

const model=os.cpus()[0].model

console.log(totalMemory,platform,uptime,model)

const logData = `
totalMemory: ${totalMemory}
Platform: ${platform}
uptime: ${uptime}
model: ${model} MB
-----------------------------
`;
    const res=fs.appendFile('system_info.log', logData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        }
    })


    