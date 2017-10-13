/**
 * Created by saman on 10/9/17.
 */
const CryptoJS = require("crypto-js");
const JSZip = require("jszip");


export const makeZip = (id, files) => {
  let zip = new JSZip();
  files.map((file) => {
    zip.file(file.name, file);
  })
  return zip.generateAsync({type: "blob"})
}

export const sha256 = (token) => {
  return CryptoJS.SHA256(token).toString();
}

export const digestFile = (file) => {
  if (file) {
    return new Promise(function (resolve, reject) {
      var fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = function (event) {
        var content
        if (!event) {
          content = fileReader.content;
        }
        else {
          content = event.target.result;
        }

        var hashedContent = sha256(content)
        resolve(hashedContent)
      };
      fileReader.onerror = function (evt) {
        reject('There was an error in reading file, please check the file and try again.')
      }
    })
  }
}

