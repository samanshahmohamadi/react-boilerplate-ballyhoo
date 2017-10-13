/**
 * Created by saman on 10/10/17.
 */

import MomentJal from 'moment-jalaali'


export const numberWithCommas = (x) => {
  return (x === null || x===undefined) ? 0 : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const bytesToMb = (bytes) => {
  return (bytes / (1000*1000)).toFixed(2);
}

export const getVideoDuration = (file) => {
  let video = document.createElement('video');
  video.preload = 'metadata';
  video.src = URL.createObjectURL(file);
  return new Promise(function (resolve, reject) {
    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(this.src)
      resolve (video.duration);
    }
  })
}

export const timeToJalaliDate = (t) => {
  if (t) return MomentJal.unix(t / 1000).format('HH:MM:SS - jYYYY/jM/jD')
  else return ''
}
