const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');

exports.FUNC = {
    checkNewUser: function(user_id, username){
        var fs = require("fs");
        var balance = JSON.parse(fs.readFileSync("./balance.json"))
        var users = JSON.parse(fs.readFileSync("./users.json"))
        if(!this.checkContains(users, user_id)){
            console.log("New user "+user_id+" just registred !\n");
            logger.error("New user "+user_id+" just registred !\n");

            var bd_str = fs.readFileSync("./balanced.json");
            var bd_p = JSON.parse(bd_str);

            users.push({
                "user_id": user_id,
                "username": username,
                "lang": "en"
            })

            balance.push({
                "user_id": user_id,
                "xbt": 0.000000,
                "eth": 0.000000,
                "ltc": 0.000000 
            })

            bd_p.push({
                "user_id": user_id,
                "xbt": 0.000000,
                "eth": 0.000000,
                "ltc": 0.000000        
            })

            fs.writeFileSync("./balanced.json", JSON.stringify(bd_p));
            fs.writeFileSync("./balance.json", JSON.stringify(balance));
            fs.writeFileSync("./users.json", JSON.stringify(users));

            return true;
        }else{

            return false;
        }
        //Check if the user is in the database
            //Yes->Not new
            //No->New User | Add him in user table (lang en default)
            //             | Add him in balance table(0, 0, 0 )
    },
    visitTask: function(){

    },

    setUserLang: function(user_id, lang){
        var fs = require("fs")

        var users = JSON.parse(fs.readFileSync("./users.json"));
        users.forEach((cur_v, index)=>{
            if(cur_v.user_id==user_id){
                cur_v.lang = lang;
            }
        });

        fs.writeFileSync("./users.json", JSON.stringify(users));
    },
    checkContains: function(users, id_value){
        var BreakException = {};
        try{
            users.forEach((cur_v, index)=>{
                if(cur_v.user_id==id_value){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return true;
            }
          }
        return false;
    },
    balanceMsg(user_id){
        var msg = ""
        var end = ""
        var endend = ""
        if(this.isFrench(user_id)){
            msg = msg + "* 💵 Votre Balance : *";
            end = "Pour en avoir plus, invitez vos amis par ce lien de parrainage :\n";
            endend = "\n\nContactez @AdvertXBotSupport pour obtenir de l'aide !";
        }else{
            msg = msg + "* 💵 Your Balance : *";
            end = "To get more, invite friends on the referral link :\n";
            endend = "\n\nContact @AdvertXBotSupport to obtain help from us !";
        }
        msg = msg + "\n\n*XBT*  :  "
        +this.getUserXbt(user_id).toFixed(8)+
        "\n\t\t⏬ "+this.getUserXbtd(user_id).toFixed(8)+

        "\n\n*ETH*  :  "
        +this.getUserEth(user_id).toFixed(8)+
        "\n\t\t⏬ "+this.getUserEthd(user_id).toFixed(8)+

        "\n\n*LTC*  :  "
        +this.getUserLtc(user_id).toFixed(8)+
        "\n\t\t⏬ "+this.getUserLtcd(user_id).toFixed(8)+

        "\n\n";

        end = end + "https://t.me/AdvertXBot?start=";
        end = end + user_id;
        msg = msg + end;
        msg = msg + endend;
        return msg;
    },

    isFrench(user_id){
        var fs = require("fs");
        var users = JSON.parse(fs.readFileSync("./users.json"))

        var BreakException = {};
        try{
            users.forEach((cur_v, index)=>{
                if(cur_v.user_id==user_id && cur_v.lang=="fr"){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return true;
            }
          }
        return false;       
    },

    getUserXbt( user_id){
        var fs = require("fs");
        var balance = JSON.parse(fs.readFileSync("./balance.json"))

        var BreakException = {};
        var val = 0.0000000;
        try{
            balance.forEach((cur_v, index)=>{
                val = cur_v.xbt
                if(cur_v.user_id==user_id){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return val;
            }
          }
        return val;  
    },

    getUserXbtd(user_id){
        var fs = require("fs")
        var bd_str = fs.readFileSync("./balanced.json");
        var bd_p = JSON.parse(bd_str);

        var BreakException = {};
        var val = 0.0000000;
        try{
            bd_p.forEach((cur_v, index)=>{
                val = cur_v.xbt
                if(cur_v.user_id==user_id){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return val;
            }
          }
        return val;  
    },

    getUserEth(user_id){
        var fs = require("fs");
        var balance = JSON.parse(fs.readFileSync("./balance.json"))

        var BreakException = {};
        var val = 0.0000000;
        try{
            balance.forEach((cur_v, index)=>{
                val = cur_v.eth
                if(cur_v.user_id==user_id){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return val;
            }
          }
        return val;  
    },

    getUserEthd(user_id){
        var fs = require("fs")
        var bd_str = fs.readFileSync("./balanced.json");
        var bd_p = JSON.parse(bd_str);

        var BreakException = {};
        var val = 0.0000000;
        try{
            bd_p.forEach((cur_v, index)=>{
                val = cur_v.eth
                if(cur_v.user_id==user_id){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return val;
            }
          }
        return val;  
    },

    getUserLtc(user_id){
        var fs = require("fs");
        var balance = JSON.parse(fs.readFileSync("./balance.json"))

        var BreakException = {};
        var val = 0.0000000;
        try{
            balance.forEach((cur_v, index)=>{
                val = cur_v.ltc
                if(cur_v.user_id==user_id){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return val;
            }
          }
        return val;  
    },

    getUserLtcd(user_id){
        var fs = require("fs")
        var bd_str = fs.readFileSync("./balanced.json");
        var bd_p = JSON.parse(bd_str);

        var BreakException = {};
        var val = 0.0000000;
        try{
            bd_p.forEach((cur_v, index)=>{
                val = cur_v.ltc
                if(cur_v.user_id==user_id){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return val;
            }
          }
        return val;  
    },

    depositMsgXbt(user_id, type, bot){

        console.log("User "+user_id+" just generated deposit address of type "+type+" !\n");
        logger.error("User "+user_id+" just generated deposit address of type "+type+" !\n");

        var fs = require("fs")
        var dep = JSON.parse(fs.readFileSync("./deposit.json"))
        var Client = require('coinbase').Client;

        var client = new Client({
            'apiKey': '22nrjUOeebGnj2ng',
            'apiSecret': 'D4bwAaXTTzldbKIQVs2jPOzmiJi4l2SQ'
          });


        client.getAccount('8fa18eac-4fd4-52a7-84f8-97472bc005bc', function(err, account) {
            account.createAddress({}, function(err, addr) {
                dep.push({
                    "user_id" : user_id,
                    "type" : type,
                    "addr" : addr.address,
                    "value" : 0.0
                });
                bot.sendMessage(user_id, "*"+addr.address+"*", {parse_mode : "markdown"});

                fs.writeFileSync("./deposit.json", JSON.stringify(dep));

                /*this.addPM({
                    "user_id" : user_id,
                    "msg" : addr.address
                })*/
            });
        });
    },

    depositMsgEth(user_id, type, bot){

        console.log("User "+user_id+" just generated deposit address of type "+type+" !\n");
        logger.error("User "+user_id+" just generated deposit address of type "+type+" !\n")

        var fs = require("fs")
        var dep = JSON.parse(fs.readFileSync("./deposit.json"))
        var Client = require('coinbase').Client;

        var client = new Client({
            'apiKey': '22nrjUOeebGnj2ng',
            'apiSecret': 'D4bwAaXTTzldbKIQVs2jPOzmiJi4l2SQ'
          });


        client.getAccount('16c8fc1e-1d3b-5f1e-8541-727fac78a77b', function(err, account) {
            account.createAddress({}, function(err, addr) {
                dep.push({
                    "user_id" : user_id,
                    "type" : type,
                    "addr" : addr.address,
                    "value" : 0.0
                });
                bot.sendMessage(user_id, "*"+addr.address+"*", {parse_mode : "markdown"});

                fs.writeFileSync("./deposit.json", JSON.stringify(dep));

                /*this.addPM({
                    "user_id" : user_id,
                    "msg" : addr.address
                })*/
            });
        });
    },

    depositMsgLtc(user_id, type, bot){

        console.log("User "+user_id+" just generated deposit address of type "+type+" !\n");
        logger.error("User "+user_id+" just generated deposit address of type "+type+" !\n")
        
        var fs = require("fs")
        var dep = JSON.parse(fs.readFileSync("./deposit.json"))
        var Client = require('coinbase').Client;

        var client = new Client({
            'apiKey': '22nrjUOeebGnj2ng',
            'apiSecret': 'D4bwAaXTTzldbKIQVs2jPOzmiJi4l2SQ'
          });


        client.getAccount('66da1bd1-af31-582b-9d87-4727cc3c03cc', function(err, account) {
            account.createAddress(null, function(err, addr) {
                dep.push({
                    "user_id" : user_id,
                    "type" : type,
                    "addr" : addr.address,
                    "value" : 0.0
                });
                bot.sendMessage(user_id, "*"+addr.address+"*", {parse_mode : "markdown"});

                fs.writeFileSync("./deposit.json", JSON.stringify(dep));

                /*this.addPM({
                    "user_id" : user_id,
                    "msg" : addr.address
                })*/
            });
        });
    },

    addAds(userid, values, type){

        console.log("User "+userid+" just created Ad of type "+type+" !\n");
        logger.error("User "+userid+" just created Ad of type "+type+" !\n")
        var fs = require("fs")
        var MD5 = require("./MD5.js")
        var ads_str = fs.readFileSync("./ads.json");
        var adsd_str = fs.readFileSync("./ads_done.json");
        var balance = JSON.parse(fs.readFileSync("./balance.json"))

        var ads_p = JSON.parse(ads_str);
        var adsd_p = JSON.parse(adsd_str);

        var tpay = values[2]*values[3]

        this.takeMoney( userid, tpay, type);

        var ad_id = MD5.MD5.MD5(values[0]+Date.now)
        
       // var ad = { }
       // var add = {}

        ads_p.push({
            "ads_id":ad_id,
            "user_id":userid,
            "url":values[0],
            "number": values[2],
            "prize_t":type,
            "prize": parseFloat(parseFloat(values[3] / 2).toFixed(8))
       });
        adsd_p.push({
            "ads_id":ad_id,
             "user_id":parseInt(userid)
        });

        this.saveData(ads_p, adsd_p);

        this.iGain(tpay, type);
        //fs.writeFileSync("./balance.json", JSON.stringify(balance));

    },


    addAdb(userid, values, type){
        console.log("User "+userid+" just created Ad of type "+type+" !\n");
        logger.error("User "+userid+" just created Ad of type "+type+" !\n")

        var fs = require("fs")
        var MD5 = require("./MD5.js")
        var adb_str = fs.readFileSync("./adb.json");
        var adbd_str = fs.readFileSync("./adb_done.json");
        var balance = JSON.parse(fs.readFileSync("./balance.json"))

        var adb_p = JSON.parse(adb_str);
        var adbd_p = JSON.parse(adbd_str);

        var tpay = values[2]*values[3]

        this.takeMoney( userid, tpay, type);

        var ad_id = MD5.MD5.MD5(values[0][1]+Date.now)

        adb_p.push({
            "adb_id": ad_id,
            "user_id": userid,
            "botName": values[0][0],
            "botLink": values[0][1],
            "number": values[2],
            "prize_t":type,
            "prize":parseFloat(parseFloat(values[3] / 2).toFixed(8))
       });
        adbd_p.push({
            "adb_id":ad_id,
             "user_id":parseInt(userid)
        });

        this.saveDataB(adb_p, adbd_p);
        //fs.writeFileSync("./balance.json", JSON.stringify(balance));

        this.iGain(tpay, type);

    },



    addAdc(userid, values, type){

        console.log("User "+userid+" just created Ad of type "+type+" !\n");
        logger.error("User "+userid+" just created Ad of type "+type+" !\n")

        var fs = require("fs")
        var MD5 = require("./MD5.js")
        var adc_str = fs.readFileSync("./adc.json");
        var adcd_str = fs.readFileSync("./adc_done.json");
        var balance = JSON.parse(fs.readFileSync("./balance.json"))

        var adc_p = JSON.parse(adc_str);
        var adcd_p = JSON.parse(adcd_str);

        var tpay = values[2]*values[3]

        this.takeMoney( userid, tpay, type);

        var ad_id = MD5.MD5.MD5(values[0][1]+Date.now)

        // [{"adb_id":"eza1zze6z","userid":8888888888,"botName":"ThisBot","botLink":"https://t.me/ThisBot?start=525352","number":0,"prize_t":"xbt","prize":5e-7}]

        adc_p.push({
            "adc_id": ad_id,
            "user_id": userid,
            "chatId": values[0][0],
            "chatLink": values[0][1],
            "number": values[2],
            "prize_t":type,
            "prize":parseFloat(parseFloat(values[3] / 2).toFixed(8))
       });
        adcd_p.push({
            "adc_id":ad_id,
             "user_id":parseInt(userid)
        });

        this.saveDataC(adc_p, adcd_p);
        //fs.writeFileSync("./balance.json", JSON.stringify(balance));

        this.iGain(tpay, type);

    },

    addAdg( userid, values, type){

        console.log("User "+userid+" just created Ad of type "+type+" !\n");
        logger.error("User "+userid+" just created Ad of type "+type+" !\n");

        var fs = require("fs")
        var MD5 = require("./MD5.js")
        var adg_str = fs.readFileSync("./adg.json");
        var adgd_str = fs.readFileSync("./adg_done.json");
        var balance = JSON.parse(fs.readFileSync("./balance.json"))

        var adg_p = JSON.parse(adg_str);
        var adgd_p = JSON.parse(adgd_str);

        var tpay = values[2]*values[3]

        this.takeMoney( userid, tpay, type);

        var ad_id = MD5.MD5.MD5(values[0][1]+Date.now)

        // [{"adb_id":"eza1zze6z","userid":8888888888,"botName":"ThisBot","botLink":"https://t.me/ThisBot?start=525352","number":0,"prize_t":"xbt","prize":5e-7}]

        adg_p.push({
            "adg_id": ad_id,
            "user_id": userid,
            "chatId": values[0][0],
            "chatLink": values[0][1],
            "number": values[2],
            "prize_t":type,
            "prize":parseFloat(parseFloat(values[3] / 2).toFixed(8))
       });
        adgd_p.push({
            "adg_id":ad_id,
             "user_id":parseInt(userid)
        });

        this.saveDataG(adg_p, adgd_p);
        // fs.writeFileSync("./balance.json", JSON.stringify(balance));

        this.iGain(tpay, type);

    },

    saveData(ad, add){
        var fs = require("fs")
        var ads_str = JSON.stringify(ad);
        var adsd_str = JSON.stringify(add);

        fs.writeFileSync("ads.json", ads_str);
        fs.writeFileSync("ads_done.json", adsd_str);
    },

    saveDataB(ad, add){
        var fs = require("fs")
        var adb_str = JSON.stringify(ad);
        var adbd_str = JSON.stringify(add);

        fs.writeFileSync("adb.json", adb_str);
        fs.writeFileSync("adb_done.json", adbd_str);
    },

    saveDataC(ad, add){
        var fs = require("fs")
        var adc_str = JSON.stringify(ad);
        var adcd_str = JSON.stringify(add);

        fs.writeFileSync("adc.json", adc_str);
        fs.writeFileSync("adc_done.json", adcd_str);
    },

    saveDataG(ad, add){
        var fs = require("fs")
        var adg_str = JSON.stringify(ad);
        var adgd_str = JSON.stringify(add);

        fs.writeFileSync("adg.json", adg_str);
        fs.writeFileSync("adg_done.json", adgd_str);
    },

    takeMoney(userid, tpay, type){
        var fs = require("fs")
        var balanced = JSON.parse(fs.readFileSync("./balanced.json"));
        var balancew = JSON.parse(fs.readFileSync("./balance.json"));
        var BreakException = {};
        var NotEnoughMoneyException = {};
        var val = 0
        var gh = {}
        try{
            balanced.forEach((cur_v, index)=>{
                if(cur_v.user_id==userid){
                    if(cur_v[type] - tpay < 0){
                        val = parseFloat(tpay - cur_v[type]).toFixed(8)
                        cur_v[type] = 0.0
                        
                        throw NotEnoughMoneyException;
                        
                    }else{
                        cur_v[type] = parseFloat(parseFloat(cur_v[type] - tpay).toFixed(8));
                    }             
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){

            }else if(e == NotEnoughMoneyException && val!=0){
                try{
                    balancew.forEach((cur_v, index) =>{
                        if(cur_v.user_id==userid){
                            cur_v[type] =parseFloat(parseFloat(cur_v[type] - val).toFixed(8))
                            throw BreakException;
                        }
                    })
                }catch(e){

                }
            }
          }
  
          fs.writeFileSync("./balance.json", JSON.stringify(balancew));

          fs.writeFileSync("./balanced.json", JSON.stringify(balanced));
          
    },
    hash(userid, uHash){
        //console.log("mmm"+userid+"mmm")
        var str_r = ""
        uHash.split("").forEach(function(val, index){
            if(index%2==0 && (index/2) <9){
                //console.log("ii"+index+"ii")
                str_r+=userid.toString().charAt((index/2));
            }
                
            str_r+=val
            
        });
        //console.log(str_r)
        return str_r;
    },
    deHash(hash){
        //console.log(";;"+hash+";;")
        var vals = []
        vals[1] = ""
        vals[0] = ""
        hash.split("").forEach(function(val, index){
            if(index%3==0 && vals[1].length<9){
                vals[1]+=val
                
            }    
            else vals[0]+=val
            //console.log(vals)
        });

        return vals;
    },
    getUrl(uHash){
        fs = require('fs')
        ads_str = fs.readFileSync("./ads.json")
        ads_p = JSON.parse(ads_str)
        var url = ""
        var BreakException = {};
        try{
            ads_p.forEach((cur_v, index)=>{
                if(cur_v.ads_id==uHash){
                    url = cur_v.url
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return url;
            }
          }
          return url;
    },


    getGroLink(uHash){
        fs = require('fs')
        adg_str = fs.readFileSync("./adg.json")
        adg_p = JSON.parse(adg_str)
        var url = ""
        var BreakException = {};
        try{
            adg_p.forEach((cur_v, index)=>{
                if(cur_v.adg_id==uHash){
                    url = cur_v.chatLink
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return url;
            }
          }
          return url;
    },

    getChaLink(uHash){
        fs = require('fs')
        adc_str = fs.readFileSync("./adc.json")
        adc_p = JSON.parse(adc_str)
        var url = ""
        var BreakException = {};
        try{
            adc_p.forEach((cur_v, index)=>{
                if(cur_v.adc_id==uHash){
                    url = cur_v.chatLink
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return url;
            }
          }
          return url;
    },

    getGroId(uHash){
        fs = require('fs')
        adg_str = fs.readFileSync("./adg.json")
        adg_p = JSON.parse(adg_str)
        var id
        var BreakException = {};
        try{
            adg_p.forEach((cur_v, index)=>{
                if(cur_v.adg_id==uHash){
                    id = cur_v.chatId
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return id;
            }
          }
          return id;
    },

    getChaId(uHash){
        fs = require('fs')
        adc_str = fs.readFileSync("./adc.json")
        adc_p = JSON.parse(adc_str)
        var id
        var BreakException = {};
        try{
            adc_p.forEach((cur_v, index)=>{
                if(cur_v.adc_id==uHash){
                    id = cur_v.chatId
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return id;
            }
          }
          return id;
    },

    addDone(data){
        console.log("User "+data.user_id+" just completed Ad of type Site !\n");
        logger.error("User "+data.user_id+" just completed Ad of type Site !\n");

        adsd_str = fs.readFileSync("./ads_done.json")
        adsd_p = JSON.parse(adsd_str)
        adsd_p.push(data);
        fs.writeFileSync("./ads_done.json", JSON.stringify(adsd_p));
    },

    addDoneP(data){
        console.log("User "+data.user_id+" just completed Ad of type Post !\n");
        logger.error("User "+data.user_id+" just completed Ad of type Post !\n");

        adpd_str = fs.readFileSync("./adp_done.json")
        adpd_p = JSON.parse(adpd_str)
        adpd_p.push(data);
        fs.writeFileSync("./adp_done.json", JSON.stringify(adpd_p));
    },

    addDoneB(data){
        console.log("User "+data.user_id+" just completed Ad of type Bot !\n");
        logger.error("User "+data.user_id+" just completed Ad of type Bot !\n");

        adbd_str = fs.readFileSync("./adb_done.json")
        adbd_p = JSON.parse(adbd_str)
        adbd_p.push(data);
        fs.writeFileSync("./adb_done.json", JSON.stringify(adbd_p));
    },

    addDoneG(data){
        console.log("User "+data.user_id+" just completed Ad of type Group !\n");
        logger.error("User "+data.user_id+" just completed Ad of type Group !\n");

        adgd_str = fs.readFileSync("./adg_done.json")
        adgd_p = JSON.parse(adgd_str)
        adgd_p.push(data);
        fs.writeFileSync("./adg_done.json", JSON.stringify(adgd_p));
    },

    addDoneC(data){
        console.log("User "+data.user_id+" just completed Ad of type Channel !\n");
        logger.error("User "+data.user_id+" just completed Ad of type Channel !\n");

        adcd_str = fs.readFileSync("./adc_done.json")
        adcd_p = JSON.parse(adcd_str)
        adcd_p.push(data);
        fs.writeFileSync("./adc_done.json", JSON.stringify(adcd_p));
    },

    isValid(uHash){
        //console.log(uHash)
        fs = require('fs')
        ads_str = fs.readFileSync("./ads.json")
        ads_p = JSON.parse(ads_str)
        var BreakException = {};
        try{
            ads_p.forEach((cur_v, index)=>{
                if(cur_v.ads_id==uHash){
                   if( cur_v.number > 0 )
                        throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return true;
            }
          }
          return false;       
    },

    isValidU(userid){
        //console.log(uHash)
        fs = require('fs')
        u_str = fs.readFileSync("./users.json")
        u_p = JSON.parse(u_str)
        var BreakException = {};
        try{
            u_p.forEach((cur_v, index)=>{
                if(cur_v.user_id==userid){
                        throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return true;
            }
          }
          return false;       
    },

    isValidB(adb_id){
        //console.log(uHash)
        fs = require('fs')
        adb_str = fs.readFileSync("./adb.json")
        adb_p = JSON.parse(adb_str)
        var BreakException = {};
        try{
            adb_p.forEach((cur_v, index)=>{
                if(cur_v.adb_id==adb_id){
                   if( cur_v.number > 0 )
                        throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return true;
            }
          }
          return false;       
    },

    isValidC(adc_id){
        //console.log(uHash)
        fs = require('fs')
        adc_str = fs.readFileSync("./adc.json")
        adc_p = JSON.parse(adc_str)
        var BreakException = {};
        try{
            adc_p.forEach((cur_v, index)=>{
                if(cur_v.adc_id==adc_id){
                   if( cur_v.number > 0 )
                        throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return true;
            }
          }
          return false;       
    },

    isValidG(adg_id){
        //console.log(uHash)
        fs = require('fs')
        adg_str = fs.readFileSync("./adg.json")
        adg_p = JSON.parse(adg_str)
        var BreakException = {};
        try{
            adg_p.forEach((cur_v, index)=>{
                if(cur_v.adg_id==adg_id){
                   if( cur_v.number > 0 )
                        throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return true;
            }
          }
          return false;       
    },

    takeOne(uHash){
        fs = require('fs')
        ads_str = fs.readFileSync("./ads.json")
        ads_p = JSON.parse(ads_str)
        var BreakException = {};
        try{
            ads_p.forEach((cur_v, index)=>{
                if(cur_v.ads_id==uHash){
                   if( cur_v.number > 0 ){
                        cur_v.number = parseInt(cur_v.number) - 1;
                        throw BreakException;
                   }
                        
                }
            });
        } catch (e) {
            if (e == BreakException){
                fs.writeFileSync("./ads.json", JSON.stringify(ads_p));
                return true;
            }
          }    
        
        return false;
    },

    takeOneP(adp_id){
        fs = require('fs')
        adp_str = fs.readFileSync("./adp.json")
        adp_p = JSON.parse(adp_str)
        var BreakException = {};
        try{
            adp_p.forEach((cur_v, index)=>{
                if(cur_v.adp_id==adp_id){
                   if( cur_v.number > 0 ){
                        cur_v.number = parseInt(cur_v.number) - 1;
                        throw BreakException;
                   }
                        
                }
            });
        } catch (e) {
            if (e == BreakException){
                fs.writeFileSync("./adp.json", JSON.stringify(adp_p));
                return true;
            }
          }    
        
        return false;
    },

    takeOneB(adb_id){
        fs = require('fs')
        adb_str = fs.readFileSync("./adb.json")
        adb_p = JSON.parse(adb_str)
        var BreakException = {};
        try{
            adb_p.forEach((cur_v, index)=>{
                if(cur_v.adb_id==adb_id){
                   if( cur_v.number > 0 ){
                        cur_v.number = parseInt(cur_v.number) - 1;
                        throw BreakException;
                   }
                        
                }
            });
        } catch (e) {
            if (e == BreakException){
                fs.writeFileSync("./adb.json", JSON.stringify(adb_p));
                return true;
            }
          }    
        
        return false;
    },

    takeOneG(adg_id){
        fs = require('fs')
        adg_str = fs.readFileSync("./adg.json")
        adg_p = JSON.parse(adg_str)
        var BreakException = {};
        try{
            adg_p.forEach((cur_v, index)=>{
                if(cur_v.adg_id==adg_id){
                   if( cur_v.number > 0 ){
                        cur_v.number = parseInt(cur_v.number) - 1;
                        throw BreakException;
                   }
                        
                }
            });
        } catch (e) {
            if (e == BreakException){
                fs.writeFileSync("./adg.json", JSON.stringify(adg_p));
                return true;
            }
          }    
        
        return false;
    },

    takeOneC(adc_id){
        fs = require('fs')
        adc_str = fs.readFileSync("./adc.json")
        adc_p = JSON.parse(adc_str)
        var BreakException = {};
        try{
            adc_p.forEach((cur_v, index)=>{
                if(cur_v.adc_id==adc_id){
                   if( cur_v.number > 0 ){
                        cur_v.number = parseInt(cur_v.number) - 1;
                        throw BreakException;
                   }
                        
                }
            });
        } catch (e) {
            if (e == BreakException){
                fs.writeFileSync("./adc.json", JSON.stringify(adc_p));
                return true;
            }
          }    
        
        return false;
    },

    amountOf(uHash){
        fs = require('fs')
        ads_str = fs.readFileSync("./ads.json")
        ads_p = JSON.parse(ads_str)
        var amount = 0
        var BreakException = {};
        try{
            ads_p.forEach((cur_v, index)=>{
                if(cur_v.ads_id==uHash){
                    amount = cur_v.prize
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return amount;
            }
          }
          return amount;      
    },


    getPPrize(adp_id){
        fs = require('fs')
        adp_str = fs.readFileSync("./adp.json")
        adp_p = JSON.parse(adp_str)
        var amount = 0
        var BreakException = {};
        try{
            adp_p.forEach((cur_v, index)=>{
                if(cur_v.adp_id==adp_id){
                    amount = cur_v.prize
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return amount;
            }
          }
          return amount;      
    },

    getBPrize(adb_id){
        fs = require('fs')
        adb_str = fs.readFileSync("./adb.json")
        adb_p = JSON.parse(adb_str)
        var amount = 0
        var BreakException = {};
        try{
            adb_p.forEach((cur_v, index)=>{
                if(cur_v.adb_id==adb_id){
                    amount = cur_v.prize
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return amount;
            }
          }
          return amount;      
    },

    getCPrize(adc_id){
        fs = require('fs')
        adc_str = fs.readFileSync("./adc.json")
        adc_p = JSON.parse(adc_str)
        var amount = 0
        var BreakException = {};
        try{
            adc_p.forEach((cur_v, index)=>{
                if(cur_v.adc_id==adc_id){
                    amount = cur_v.prize
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return amount;
            }
          }
          return amount;      
    },

    getGPrize(adg_id){
        fs = require('fs')
        adg_str = fs.readFileSync("./adg.json")
        adg_p = JSON.parse(adg_str)
        var amount = 0
        var BreakException = {};
        try{
            adg_p.forEach((cur_v, index)=>{
                if(cur_v.adg_id==adg_id){
                    amount = cur_v.prize
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return amount;
            }
          }
          return amount;      
    },

    typeOf(uHash){
        fs = require('fs')
        ads_str = fs.readFileSync("./ads.json")
        ads_p = JSON.parse(ads_str)
        var type = ""
        var BreakException = {};
        try{
            ads_p.forEach((cur_v, index)=>{
                if(cur_v.ads_id==uHash){
                    type = cur_v.prize_t
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return type;
            }
          }
          return type;      
    },

    getPPrizeT(adp_id){
        fs = require('fs')
        adp_str = fs.readFileSync("./adp.json")
        adp_p = JSON.parse(adp_str)
        var type = ""
        var BreakException = {};
        try{
            adp_p.forEach((cur_v, index)=>{
                if(cur_v.adp_id==adp_id){
                    type = cur_v.prize_t
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return type;
            }
          }
          return type;      
    },

    getBPrizeT(adb_id){
        fs = require('fs')
        adb_str = fs.readFileSync("./adb.json")
        adb_p = JSON.parse(adb_str)
        var type = ""
        var BreakException = {};
        try{
            adb_p.forEach((cur_v, index)=>{
                if(cur_v.adb_id==adb_id){
                    type = cur_v.prize_t
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return type;
            }
          }
          return type;      
    },

    getGPrizeT(adg_id){
        fs = require('fs')
        adg_str = fs.readFileSync("./adg.json")
        adg_p = JSON.parse(adg_str)
        var type = ""
        var BreakException = {};
        try{
            adg_p.forEach((cur_v, index)=>{
                if(cur_v.adg_id==adg_id){
                    type = cur_v.prize_t
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return type;
            }
          }
          return type;      
    },

    getCPrizeT(adc_id){
        fs = require('fs')
        adc_str = fs.readFileSync("./adc.json")
        adc_p = JSON.parse(adc_str)
        var type = ""
        var BreakException = {};
        try{
            adc_p.forEach((cur_v, index)=>{
                if(cur_v.adc_id==adc_id){
                    type = cur_v.prize_t
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return type;
            }
          }
          return type;      
    },

    creditUser(userid, prize, type){

        if(userid==undefined)
            return

        var fs = require("fs")

        balance_str = fs.readFileSync("./balance.json")
        balance_p = JSON.parse(balance_str)

        users_str = fs.readFileSync("./users.json")
        users_p = JSON.parse(users_str)

        pmsg_str = fs.readFileSync('./pmsg.json')
        pmsg_p = JSON.parse(pmsg_str);

        var BreakException = {};
        try{
            balance_p.forEach((cur_v, index)=>{
                if(cur_v.user_id==userid){
                    cur_v[type] = parseFloat(cur_v[type] + parseFloat(prize));  
                    if(this.isFrench( userid)){
                        pmsg_p.push({
                            "chatid" : userid,
                            "msg" : "🎁Bravo ! Vous avez reçu "+parseFloat(prize).toFixed(8)+" de "+type+" !",
                            "valid": "yes"
                        })   
                    }else{
                        pmsg_p.push({
                            "chatid" : userid,
                            "msg" : "🎁Bravo ! You received "+parseFloat(prize).toFixed(8)+" of "+type+" !",
                            "valid": "yes"
                        })   
                    }           
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                fs.writeFileSync("./balance.json", JSON.stringify(balance_p));
                fs.writeFileSync("./pmsg.json", JSON.stringify(pmsg_p));
                
                return true;
            }
          }
          return false;   
    },
    isAvailableS(userid){
        var vals = []
        vals[0] = false
        fs = require('fs')
        ads_str = fs.readFileSync("./ads.json")
        ads_p = JSON.parse(ads_str)
        var BreakException = {};
        try{
            ads_p.forEach((cur_v, index)=>{
                if(cur_v.number > 0 && !this.userDone(cur_v.ads_id, userid)){
                    //console.log("dajjjjjjjjjjjjjjjjjjjjj")
                    vals[0] = true;
                    vals[1] = cur_v.ads_id;
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return vals;
            }
          }
          return vals;   
    },

    isAvailableP(userid){
        var vals = []
        vals[0] = false
        fs = require('fs')
        adp_str = fs.readFileSync("./adp.json")
        adp_p = JSON.parse(adp_str)
        var BreakException = {};
        try{
            adp_p.forEach((cur_v, index)=>{
                if(cur_v.number > 0 && !this.userDoneP(cur_v.adp_id, userid)){
                    //console.log("dajjjjjjjjjjjjjjjjjjjjj")
                    vals[0] = true;
                    vals[1] = cur_v.adp_id;
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return vals;
            }
          }
          return vals;   
    },


    isAvailableB(userid){
        var vals = []
        vals[0] = false
        fs = require('fs')
        adb_str = fs.readFileSync("./adb.json")
        adb_p = JSON.parse(adb_str)
        var BreakException = {};
        try{
            adb_p.forEach((cur_v, index)=>{
                if(cur_v.number > 0 && !this.userDoneB(cur_v.adb_id, userid)){
                    //console.log("dajjjjjjjjjjjjjjjjjjjjj")
                    vals[0] = true;
                    vals[1] = cur_v.adb_id;
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return vals;
            }
          }
          return vals;   
    },

    isAvailableCG(userid){
        var vals = []
        vals[0] = false
        fs = require('fs')
        ad_str = fs.readFileSync("./adg.json")
        ad_p = JSON.parse(ad_str)
        var BreakException = {};
        try{
            ad_p.forEach((cur_v, index)=>{
                if(cur_v.number > 0 && !this.userDoneG(cur_v.adg_id, userid)){
                    //console.log("dajjjjjjjjjjjjjjjjjjjjj")
                    vals[0] = true;
                    vals[1] = "gro"
                    vals[2] = cur_v.adg_id;
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return vals;
            }
          }

          ad_str = fs.readFileSync("./adc.json")
          ad_p = JSON.parse(ad_str)

          try{
            ad_p.forEach((cur_v, index)=>{
                if(cur_v.number > 0 && !this.userDoneC(cur_v.adc_id, userid)){
                    //console.log("dajjjjjjjjjjjjjjjjjjjjj")
                    vals[0] = true;
                    vals[1] = "cha"
                    vals[2] = cur_v.adc_id;
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return vals;
            }
        }

          return vals;   
    },

    userDone(ads_id, userid){
        fs = require('fs')
        adsd_str = fs.readFileSync("./ads_done.json")
        adsd_p = JSON.parse(adsd_str)
        var BreakException = {};
        try{
            adsd_p.forEach((cur_v, index)=>{
                if(cur_v.ads_id==ads_id && cur_v.user_id==userid){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                //console.log("bloooooooooooooooom")
                return true;
            }
          }
          //console.log("tiammmmmmmmmmmmmmmmm")
          return false;          
    },


    userDoneP(adp_id, userid){
        fs = require('fs')
        adpd_str = fs.readFileSync("./adp_done.json")
        adpd_p = JSON.parse(adpd_str)
        var BreakException = {};
        try{
            adpd_p.forEach((cur_v, index)=>{
                if(cur_v.adp_id==adp_id && cur_v.user_id==userid){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){

                return true;
            }
          }

          return false;          
    },

    userDoneB(adb_id, userid){
        fs = require('fs')
        adbd_str = fs.readFileSync("./adb_done.json")
        adbd_p = JSON.parse(adbd_str)
        var BreakException = {};
        try{
            adbd_p.forEach((cur_v, index)=>{
                if(cur_v.adb_id==adb_id && cur_v.user_id==userid){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){

                return true;
            }
          }

          return false;          
    },

    userDoneG(adg_id, userid){
        fs = require('fs')
        adgd_str = fs.readFileSync("./adg_done.json")
        adgd_p = JSON.parse(adgd_str)
        var BreakException = {};
        try{
            adgd_p.forEach((cur_v, index)=>{
                if(cur_v.adg_id==adg_id && cur_v.user_id==userid){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){

                return true;
            }
          }

          return false;          
    },

    userDoneC(adc_id, userid){
        fs = require('fs')
        adcd_str = fs.readFileSync("./adc_done.json")
        adcd_p = JSON.parse(adcd_str)
        var BreakException = {};
        try{
            adcd_p.forEach((cur_v, index)=>{
                if(cur_v.adc_id==adc_id && cur_v.user_id==userid){
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){

                return true;
            }
          }

          return false;          
    },

    createSTO(userid, uHash, lang){
        var hash = this.hash(userid,uHash)
        if(lang=="fr"){
            var s_opt = {
                'reply_markup':{
                    'inline_keyboard':[
                        [{text:"Visiter", url: "https://festive-afterthought.glitch.me/view/"+hash}, {text:"✅ Fait", "callback_data":"sdone"}]
                    ]
                }
            }
        }else if(lang=="en"){
            var s_opt = {
                'reply_markup':{
                    'inline_keyboard':[
                        [{text:"Visit", url: "https://festive-afterthought.glitch.me/view/"+hash}, {text:"✅ Done", "callback_data":"sdone"}]
                    ]
                }
            }
        }
        return s_opt;
    },

    createPTO(userid, uHash, lang){
        if(lang=="fr"){
            var s_opt = {
                'reply_markup':{
                    'inline_keyboard':[
                        [{text:"✅ Confirmer", "callback_data":"pdone:"+uHash}]
                    ]
                }
            }
        }else if(lang=="en"){
            var s_opt = {
                'reply_markup':{
                    'inline_keyboard':[
                        [{text:"✅ Confirm", "callback_data":"pdone:"+uHash}]
                    ]
                }
            }
        }
        return s_opt;
    },

    createBTO(userid, uHash, lang){
        if(lang=="fr"){
            var s_opt = {
                'reply_markup':{
                    'inline_keyboard':[
                        [{text:"Démarrer Le Bot", "url": this.getBotUrl(uHash)}, {text:"🚫 Signaler Le Bot", callback_data:"bbot"+uHash}]
                    ]
                }
            }
        }else if(lang=="en"){
            var s_opt = {
                'reply_markup':{
                    'inline_keyboard':[
                        [{text:"Start Bot", "url": this.getBotUrl(uHash)}, {text:"🚫 Report Bot", callback_data:"bbot"+uHash}]
                    ]
                }
            }
        }
        return s_opt;
    },

    createGTO(userid, uHash, lang){
        if(lang=="fr"){
            var s_opt = {
                'reply_markup':{
                    'inline_keyboard':[
                        [{text:"Rejoindre", "url": this.getGroLink(uHash)}, {text:"✅ Confirm", "callback_data":"gdone:"+uHash}, {text:"⏩ Passer", "callback_data":"skipg:"+uHash}]
                    ]
                }
            }
        }else if(lang=="en"){
            var s_opt = {
                'reply_markup':{
                    'inline_keyboard':[
                        [{text:"Join", "url": this.getGroLink(uHash)}, {text:"✅ Confirm", "callback_data":"gdone:"+uHash}, {text:"⏩ Skip", "callback_data":"skipg:"+uHash}]
                    ]
                }
            }
        }
        return s_opt;
    },

    createCTO(userid, uHash, lang){
        if(lang=="fr"){
            var s_opt = {
                'reply_markup':{
                    'inline_keyboard':[
                        [{text:"Rejoindre", "url": this.getChaLink(uHash)}, {text:"✅ Confirm", "callback_data":"cdone:"+uHash}, {text:"⏩ Passer", "callback_data":"skipc:"+uHash}]
                    ]
                }
            }
        }else if(lang=="en"){
            var s_opt = {
                'reply_markup':{
                    'inline_keyboard':[
                        [{text:"Join", "url": this.getChaLink(uHash)}, {text:"✅ Confirm", "callback_data":"cdone:"+uHash}, {text:"⏩ Skip", "callback_data":"skipc:"+uHash}]
                    ]
                }
            }
        }
        return s_opt;
    },
    

    addAdp( userid, values, type){

        console.log("User "+userid+" just created Ad of type "+type+" !\n");
        logger.error("User "+userid+" just created Ad of type "+type+" !\n");

        var fs = require("fs")
        var MD5 = require("./MD5.js")
        var adp_str = fs.readFileSync("./adp.json");
        var adpd_str = fs.readFileSync("./adp_done.json");

        var adp_p = JSON.parse(adp_str);
        var adpd_p = JSON.parse(adpd_str);

        var tpay = values[2]*values[3]

        this.takeMoney(userid, tpay, type);

        var ad_id = MD5.MD5.MD5(values[0][1]+Date.now)

        //console.log(ad_id+"::"+userid+"::"+url+"::"+values+"::"+type);
        
       // var ad = { }
       // var add = {}

        adp_p.push({
            "adp_id":ad_id,
            "userid":userid,
            "msgChatId":values[0][0],
            "msgId":values[0][1],
            "number": values[2],
            "prize_t":type,
            "prize":parseFloat(parseFloat(values[3] / 2).toFixed(8))
       });

        adpd_p.push({
            "adp_id":ad_id,
             "user_id":parseInt(userid)
        });

        this.saveDataP(adp_p, adpd_p);

        this.iGain(tpay, type);

    },

    saveDataP(ad, add){
        var fs = require("fs")
        var adp_str = JSON.stringify(ad);
        var adpd_str = JSON.stringify(add);

        fs.writeFileSync("adp.json", adp_str);
        fs.writeFileSync("adp_done.json", adpd_str);
    },

    // {"adp_id":"eza1zze6z","userid":8888888888,"msgChatId":526677,"msgId":767,"number":0,"prize_t":"xbt","prize":5e-7}
    getForwardParams(adp_id){
        var val = []

        fs = require('fs')
        adp_str = fs.readFileSync("./adp.json")
        adp_p = JSON.parse(adp_str)
        var BreakException = {};
        try{
            adp_p.forEach((cur_v, index)=>{
                if(cur_v.adp_id==adp_id){
                    val[0] = cur_v.msgChatId;
                    val[1] = cur_v.msgId 
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                //console.log("bloooooooooooooooom")
                return val;
            }
          }
          //console.log("tiammmmmmmmmmmmmmmmm")
          return val;    
    },

    pCheck(userid, adp_id){
       // console.log("seeeeeeeeeeeeeeeem")
       // console.log(adp_id)
       // console.log("seeeeeeeeeeeeeeeem")

        var fs = require("fs");
        var adp_str = fs.readFileSync("./adp.json");
        var adp_p = JSON.parse(adp_str);
 
        var BreakException = {};
        try{
            adp_p.forEach((cur_v, index)=>{
               // console.log("sooooooooooooooooooom")
                //console.log("ooooo::::"+cur_v.adp_id+"____"+adp_id+"::::ooooo")
                if(cur_v.adp_id==adp_id){
                    //console.log("syyyyyyyyyyyyyyyyyyyyyyyyyyym")
                    if(!this.userDoneP(adp_id, userid)){
                        //console.log("saaaaaaaaaaaaaaaaaaaaaaam")
                        throw BreakException;
                    }
                }
            });
        } catch (e) {
            if (e == BreakException){
                return true;
            }
          }

          return false; 

    },

    gCheck(userid, adg_id){
        // console.log("seeeeeeeeeeeeeeeem")
        // console.log(adp_id)
        // console.log("seeeeeeeeeeeeeeeem")
 
         var fs = require("fs");
         var adg_str = fs.readFileSync("./adg.json");
         var adg_p = JSON.parse(adg_str);
  
         var BreakException = {};
         try{
             adg_p.forEach((cur_v, index)=>{
                // console.log("sooooooooooooooooooom")
                 //console.log("ooooo::::"+cur_v.adp_id+"____"+adp_id+"::::ooooo")
                 if(cur_v.adg_id==adg_id){
                     //console.log("syyyyyyyyyyyyyyyyyyyyyyyyyyym")
                     if(!this.userDoneG(adg_id, userid)){
                         //console.log("saaaaaaaaaaaaaaaaaaaaaaam")
                         throw BreakException;
                     }
                 }
             });
         } catch (e) {
             if (e == BreakException){
                 return true;
             }
           }
 
           return false; 
 
     },

     cCheck(userid, adc_id){
        // console.log("seeeeeeeeeeeeeeeem")
        // console.log(adp_id)
        // console.log("seeeeeeeeeeeeeeeem")
 
         var fs = require("fs");
         var adc_str = fs.readFileSync("./adc.json");
         var adc_p = JSON.parse(adc_str);
  
         var BreakException = {};
         try{
             adc_p.forEach((cur_v, index)=>{
                // console.log("sooooooooooooooooooom")
                 //console.log("ooooo::::"+cur_v.adp_id+"____"+adp_id+"::::ooooo")
                 if(cur_v.adc_id==adc_id){
                     //console.log("syyyyyyyyyyyyyyyyyyyyyyyyyyym")
                     if(!this.userDoneC(adc_id, userid)){
                         //console.log("saaaaaaaaaaaaaaaaaaaaaaam")
                         throw BreakException;
                     }
                 }
             });
         } catch (e) {
             if (e == BreakException){
                 return true;
             }
           }
 
           return false; 
 
     },

    getBotUrl(adb_id){
        fs = require('fs')
        adb_str = fs.readFileSync("./adb.json")
        adb_p = JSON.parse(adb_str)
        var link = ""
        var BreakException = {};
        try{
            adb_p.forEach((cur_v, index)=>{
                if(cur_v.adb_id==adb_id){
                    link = cur_v.botLink
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return link;
            }
          }
          return link;      
    },

    getUsername(adb_id){
        fs = require('fs')
        adb_str = fs.readFileSync("./adb.json")
        adb_p = JSON.parse(adb_str)
        var username = ""
        var BreakException = {};
        try{
            adb_p.forEach((cur_v, index)=>{
                if(cur_v.adb_id==adb_id){
                    username = cur_v.botName
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return username;
            }
          }
          return username;        
    },

    getRefCount(userid){
        fs = require('fs')
        u_str = fs.readFileSync("./refs.json")
        u_p = JSON.parse(u_str)
        var c = 0
        var BreakException = {};

            u_p.forEach((cur_v, index)=>{
                if(cur_v.userid==userid){
                    c++;
                }
            });

          return c;        
    },

    addRef(u_id, ref_id){
        console.log("User "+ref_id+" registred as "+ u_id+" referal !\n");
        logger.error("User "+ref_id+" registred as "+ u_id+" referal !\n");

        r_str = fs.readFileSync("./refs.json")
        r_p = JSON.parse(r_str)
        r_p.push({
            "userid" : u_id,
            "ref" : ref_id
        });
        fs.writeFileSync("./refs.json", JSON.stringify(r_p));
    },

    getFromUserBalance(user_id, type, quant){
        var fs = require("fs");

        b_str = fs.readFileSync("./balance.json")
        b_p = JSON.parse(b_str)

        var BreakException = {};
        try{
            b_p.forEach((cur_v, index)=>{
                if(cur_v.user_id==user_id){
                    //console.log(cur_v[type] - quant)

                    cur_v[type] = parseFloat(parseFloat(cur_v[type] - quant).toFixed(8))

                    //console.log(parseFloat(cur_v[type]) - parseFloat(quant))

                    throw BreakException;
                }
            });
        } catch (e) {
            fs.writeFileSync("./balance.json", JSON.stringify(b_p));
            return true;
          }

          return false;
         
    },

    createWithdrawalRequest(user_id, add, quant, type){
        console.log("User "+user_id+" created a withdrawal request of "+ quant + " "+type+" !\n");
        logger.error("User "+user_id+" created a withdrawal request of "+ quant + " "+type+" !\n");

        var fs = require("fs");
        var MD5 = require("./MD5.js");

        wr_str = fs.readFileSync("./wrequests.json")
        wr_p = JSON.parse(wr_str)

        var reqid = MD5.MD5.MD5(Date.now()+user_id+add);
        wr_p.push({
            "user_id": user_id,
            "type": type,
            "quantity" : quant,
            "address" : add,
            "reqid": reqid
        })

        fs.writeFileSync("./wrequests.json", JSON.stringify(wr_p));

        return reqid;
    },

    adArchiver(){
        var fs = require("fs")

        frenchON = function(user_id){
            var fs = require("fs");
            var users = JSON.parse(fs.readFileSync("./users.json"))
    
            var BreakException = {};
            try{
                users.forEach((cur_v, index)=>{
                    if(cur_v.user_id==user_id && cur_v.lang=="fr"){
                        throw BreakException;
                    }
                });
            } catch (e) {
                if (e == BreakException){
                    return true;
                }
              }
            return false; 
        }

        var ad_str = fs.readFileSync("./ads.json");
        var ad_p = JSON.parse(ad_str);
        var arc_str = fs.readFileSync("./archive_ad.json");
        var arc_p = JSON.parse(arc_str);

        var pm = JSON.parse(fs.readFileSync("./pending_msg.json"));
        var val = false
        var val2 = false
        var msg   
      
        ad_p.forEach((element, index) => {
          if(element.number==0){
            arc_p.push(element);
            ad_p.splice(index);
            val = true
            val2 = true

            pm.push({
                "userid" : element.user_id,
                "msg" : frenchON(element.user_id) ? "🎈 Votre promotion de site *"+ element.ads_id + "* a été complétée !" : "🎈 Your site ad *"+ element.ads_id + "* is completed !"
            })
          }
        });
        if(val)
            fs.writeFileSync("./ads.json", JSON.stringify(ad_p));

        
        val = false
        ad_str = fs.readFileSync("./adb.json");
        ad_p = JSON.parse(ad_str);
      
        ad_p.forEach((element, index) => {
          if(element.number==0){
            arc_p.push(element);
            ad_p.splice(index);
            val = true
            val2 = true

            pm.push({
                "userid" : element.user_id,
                "msg" : frenchON(element.user_id) ? "🎈 Votre promotion de bot *"+ element.adb_id +"* a été complétée !" : "🎈 Your bot ad *"+ element.adb_id +"* is completed !"
            })
          }
        });
        if(val)
            fs.writeFileSync("./adb.json", JSON.stringify(ad_p));

        val = false
        ad_str = fs.readFileSync("./adc.json");
        ad_p = JSON.parse(ad_str);
      
        ad_p.forEach((element, index) => {
          if(element.number==0){
            arc_p.push(element);
            ad_p.splice(index);
            val = true
            val2 = true

            pm.push({
                "userid" : element.user_id,
                "msg" : frenchON(element.user_id) ? "🎈 Votre promotion de chaîne *"+ element.adc_id + "* a été complétée !" : "🎈 Your channel ad *"+ element.adc_id + "* is completed !"
            })
            
          }
        });
        if(val)
            fs.writeFileSync("./adc.json", JSON.stringify(ad_p));

        val = false  
        ad_str = fs.readFileSync("./adg.json");
        ad_p = JSON.parse(ad_str);
      
        ad_p.forEach((element, index) => {
          if(element.number==0){
            arc_p.push(element);
            ad_p.splice(index);
            val = true
            val2 = true

            pm.push({
                "userid" : element.user_id,
                "msg" : frenchON(element.user_id) ? "🎈 Votre promotion de group *"+ element.adg_id + "* a été complétée !" : "🎈 Your group ad *"+ element.adg_id + "* is completed !"
            })
          }
        });
        if(val)
            fs.writeFileSync("./adg.json", JSON.stringify(ad_p));
      
        ad_str = fs.readFileSync("./adp.json");
        ad_p = JSON.parse(ad_str);
      
        ad_p.forEach((element, index) => {
          if(element.number==0){
            arc_p.push(element);
            ad_p.splice(index);
            val = true
            val2 = true

            pm.push({
                "userid" : element.user_id,
                "msg" : frenchON(element.user_id) ? "🎈 Votre promotion de post *"+ element.adp_id +"* a été complétée !" : "🎈 Your post ad *"+ element.adp_id +"* is completed !"
            })
          }
        });
        if(val)
            fs.writeFileSync("./adp.json", JSON.stringify(ad_p));
      
        if(val2){
            fs.writeFileSync("./archive_ad.json", JSON.stringify(arc_p));
            fs.writeFileSync("./pending_msg.json", JSON.stringify(pm));
        }
            
      },

      reportBot(adb_id, user_id){

        console.log("User "+user_id+" just reported botAd "+adb_id+" !\n");
        logger.error("User "+user_id+" just reported botAd "+adb_id+" !\n");

        var fs = require("fs")
        var rep_str = fs.readFileSync("./reported_bots.json");
        var rep_p = JSON.parse(rep_str);
        var BreakException = {};
        var val = false
        try{
            rep_p.forEach((cur_v, index)=>{
                if(cur_v.adb_id==adb_id){
                    cur_v.count = cur_v.count + 1
                    throw BreakException;
                }
            })
        } catch(e){
            val = true
        }

        if(!val){
            rep_p.push({
                "adb_id" : adb_id,
                "count" : 1
            })

            fs.writeFileSync("./reported_bots.json", JSON.stringify(rep_p));
        }
        this.addDoneB({
            "adb_id" : adb_id,
            "user_id" : user_id
        })
      },

      banAd(ad_id, type){
          console.log("Add "+ad_id+" of type "+type+" just get banned !\n");
          logger.error("Add "+ad_id+" of type "+type+" just get banned !\n");

          var fs = require("fs")
          var b_str = fs.readFileSync("./banned_ads.json");
          var b_p = JSON.parse(b_str);
          var ad_str
          var ad_p
          var BreakException = {};

          switch(type){
              case "ads":
                ad_str = fs.readFileSync("./ads.json");
                ad_p = JSON.parse(ad_str);
                try{
                    ad_p.forEach((cur_v, index)=>{
                        if(cur_v.ads_id==ad_id){
                            b_p.push(element);
                            ad_p.splice(index);    
                            throw BreakException;
                        }
                    })
                } catch(e){
                    fs.writeFileSync("./ads.json", JSON.stringify(ad_p));
                    fs.writeFileSync("./banned_ads.json", JSON.stringify(b_p));
                    return true;
                }
                break;

            case "adb":
                ad_str = fs.readFileSync("./adb.json");
                ad_p = JSON.parse(ad_str);
                try{
                    ad_p.forEach((cur_v, index)=>{
                        if(cur_v.adb_id==ad_id){
                            b_p.push(cur_v);
                            ad_p.splice(index);   
                            throw BreakException;
                        }
                    })
                } catch(e){
                    fs.writeFileSync("./adb.json", JSON.stringify(ad_p));
                    fs.writeFileSync("./banned_ads.json", JSON.stringify(b_p));
                    return true;
                }
                break;

            case "adg":
                ad_str = fs.readFileSync("./adg.json");
                ad_p = JSON.parse(ad_str);
                try{
                    ad_p.forEach((cur_v, index)=>{
                        if(cur_v.adg_id==ad_id){
                            b_p.push(element);
                            ad_p.splice(index);    
                            throw BreakException;
                        }
                    })
                } catch(e){
                    fs.writeFileSync("./adg.json", JSON.stringify(ad_p));
                    fs.writeFileSync("./banned_ads.json", JSON.stringify(b_p));
                    return true;
                }
                break;

                case "adc":
                ad_str = fs.readFileSync("./adc.json");
                ad_p = JSON.parse(ad_str);
                try{
                    ad_p.forEach((cur_v, index)=>{
                        if(cur_v.adc_id==ad_id){
                            b_p.push(element);
                            ad_p.splice(index);    
                            throw BreakException;
                        }
                    })
                } catch(e){
                    fs.writeFileSync("./adc.json", JSON.stringify(ad_p));
                    fs.writeFileSync("./banned_ads.json", JSON.stringify(b_p));
                    return true;
                }
                break;
          }
          return false;
      },

      getReferer(user_id){
        var  fs = require("fs");
        var refs = JSON.parse(fs.readFileSync("./refs.json"));
        var val = undefined
        var BreakException = {};
        try{
            refs.forEach((cur_v, index)=>{
                if(cur_v.ref==user_id){
                    val = cur_v.userid
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return val;
            }
          }
        return val;
      },

      addPM(data){
          var fs = require("fs")
          var pm = JSON.parse(fs.readFileSync("./pending_msg.json"));
          pm.push(data);
          fs.writeFileSync("./pending_msg.json", JSON.stringify(pm));
      },

      iGain(quant, type){
        console.log("I just gain "+quant+" "+type+" !\n");
        logger.error("I just gain "+quant+" "+type+" !\n");

        var fs = require("fs")
        var mg = JSON.parse(fs.readFileSync("./mygains.json"));

        mg[type] = parseFloat(parseFloat(mg[type] + quant));

        fs.writeFileSync("./mygains.json", JSON.stringify(mg));
      },

      getDepositAddr(user_id, type){
        var  fs = require("fs");
        var dep = JSON.parse(fs.readFileSync("./deposit.json"));
        var val = null
        var BreakException = {};
        try{
            dep.forEach((cur_v, index)=>{
                if(cur_v.user_id==user_id && cur_v.type==type){
                    val = cur_v.addr;
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return val;
            }
          }
        return val;
      },

    creditor2(){
        const http = require('http');
        var fs = require("fs")
        var fetch = require("node-fetch")

        var dep = JSON.parse(fs.readFileSync("./deposit.json"));

        var BlockIo = require('block_io');
        var version = 2; // API version
        var xblock_io = new BlockIo('6f6f-6587-0ac7-9ae6', 'VARMYpass1998', version);
        var lblock_io = new BlockIo('3939-ca7a-a368-b288', 'VARMYpass1998', version);

        dep.forEach((element, index) => {
            var amount = 0
            if(element.type=="xbt"){
                xblock_io.get_transactions({'type': 'received', 'addresses': element.addr}, function(err, result){
                  if(result==undefined || result.data==undefined && result.data.txs==undefined){
                  }else{
                    result.data.txs.forEach(elt => {
                          if(elt.confirmations>=4){
                              elt.amounts_received.forEach(elnt => {
                                  amount = parseFloat(parseFloat(amount + elnt.amount).toFixed(8))
                              });
                          }
                      });
                  }
                });
            }else if(element.type=="ltc"){
                lblock_io.get_transactions({'type': 'received', 'addresses': element.addr}, function(err, result){
                  if(result==undefined || result.data==undefined && result.data.txs==undefined){
                  }else{  
                    result.data.txs.forEach((elt, id )=> {
                          if(elt.confirmations>=4){
                              elt.amounts_received.forEach(elnt => {
                                  amount = parseFloat(parseFloat(amount + elnt.amount).toFixed(8))
                              });
                          }
                      });
                  }
                });
            }else if(element.type=="eth"){
                fetch('https://api.etherscan.io/api?module=account&action=txlist&address='+element.addr+'\
                &startblock=0&endblock=99999999&page=1&offset=5&sort=desc&apikey=YourApiKeyToken')
                .then(res => res.json())
                .then(json => {
                    if(json.status==1 && json.message=="OK"){
                        json.result.forEach(elt => {
                            if(elt.confirmations>=4 && elt.to==element.addr){
                                amount = parseFloat(parseFloat(amount + elt.value/1000000000000000000).toFixed(8))
                            }
                        });
                    }
                });
            }

            var cd = this.creditDeposit
            var isf = this.isFrench
            var apm = this.addPM

            function doit(){
                if((amount!=0 && element.type=="xbt" && amount >= 0.001) || (amount!=0 && element.type=="ltc" && amount >= 0.05) || (amount!=0 && element.type=="eth" && amount >= 0.01)){
                    if(isf(element.user_id)){
                       apm({
                            "userid" : element.user_id,
                            "msg" : "🎈 Votre dépôt a été crédité à votre balance !"
                        })  
                    }else{
                        apm({
                            "userid" : element.user_id,
                            "msg" : "🎈 Your deposit has been credited to your balance !"
                        }) 
                    }
    
                    cd(element.user_id, amount, element.type);
                    dep.splice(index);
                    fs.writeFileSync("./deposit.json", JSON.stringify(dep));
    
                }else if((amount > 0 && element.type=="xbt" && amount < 0.001) || (amount!=0 && element.type=="ltc" && amount < 0.05) || (amount!=0 && element.type=="eth" && amount < 0.01)){
                    dep.splice(index);
                    fs.writeFileSync("./deposit.json", JSON.stringify(dep));    
                }
            }

            setTimeout(doit, 2000);
        });
    },

    creditor3(){
        const http = require('http');
        var fs = require("fs")
        var dep = JSON.parse(fs.readFileSync("./deposit.json"));


        dep.forEach((element, index) => {
            if(element.type=="eth"){
                
            }
        });
    },



    creditor(){
        var fs = require("fs")
        var dep = JSON.parse(fs.readFileSync("./deposit.json"));

        var Client = require('coinbase').Client;

        var client = new Client({
            'apiKey': '22nrjUOeebGnj2ng',
            'apiSecret': 'D4bwAaXTTzldbKIQVs2jPOzmiJi4l2SQ'
          });

        dep.forEach((element, index) => {
            var ac = null
            var amount = 0
            switch(element.type){
                case  "xbt":
                    ac = "8fa18eac-4fd4-52a7-84f8-97472bc005bc"
                    break;

                case  "eth":
                    ac = "16c8fc1e-1d3b-5f1e-8541-727fac78a77b"
                    break;

                case  "ltc":
                    ac = "66da1bd1-af31-582b-9d87-4727cc3c03cc"
                    break;
            }
            
            if(ac==null) return;


            client.getAccount(ac, function(err, account) {
                account.getAddress(element.addr, function(err, address) {
                    if(address==null)
                        return;
                    address.getTransactions({}, function(err, txs) {
                    //console.log(txs);
                    txs.forEach(elt => {
                        amount = parseFloat(parseFloat(amount + elt.amount.amount).toFixed(8))
                    });
                    });
                });
            });

            var cd = this.creditDeposit
            var isf = this.isFrench
            var apm = this.addPM

            setTimeout(function(){
                if(amount!=0){

                    if(isf(element.user_id)){
                        apm({
                            "userid" : element.user_id,
                            "msg" : "🎈 Votre dépôt a été crédité à votre balance !"
                        })  
                    }else{
                        apm({
                            "userid" : element.user_id,
                            "msg" : "🎈 Your deposit has been credited to your balance !"
                        }) 
                    }           


                    cd(element.user_id, amount, element.type);
                    dep.splice(index);
                    fs.writeFileSync("./deposit.json", JSON.stringify(dep));
                }
            }, 2000);

        });
      },

    creditDeposit(userid, prize, type){
        console.log("User "+userid+" just get credited deposit of "+ prize+" "+type+" \n");
        logger.error("User "+userid+" just get credited deposit of "+ prize+" "+type+" \n");
        if(userid==undefined)
            return

        var fs = require("fs")

        var bd = JSON.parse(fs.readFileSync("./balanced.json"))

        var BreakException = {};
        try{
            bd.forEach((cur_v, index)=>{
                if(cur_v.user_id==userid){

                    cur_v[type] = parseFloat(cur_v[type] + prize);  

                    fs.writeFileSync("./balanced.json", JSON.stringify(bd));
                    
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return true;
            }
        }
        return false; 
    },
  
      savePrevious(userid, val){
        var fs = require("fs")
        var bd = JSON.parse(fs.readFileSync("./previous.json"))

        var BreakException = {};
        try{
            bd.forEach((cur_v, index)=>{
                if(cur_v.user_id==userid){
                    cur_v["val"] = val
                    fs.writeFileSync("./previous.json", JSON.stringify(bd));               
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return true;
            }
        }
        bd.push({
            "user_id" : userid,
            "val": val
        })
        fs.writeFileSync("./previous.json", JSON.stringify(bd)); 
        return false; 
    },

    loadPrevious(userid){
        var val = ""

        var fs = require("fs")
        var bd = JSON.parse(fs.readFileSync("./previous.json"))

        var BreakException = {};
        try{
            bd.forEach((cur_v, index)=>{
                if(cur_v.user_id==userid){
                    val = cur_v["val"]
                    bd.splice(index);
                    fs.writeFileSync("./previous.json", JSON.stringify(bd));               
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e == BreakException){
                return val;
            }
        }
        return val;
    },

    getPINURL(userid){
        if(this.dayDone(userid))
            return;

        console.log("gggggggggg")

        var hash = this.hashPIN(userid);

        var urlf = "http://advertxbotapp-advertxbot.1d35.starter-us-east-1.openshiftapps.com/spin/"+hash;

        console.log('niiiiiicciccccccccccciiiiiiii');

        return urlf;
    },

    dayDone(userid){
        var fs = require("fs")
        var bd = JSON.parse(fs.readFileSync("./pindone.json"))
        var BreakException = {};

        try{
            bd.forEach(cur_v=>{
                if(cur_v.user_id==userid){
                    if(cur_v.count>=5){
                        throw BreakException;
                    }            
                }
            });
        } catch (e) {
            if (e == BreakException){
                return true;
            }
        }
        return false;      
    },

    hashPIN(userid){
        userid = userid + "";
        
        if(this.dayDone(userid))
            return;

        console.log("booooooolllll;;;"+userid)

        var pin = this.secPinGEN();

        this.setActualPIN(userid, pin);

        console.log("xxxxxxxxxxxxxxxxxxxx::"+userid.charAt(4));

        var hash = ""

        for(let i=0; i<5; i++){
            hash = hash + "" + pin.charAt(i);
            hash = hash + "" + userid.charAt(i);
        }

        console.log("nnnnnnnnnnnnnnnnnnnnnnnnn")

        hash = hash + "" + userid.slice(5, userid.length);

        return hash;

    },

    dehashPIN(hash){
        var userid = ""
        var pin = ""
        for(let i=0; i<10; i++){
            if(i%2==0)
                pin = pin +""+ hash.charAt(i);
            else
                userid = userid +""+ hash.charAt(i+1);
        }
        userid = userid + "" + hash.slice(10, hash.length);

        if(this.dayDone(userid))
            return "error";

        return {"userid" : userid, "pin" : pin};
    },

    secPinGEN(){
        var securePin = require("secure-pin");
        var pin = securePin.generatePinSync(5);
        return pin;
    },

    getPIN(userid){
        var fs = require("fs")
        var bd = JSON.parse(fs.readFileSync("./pindone.json"))
        var BreakException = {};
        var pin = "";

        try{
            bd.forEach(cur_v=>{
                if(cur_v.user_id==userid){
                    pin = cur_v.actual;
                    throw BreakException;            
                }
            });
        } catch (e) {
            if (e == BreakException){
                return pin;
            }
        }
        return pin;      
    },

    incrPinDone(userid){
        var fs = require("fs")
        var bd = JSON.parse(fs.readFileSync("./pindone.json"))
        var BreakException = {};

        try{
            bd.forEach(cur_v=>{
                if(cur_v.user_id==userid){
                    cur_v.count++;
                    throw BreakException;            
                }
            });
        } catch (e) {
            if (e == BreakException){
            }
        }
        fs.writeFileSync("./pindone.json", JSON.stringify(bd));      
        
        logger.error("User "+userid+" just accompished PIN Task !\n");
    },

    setActualPIN(userid, pin){
        var fs = require("fs")
        var bd = JSON.parse(fs.readFileSync("./pindone.json"))
        var BreakException = {};
        var found = false;

        try{
            bd.forEach(cur_v=>{
                if(cur_v.user_id==userid){
                    found = true;
                    cur_v.actual = pin;
                    throw BreakException;            
                }
            });
        } catch (e) {
            if (e == BreakException){
            }else{
                throw e
            }
        }

        if(!found){
            bd.push({
                "user_id" : userid,
                "actual" : pin,
                "count" : 0
            })
        }

        fs.writeFileSync("./pindone.json", JSON.stringify(bd));       
    },
    
    getRandomKey() {
        var VAL = require('./values.js');
        var keys =  VAL.VAL.apiKeys;
        var rd = Math.floor((Math.random() * 10) + 1);
        var key = keys[rd%keys.length];
        return key;
    },

    pinArchiver() {
        var now = new Date();
        var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0, 0) - now;
        if (millisTill10 < 0) {
            millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
        }

        var tobj = this;
        var fs = require("fs");

        setInterval(function(){
            var pm = JSON.parse(fs.readFileSync("./pending_msg.json"))

            console.log("It's 24h ! PinArchiver Is Doing Its Work .....");
            logger.error("It's 24h Of " + (new Date()) + " ! PinArchiver Is Archiving ....!\n");
            
            //On Fait Le Travail Ici !
            //On Réinitialise Les Données
            fs.writeFileSync("./pindone.json", JSON.stringify([]));

            var users = tobj.getUsers();

            users.forEach(user=>{
                pm.push({
                    "userid" : user.user_id,
                    "msg" : tobj.isFrench(user.user_id) ? "🎁 Nouvelle Journée !! Réclammez Vos Cadeaux Journaliers Maintenant !" : "🎁 New Day !! Claim Your Daily Gifts Now !"
                })
            });

            fs.writeFileSync("./pending_msg.json", JSON.stringify(pm));

        }, millisTill10);
    },

    getUsers(){
        var fs = require("fs");
        var users = JSON.parse(fs.readFileSync("./users.json"));
        return users;
    }
};
