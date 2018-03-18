import getExtension from "./getExtension";

function isImage(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case "jpg":
    case "gif":
    case "bmp":
    case "png":
    case "svg":
      return true;
  }
  return false;
}

export default isImage;
