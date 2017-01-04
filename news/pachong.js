var main=require("./main.js");
var CronJob = require('cron').CronJob;

new CronJob('* */50 * * * *', function() {
    main();
}, null, true, 'America/Los_Angeles');