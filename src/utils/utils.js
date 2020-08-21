import bappData from '@/assets/bapp/bapp.json'
import {bappRequestUrl} from '@/utils/constants.js'

export const camelize = (object) => {
  if ( typeof object == 'object'){
    for (let key in object) {
      let value = object[key];
      let newKey = key;

      if (/_/.test(key)) {
        newKey = key.replace(/([_][a-z])/g, v => v[1].toUpperCase());
        delete object[key];
      }

      if (typeof value == 'object') {
        value = camelize(value);
      }

      object[newKey] = value;
    }

    return object;
  }else{
    return object.replace(/([_][a-z])/g, v => v[1].toUpperCase())
  }
};

export const snakeize = (object) => {
  for(let key in object) {
    let value = object[key]
    let newKey = key

    // Skip all-caps keys
    if (/^[A-Z]+$/.test(key)) {
      continue
    }

    if (/[A-Z]/.test(key)) {
      newKey = key.replace(/([A-Z])/g, v => `_${v.toLowerCase()}`)
      delete object[key]
    }

    if (typeof value == 'object' ) {
      value = snakeize(value)
    }

    object[newKey] = value
  }

  return object
}

export function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}

export function getDomains(){
  let domains = bappData.list.filter( l => l.link!== undefined).map(a => a.link.split('/')[2]);

  return fetch(bappRequestUrl)
    .then(response => response.json())
    .then(json => {
      if(!_.isEqual(json, bappData)){
        domains = json.list.filter( l => l.link!== undefined).map(a => a.link.split('/')[2]);
      }
      return domains;
    }).catch((e)=>{
      return domains;
    });
}
