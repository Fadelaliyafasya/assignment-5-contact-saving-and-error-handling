const fs = require("fs");
const readline = require("readline");
const validator = require("validator");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  const lokasiDirr = "./data";
  if (!fs.existsSync(lokasiDirr)) {
    fs.mkdirSync(lokasiDirr);
    console.log("Folder berhasil dibuat.");
  } else {
    console.log("Folder sudah ada..");
  }

  const filePath = `data/contacts.json`;
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `[]`, `utf-8`);
  }

  const saveContact = (nama, nomor, email) => {
    const contact = { nama, nomor, email };
    const file = fs.readFileSync("data/contacts.json", "utf8");
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  };

  function inputan() {
    function prosesNama() {
      rl.question("Masukan namamu: ", (nama) => {
        prosesNomor(nama);
      });
    }

    function prosesNomor(nama) {
      rl.question("Masukan nomormu: ", (nomor) => {
        if (validator.isMobilePhone(nomor, "id-ID")) {
          prosesEmail(nama, nomor);
        } else {
          console.log(
            "Nomor yang anda masukan invalid, silahkan coba masukan kembali!!..."
          );
          prosesNomor(nama);
        }
      });
    }

    function prosesEmail(nama, nomor) {
      rl.question("Masukan emailmu: ", (email) => {
        if (validator.isEmail(email)) {
          saveContact(nama, nomor, email);
          console.log(
            `Nama kamu adalah ${nama}, nomor handphonemu adalah ${nomor}, dan emailmu ${email}, terima kasih!!!`
          );
          console.log("Data Tersimpan!!!!");
          rl.close();
        } else {
          console.log(
            "Email yang anda masukan invalid, coba masukan kembali!!..."
          );
          prosesEmail(nama, nomor);
        }
      });
    }

    prosesNama();
  }
  inputan();
}
main();
