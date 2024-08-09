const fs = require("node:fs");

const file = JSON.parse(fs.readFileSync("./db/contacts.json", "utf-8"));
const contacts = file.contacts;
const replyMessages = JSON.parse(
  fs.readFileSync("./db/reply-messages.json", "utf-8")
);
const clientMessagesData = JSON.parse(
  fs.readFileSync("./db/client-message-data.json", "utf-8")
);

const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

let chatId;
let assistant = true;
let data = {};

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  const media = MessageMedia.fromFilePath("img/feed-1.png");
  const body = message.body;
  const from = message.from;
  const type = message.type;
  const ts = message.timestamp * 1000;
  const chat = await client.getChatById(message.from);

  if (type == "chat") {
    if (body == "/assistant") {
      assistant = true;
      client.sendMessage(from, replyMessages.greeting);
    } else {
      if (assistant) {
        if (chatId == from) {
          if (body == "1") {
            client.sendMessage(from, replyMessages.adm);
            assistant = false;
          }
          if (body == "2") {
            client.sendMessage(from, replyMessages.list);
          }
          if (body == "3") {
            client.sendMessage(from, media, { caption: replyMessages.promo });
          }
          if (body == "4") {
            client.sendMessage(from, replyMessages.form);
          }
          if (body == "5") {
            client.sendMessage(from, replyMessages.address);
          }
          if (body == "6") {
            client.sendMessage(from, replyMessages.term);
          }
        } else {
          client.sendMessage(from, replyMessages.greeting);
          chatId = from;
        }
      }
    }
  }
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.initialize();

// const caption = '*[PROMO SPESIAL]*\n' +
//     'Layanan Grooming Home Service.\n' +
//     '*Discount 20%* untuk *SEMUA* jenis grooming!\n' +
//     '\n' +
//     '*Harga Normal:*\n' +
//     '- Basic Groom: Rp 55.000\n' +
//     '- Medicated Groom: Rp 65.000\n' +
//     '- Anti Flea Groom: Rp 75.000\n' +
//     '- Complete Groom: Rp 90.000\n' +
//     '\n' +
//     '*Harga Promo:*\n' +
//     '- Basic Groom: Rp 45.000\n' +
//     '- Medicated Groom: Rp 50.000\n' +
//     '- Anti Flea Groom: Rp 60.000\n' +
//     '- Complete Groom: Rp 75.000\n' +
//     '\n' +
//     'Mengapa harus grooming di tempat kami?\n' +
//     '✅ Tidak perlu ke Petshop untuk grooming\n' +
//     '✅ Dipantau langsung dirumah Anda\n' +
//     '✅ Staf berpengalaman dan terlatih\n' +
//     '✅ Suasana nyaman untuk kucing Anda\n' +
//     '✅ Hemat waktu & tenaga\n' +
//     '✅ Hasil grooming maksimal\n' +
//     '\n' +
//     'Jangan lewatkan kesempatan ini! Promo berlaku hingga _21 Agustus 2024_.\n' +
//     '_Syarat & ketentuan berlaku._.\n' +
//     '\n' +
//     'Tunggu apa lagi? Hubungi kami sekarang! \n' +
//     '📞 WhatsApp: 087883977436\n' +
//     '📸 Instagram: @catclean.medan';

// const orderText = 'Terimakasih sudah order jasa kami.\n'+
//     'Silahkan isi formulir dibawah'

// if (firstNum != '6' && firstNum != '0' && firstNum != '8') {
//     console.log('unidentified num');
// }else{
//     if (firstNum != '6') {
//         console.log('is 08');
//     }else{
//         console.log('is +62/62');
//     }
// }
// console.log(contact.length > 9 ? contact : 'dump');
// if (contact.length > 9) {
//     // contact = 'dump';
//     const firstNum = contact.split('')[0]
//     if (firstNum !='6') {
//         if (firstNum == '0') {
//             const char = contact.substr(1);
//             client.sendMessage('6285834323869@c.us', `62${char}`);
//             console.log('message has been send by 08');

//         }else{
//             client.sendMessage('6285834323869@c.us', `62${contact}`)
//             console.log('message has been send by 0');
//         }
//     }else{
//         client.sendMessage('6285834323869@c.us', contact)
//         console.log('message has been send by 62');
//     }
// }

// if(body == '!send'){
//     contacts.map((contact)=>{
//         let phoneNum;
//         const firstNum = contact.split('')[0]
//         if (contact.length > 9) {
//             if (firstNum !='6') {
//                 if (firstNum == '0') {
//                     const char = contact.substr(1);
//                     phoneNum = "62"+char+"@c.us"
//                     if (phoneNum.includes('628')) {
//                         phoneNum = phoneNum
//                         client.sendMessage(phoneNum.toString(), media, {caption})
//                         console.log('Ok!');
//                     }
//                 }else{
//                     phoneNum = "62"+contact+"@c.us"
//                     if (phoneNum.includes('628')) {
//                         phoneNum = phoneNum
//                         client.sendMessage(phoneNum.toString(), media, {caption})
//                         console.log('Ok!');
//                     }
//                 }
//             }else{
//                 if (contact.includes('628')) {
//                     phoneNum = contact+"@c.us"
//                     client.sendMessage(phoneNum.toString(), media, {caption})
//                     console.log('Ok!');
//                 }
//             }
//         }
//     })
// }
