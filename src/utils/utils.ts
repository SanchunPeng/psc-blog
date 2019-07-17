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

export interface MouseEventObject {
  target: any;
  type: string;
}


export interface StyleObject {
  left: string;
  width: string;
}


export interface StyleRightObject {
  top: string;
  right: string;
}

export interface StyleAllObject {
  top: string;
  left: string;
  width: string;
  bottom: string;
  right: string;
}

export interface StyleTransformObject {
  transform: string;
  scale: string;
}