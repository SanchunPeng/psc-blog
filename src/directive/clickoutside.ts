import Vue, { VNode, VNodeDirective } from 'vue';
import { on, MouseEventObject } from '../utils/utils';

const clickoutsideContext = '@@clickoutsideContext';

// inside中的元素可能不只一个
const nodeList : any[] = [];

let startClick : MouseEventObject;
let seed : number = 0;

let isServer : boolean = Vue.prototype.$isServer

// 鼠标按下时，记录此时事件信息
!isServer && on(document, 'mousedown', (e: any) => { startClick = e; });
// 鼠标松开时候，遍历绑定clickoutside的节点，进行判断是否在节点外部以触发回调
!isServer && on(document, 'mouseup', (e: any) => {
  nodeList.forEach(node => node[clickoutsideContext].documentHandler(e, startClick));
});


// binding传递限定inside元素的一些条件
function documentHandler(el: any, binding: VNodeDirective, vnode: any) {
  return function (mouseup : MouseEventObject, mousedown : MouseEventObject) {
    if (!vnode || !vnode.context
      || !mouseup || (mouseup && !mouseup.target)
      || !mousedown || (mousedown && !mousedown.target))
      return false;
    // inside
    if (el.contains(mouseup.target) || el.contains(mousedown.target) || el === mouseup.target) {
      return false;
    }

    if (binding.expression &&
      el[clickoutsideContext].methodName &&
      vnode.context[el[clickoutsideContext].methodName]) {
      vnode.context[el[clickoutsideContext].methodName]();
    } else {
      el[clickoutsideContext].bindingFn && el[clickoutsideContext].bindingFn();
    }
  }
}


export default {
  bind (el: any, binding: VNodeDirective, vnode: any) {
    nodeList.push(el);
    const id = seed++;
    el[clickoutsideContext] = {
      id,
      documentHandler: documentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value,
      // 特殊限定范围的class，限定范围为该class的所有元素的并集
      exactArea: binding.arg
    }
  },
  update (el: any, binding: VNodeDirective, vnode: any) {
    el[clickoutsideContext].documentHandler = documentHandler(el, binding, vnode);
    el[clickoutsideContext].methodName = binding.expression;
    el[clickoutsideContext].bindingFn = binding.value;
    // 附加 真正起作用部分
    el[clickoutsideContext].exactArea = binding.arg;
  },
  unbind(el: any) {
    let len = nodeList.length;
    for (let i = 0; i < len; i++) {
      if (nodeList[i][clickoutsideContext].id === el[clickoutsideContext].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[clickoutsideContext];
  }
}
