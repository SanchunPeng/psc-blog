import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

export function on(element: any, type: string, handler: (event: any) => void) {
  if (element && type && handler) {
    if (!isServer && document.addEventListener) {
      element.addEventListener(type, handler, false);
    } else {
      element.attachEvent(`on${type}`, handler);
    }
  }
}

