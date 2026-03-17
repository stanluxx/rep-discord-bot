const { 
Client,
GatewayIntentBits,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js")

const TOKEN = process.env.TOKEN

const client = new Client({
intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
})

function extractID(url){

try{
url = decodeURIComponent(url)
}catch{}

const match = url.match(/\d{6,15}/)

if(match){
return match[0]
}

return null
}

function detectPlatform(url){

url = url.toLowerCase()

if(url.includes("weidian")) return "weidian"
if(url.includes("1688")) return "1688"

return "taobao"

}

client.on("ready", () => {
console.log(`Bot działa jako ${client.user.tag}`)
})

client.on("messageCreate", async (message)=>{

if(message.author.bot) return

const urls = message.content.match(/https?:\/\/[^\s]+/g)

if(!urls) return

for(const url of urls){

const id = extractID(url)

if(!id) continue

const platform = detectPlatform(url)

const litbuy =
`https://litbuy.com/product/${platform}/${id}?inviteCode=STANLI`

let originalLink

if(platform === "weidian"){
originalLink = `https://weidian.com/item.html?itemID=${id}`
}
else if(platform === "1688"){
originalLink = `https://detail.1688.com/offer/${id}.html`
}
else{
originalLink = `https://item.taobao.com/item.htm?id=${id}`
}

const encoded = encodeURIComponent(originalLink)

const kakobuy =
`https://www.kakobuy.com/item/details?url=${encoded}&affcode=STANLI`

const acbuy =
`https://www.acbuy.com/product/?id=${id}&source=WD&u=FR64LK`

const usfans =
`https://www.usfans.com/product/3/${id}?ref=W9G32V`

const row = new ActionRowBuilder().addComponents(

new ButtonBuilder()
.setLabel("Litbuy")
.setStyle(ButtonStyle.Link)
.setURL(litbuy),

new ButtonBuilder()
.setLabel("Kakobuy")
.setStyle(ButtonStyle.Link)
.setURL(kakobuy),

new ButtonBuilder()
.setLabel("ACBuy")
.setStyle(ButtonStyle.Link)
.setURL(acbuy),

new ButtonBuilder()
.setLabel("USFans")
.setStyle(ButtonStyle.Link)
.setURL(usfans)

)

message.reply({
content:`🔁 **Link przekonwertowany**`,
components:[row]
})

}

})

client.login(TOKEN)