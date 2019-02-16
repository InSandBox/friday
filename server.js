var http = require('http');
var url = require('url');
var fs = require('fs');
var FUNC = require('./functions.js');

const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');


setInterval(FUNC.FUNC.adArchiver, 600000);

setInterval(FUNC.FUNC.creditor2, 50000);

//Archiveur de Pindone

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);

  var snuHash = q.pathname;

  var check = snuHash.substr(0, 6);

  if(check=="/done/"){
    var s_u = FUNC.FUNC.deHash(snuHash.substr(6));
    var uHash = s_u[0];
    var userid = s_u[1];

    if(FUNC.FUNC.isValid(uHash) && !FUNC.FUNC.userDone(uHash, userid)){

      FUNC.FUNC.addDone({
        "ads_id":uHash,
         "user_id":parseInt(userid)
      });
      FUNC.FUNC.takeOne(uHash);
      FUNC.FUNC.creditUser(userid, FUNC.FUNC.amountOf(uHash), FUNC.FUNC.typeOf(uHash))
        
      //The message will be sent in this function
      res.writeHead(200, {'Content-Type': 'text/html'});
      console.log("User "+userid+" just get rewarded for visiting site !")
      logger.error("User "+userid+" just get rewarded for visiting site !")
      return res.end("You get your reward !");

    }else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      return res.end("An Error Occured !");
    }

  }else if(check=="/view/"){
    console.log(snuHash);
    var s_u = FUNC.FUNC.deHash(snuHash.substr(6));
    var surl = FUNC.FUNC.getUrl(s_u[0]);
    console.log(surl)

    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write(fs.readFileSync("./one.html"));
  
    res.write("<iframe style=\"margin-left: -8px; border: none;\" src=\""+surl+"\" height=\"1000\" width=\"101%\" scrolling=\"yes\" id=\"iframe\" data=\""+snuHash.substr(6)+"\">Your Browser Does Not Support Iframes</iframe>")
  
    res.write(fs.readFileSync("./two.html"));
  
   return res.end();

  }else if(check=="/spin/"){
    var pin = FUNC.FUNC.dehashPIN(snuHash.substr(6))["pin"];
    console.log(snuHash.substr(6));
    res.write("<p style='font-size: 1.3em; background-color: black; color: white; height : 100px; text-align: center; border-radius : 10px /10px;'><br /><br />PIN : <span style='font-weight:bold; color:aqua;'>"+pin+"</span></p>");
    res.end();
  }
  else{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("Welcome on Crypto Alliance Invest Site (Comming Soon)");
  }
  
}).listen(8080);