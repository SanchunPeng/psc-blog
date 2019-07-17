
import { Component, Vue} from 'vue-property-decorator';


declare module 'vue/types/vue' {
    interface Vue {
        getComponentSize (pre: string, suf: string): string
    }
}

@Component

export default class CommonPropsMethodMixin extends Vue {
   getComponentSize(prefix: string, propsize: string) {
    const propSize = propsize ? propsize.toLowerCase() : '';
    return ['default', 'small', 'large'].indexOf(propSize) > -1 ? ` ${prefix}-${propSize}` : ''; 
   } 
}

export interface  CascaderOption {
    value: string,
    label: string,
    children: Array<CascaderOption>
}

  