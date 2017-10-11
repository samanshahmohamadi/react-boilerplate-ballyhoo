/**
 * Created by saman on 10/10/17.
 */

export const numberWithCommas = (x) => {
  return (x === null || x===undefined) ? 0 : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const bytesToMb = (bytes) => {
  return (bytes / (1000*1000)).toFixed(2);
}

export const getVideoDuration = (file) => {
  let video = document.createElement('video');
  video.preload = 'metadata';
  return new Promise(function (resolve, reject) {
    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(this.src)
      resolve (video.duration);
    }
  })
  video.src = URL.createObjectURL(file);
}
