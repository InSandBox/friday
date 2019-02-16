exports.VAL = {
    token:"752478208:AAH4k4LqQcuFfzlNG156xiB4fTQQ9GRPqog",

    apiKeys : ["72e27f5bf810febc87850ade6f075ffeb3afe593"],

    start_opt: {
        'reply_markup':{
            'inline_keyboard':[
                [{text:"Francais", "callback_data": "fr"},
                {text:"English", "callback_data": "en"  }]
            ]
        }
    },

    menu_en: {'reply_markup':{ 'keyboard': [
        ["🌐 Visit Site", "📣 Join Chat"],
        ["👁 View Post", "🤖 Message Bot"],
        ["💰 Balance", "💳 Withdraw","👥 Referals"],
        ["🎁 Daily Gift", "🚀 Promote"]]
    }},
    
    menu_fr: {'reply_markup':{ 'keyboard': [
        ["🌐 Visiter Un Site", "📣 Rejoindre Un Chat"],
        ["👁 Voir Un Post", "🤖 Démarrer Un Bot"],
        ["💰 Balance", "💳 Retrait","👥 Filleuls"],
        ["🎁 Cadeau Journalier", "🚀 Promouvoir"]]
    }},

    pMenu_fr: {'reply_markup':{ 'keyboard': [
        ["🌐 Site Web", "📣 Chat"],
        ["👁 Post", "🤖 Bot"],
        ["➕ Faire Un Dépot"],
        ["🏠 Retour"]]
    }},

    pMenu_en: {'reply_markup':{ 'keyboard': [
        ["🌐 Website", "📣 Chat"],
        ["👁 Post", "🤖 Bot"],
        ["➕ Make A Deposit"],
        ["🏠 Go Back"]]
    }},

    dMenu_en: {'reply_markup':{ 'keyboard': [
        ["➕ XBT"],
        ["➕ ETH"],
        ["➕ LTC"],
        ["🏠 Go Back"]]
    }},

    dMenu_fr: {'reply_markup':{ 'keyboard': [
        ["➕ XBT"],
        ["➕ ETH"],
        ["➕ LTC"],
        ["🏠 Retour"]]
    }},

    hMenu_en: {'reply_markup':{ 'keyboard': [
        ["🏠 Go Back"]]
    }},

    hMenu_fr: {'reply_markup':{ 'keyboard': [
        ["🏠 Retour"]]
    }},

    prMenu_en: {'reply_markup':{ 'keyboard': [
        ["⚡️ XBT"],
        ["⚡️ ETH"],
        ["⚡️ LTC"],
        ["🚀 Promote"]]
    }},

    prMenu_fr: {'reply_markup':{ 'keyboard': [
        ["⚡️ XBT"],
        ["⚡️ ETH"],
        ["⚡️ LTC"],
        ["🚀 Promouvoir"]]
    }},

    en_welcome: "! 👋\n\nWelcome in this bot for earning crypto currency and promoting channels, bots, sites, posts! 📈️\n\nJoin the world of crypto by receiving cryptos for viewing posts, sites, for starting botsand joining channels 💰\n\nIf you are owner, you can promote your channel, bot, website or post here 🎩",

    fr_welcome: "! 👋\n\nBienvenue dans ce bot qui vous permet de gagner des cryptos et de promouvoir chaînes, bots, sites, posts 📈️\n\nRejoignez le monde des cryptos en recevant des cryptos pour le visionnage de posts, de sites, pour le demarage de bots et la jointure de chaînes. 💰\n\nSi vous êtes propriétaire vous pouvez aussi promouvoir votre chaîne, bot, site ou post ici 🎩",

    prChat_fr: {
        'reply_markup':{
            'inline_keyboard':[
                [{text:"Chaîne", "callback_data": "chaine"},
                {text:"Groupe", "callback_data": "groupe"  }]
            ]
        }
    },

    prChat_en: {
        'reply_markup':{
            'inline_keyboard':[
                [{text:"Channel", "callback_data": "channel"},
                {text:"Group", "callback_data": "group"  }]
            ]
        }
    },

    wMenu: {
        'reply_markup':{
            'inline_keyboard':[
                [{text:"BTC", "callback_data": "wbtc"},
                {text:"ETH", "callback_data": "weth" },
                {text:"LTC", "callback_data": "wltc"}]
            ]
        }
    },
}