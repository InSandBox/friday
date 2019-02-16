var Telegram = require("node-telegram-bot-api");
var VAL = require('./values.js');
var FUNC = require('./functions.js');
var fs = require("fs");
var isUrl = require("is-url");
var url = require('url');
var WAValidator = require('wallet-address-validator');
const rp = require('request-promise');

//var valid = WAValidator.validate('1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck', 'BTC');

var opt = {polling:true};
var bot = new Telegram(VAL.VAL.token, opt);
var previous = {}
var chatId = {};

var v0 = {}
var v1 = {}
var v2 = {}
var v3 = {}

var bvar = {}

var w0 = {}


var last = {}

bot.on("message", function(msg){

    var pm = JSON.parse(fs.readFileSync("./pending_msg.json"))
  
      previous[msg.from.id] = FUNC.FUNC.loadPrevious(msg.from.id);
  
    if(last[msg.from.id]){
        var t = Date.now() - last[msg.from.id]
        if(t < 1000 ){
            if(FUNC.FUNC.isFrench(msg.from.id)){
                bot.sendMessage(msg.from.id, "🕐 Vous ne devez pas envoyer plus d'une requête par seconde !")
            }else{
                bot.sendMessage(msg.from.id, "🕐 You must not send more than one request per second !")
            }
            return;
        }else{

        }
        last[msg.from.id] = Date.now();
    }else{
        last[msg.from.id] = Date.now();
    }

    if(msg.chat.id < 0 && msg.text!="/start@AdvertXBot"){
        return;
    }

    if(pm.length!=0){
        var val = false
        pm.forEach((cur_v, index) =>{
            bot.sendMessage(cur_v.userid, cur_v.msg, {
                "parse_mode" : 'markdown'
            });
            pm.splice(index);
            val = true
        })
        if(val)
            fs.writeFileSync("./pending_msg.json", JSON.stringify(pm));
    }
    //console.log(";;;;;;;"+JSON.stringify(msg)+";;;;;;"); 

    chatId[msg.from.id] = msg.chat.id;
    if(msg.text){
        switch(msg.text){
            case "/start":
              //  console.log(msg);
                bot.sendMessage(msg.chat.id, "Choisir la langue \n\n Choose language",VAL.VAL.start_opt);
                FUNC.FUNC.checkNewUser(msg.from.id, msg.from.first_name);
                //saveChats(msg.from.id, msg.chat.id);

                //previous[msg.from.id] = "/start"
                FUNC.FUNC.savePrevious(msg.from.id, "/start")
                
                break;

            case "🎁 Daily Gift":
                if(FUNC.FUNC.dayDone(msg.from.id)){
                    bot.sendMessage(msg.chat.id, "❗️ You Have Already Claimed Your 5 Daily Gifts ! Wait For Tomorrow !");
                    return;
                }

                bot.sendMessage(msg.chat.id, "⏱ Wait ! Gift PIN Being Generated ...");

                var link = FUNC.FUNC.getPINURL(msg.from.id);

                link = "https://www.youtube.com/redirect?&q=" + link;

                var apik = FUNC.FUNC.getRandomKey();

                rp("https://clicksfly.com/api?api="+apik+"&url="+link+"&format=text")
                .then(function(slink){
        
                    console.log('yooooooooooooooooooooooooooooooooooooooooooo;;;;;'+slink);
                    var s_opt = {
                        'reply_markup':{
                            'inline_keyboard':[
                                [{text:"🔑 Get The PIN", url: "https://www.youtube.com/redirect?&q=" + slink}]
                            ]
                        }
                    }
                    console.log("yuuuuuuuuuuuuu"+opt);
                    bot.sendMessage(msg.chat.id, "🎁 Daily Gift (5 Times A Day) \n\
                    \n1️⃣ Click On Get The PIN (On Ytb Click On Go To Site) !\n\
                    \n2️⃣ You Need To Get The 5 Digits Pin Generated On The Page !\n\
                    \n3️⃣ Paste It Here !\n", s_opt);
                    FUNC.FUNC.savePrevious(msg.from.id, "🎁 Daily Gift");
        
                })  
                .catch(function(err){
                    throw err;
                })

                break;

            case "🎁 Cadeau Journalier":
                if(FUNC.FUNC.dayDone(msg.from.id)){
                    bot.sendMessage(msg.chat.id, "❗️ Vous Avez Deja Reclamé Vos 5 Cadeaux Journaliers ! Revenez Demain !");
                    return;
                }

                bot.sendMessage(msg.chat.id, "⏱ Patientez Un Moment ! Le Code Du Cadeau Est Entrain D'Être Généré ...");
                var link = FUNC.FUNC.getPINURL(msg.from.id);

                link = "https://www.youtube.com/redirect?&q=" + link;

                var apik = FUNC.FUNC.getRandomKey();


                rp("https://clicksfly.com/api?api="+apik+"&url="+link+"&format=text")
                .then(function(slink){
        
                    console.log('yooooooooooooooooooooooooooooooooooooooooooo;;;;;'+slink);
                    var s_opt = {
                        'reply_markup':{
                            'inline_keyboard':[
                                [{text:"🔑 Récupérer Le Code", url: "https://www.youtube.com/redirect?&q=" + slink}]
                            ]
                        }
                    }
                    console.log("yuuuuuuuuuuuuu"+opt);

                    bot.sendMessage(msg.chat.id, "🎁 Cadeau Journalier (5 Fois Par Jour) \n\
                    \n1️⃣ Cliquer Sur Récupérer Le Code (Sur Ytb Cliquer Sur Accéder Au Site ) !\n\
                    \n2️⃣ Vous Devez Récupérer Un Code De 5 Chiffres Générés Sur La Page !\n\
                    \n3️⃣ Coller Le Ici !\n", s_opt);
                    FUNC.FUNC.savePrevious(msg.from.id, "🎁 Cadeau Journalier");
        
                })  
                .catch(function(err){
                    throw err;
                })

                break;            

            case "💰 Balance":
                bot.sendMessage(msg.chat.id, FUNC.FUNC.balanceMsg(msg.from.id), {
                    'parse_mode' : 'markdown'
                });
                FUNC.FUNC.savePrevious(msg.from.id, "💰 Balance")
                break;

            case "🚀 Promouvoir":
                bot.sendMessage(msg.chat.id, "Choisir: " , VAL.VAL.pMenu_fr);
                FUNC.FUNC.savePrevious(msg.from.id,  "🚀 Promouvoir")
                break;

            case "🚀 Promote":
                bot.sendMessage(msg.chat.id, "Choose: " , VAL.VAL.pMenu_en);
                FUNC.FUNC.savePrevious(msg.from.id, "🚀 Promote")
                break;

            case "🏠 Retour":
                bot.sendMessage(msg.chat.id, "🏠", VAL.VAL.menu_fr);
                FUNC.FUNC.savePrevious(msg.from.id, "🏠 Retour")
                break;

            case "🏠 Go Back":
                bot.sendMessage(msg.chat.id, "🏠", VAL.VAL.menu_en);
                FUNC.FUNC.savePrevious(msg.from.id, "🏠 Go Back")
                break;

            case "➕ Make A Deposit":
                bot.sendMessage(msg.chat.id, "Choose: ", VAL.VAL.dMenu_en);
                FUNC.FUNC.savePrevious(msg.from.id, "➕ Make A Deposit")
                break;

            case "➕ Faire Un Dépot":
                bot.sendMessage(msg.chat.id, "Choisir: ", VAL.VAL.dMenu_fr);
                FUNC.FUNC.savePrevious(msg.from.id, "➕ Faire Un Dépot")
                break;


            case "➕ XBT":
                if(FUNC.FUNC.isFrench(msg.from.id))
                    bot.sendMessage(msg.chat.id, "⚠️Notez que la somme déposée ne servira que pour la promotion !\n⚠️Envoyer au minimum 0.001 XBT (Bitcoin) à l'adresse ci-dessous ! \n Votre solde sera mis à jour après 4 confirmations !\n ⚠️Notez que cette adressse est pour une seule utilisation !");
                else
                    bot.sendMessage(msg.chat.id, "⚠️Note that the deposit amount is only for Ad promotion !\n⚠️Send at least 0.001 XBT (Bitcoin) a the address below! \n Your amount will be updated after 4 confirmations !\n ⚠️Note that this address is only for one time use !");     

                if(FUNC.FUNC.isFrench(msg.from.id))
                    bot.sendMessage(msg.chat.id, "Génération d'adresse de dépot ...", VAL.VAL.hMenu_fr);
                else
                    bot.sendMessage(msg.chat.id, "Generating deposit address ...", VAL.VAL.hMenu_en);

                var dadd = FUNC.FUNC.getDepositAddr(msg.from.id, "xbt")
                if(dadd!=null){
                    bot.sendMessage(msg.from.id, "*"+dadd+"*", {
                        parse_mode : "markdown"
                    });
                }else{
                    FUNC.FUNC.depositMsgXbt(msg.from.id, "xbt", bot)
                }
            
                FUNC.FUNC.savePrevious(msg.from.id, "➕ XBT")
                break;


            case "➕ ETH":
                if(FUNC.FUNC.isFrench(msg.from.id))
                    bot.sendMessage(msg.chat.id, "⚠️Notez que la somme déposée ne servira que pour la promotion !\n⚠️Envoyer au minimum 0.01 ETH (Ethereum) à l'adresse ci-dessous ! \n Votre solde sera mis à jour après 4 confirmations !\n ⚠️Notez que cette adressse est pour une seule utilisation !");
                else
                    bot.sendMessage(msg.chat.id, "⚠️Note that the deposit amount is only for Ad promotion !\n⚠️Send at least 0.01 ETH (Ethereum) at the address below ! \n Your amount will be updated after 4 confirmations !\n ⚠️Note that this address is only for one time use !");     

                if(FUNC.FUNC.isFrench(msg.from.id))
                    bot.sendMessage(msg.chat.id, "Génération d'adresse de dépot ...", VAL.VAL.hMenu_fr);
                else
                    bot.sendMessage(msg.chat.id, "Generating deposit address ...", VAL.VAL.hMenu_en);

                var dadd = FUNC.FUNC.getDepositAddr(msg.from.id, "eth")
                if(dadd!=null){
                    bot.sendMessage(msg.from.id, "*"+dadd+"*", {
                        parse_mode : "markdown"
                    });
                }else{
                    FUNC.FUNC.depositMsgEth(msg.from.id, "eth", bot)
                }
            
                FUNC.FUNC.savePrevious(msg.from.id, "➕ ETH")
                break;

            case "➕ LTC":
                if(FUNC.FUNC.isFrench(msg.from.id))
                    bot.sendMessage(msg.chat.id, "⚠️Notez que la somme déposée ne servira que pour la promotion !\n⚠️Envoyer au minimum 0.05 LTC (Litecoin) à l'adresse ci-dessous ! \n Votre solde sera mis à jour après 4 confirmations !\n ⚠️Notez que cette adressse est pour une seule utilisation !");
                else
                    bot.sendMessage(msg.chat.id, "⚠️Note that the deposit amount is only for Ad promotion !\n ⚠️Send at least 0.05 LTC (Litecoin) at the address below ! \n Your amount will be updated after 4 confirmations !\n ⚠️Note that this address is only for one time use !");     

                if(FUNC.FUNC.isFrench(msg.from.id))
                    bot.sendMessage(msg.chat.id, "Génération d'adresse de dépot ...", VAL.VAL.hMenu_fr);
                else
                    bot.sendMessage(msg.chat.id, "Generating deposit address ...", VAL.VAL.hMenu_en);

                var dadd = FUNC.FUNC.getDepositAddr(msg.from.id, "ltc")
                if(dadd!=null){
                    bot.sendMessage(msg.from.id, "*"+dadd+"*", {
                        parse_mode : "markdown"
                    });
                }else{
                    FUNC.FUNC.depositMsgLtc(msg.from.id, "ltc", bot)
                }
            
                FUNC.FUNC.savePrevious(msg.from.id, "➕ LTC")
                break;

            case "🌐 Site Web":
                bot.sendMessage(msg.chat.id, "Envoyer le lien du Site Web : ");
                FUNC.FUNC.savePrevious(msg.from.id, "🌐 Site Web")        
                break;

            case "🌐 Website":
                bot.sendMessage(msg.chat.id, "Send the Website's link : ");
                FUNC.FUNC.savePrevious(msg.from.id, "🌐 Website")               
                break;

            case "👁 Post":
                if(FUNC.FUNC.isFrench(msg.from.id)){
                    bot.sendMessage(msg.chat.id, "Transférez le post ici :");
                }else{
                    bot.sendMessage(msg.chat.id, "Forward the Post here :")
                }
                FUNC.FUNC.savePrevious(msg.from.id, "👁 Post")
                break;

            case "🤖 Bot":
                if(FUNC.FUNC.isFrench( msg.chat.id)){
                    bot.sendMessage(msg.chat.id, "Transférez un message du Bot ici :");
                }else{
                    bot.sendMessage(msg.chat.id, "Forward a message from the Bot here :")
                }
                FUNC.FUNC.savePrevious(msg.from.id, "🤖 Bot"); 
                break;

            case "📣 Chat":
                if(FUNC.FUNC.isFrench(msg.from.id)){
                    bot.sendMessage(msg.chat.id, "Chaîne ou Groupe ?", VAL.VAL.prChat_fr);
                }else{
                    bot.sendMessage(msg.chat.id, "Channel or Group ?", VAL.VAL.prChat_en);
                }
                FUNC.FUNC.savePrevious(msg.from.id, "📣 Chat") 
                break;                


              

            case "⚡️ XBT":
                switch(previous[msg.from.id]){
                    case "PSiteFr0":
                        bot.sendMessage(msg.chat.id, "Combien de visiteurs voulez-vous? (min: 30) : "); 
                        FUNC.FUNC.savePrevious(msg.from.id, "PSiteFr1");
                        v1[msg.from.id] = "xbt";
                        //values[msg.from.id][1] = "xbt";
                        break;

                    case "PSiteEn0":
                        bot.sendMessage(msg.chat.id, "How many visitors do you want ? (min: 30) : "); 
                        FUNC.FUNC.savePrevious(msg.from.id, "PSiteEn1")
                        v1[msg.from.id] = "xbt";
                        //values[msg.from.id][1] = "xbt";
                        break;

                    case "PPostFr0":
                        bot.sendMessage(msg.chat.id, "Combien de vues voulez-vous? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id, "PPostFr1")
                        v1[msg.from.id] = "xbt"; 
                        break;

                    case "PPostEn0":
                        bot.sendMessage(msg.chat.id, "How many views do you want? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id, "PPostEn1")
                        v1[msg.from.id] = "xbt"; 
                        break;

                    case "PBotFr1":
                        bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id, "PBotFr2");
                        v1[msg.from.id] = "xbt"; 
                        break;

                        
                    case "PBotEn1":
                        bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id, "PBotEn2");
                        v1[msg.from.id] = "xbt"; 
                        break;

                    case "cha1":
                        if(FUNC.FUNC.isFrench(msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                        }else{
                            bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id, "cha2");
                        v1[msg.from.id] = "xbt";
                        break;

                    case "gro1":
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                        }else{
                            bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id, "gro2");
                        v1[msg.from.id] = "xbt";
                        break;
                }
                break;

                case "⚡️ ETH":
                switch(previous[msg.from.id]){
                    case "PSiteFr0":
                        bot.sendMessage(msg.chat.id, "Combien de visiteurs voulez-vous? (min: 30) : "); 
                        FUNC.FUNC.savePrevious(msg.from.id, "PSiteFr1");
                        v1[msg.from.id] = "eth";
                        //values[msg.from.id][1] = "eth";
                        break;

                    case "PSiteEn0":
                        bot.sendMessage(msg.chat.id, "How many visitors do you want ? (min: 30) : "); 
                        FUNC.FUNC.savePrevious(msg.from.id, "PSiteEn1");
                        v1[msg.from.id] = "eth";
                        //values[msg.from.id][1] = "eth";
                        break;

                    case "PPostFr0":
                        bot.sendMessage(msg.chat.id, "Combien de vues voulez-vous? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id,  "PPostFr1");
                        v1[msg.from.id] = "eth"; 
                        break;

                    case "PPostEn0":
                        bot.sendMessage(msg.chat.id, "How many views do you want? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id,  "PPostEn1");
                        v1[msg.from.id] = "eth"; 
                        break;

                    case "PBotFr1":
                        bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id,  "PBotFr2");
                        v1[msg.from.id] = "eth"; 
                        break;

                        
                    case "PBotEn1":
                        bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id, "PBotEn2");
                        v1[msg.from.id] = "eth"; 
                        break;

                    case "cha1":
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                        }else{
                            bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id, "cha2");
                        v1[msg.from.id] = "eth";
                        break;

                    case "gro1":
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                        }else{
                            bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id,  "gro2");
                        v1[msg.from.id] = "eth";
                        break;

                }
                break;

                case "⚡️ LTC":
                switch(previous[msg.from.id]){
                    case "PSiteFr0":
                        bot.sendMessage(msg.chat.id, "Combien de visiteurs voulez-vous? (min: 30) : "); 
                        FUNC.FUNC.savePrevious(msg.from.id, "PSiteFr1");
                        v1[msg.from.id] = "ltc";
                        //values[msg.from.id][1] = "ltc";
                        break;

                    case "PSiteEn0":
                        bot.sendMessage(msg.chat.id, "How many visitors do you want ? (min: 30) : "); 
                        FUNC.FUNC.savePrevious(msg.from.id, "PSiteEn1");
                        v1[msg.from.id] = "ltc";
                        //values[msg.from.id][1] = "ltc";
                        break;

                    case "PPostFr0":
                        bot.sendMessage(msg.chat.id, "Combien de vues voulez-vous? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id,  "PPostFr1");
                        v1[msg.from.id] = "ltc"; 
                        break;

                    case "PPostEn0":
                        bot.sendMessage(msg.chat.id, "How many views do you want? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id, "PPostEn1");
                        v1[msg.from.id] = "ltc"; 
                        break;

                    case "PBotFr1":
                        bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id,  "PBotFr2");
                        v1[msg.from.id] = "ltc"; 
                        break;

                        
                    case "PBotEn1":
                        bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                        FUNC.FUNC.savePrevious(msg.from.id, "PBotEn2");
                        v1[msg.from.id] = "ltc"; 
                        break;

                    case "cha1":
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                        }else{
                            bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id, "cha2");
                        v1[msg.from.id] = "ltc";
                        break;

                    case "gro1":
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                        }else{
                            bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id,  "gro2");
                        v1[msg.from.id] = "ltc";
                        break;

                }
                break;


            case "🌐 Visiter Un Site":
                var check = FUNC.FUNC.isAvailableS(msg.from.id);
               // console.log("hhhhhhhh:::"+msg.chat.id)
                // console.log(check);
                if(check[0])
                    bot.sendMessage(msg.chat.id, "Vous devez faire au moins 20 secondes\n sur le site ! ", FUNC.FUNC.createSTO(msg.from.id, check[1], "fr")); 
                else
                    bot.sendMessage(msg.chat.id, "😔 Désolé, Il n'y a pas de site à ce moment-ci  !\n Invitez des amis pour en avoir plus !");
                break;

            case "🌐 Visit Site":
                var check = FUNC.FUNC.isAvailableS(msg.from.id);
                //console.log("hhhhhhhh:::"+msg.chat.id)
                // console.log(check);
                if(check[0])
                    bot.sendMessage(msg.chat.id, "You must wait 20 secondes\n on the website ! ", FUNC.FUNC.createSTO(msg.from.id, check[1], "en")); 
                else
                    bot.sendMessage(msg.chat.id, "😔 Sorry, there is no website at this time !\n Invite friends to get more !");
                break;


            case "👁 View Post":
                var check = FUNC.FUNC.isAvailableP(msg.from.id);
                if(check[0]){
                    var fMsg = FUNC.FUNC.getForwardParams(check[1]);

                    bot.forwardMessage(msg.chat.id, fMsg[0], fMsg[1]); 

                    setTimeout(function(){
                        bot.sendMessage(msg.chat.id, "Now press Confirm Button ", FUNC.FUNC.createPTO(msg.from.id, check[1], "fr"));
                    },10000) 
                }
                else
                    bot.sendMessage(msg.chat.id, "😔 Sorry, there is no post at this time  !\n Invite friends to get more ! !");
                break;

                case "👁 Voir Un Post":
                var check = FUNC.FUNC.isAvailableP(msg.from.id);
                if(check[0]){
                    var fMsg = FUNC.FUNC.getForwardParams(check[1]);

                    bot.forwardMessage(msg.chat.id, fMsg[0], fMsg[1]); 

                    setTimeout(function(){
                        bot.sendMessage(msg.chat.id, "Maintenant Appuyez sur Confirmer ", FUNC.FUNC.createPTO(msg.from.id, check[1], "fr"));
                    }, 10000);
                }
                else
                    bot.sendMessage(msg.chat.id, "😔 Désolé, Il n'y a pas de post à ce moment-ci  !\n Invitez des amis pour en avoir plus ! !");
                break;

                case "🤖 Message Bot":
                    var check = FUNC.FUNC.isAvailableB(msg.from.id);
                    if(check[0]){
                            bot.sendMessage(msg.chat.id, "Start the Bot and forward any\n message from it here ", FUNC.FUNC.createBTO(msg.from.id, check[1], "en"));  
                            FUNC.FUNC.savePrevious(msg.from.id, "Bot")
                            bvar[msg.from.id] = check[1]
                        }else{
                        bot.sendMessage(msg.chat.id, "😔 Sorry, There is no bot at this time  !\n Invite friends to get more ! !"); 
                    }
                    break;

                case "🤖 Démarrer Un Bot":

                    var check = FUNC.FUNC.isAvailableB(msg.from.id);
                    if(check[0]){
                        bot.sendMessage(msg.chat.id, "Démarrer le Bot et transférer un \ndes messages du bot ici ", FUNC.FUNC.createBTO(msg.from.id, check[1], "fr"));
                        FUNC.FUNC.savePrevious(msg.from.id, "Bot")
                        bvar[msg.from.id] = check[1]
                    }
                    else{
                        bot.sendMessage(msg.chat.id, "😔 Désolé, Il n'y a pas de post à ce moment-ci  !\n Invitez des amis pour en avoir plus ! !");
                    }
                    break;

                case "📣 Join Chat":
                case "📣 Rejoindre Un Chat":

                    var fr = FUNC.FUNC.isFrench( msg.from.id);
                    var check = FUNC.FUNC.isAvailableCG(msg.from.id);
                    var msg_s1 = fr? "Rejoignez la chaîne ( vous devez y rester pendant au moins 7 jours ) !" : "Join the channel ( You must stay in the channel during at least 7 days ) "
                    var msg_s2 = fr? "Rejoignez le groupe ( vous devez y rester pendant au moins 7 jours ) !" : "Join the group ( You must stay in the channel during at least 7 days ) "
                    var lang = fr? "fr" : "en"
                    if(check[0]){

                        if(check[1]=="cha"){
                            bot.sendMessage(msg.chat.id, msg_s1, FUNC.FUNC.createCTO(msg.from.id, check[2], lang));
                            FUNC.FUNC.savePrevious(msg.from.id, "cha")
                        }else if(check[1]=="gro"){
                            bot.sendMessage(msg.chat.id, msg_s2, FUNC.FUNC.createGTO(msg.from.id, check[2], lang));
                            FUNC.FUNC.savePrevious(msg.from.id, "gro")
                        }
                        bvar[msg.from.id] = check[2]
                    }
                    else{
                        var msg_t = fr?  "😔 Désolé, Il n'y a pas de Chat à ce moment-ci  !\n Invitez des amis pour en avoir plus ! !" : "😔 Sorry, there is not Chat to join at this time  !\n Invite friends to get more ! !"
                        bot.sendMessage(msg.chat.id, msg_t);
                    }
                    break;
                    
                case "👥 Referals":
                case "👥 Filleuls":
                    if(FUNC.FUNC.isFrench( msg.from.id)){
                        bot.sendMessage(msg.chat.id, "👋 Salut "+msg.from.first_name+" ! \n\n👥 Vous avez "+FUNC.FUNC.getRefCount(msg.from.id)+" Filleuls\n\nVotre lien d'affiliation est https://t.me/AdvertXBot?start="+msg.from.id+"\n\n Vous bénéficiez de 10% de chaque retrait de vos filleuls");
                    }else{
                        bot.sendMessage(msg.chat.id, "👋 Hi "+msg.from.first_name+" ! \n\n👥 You have "+FUNC.FUNC.getRefCount(msg.from.id)+" Referals\n\nYour referal link is https://t.me/AdvertXBot?start="+msg.from.id+"\n\n You gain 10% on each withdrawal of your referals");
                    }

                break;

                case "/start@AdvertXBot":
                    if(previous[msg.from.id]=="gro0" && msg.chat.id<0){
                        var st = 

                        bot.exportChatInviteLink(msg.chat.id).then(function(data){
                            st = data;
                        })

                        setTimeout(()=>{
                            if(isUrl(st)){
                                v0[msg.from.id] = [msg.chat.id, st];

                                FUNC.FUNC.savePrevious(msg.from.id, "gro1")

                                if(FUNC.FUNC.isFrench( msg.from.id)){
                                    bot.sendMessage(msg.from.id, "🎈 Tout est presque prêt, suivez les prochaînes instructions !\n\n Choisir le mode de payement :", VAL.VAL.prMenu_fr);
                                }
                                else{
                                    bot.sendMessage(msg.from.id, "🎈 Everything is almost Ok ! Follow further instructions !\n\n Choose payment mode :", VAL.VAL.prMenu_en);
                                }
                            }else{
                                if(FUNC.FUNC.isFrench( msg.from.id)){
                                    bot.sendMessage(msg.from.id, "Vous devez ajouter ce bot (https://t.me/AdvertXBot) à la liste des administrateurs de votre groupe !");
                                }else{
                                    bot.sendMessage(msg.from.id, "You must add this bot (https://t.me/AdvertXBot) as administrator of your group !");
                                }
                            }
                        }, 1000)

                    }
                    break;

            case "💳 Retrait" :
            case "💳 Withdraw" :
                if(FUNC.FUNC.isFrench(msg.from.id)){
                    bot.sendMessage(msg.from.id, "Choisir la monnaie : ", VAL.VAL.wMenu)
                }else{
                    bot.sendMessage(msg.from.id, "Choose currency : ", VAL.VAL.wMenu)
                }
                break;


            default:

                if(previous[msg.from.id]=="🎁 Daily Gift" && msg.text.length==5 && !isNaN(msg.text)){
                    var pin = msg.text;
                    if(FUNC.FUNC.dayDone(msg.from.id)){
                        bot.sendMessage(msg.chat.id, "❗️ You Have Already Claimed Your 5 Daily Gifts ! Wait For Tomorrow !");
                        return;
                    }
                    if(pin==FUNC.FUNC.getPIN(msg.from.id)){
                        FUNC.FUNC.incrPinDone(msg.from.id);
                        bot.sendMessage(msg.chat.id, "Correct PIN Submitted !");
                        bot.sendMessage(msg.chat.id, "🎁 You Just Get 4.e-7 xbt !");
                        FUNC.FUNC.creditUser(msg.chat.id, 0.0000004 ,"xbt");
                    }else{
                        bot.sendMessage(msg.chat.id, "Invalid Or Expired PIN Submitted !");
                        FUNC.FUNC.savePrevious(msg.from.id, "🎁 Daily Gift") 
                    }

                }
                else if(previous[msg.from.id]=="🎁 Cadeau Journalier" && msg.text.length==5 && !isNaN(msg.text))
                {
                    var pin = msg.text;
                    if(FUNC.FUNC.dayDone(msg.from.id)){
                        bot.sendMessage(msg.chat.id, "❗️ Vous Avez Deja Réclammer Vos 5 Cadeaux Journaliers ! Revenez Demain !");
                        return;
                    }
                    if(pin==FUNC.FUNC.getPIN(msg.from.id)){
                        FUNC.FUNC.incrPinDone(msg.from.id);
                        bot.sendMessage(msg.chat.id, "Code Correct Soumis !");
                        bot.sendMessage(msg.chat.id, "🎁 Vous Avez Reçu 4.e-7 xbt !");
                        FUNC.FUNC.creditUser(msg.chat.id, 0.0000004 ,"xbt");
                    }else{
                        bot.sendMessage(msg.chat.id, "Code Invalide Ou Expiré PIN Soumis !");
                        FUNC.FUNC.savePrevious(msg.from.id, "🎁 Cadeau Journalier") 
                    }
                }
                else if(msg.text.substr(0, 7)=="/start " && !isNaN(msg.text.substr(7))){
                    if(FUNC.FUNC.checkNewUser(msg.from.id, msg.from.first_name)){
                        //saveChats(msg.from.id, msg.chat.id);

                        bot.sendMessage(msg.chat.id, "Choisir la langue \n\n Choose language",VAL.VAL.start_opt);
        
                        FUNC.FUNC.savePrevious(msg.from.id,  "/start")

                        if(msg.from.id!=msg.text.substr(7) && FUNC.FUNC.isValidU(msg.text.substr(7))){
 
                            FUNC.FUNC.addRef(msg.text.substr(7), msg.from.id);
                        }else{

                        }
                    }
                    //check if new user
                    //The referer msg.text.substr(7)
                }
                else if(previous[msg.from.id]=="🌐 Site Web"){
                    if(isUrl(msg.text)){
                        v0[msg.from.id] = msg.text;
                        //values[msg.from.id][0] = msg.text; 
                        bot.sendMessage(msg.chat.id, "Choisir le mode de paiement : ", VAL.VAL.prMenu_fr);
                        FUNC.FUNC.savePrevious(msg.from.id, "PSiteFr0");
                    }
                    else{
                        bot.sendMessage(msg.chat.id, "Envoyer une URL valide");
                    }
                }
                else if(previous[msg.from.id]=="🌐 Website"){
                    if(isUrl(msg.text)){
                        v0[msg.from.id] = msg.text;
                        //values[msg.from.id][0] = msg.text; 
                        bot.sendMessage(msg.chat.id, "Choose the payment mode : ", VAL.VAL.prMenu_en);
                        FUNC.FUNC.savePrevious(msg.from.id, "PSiteEn0");
                    }
                    else{
                        bot.sendMessage(msg.chat.id, "Send a valid URL");
                    }
                }


                else if(previous[msg.from.id]=="btcad"){
                    if(WAValidator.validate(msg.text, 'BTC')){
                        w0[msg.from.id] = msg.text
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Combien voulez-vous retirer ?");
                        }else{
                            bot.sendMessage(msg.chat.id, "How much do you want to withdraw ?");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id, "btcq")
                    }else{
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Entrez une adresse Btc Valide :");
                        }else{
                            bot.sendMessage(msg.chat.id, "Please Send Valid Btc Address :");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id, "btcad")
                    }
                }
                
                else if(previous[msg.from.id]=="ethad"){
                    if(WAValidator.validate(msg.text, 'ETH')){
                        w0[msg.from.id] = msg.text
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Combien voulez-vous retirer ?");
                        }else{
                            bot.sendMessage(msg.chat.id, "How much do you want to withdraw ?");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id, "ethq")
                    }else{
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Entrez une adresse Eth Valide :");
                        }else{
                            bot.sendMessage(msg.chat.id, "Please Send Valid Eth Address :");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id, "ethad")
                    }
                }

                else if(previous[msg.from.id]=="ltcad"){
                    if(WAValidator.validate(msg.text, 'LTC')){
                        w0[msg.from.id] = msg.text
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Combien voulez-vous retirer ?");
                        }else{
                            bot.sendMessage(msg.chat.id, "How much do you want to withdraw ?");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id, "ltcq")
                    }else{
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Entrez une adresse Ltc Valide :");
                        }else{
                            bot.sendMessage(msg.chat.id, "Please Send Valid Ltc Address :");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id, "ltcad")
                    }
                }
                
                else if(!isNaN(msg.text)){
                    if(previous[msg.from.id]=="btcq"){
                        
                        if(FUNC.FUNC.getUserXbt( msg.from.id)<msg.text || msg.text <= 0 || msg.text < 0.0005 ){
                            if(FUNC.FUNC.isFrench( msg.from.id)){
                                bot.sendMessage(msg.chat.id, "Vous ne pouvez pas retirer cette somme !")
                            }else{
                                bot.sendMessage(msg.from.id, "You can not withdraw that amount !")
                            }
                        }else{
                            

                            var referer = FUNC.FUNC.getReferer(msg.from.id)

                            FUNC.FUNC.getFromUserBalance(msg.from.id, "xbt", parseFloat(msg.text).toFixed(8));

                            var reqId = FUNC.FUNC.createWithdrawalRequest(msg.from.id, w0[msg.from.id], parseFloat(msg.text).toFixed(8), "xbt");

                            FUNC.FUNC.creditUser(referer, msg.text * 0.1 ,"xbt");

                            if(FUNC.FUNC.isFrench(referer)){
                                FUNC.FUNC.addPM({
                                    "userid" : referer,
                                    "msg" : "🎁 Vous avez reçu  *" + parseFloat(msg.text * 0.1).toFixed(8) + "* de Xbt par parrainage !"
                                });
                            }else{
                                FUNC.FUNC.addPM({
                                    "userid" : referer,
                                    "msg" : "🎁 You received  *" + parseFloat(msg.text * 0.1).toFixed(8) + "* Xbt from referal withdraw !"
                                });                    
                            }

                            if(FUNC.FUNC.isFrench( msg.from.id)){
                                bot.sendMessage(msg.from.id, "👍 Votre requête de payment *"+reqId+"* a été soumise au système !\n\n Vous recevrez votre payment dans 6-24 Heures", {
                                    'parse_mode' : 'markdown'
                                });
                            }else{
                                bot.sendMessage(msg.from.id, "👍 Your withdrawal request *"+reqId+"* has been sent to the system !\n\n You will receive it within 6-24 Hours", {
                                    'parse_mode' : 'markdown'
                                });
                            }
                        }
                    }

                    else if(previous[msg.from.id]=="ethq"){
                        if(FUNC.FUNC.getUserEth( msg.from.id)<msg.text || msg.text <= 0 || msg.text < 0.001 ){
                            if(FUNC.FUNC.isFrench( msg.from.id)){
                                bot.sendMessage(msg.chat.id, "Vous ne pouvez pas retirer cette somme !")
                            }else{
                                bot.sendMessage(msg.from.id, "You can not withdraw that amount !")
                            }
                        }else{
                            var referer = FUNC.FUNC.getReferer(msg.from.id)
                            
                            FUNC.FUNC.getFromUserBalance(msg.from.id, "eth", parseFloat(msg.text).toFixed(8));
                            var reqId = FUNC.FUNC.createWithdrawalRequest(msg.from.id, w0[msg.from.id], parseFloat(msg.text).toFixed(8), "eth");
                            
                            FUNC.FUNC.creditUser(referer, msg.text * 0.1 ,"eth");
                            
                            if(FUNC.FUNC.isFrench(referer)){
                                FUNC.FUNC.addPM({
                                    "userid" : referer,
                                    "msg" : "🎁 Vous avez reçu  *" + parseFloat(msg.text * 0.1).toFixed(8) + "* de Eth par parrainage !"
                                });
                            }else{
                                FUNC.FUNC.addPM({
                                    "userid" : referer,
                                    "msg" : "🎁 You received  *" + parseFloat(msg.text * 0.1).toFixed(8) + "* Eth from referal withdraw !"
                                });                    
                            }


                            if(FUNC.FUNC.isFrench( msg.from.id)){
                                bot.sendMessage(msg.from.id, "👍 Votre requête de payment *"+reqId+"* a été soumise au système !\n\n Vous recevrez votre payment dans 6-24 Heures", {
                                    'parse_mode' : 'markdown'
                                });
                            }else{
                                bot.sendMessage(msg.from.id, "👍 Your withdrawal request *"+reqId+"* has been sent to the system !\n\n You will receive it within 6-24 Hours", {
                                    'parse_mode' : 'markdown'
                                });
                            }
                        }
                    }

                    else if(previous[msg.from.id]=="ltcq"){
                        if(FUNC.FUNC.getUserLtc( msg.from.id)<msg.text || msg.text <= 0 || msg.text < 0.005){
                            if(FUNC.FUNC.isFrench( msg.from.id)){
                                bot.sendMessage(msg.chat.id, "Vous ne pouvez pas retirer cette somme !")
                            }else{
                                bot.sendMessage(msg.from.id, "You can not withdraw that amount !")
                            }
                        }else{
                            var referer = FUNC.FUNC.getReferer(msg.from.id)

                            FUNC.FUNC.getFromUserBalance(msg.from.id, "ltc", parseFloat(msg.text).toFixed(8));
                            var reqId = FUNC.FUNC.createWithdrawalRequest(msg.from.id, w0[msg.from.id], parseFloat(msg.text).toFixed(8), "ltc");
                            FUNC.FUNC.creditUser(referer, msg.text * 0.1 ,"ltc");
                         
                            if(FUNC.FUNC.isFrench(referer)){
                                FUNC.FUNC.addPM({
                                    "userid" : referer,
                                    "msg" : "🎁 Vous avez reçu  *" + parseFloat(msg.text * 0.1).toFixed(8) + "* de Ltc par parrainage !"
                                });
                            }else{
                                FUNC.FUNC.addPM({
                                    "userid" : referer,
                                    "msg" : "🎁 You received  *" + parseFloat(msg.text * 0.1).toFixed(8) + "* Ltc from referal withdraw !"
                                });                    
                            }      
                            
                            if(FUNC.FUNC.isFrench( msg.from.id)){
                                bot.sendMessage(msg.from.id, "👍 Votre requête de payment *"+reqId+"* a été soumise au système !\n\n Vous recevrez votre payment dans 6-24 Heures", {
                                    'parse_mode' : 'markdown'
                                });
                            }else{
                                bot.sendMessage(msg.from.id, "👍 Your withdrawal request *"+reqId+"* has been sent to the system !\n\n You will receive it within 6-24 Hours", {
                                    'parse_mode' : 'markdown'
                                });
                            }
                        }
                    }

                    
                    else if(previous[msg.from.id]=="PSiteFr1"){
                        v2[msg.from.id] = msg.text;
                        //values[msg.from.id][2] = msg.text;
                        if(msg.text < 30){
                            bot.sendMessage(msg.chat.id, "Combien de visiteurs voulez-vous? (min: 30) : ");
                        }else{
                            var msg_s = "Quelle est la rémunération par visiteur? (min: ";
                            switch(v1[msg.from.id]){
                            //switch(values[msg.from.id][1]){
                                case "xbt":
                                    msg_s+="0.00000030 ) : ";
                                    break;
    
                                case "eth":
                                    msg_s+="0.00000300 ) : ";
                                    break;
    
                                case "ltc":
                                    msg_s+="0.00000500 ) : ";
                                    break;
                                
                                default:
                                    msg_s = "Une Erreur s'est produite !! Réssayer !"
                                    break;
                            }
                            bot.sendMessage(msg.chat.id, msg_s);
                            FUNC.FUNC.savePrevious(msg.from.id,  "PSiteFr2")
                        }
                    }

                    else if(previous[msg.from.id]=="cha2"){
                        v2[msg.from.id] = msg.text;
                        //values[msg.from.id][2] = msg.text;
                        if(msg.text < 30){
                            var fr = FUNC.FUNC.isFrench( msg.from.id)
                            if(fr){
                                bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                            }else{
                                bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                            }
                            
                        }else{
                            var msg_s = fr ? "Quelle est la rémunération par utilisateur? (min: " : "How much do you want to pay per user? (min: "
                            switch(v1[msg.from.id]){
                            //switch(values[msg.from.id][1]){
                                case "xbt":
                                    msg_s+="0.00000030 ) : ";
                                    break;
    
                                case "eth":
                                    msg_s+="0.00000300 ) : ";
                                    break;
    
                                case "ltc":
                                    msg_s+="0.00000500 ) : ";
                                    break;
                                
                                default:
                                    msg_s = fr? "Une Erreur s'est produite !! Réssayer !" : "An Error Occured !! Try Again"
                                    break;
                            }
                            bot.sendMessage(msg.chat.id, msg_s);
                            FUNC.FUNC.savePrevious(msg.from.id,  "chat3")
                        }
                    }


                    else if(previous[msg.from.id]=="gro2"){
                        v2[msg.from.id] = msg.text;
                        //values[msg.from.id][2] = msg.text;
                        if(msg.text < 30){
                            var fr = FUNC.FUNC.isFrench( msg.from.id)
                            if(fr){
                                bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                            }else{
                                bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                            }
                            
                        }else{
                            var msg_s = fr ? "Quelle est la rémunération par utilisateur? (min: " : "How much do you want to pay per user? (min: "
                            switch(v1[msg.from.id]){
                            //switch(values[msg.from.id][1]){
                                case "xbt":
                                    msg_s+="0.00000030 ) : ";
                                    break;
    
                                case "eth":
                                    msg_s+="0.00000300 ) : ";
                                    break;
    
                                case "ltc":
                                    msg_s+="0.00000500 ) : ";
                                    break;
                                
                                default:
                                    msg_s = fr? "Une Erreur s'est produite !! Réssayer !" : "An Error Occured !! Try Again"
                                    break;
                            }
                            bot.sendMessage(msg.chat.id, msg_s);
                            FUNC.FUNC.savePrevious(msg.from.id, "gro3")
                        }
                    }


                    else if(previous[msg.from.id]=="PSiteEn1"){
                        v2[msg.from.id] = msg.text;
                        //values[msg.from.id][2] = msg.text;
                        if(msg.text < 30){
                            bot.sendMessage(msg.chat.id, "How many visitors do you want? (min: 30) : ");
                        }else{
                            var msg_s = "How much do you want to pay each visitor? (min: ";
                            switch(v1[msg.from.id]){
                            //switch(values[msg.from.id][1]){
                                case "xbt":
                                    msg_s+="0.00000030 ) : ";
                                    break;
    
                                case "eth":
                                    msg_s+="0.00000300 ) : ";
                                    break;
    
                                case "ltc":
                                    msg_s+="0.00000500 ) : ";
                                    break;
                                
                                default:
                                    msg_s = "An Error Occured !! Retry !"
                                    break;
                            }
                            bot.sendMessage(msg.chat.id, msg_s);
                            FUNC.FUNC.savePrevious(msg.from.id,  "PSiteEn2")
                        }
                    }                             
                    else if(previous[msg.from.id]=="PSiteFr2"){
                        v3[msg.from.id] = msg.text;
                        //values[msg.from.id][3] = msg.text;
                        var msg_s = ""
                        switch(v1[msg.from.id]){
                        //switch(values[msg.from.id][1]){
                            case "xbt":
                                if(msg.text < 0.00000030){
                                    msg_s = "Quelle est la rémunération par visiteur? (min: 0.00000030 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    // var t = values[msg.from.id][2] * values[msg.from.id][3]
                                    if(t > FUNC.FUNC.getUserXbt( msg.from.id) + FUNC.FUNC.getUserXbtd( msg.from.id)){
                                        msg_s = "Vous n'avez pas assez de Btc (Bitcoin) ! \n Vous pouvez faire un dépot !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        //console.log(";;;"+values+";;;;")

                                        FUNC.FUNC.addAds( msg.from.id, values, "xbt");
                                        msg_s = "🎉 Votre Site a été ajouté avec succès !"
                                    }
                                }
                                break;
                            
                            case "eth":
                                if(msg.text < 0.00000300){
                                    msg_s = "Quelle est la rémunération par visiteur? (min: 0.00000300 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserEth(msg.from.id) + FUNC.FUNC.getUserEthd(msg.from.id)){
                                        msg_s = "Vous n'avez pas assez de Eth (Ethereum) ! \n Vous pouvez faire un dépot !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        FUNC.FUNC.addAds(msg.from.id, values, "eth");
                                        msg_s = "🎉 Votre Site a été ajouté avec succès !"
                                    }
                                        
                                }
                                break;

                            case "ltc":
                                if(msg.text < 0.00000500){
                                    msg_s = "Quelle est la rémunération par visiteur? (min: 0.00000500 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserLtc( msg.from.id) + FUNC.FUNC.getUserLtcd( msg.from.id)){
                                        msg_s = "Vous n'avez pas assez de Ltc (Litecoin) ! \n Vous pouvez faire un dépot !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        FUNC.FUNC.addAds( msg.from.id, values, "ltc");
                                        msg_s = "🎉 Votre Site a été ajouté avec succès !"
                                    }

                                        
                                }
                                break;
                        }

                        bot.sendMessage(msg.chat.id, msg_s);
                    }

                    //hsjzkkslks
                    else if(previous[msg.from.id]=="chat3"){
                        v3[msg.from.id] = msg.text;
                        //values[msg.from.id][3] = msg.text;
                        var fr = FUNC.FUNC.isFrench( msg.from.id) 
                        var msg_s = ""
                        switch(v1[msg.from.id]){
                        //switch(values[msg.from.id][1]){
                            case "xbt":
                                if(msg.text < 0.00000030){
                                    msg_s = fr? "Quelle est la rémunération par utilisateur? (min: 0.00000030 ) : " : "How much do you want to pay per user? (min: 0.00000030 )" 
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    // var t = values[msg.from.id][2] * values[msg.from.id][3]
                                    if(t > FUNC.FUNC.getUserXbt(msg.from.id) + FUNC.FUNC.getUserXbtd(msg.from.id)){
                                        msg_s = fr? "Vous n'avez pas assez de Btc (Bitcoin) ! \n Vous pouvez faire un dépot !" : "You don't have enough Btc (Bitcoin) ! \n You can make a deposit !"
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        FUNC.FUNC.addAdc( msg.from.id, values, "xbt");
                                        msg_s = fr? "🎉 Votre Chaîne a été ajoutée avec succès !" : "Your Channel has been added successflly"
                                    }
                                }
                                break;
                            
                            case "eth":
                                if(msg.text < 0.00000300){
                                    msg_s = fr? "Quelle est la rémunération par utilisateur? (min: 0.00000300 ) : " : "How much do you want to pay per user? (min: 0.00000300 )" 
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserEth(msg.from.id) + FUNC.FUNC.getUserEthd(msg.from.id)){
                                        msg_s = fr? "Vous n'avez pas assez de Eth (Ethereum) ! \n Vous pouvez faire un dépot !" : "You don't have enough Eth (Ethereum) ! \n You can make a deposit !"
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        FUNC.FUNC.addAds(msg.from.id, values, "eth");
                                        msg_s = fr? "🎉 Votre Chaîne a été ajoutée avec succès !" : "Your Channel has been added successflly"
                                    }
                                        
                                }
                                break;

                            case "ltc":
                                if(msg.text < 0.00000500){
                                    msg_s = fr? "Quelle est la rémunération par utilisateur? (min: 0.00000500 ) : " : "How much do you want to pay per user? (min: 0.00000500 )" 
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserLtc( msg.from.id) + FUNC.FUNC.getUserLtcd( msg.from.id)){
                                        msg_s = fr? "Vous n'avez pas assez de Ltc (Litecoin) ! \n Vous pouvez faire un dépot !" : "You don't have enough Ltc (Litecoin) ! \n You can make a deposit !"
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        FUNC.FUNC.addAdc( msg.from.id, values, "ltc");
                                        msg_s = fr? "🎉 Votre Chaîne a été ajoutée avec succès !" : "Your Channel has been added successflly"
                                    }

                                        
                                }
                                break;
                        }

                        bot.sendMessage(msg.chat.id, msg_s);
                    }//kskskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk


                    //hsjzkkslks
                    else if(previous[msg.from.id]=="gro3"){
                        v3[msg.from.id] = msg.text;
                        //values[msg.from.id][3] = msg.text;
                        var fr = FUNC.FUNC.isFrench( msg.from.id) 
                        var msg_s = ""
                        switch(v1[msg.from.id]){
                        //switch(values[msg.from.id][1]){
                            case "xbt":
                                if(msg.text < 0.00000030){
                                    msg_s = fr? "Quelle est la rémunération par utilisateur? (min: 0.00000030 ) : " : "How much do you want to pay per user? (min: 0.00000030 )" 
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    // var t = values[msg.from.id][2] * values[msg.from.id][3]
                                    if(t > FUNC.FUNC.getUserXbt( msg.from.id) + FUNC.FUNC.getUserXbtd( msg.from.id)){
                                        msg_s = fr? "Vous n'avez pas assez de Btc (Bitcoin) ! \n Vous pouvez faire un dépot !" : "You don't have enough Btc (Bitcoin) ! \n You can make a deposit !"
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        FUNC.FUNC.addAdg( msg.from.id, values, "xbt");

                                        msg_s = fr? "🎉 Votre Groupe a été ajoutée avec succès !" : "Your Group has been added successflly"
                                    }
                                }
                                break;
                            
                            case "eth":
                                if(msg.text < 0.00000300){
                                    msg_s = fr? "Quelle est la rémunération par utilisateur? (min: 0.00000300 ) : " : "How much do you want to pay per user? (min: 0.00000300 )" 
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserEth( msg.from.id) + FUNC.FUNC.getUserEthd( msg.from.id)){
                                        msg_s = fr? "Vous n'avez pas assez de Eth (Ethereum) ! \n Vous pouvez faire un dépot !" : "You don't have enough Eth (Ethereum) ! \n You can make a deposit !"
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        FUNC.FUNC.addAdg( msg.from.id, values, "eth");

                                        msg_s = fr? "🎉 Votre Groupe a été ajouté avec succès !" : "Your Group has been added successflly"
                                    }
                                        
                                }
                                break;

                            case "ltc":
                                if(msg.text < 0.00000500){
                                    msg_s = fr? "Quelle est la rémunération par utilisateur? (min: 0.00000500 ) : " : "How much do you want to pay per user? (min: 0.00000500 )" 
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserLtc( msg.from.id) + FUNC.FUNC.getUserLtcd( msg.from.id)){
                                        msg_s = fr? "Vous n'avez pas assez de Ltc (Litecoin) ! \n Vous pouvez faire un dépot !" : "You don't have enough Ltc (Litecoin) ! \n You can make a deposit !"
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        FUNC.FUNC.addAdg( msg.from.id, values, "ltc");

                                        msg_s = fr? "🎉 Votre Groupe a été ajouté avec succès !" : "Your Group has been added successflly"
                                    }

                                        
                                }
                                break;
                        }

                        bot.sendMessage(msg.chat.id, msg_s);
                    }//kskskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkooooooooooooo



                    else if(previous[msg.from.id]=="PSiteEn2"){
                        v3[msg.from.id] = msg.text;
                        //values[msg.from.id][3] = msg.text;
                        var msg_s = ""
                        switch(v1[msg.from.id]){
                        //switch(values[msg.from.id][1]){
                            case "xbt":
                                if(msg.text < 0.00000030){
                                    msg_s = "How much do you want to pay each visitor? (min: 0.00000030 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    // var t = values[msg.from.id][2] * values[msg.from.id][3]
                                    if(t > FUNC.FUNC.getUserXbt( msg.from.id) + FUNC.FUNC.getUserXbtd( msg.from.id)){
                                        msg_s = "You don't have enough Btc (Bitcoin) ! \n You can make a deposit !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        FUNC.FUNC.addAds( msg.from.id, values, "xbt");
                                        msg_s = "🎉 Your site have been successfully added !"
                                    }
                                }
                                break;
                            
                            case "eth":
                                if(msg.text < 0.00000300){
                                    msg_s = "How much do you want to pay each visitor? (min: 0.00000300 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserEth( msg.from.id) + FUNC.FUNC.getUserEthd( msg.from.id)){
                                        msg_s = "You don't have enough Eth (Ethereum) ! \n You can make a deposit !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        FUNC.FUNC.addAds( msg.from.id, values, "eth");
                                        msg_s = "🎉 Your site have been successfully added !"
                                    }
                                        
                                }
                                break;

                            case "ltc":
                                if(msg.text < 0.00000500){
                                    msg_s = "How much do you want to pay each visitor? (min: 0.00000500 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserLtc( msg.from.id) + FUNC.FUNC.getUserLtcd( msg.from.id)){
                                        msg_s = "You don't have enough Ltc (Litecoin) ! \n You can make a deposit !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        //console.log(";;;"+values+";;;;")

                                        FUNC.FUNC.addAds( msg.from.id, values, "ltc");
                                        msg_s = "🎉 Your site have been successfully added !"
                                    }
                                        
                                }
                                break;
                        }

                        bot.sendMessage(msg.chat.id, msg_s);


                        /********************AM HERE****************** */
                    }else if(previous[msg.from.id]=="PPostFr1"){

                        v2[msg.from.id] = msg.text;
                        //values[msg.from.id][2] = msg.text;
                        if(msg.text < 30){
                            bot.sendMessage(msg.chat.id, "Combien de vues voulez-vous? (min: 30) : ");
                        }else{
                            // How much do you want to pay for each view
                            var msg_s = "Quelle est la rémunération par vue? (min: ";
                            switch(v1[msg.from.id]){
                            //switch(values[msg.from.id][1]){
                                case "xbt":
                                    msg_s+="0.00000030 ) : ";
                                    break;
    
                                case "eth":
                                    msg_s+="0.00000300 ) : ";
                                    break;
    
                                case "ltc":
                                    msg_s+="0.00000500 ) : ";
                                    break;
                                
                                default:
                                    msg_s = "Une Erreur s'est produite !! Réssayer !"
                                    break;
                            }
                            bot.sendMessage(msg.chat.id, msg_s);
                            FUNC.FUNC.savePrevious(msg.from.id,  "PPostFr2")
                        }

                    }else if(previous[msg.from.id]=="PPostEn1"){

                        v2[msg.from.id] = msg.text;
                        //values[msg.from.id][2] = msg.text;
                        if(msg.text < 30){
                            bot.sendMessage(msg.chat.id, "How many views do you want? (min: 30) : ");
                        }else{
                            // How much do you want to pay for each view
                            var msg_s = "How much do you want to pay per view? (min: ";
                            switch(v1[msg.from.id]){
                            //switch(values[msg.from.id][1]){
                                case "xbt":
                                    msg_s+="0.00000030 ) : ";
                                    break;
    
                                case "eth":
                                    msg_s+="0.00000300 ) : ";
                                    break;
    
                                case "ltc":
                                    msg_s+="0.00000500 ) : ";
                                    break;
                                
                                default:
                                    msg_s = "An Error Occured !! Try Again !"
                                    break;
                            }
                            bot.sendMessage(msg.chat.id, msg_s);
                            FUNC.FUNC.savePrevious(msg.from.id, "PPostEn2")
                        }

                    } /****************HERERERERREERERERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR */



                    else if(previous[msg.from.id]=="PPostFr2"){

                        v3[msg.from.id] = msg.text;
                        //values[msg.from.id][3] = msg.text;
                        var msg_s = ""
                        switch(v1[msg.from.id]){
                        //switch(values[msg.from.id][1]){
                            case "xbt":
                                if(msg.text < 0.00000030){
                                    msg_s = "Quelle est la rémunération par vue? (min: 0.00000030 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    // var t = values[msg.from.id][2] * values[msg.from.id][3]
                                    if(t > FUNC.FUNC.getUserXbt( msg.from.id) + FUNC.FUNC.getUserXbtd( msg.from.id)){
                                        msg_s = "Vous n'avez pas assez de Btc (Bitcoin) ! \n Vous pouvez faire un dépot !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        //FUNC.FUNC.addAds(balance_p, msg.from.id, values, "xbt");
                                        FUNC.FUNC.addAdp( msg.from.id, values, "xbt")
                                        msg_s = "🎉 Votre Post a été ajouté avec succès !"
                                    }
                                }
                                break;
                            
                            case "eth":
                                if(msg.text < 0.00000300){
                                    msg_s = "Quelle est la rémunération par vue? (min: 0.00000300 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserEth( msg.from.id) + FUNC.FUNC.getUserEthd( msg.from.id)){
                                        msg_s = "Vous n'avez pas assez de Eth (Ethereum) ! \n Vous pouvez faire un dépot !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        // FUNC.FUNC.addAds(balance_p, msg.from.id, values, "eth");
                                        FUNC.FUNC.addAdp(msg.from.id, values, "eth")

                                        msg_s = "🎉 Votre Post a été ajouté avec succès !"
                                    }
                                        
                                }
                                break;

                            case "ltc":
                                if(msg.text < 0.00000500){
                                    msg_s = "Quelle est la rémunération par vue? (min: 0.00000500 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserLtc( msg.from.id) + FUNC.FUNC.getUserLtcd( msg.from.id)){
                                        msg_s = "Vous n'avez pas assez de Ltc (Litecoin) ! \n Vous pouvez faire un dépot !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        // FUNC.FUNC.addAds(balance_p, msg.from.id, values, "ltc");
                                        FUNC.FUNC.addAdp( msg.from.id, values, "ltc")


                                        msg_s = "🎉 Votre Post a été ajouté avec succès !"
                                    }

                                        
                                }
                                break;
                        }

                        bot.sendMessage(msg.chat.id, msg_s);
                    }




                    else if(previous[msg.from.id]=="PPostEn2"){

                        v3[msg.from.id] = msg.text;
                        //values[msg.from.id][3] = msg.text;
                        var msg_s = ""
                        switch(v1[msg.from.id]){
                        //switch(values[msg.from.id][1]){
                            case "xbt":
                                if(msg.text < 0.00000030){
                                    msg_s = "How much do you want to pay per view? (min: 0.00000030 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    // var t = values[msg.from.id][2] * values[msg.from.id][3]
                                    if(t > FUNC.FUNC.getUserXbt( msg.from.id) + FUNC.FUNC.getUserXbtd( msg.from.id)){
                                        msg_s = "You don't have enough Btc (Bitcoin) ! \n You can make a deposit !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        //FUNC.FUNC.addAds(balance_p, msg.from.id, values, "xbt");
                                        FUNC.FUNC.addAdp( msg.from.id, values, "xbt")
                                        msg_s = "🎉 Your Post has been added successfully!"
                                    }
                                }
                                break;
                            
                            case "eth":
                                if(msg.text < 0.00000300){
                                    msg_s = "How much do you want to pay per view? (min: 0.00000300 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserEth( msg.from.id) + FUNC.FUNC.getUserEthd( msg.from.id)){
                                        msg_s = "You don't have enough Eth (Ethereum) ! \n  You can make a deposit  !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        // FUNC.FUNC.addAds(balance_p, msg.from.id, values, "eth");
                                        FUNC.FUNC.addAdp( msg.from.id, values, "eth")

                                        msg_s = "🎉 Your Post has been added successfully!"
                                    }
                                        
                                }
                                break;

                            case "ltc":
                                if(msg.text < 0.00000500){
                                    msg_s = "How much do you want to pay per view? (min: 0.00000500) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserLtc( msg.from.id) + FUNC.FUNC.getUserLtcd( msg.from.id)){
                                        msg_s = "You don't have enough Ltc (Litecoin) ! \n  You can make a deposit !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        // FUNC.FUNC.addAds(balance_p, msg.from.id, values, "ltc");
                                        FUNC.FUNC.addAdp( msg.from.id, values, "ltc")

                                        msg_s = "🎉 Your Post has been added successfully!"
                                    }

                                        
                                }
                                break;
                        }

                        bot.sendMessage(msg.chat.id, msg_s);
                    }

                    // jdokd
                    // ekld
                    // SVGFEBlendElementdkkdkd
                    // dkkll
                    // dkk
                    // jdokd
                    // ekld
                    // SVGFEBlendElementdkkdkd
                    // dkkll
                    // dkk
                    // jdokd
                    // ekld
                    // SVGFEBlendElementdkkdkd
                    // dkkll
                    // dkk
                    else if(previous[msg.chat.id]=="PBotFr2"){
                        v2[msg.from.id] = msg.text;
                        //values[msg.from.id][2] = msg.text;
                        if(msg.text < 30){
                            bot.sendMessage(msg.chat.id, "Combien d'utilisateurs voulez-vous? (min: 30) : ");
                        }else{
                            var msg_s = "Quelle est la rémunération par utilisateur? (min: ";
                            switch(v1[msg.from.id]){
                            //switch(values[msg.from.id][1]){
                                case "xbt":
                                    msg_s+="0.00000030 ) : ";
                                    break;
    
                                case "eth":
                                    msg_s+="0.00000300 ) : ";
                                    break;
    
                                case "ltc":
                                    msg_s+="0.00000500 ) : ";
                                    break;
                                
                                default:
                                    msg_s = "Une Erreur s'est produite !! Réssayer !"
                                    break;
                            }
                            bot.sendMessage(msg.chat.id, msg_s);
                            FUNC.FUNC.savePrevious(msg.from.id, "PBotFr3")
                        }
                    }


                    else if(previous[msg.chat.id]=="PBotEn2"){
                        v2[msg.from.id] = msg.text;
                        //values[msg.from.id][2] = msg.text;
                        if(msg.text < 30){
                            bot.sendMessage(msg.chat.id, "How many users do you want? (min: 30) : ");
                        }else{
                            var msg_s = "How many do you want to pay each user? (min: ";
                            switch(v1[msg.from.id]){
                            //switch(values[msg.from.id][1]){
                                case "xbt":
                                    msg_s+="0.00000030 ) : ";
                                    break;
    
                                case "eth":
                                    msg_s+="0.00000300 ) : ";
                                    break;
    
                                case "ltc":
                                    msg_s+="0.00000500 ) : ";
                                    break;
                                
                                default:
                                    msg_s = "An Error Occured !! Try Again !"
                                    break;
                            }
                            bot.sendMessage(msg.chat.id, msg_s);
                            FUNC.FUNC.savePrevious(msg.from.id,  "PBotEn3")
                        }
                    }


                    else if(previous[msg.from.id]=="PBotEn3"){

                        //console.log("ddooooodoodoodoodododoodododoooooodododododod")

                        v3[msg.from.id] = msg.text;
                        //values[msg.from.id][3] = msg.text;
                        var msg_s = ""
                        switch(v1[msg.from.id]){
                        //switch(values[msg.from.id][1]){
                            case "xbt":
                                if(msg.text < 0.00000030){
                                    msg_s = "How much do you want to pay per user? (min: 0.00000030 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    // var t = values[msg.from.id][2] * values[msg.from.id][3]
                                    if(t > FUNC.FUNC.getUserXbt( msg.from.id) + FUNC.FUNC.getUserXbtd( msg.from.id)){
                                        msg_s = "You don't have enough Btc (Bitcoin) ! \n You can make a deposit !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        //FUNC.FUNC.addAds(balance_p, msg.from.id, values, "xbt");
                                        FUNC.FUNC.addAdb( msg.from.id, values, "xbt")
                                        msg_s = "🎉 Your Bot has been added successfully !"
                                    }
                                }
                                break;
                            
                            case "eth":
                                if(msg.text < 0.00000300){
                                    msg_s = "How much do you want to pay per user? (min: 0.00000300 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserEth( msg.from.id) + FUNC.FUNC.getUserEthd( msg.from.id)){
                                        msg_s = "You don't have enough Eth (Ethereum) ! \n You can make a deposit !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        // FUNC.FUNC.addAds(balance_p, msg.from.id, values, "eth");
                                        FUNC.FUNC.addAdb( msg.from.id, values, "eth")

                                        msg_s = "🎉 Your Bot has been added successfully !"
                                    }
                                        
                                }
                                break;

                            case "ltc":
                                if(msg.text < 0.00000500){
                                    msg_s = "How much do you want to pay per user? (min: 0.00000500 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserLtc( msg.from.id) + FUNC.FUNC.getUserLtcd( msg.from.id)){
                                        msg_s = "You don't have enough Ltc (Litecoin) ! \n You can make a deposit !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        // FUNC.FUNC.addAds(balance_p, msg.from.id, values, "ltc");
                                        FUNC.FUNC.addAdb( msg.from.id, values, "ltc")

                                        msg_s = "🎉 Your Bot has been added successfully !"
                                    }

                                        
                                }
                                break;
                        }

                        bot.sendMessage(msg.chat.id, msg_s);
                    }




                    else if(previous[msg.from.id]=="PBotFr3"){

                        //console.log("ddooooodoodoodoodododoodododoooooodododododod")

                        v3[msg.from.id] = msg.text;
                        //values[msg.from.id][3] = msg.text;
                        var msg_s = ""
                        switch(v1[msg.from.id]){
                        //switch(values[msg.from.id][1]){
                            case "xbt":
                                if(msg.text < 0.00000030){
                                    msg_s = "Quelle est la rémunération par utilisateur? (min: 0.00000030 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    // var t = values[msg.from.id][2] * values[msg.from.id][3]
                                    if(t > FUNC.FUNC.getUserXbt( msg.from.id) + FUNC.FUNC.getUserXbtd( msg.from.id)){
                                        msg_s = "Vous n'avez pas assez de Btc (Bitcoin) ! \n Vous pouvez faire un dépot !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        //FUNC.FUNC.addAds(balance_p, msg.from.id, values, "xbt");
                                        FUNC.FUNC.addAdb( msg.from.id, values, "xbt")
                                        msg_s = "🎉 Votre bot a été ajouté avec success !"
                                    }
                                }
                                break;
                            
                            case "eth":
                                if(msg.text < 0.00000300){
                                    msg_s = "Quelle est la rémunération par utilisateur ? (min: 0.00000300 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserEth( msg.from.id) + FUNC.FUNC.getUserEthd( msg.from.id)){
                                        msg_s = "Vous n'avez pas assez de Eth (Ethereum) ! \n Vous pouvez faire un dépot !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        // FUNC.FUNC.addAds(balance_p, msg.from.id, values, "eth");
                                        FUNC.FUNC.addAdb( msg.from.id, values, "eth")

                                        msg_s = "🎉 Votre bot a été ajouté avec success !"
                                    }
                                        
                                }
                                break;

                            case "ltc":
                                if(msg.text < 0.00000500){
                                    msg_s = "Quelle est la rémunération par utilisateur ? (min: 0.00000500 ) : ";
                                }else{
                                    var t = v2[msg.from.id] * v3[msg.from.id]
                                    if(t > FUNC.FUNC.getUserLtc( msg.from.id) + FUNC.FUNC.getUserLtcd( msg.from.id)){
                                        msg_s = "Vous n'avez pas assez de Ltc (Litecoin) ! \n Vous pouvez faire un dépot !"; 
                                    }else{
                                        var values = [v0[msg.from.id], v1[msg.from.id], v2[msg.from.id], v3[msg.from.id]]

                                        // console.log(";;;"+values+";;;;")

                                        // FUNC.FUNC.addAds(balance_p, msg.from.id, values, "ltc");
                                        FUNC.FUNC.addAdb(msg.from.id, values, "ltc")

                                        msg_s = "🎉 Votre bot a été ajouté avec success !"
                                    }

                                        
                                }
                                break;
                        }

                        bot.sendMessage(msg.chat.id, msg_s);
                    }






                }else if(previous[msg.from.id]=="👁 Post"){

                   

                    if(msg.forward_from || msg.forward_from_chat){

                        v0[msg.from.id] = [msg.from.id, msg.message_id]

                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Choisir le mode payment :", VAL.VAL.prMenu_fr);
                            FUNC.FUNC.savePrevious(msg.from.id, "PPostFr0")
                        }else{
                            bot.sendMessage(msg.chat.id, "Choose payment mode :", VAL.VAL.prMenu_fr);
                            FUNC.FUNC.savePrevious(msg.from.id, "PPostEn0")
                        }
                        
                        
                    }else{
                        bot.sendMessage(msg.chat.id, "Transferez le Post ici")
                        FUNC.FUNC.savePrevious(msg.from.id, "👁 Post")
                    }

                }else if(previous[msg.from.id]=="🤖 Bot"){
                    if(msg.forward_from && msg.forward_from.is_bot){

                        v0[msg.from.id] = [ ]
                        v0[msg.from.id][0] = msg.forward_from.username

                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Envoyez votre lien vers le Bot :");
                        }else{
                            bot.sendMessage(msg.chat.id, "Send your link for the bot :");
                        }

                        FUNC.FUNC.savePrevious(msg.from.id,  "PBot0")

                    }else{
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Transférez un message du Bot ici :");
                        }else{
                            bot.sendMessage(msg.chat.id, "Forward a message from the Bot here :")
                        }
                        FUNC.FUNC.savePrevious(msg.from.id,  "🤖 Bot"); 
                    }


                } else if(previous[msg.from.id]=="PBot0"){
                    if(isUrl(msg.text)){
                        var myurl = url.parse(msg.text)
                        if(myurl.hostname=="t.me" && myurl.pathname.substr(1)==v0[msg.from.id][0]){
                            v0[msg.from.id][1] = msg.text
                            if(FUNC.FUNC.isFrench( msg.from.id)){
                                bot.sendMessage(msg.chat.id, "Choisir le mode de payment : ",  VAL.VAL.prMenu_fr);
                                FUNC.FUNC.savePrevious(msg.from.id, "PBotFr1")
                            }else{
                                bot.sendMessage(msg.chat.id, "Choose payment mode : ",  VAL.VAL.prMenu_en);
                                FUNC.FUNC.savePrevious(msg.from.id, "PBotEn1")
                            }
                        }else{
                            bot.sendMessage(msg.chat.id, "Send valid bot link");
                            FUNC.FUNC.savePrevious(msg.from.id,  "PBot0")
                        }
                    }
                }

                else if(previous[msg.from.id]=="Bot"){
                    if(msg.forward_from && msg.forward_from.is_bot && msg.forward_from.username==FUNC.FUNC.getUsername(bvar[msg.from.id])){
    
                        var adb_id = bvar[msg.chat.id]

                        if(FUNC.FUNC.isValidB(adb_id)){
                
                            //console.log("sololololo !!!")
                            FUNC.FUNC.creditUser(msg.chat.id, FUNC.FUNC.getBPrize(adb_id), FUNC.FUNC.getBPrizeT(adb_id));
                            FUNC.FUNC.takeOneB(adb_id);
                            FUNC.FUNC.addDoneB({
                                "adb_id":adb_id,
                                "user_id": msg.chat.id
                            })

                            if(FUNC.FUNC.isFrench( msg.chat.id)){
                                bot.sendMessage(msg.chat.id, "🎁 Bravo ! Vous avez reçu "+parseFloat(FUNC.FUNC.getBPrize(adb_id)).toFixed(8)+" de "+FUNC.FUNC.getBPrizeT(adb_id));
                            }else{
                                bot.sendMessage(msg.chat.id, "🎁 Bravo ! You received "+parseFloat(FUNC.FUNC.getBPrize(adb_id)).toFixed(8)+" "+FUNC.FUNC.getBPrizeT(adb_id));    
                            }
                        }else{
                            if(FUNC.FUNC.isFrench( msg.chat.id)){
                                bot.sendMessage(msg.chat.id, "Désolé cette tâche n'est plus valide ");
                            }else{
                                bot.sendMessage(msg.chat.id, "Sorry this task is no longer valid ");    
                            }                   
                        }

                    
                    }else{
                        if(FUNC.FUNC.isFrench( msg.chat.id)){
                            bot.sendMessage(msg.chat.id, "Vous devez transfércccer un message \n du bot ici");
                        }else{
                            bot.sendMessage(msg.chat.id, "You must forward a message from \n that bot here");
                        }
                        
                    }
                    //verify isBot? isThebot? uSerDone?
                }
                else if(previous[msg.chat.id]=="cha0"){
                    if(msg.forward_from_chat && msg.forward_from_chat.type=="channel"){
                        bot.sendMessage(msg.chat.id, "...");

                        var st = 

                        /*bot.getChatMember(msg.forward_from_chat.id, msg.from.id).then(function(data){
                            if(data.status == "administrator"){
                                st = true
                            }else{
                                st = true
                            }
                        })*/

                        bot.exportChatInviteLink(msg.forward_from_chat.id).then(function(data){
                            st = data;
                        })

                        setTimeout(()=>{
                            if(isUrl(st)){

                                v0[msg.chat.id] = [msg.forward_from_chat.id, st];

                                FUNC.FUNC.savePrevious(msg.from.id, "cha1")
                                if(FUNC.FUNC.isFrench( msg.from.id)){
                                    
                                    bot.sendMessage(msg.chat.id, "🎈 Tout est presque prêt, suivez les prochaînes instructions ! \n\n Choisir le mode de payement :", VAL.VAL.prMenu_fr);
                                }
                                else{
                                    bot.sendMessage(msg.chat.id, "🎈 Everything is almost Ok ! Follow further instructions ! \n\n Choose payment mode :", VAL.VAL.prMenu_en);
                                }
                            }else{
                                if(FUNC.FUNC.isFrench( msg.chat.id)){
                                    bot.sendMessage(msg.chat.id, "Ajouter ce bot (https://t.me/AdvertXBot) à la liste des administrateurs de votre chaîne.");
                                }else{
                                    bot.sendMessage(msg.chat.id, "Add this bot(https://t.me/AdvertXBot) to your channel's administrators.");
                                }
                            }
                        }, 1000)

                    }else{
                        if(FUNC.FUNC.isFrench( msg.from.id)){
                            bot.sendMessage(msg.chat.id, "Vous devez transférer un message \n de la chaîne ici");
                        }else{
                            bot.sendMessage(msg.chat.id, "You must forward a message from \n that channel here");
                        }
                        FUNC.FUNC.savePrevious(msg.from.id, "cha0")
                    }
                }
                else{
                    //bot.sendMessage(msg.chat.id, msg.chat)
                    
                   // bot.forwardMessage(msg.chat.id, msg.chat.id, msg.message_id)
                   // console.log(msg)
                }
            break;
        } 
    }
});

