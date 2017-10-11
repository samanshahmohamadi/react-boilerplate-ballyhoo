/**
 * Created by saman on 10/9/17.
 */
const CryptoJS = require("crypto-js");
const JSZip = require("jszip");


export const makeZip = (files) => {
  let zip = new JSZip();
  let readContentPromises = []
  files.map((file) => {
    readContentPromises.push(readBlobContent(file))
  })
  return Promise.all(readContentPromises)
    .then(payload => {
      payload.map(blob => {
        zip.file(blob.fileName, blob.content);
      })
      return zip.generateAsync({type: "blob"})
    })
    .then(content => {
      let file = new File([content], "ZIP.zip", {type: "application/zip", lastModified: new Date(), lastModifiedTime: new Date().getTime()});
      return file
    });
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

export const readBlobContent = (blob) => {
  return new Promise(function (resolve, reject) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(blob);
    fileReader.onload = function (event) {
      let content
      if (!event) {
        content = fileReader.content;
      }
      else {
        content = event.target.result;
      }
      resolve({fileName: blob.name, type: blob.type, content: content})
    };
    fileReader.onerror = function (evt) {
      reject('There was an error in reading file, please check the file and try again.')
    }
  })
}
