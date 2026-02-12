const fs = require("fs");
function logActivity(message){
    const time=newDate().toLocaleString();
    fs.appendFileSync("activity.log",time+"-"+message+"\n");
}
  MediaSourceHandle.export=logActivity;