// Inline button callback queries
bot.on('callback_query', function (msg) {
    previous[msg.message.chat.id] = FUNC.FUNC.loadPrevious(msg.from.id);
  
    var username = msg.from.first_name;
    //console.log(msg); // msg.data refers to the callback_data
    if(msg.message.chat.id < 0 ){
    }
    else if(msg.data=="en"){
        bot.sendMessage(msg.message.chat.id, " Hi "+username+VAL.VAL.en_welcome, VAL.VAL.menu_en);
        FUNC.FUNC.setUserLang(msg.from.id, "en");
    }else if(msg.data=="fr"){

        bot.sendMessage(msg.message.chat.id, " Salut "+username+VAL.VAL.fr_welcome, VAL.VAL.menu_fr);
        FUNC.FUNC.setUserLang(msg.from.id, "fr");
    }else if(msg.data=="sdone"){

        var pmsg_str = fs.readFileSync("./pmsg.json");
        var pmsg_p = JSON.parse(pmsg_str);

        pmsg_p.forEach((cur_v, index) =>{
            if(cur_v.valid=="yes"){
                if(cur_v.chatid==msg.message.chat.id){
                    bot.sendMessage(cur_v.chatid, cur_v.msg);
                    pmsg_p.splice(index, 1)
                    fs.writeFileSync("./pmsg.json", JSON.stringify(pmsg_p));
                }           
            }       
        });
    }else if(msg.data=="channel" || msg.data=="chaine"){
        if(msg.data=="channel")
            var msgo = "📣 To start promoting your channel you need:\n\n \
1️⃣ Add this bot(https://t.me/AdvertXBot) to your channel's administrators.\n\n \
2️⃣ Forward any post from your channel to the chat with the bot (here).\n\n \
3️⃣ Follow the further instructions of the bot‌ (http://telegra.ph/How-to-give-admin-rights-to-a-bot-07-13)";
        else
            var msgo = "📣 Pour promouvoir votre chaîne vous devez:\n\n \
1️⃣ Ajouter ce bot (https://t.me/AdvertXBot) à la liste des administrateurs de votre chaîne.\n\n \
2️⃣ Transférer un message de votre chaîne vers ce bot (ici).\n\n \
3️⃣ Et Suivez les instructions suivantes du bot (http://telegra.ph/How-to-give-admin-rights-to-a-bot-07-13)";

            bot.sendMessage(msg.message.chat.id, msgo);

            FUNC.FUNC.savePrevious(msg.message.chat.id, "cha0");
            //console.log(msg)
        }     
    else if(msg.data=="groupe" || msg.data=="group"){
        if(msg.data=="group")
            var msgo = "📣 To start promoting your group you need:\n\n \
1️⃣ Add this bot(https://t.me/AdvertXBot) to your group's administrators.\n\n \
2️⃣ Send /start@AdvertXBot into group. \n\n \
3️⃣ Follow the further instructions of the bot‌ (http://telegra.ph/How-to-give-admin-rights-to-a-bot-07-13)";
        else
            var msgo = "📣 Pour promouvoir votre groupe vous devez:\n\n \
1️⃣ Ajouter ce bot (https://t.me/AdvertXBot) à la liste des administrateurs de votre groupe .\n\n \
2️⃣ Envoyer /start@AdvertXBot dans le groupe. \n\n \
3️⃣ Et Suivez les instructions suivantes du bot (http://telegra.ph/How-to-give-admin-rights-to-a-bot-07-13)";

            bot.sendMessage(msg.message.chat.id, msgo);

            FUNC.FUNC.savePrevious(msg.message.chat.id, "gro0")
            //console.log(msg)
        }else if(msg.data=="wbtc" || msg.data=="weth" || msg.data=="wltc"){
            if(msg.data=="wbtc"){
                if(FUNC.FUNC.getUserXbt( msg.message.chat.id)<0.0005){
                    if(FUNC.FUNC.isFrench( msg.message.chat.id)){
                        bot.sendMessage(msg.message.chat.id, "Vous n'avez pas assez de Xbt ( Bitcoin ) pour faire le retrait ! (min 0.0005)");
                    }else{
                        bot.sendMessage(msg.message.chat.id, "You don't have enought Xbt ( Bitcoin ) to make a withdraw ! (min 0.0005)");  
                    }
                }else{
                    if(FUNC.FUNC.isFrench(msg.from.id))
                        bot.sendMessage(msg.message.chat.id, "Entrez l'adresse Bitcoin :"); 
                    else
                        bot.sendMessage(msg.message.chat.id, "Enter Bitcoin address :"); 
                    FUNC.FUNC.savePrevious(msg.message.chat.id,  "btcad")
                }
            }else if(msg.data=="weth"){
                if(FUNC.FUNC.getUserEth( msg.message.chat.id)<0.001){
                    if(FUNC.FUNC.isFrench( msg.message.chat.id)){
                        bot.sendMessage(msg.message.chat.id, "Vous n'avez pas assez de Eth ( Ethereum ) pour faire le retrait ! (min 0.001)");
                    }else{
                        bot.sendMessage(msg.message.chat.id, "You don't have enought Eth ( Ethereum ) to make a withdraw ! (min 0.001)");  
                    }
                }else{
                    if(FUNC.FUNC.isFrench(msg.from.id))
                        bot.sendMessage(msg.message.chat.id, "Entrez l'adresse Ethereum :"); 
                    else
                        bot.sendMessage(msg.message.chat.id, "Enter Ethereum address :"); 
                    FUNC.FUNC.savePrevious(msg.message.chat.id,  "ethad")
                }          
            }else if(msg.data=="wltc"){
                if(FUNC.FUNC.getUserLtc( msg.message.chat.id)<0.005){
                    if(FUNC.FUNC.isFrench( msg.message.chat.id)){
                        bot.sendMessage(msg.message.chat.id, "Vous n'avez pas assez de Ltc ( Litecoin ) pour faire le retrait ! (min 0.005)");
                    }else{
                        bot.sendMessage(msg.message.chat.id, "You don't have enought Ltc ( Litecoin ) to make a withdraw ! (min 0.005)");  
                    }
                }else{
                    if(FUNC.FUNC.isFrench(msg.from.id))
                        bot.sendMessage(msg.message.chat.id, "Entrez l'adresse Litecoin :"); 
                    else
                        bot.sendMessage(msg.message.chat.id, "Enter Litecoin address :"); 
                    FUNC.FUNC.savePrevious(msg.message.chat.id, "ltcad")
                }
            }
        }          
        else{
            
        if(msg.data.substr(0, 5)=="pdone"){
            var adp_id = msg.data.substr(6)

            if(FUNC.FUNC.pCheck(msg.message.chat.id, adp_id)){
                
                //console.log("sololololo !!!")
                FUNC.FUNC.creditUser(msg.message.chat.id, FUNC.FUNC.getPPrize(adp_id), FUNC.FUNC.getPPrizeT(adp_id));
                FUNC.FUNC.takeOneP(adp_id);
                FUNC.FUNC.addDoneP({
                    "adp_id":adp_id,
                    "user_id": msg.message.chat.id
                })
                if(FUNC.FUNC.isFrench( msg.message.chat.id)){
                    bot.sendMessage(msg.message.chat.id, "🎁 Bravo ! Vous avez reçu "+parseFloat(FUNC.FUNC.getPPrize(adp_id)).toFixed(8)+" de "+FUNC.FUNC.getPPrizeT(adp_id));
                }else{
                    bot.sendMessage(msg.message.chat.id, "🎁 Bravo ! You received "+parseFloat(FUNC.FUNC.getPPrize(adp_id)).toFixed(8)+" "+FUNC.FUNC.getPPrizeT(adp_id));    
                }
            }
        } 
        else if(msg.data.substr(0, 5)=="gdone"){

            var adg_id = msg.data.substr(6)
            var status
            var junk
            var groId
            if(adg_id==bvar[msg.from.id]){

                if(FUNC.FUNC.gCheck(msg.message.chat.id, adg_id)){

                    groId = FUNC.FUNC.getGroId(adg_id)
                    bot.getChat(groId).then(function(data){
                        junk = data;
                    })
                
                    setTimeout(()=>{
                        if(junk!=undefined && isUrl(junk.invite_link)){
    
                            bot.getChatMember(groId, msg.message.chat.id).then(function(data){
                                status = data.status;
                            });
    
                            setTimeout(()=>{
                                if(status=="creator" || status=="administrator" || status=="member" || status=="restricted"){
                                    
                                    FUNC.FUNC.creditUser(msg.message.chat.id, FUNC.FUNC.getGPrize(adg_id), FUNC.FUNC.getGPrizeT(adg_id));
                                    FUNC.FUNC.takeOneG(adg_id);
                                    FUNC.FUNC.addDoneG({
                                        "adg_id":adg_id,
                                        "user_id": msg.message.chat.id
                                    })
                                    if(FUNC.FUNC.isFrench( msg.message.chat.id)){
                                        bot.sendMessage(msg.message.chat.id, "🎁 Bravo ! Vous avez reçu "+parseFloat(FUNC.FUNC.getGPrize(adg_id)).toFixed(8)+" de "+FUNC.FUNC.getGPrizeT(adg_id));
                                    }else{
                                        bot.sendMessage(msg.message.chat.id, "🎁 Bravo ! You received "+parseFloat(FUNC.FUNC.getGPrize(adg_id)).toFixed(8)+" "+FUNC.FUNC.getGPrizeT(adg_id));    
                                    }

                                }else{
                                    if(FUNC.FUNC.isFrench( msg.from.id)){
                                        bot.sendMessage(msg.message.chat.id, "Désolé, Vous ne faîtes pas partie du groupe !");
                                    }else
                                        bot.sendMessage(msg.message.chat.id, "Sorry, You are not a member of the group !");   
                                }
                            }, 1000)
                        }else{
                            FUNC.FUNC.banAd(adg_id, "adg");

                            if(FUNC.FUNC.isFrench( msg.from.id)){
                                bot.sendMessage(msg.message.chat.id, "Désolé, Cette tâche n'est plus valide !");
                            }else
                                bot.sendMessage(msg.message.chat.id, "Sorry, This task is no longer valid !");
                        }
                    }, 1000)

                    //Check if user is in group

                    //console.log("sololololo !!!")
                }

            }

        }

        else if(msg.data.substr(0, 5)=="cdone"){

            var adc_id = msg.data.substr(6)
            var status
            var junk
            var chaId
            if(adc_id==bvar[msg.from.id]){
                if(FUNC.FUNC.cCheck(msg.message.chat.id, adc_id)){

                    chaId = FUNC.FUNC.getChaId(adc_id)
                    bot.getChat(chaId).then(function(data){
                        junk = data;
                    })
                
                    setTimeout(()=>{
                        if(junk!=undefined && isUrl(junk.invite_link)){
    
                            bot.getChatMember(chaId, msg.message.chat.id).then(function(data){
                                status = data.status;
                            });
    
                            setTimeout(()=>{
                                if(status=="creator" || status=="administrator" || status=="member" || status=="restricted"){
                                    
                                    FUNC.FUNC.creditUser(msg.message.chat.id, FUNC.FUNC.getCPrize(adc_id), FUNC.FUNC.getCPrizeT(adc_id));
                                    FUNC.FUNC.takeOneC(adc_id);
                                    FUNC.FUNC.addDoneC({
                                        "adc_id":adc_id,
                                        "user_id": msg.message.chat.id
                                    })
                                    if(FUNC.FUNC.isFrench( msg.message.chat.id)){
                                        bot.sendMessage(msg.message.chat.id, "🎁 Bravo ! Vous avez reçu "+parseFloat(FUNC.FUNC.getCPrize(adc_id)).toFixed(8)+" de "+FUNC.FUNC.getCPrizeT(adc_id));
                                    }else{
                                        bot.sendMessage(msg.message.chat.id, "🎁 Bravo ! You received "+parseFloat(FUNC.FUNC.getCPrize(adc_id)).toFixed(8)+" "+FUNC.FUNC.getCPrizeT(adc_id));    
                                    }

                                }else{
                                    if(FUNC.FUNC.isFrench( msg.from.id)){
                                        bot.sendMessage(msg.message.chat.id, "Désolé, Vous ne faîtes pas partie du groupe !");
                                    }else
                                        bot.sendMessage(msg.message.chat.id, "Sorry, You are not a member of the group !");   
                                }
                            }, 1000)
                        }else{
                            FUNC.FUNC.banAd(adc_id, "adc");

                            if(FUNC.FUNC.isFrench( msg.from.id)){
                                bot.sendMessage(msg.message.chat.id, "Désolé, Cette tâche n'est plus valide !");
                            }else
                                bot.sendMessage(msg.message.chat.id, "Sorry, This task is no longer valid !");
                        }
                    }, 1000)

                    //Check if user is in group

                    //console.log("sololololo !!!")
                }

            }

        }else if(msg.data.substr(0, 4)=="bbot"){
            var adb_id = msg.data.substr(4);
            FUNC.FUNC.reportBot(adb_id, "adb");
            if(FUNC.FUNC.isFrench( msg.message.chat.id)){
                bot.sendMessage(msg.message.chat.id, "👍 Vous avez signalé ce bot !");
            }else{
                bot.sendMessage(msg.message.chat.id, "👍 You've reported this bot !");
            }
        }else if(msg.data.substr(0, 4)=="skip"){
            var ad_id = msg.data.substr(6)
            var type = msg.data.substr(4, 1)

            switch(type){
                case "s" :
                    FUNC.FUNC.addDone({
                        "ads_id" : ad_id,
                        "user_id" : msg.message.chat.id
                    })
                    bot.sendMessage(msg.message.chat.id, "✅");
                    break;

                case "b" :
                    FUNC.FUNC.addDoneB({
                        "adb_id" : ad_id,
                        "user_id" : msg.message.chat.id
                    })
                    bot.sendMessage(msg.message.chat.id, "✅");
                    break;

                case "c" :
                    FUNC.FUNC.addDoneC({
                        "adc_id" : ad_id,
                        "user_id" : msg.message.chat.id
                    })
                    bot.sendMessage(msg.message.chat.id, "✅");
                    break;

                case "p" :
                    FUNC.FUNC.addDoneP({
                        "adp_id" : ad_id,
                        "user_id" : msg.message.chat.id
                    })
                    bot.sendMessage(msg.message.chat.id, "✅");
                    break;

                case "g" :
                    FUNC.FUNC.addDoneG({
                        "adg_id" : ad_id,
                        "user_id" : msg.message.chat.id
                    })
                    bot.sendMessage(msg.message.chat.id, "✅");
                    break;
            }
        }
    }
});