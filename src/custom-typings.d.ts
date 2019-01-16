interface Window {
  store: any;
  __INITIAL_STATE__: any;
}

interface Myfun {
  commit: any;
}

interface Ijson {
  parse: any;
  stringify: any;
}

declare var nodeRequire: any;
declare var Boolean: any;
declare var console: any;
declare var Object: any;
declare var setTimeout: any;
declare var JSON: Ijson;

declare interface Event {
  altKey: any; button: any; cancelBubble: any; clientX: any;
  clientY: any; ctrlKey: any; fromElement: any; keyCode: any;
  offsetX: any; offsetY: any; propertyName: any; returnValue: any;
  screenX: any; screenY: any; shiftKey: any; srcElement: any;
  srcFilter: any; toElement: any; type: any; x: any; y: any;
}

declare module 'marked' {
  const marked: any;
  export = marked;
}

declare interface Array {
  push: any;
}
