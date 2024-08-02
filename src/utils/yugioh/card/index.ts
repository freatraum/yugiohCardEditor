import cloneDeep from 'lodash/cloneDeep';
import { AnimateEvent, Image, ImageEvent, Leafer } from "leafer-ui";
import { loadCSS } from "../../../utils";
import loaderIcon from "../svg/loader.svg";
import imageIcon from "../svg/image.svg";
import { IYGOCard } from './interface';
import { IEventListenerId ,IObject } from "@leafer/interface/types";

export class Card {
  constructor(data:IYGOCard={}){
    this.leafer = null;
    this.imageStatusLeaf = null;
    this.imageStatusEvent = undefined;
    this.cardWidth = 100;
    this.cardHeight = 100;
    this.key = 0;
    this.data = {};
    this.defaultData = {};

    this.view = data.view;
    this.resourcePath = data.resourcePath??"";

    loadCSS(`${this.resourcePath}/custom-font/custom-font.css`);
    loadCSS(`${this.resourcePath}/yugioh/font/ygo-font.css`);
    loadCSS(`${this.resourcePath}/rush-duel/font/rd-font.css`);

  }

  leafer:Leafer|null = null;
  imageStatusLeaf:Image|null = null;
  imageStatusEvent:IEventListenerId|undefined = undefined;
  cardWidth:number = 100;
  cardHeight:number = 100;
  key = 0;
  data:IYGOCard={};
  defaultData:IYGOCard={};
  view:string | IObject |undefined = undefined;
  resourcePath:string = "";

  setData(data:IYGOCard={}){
    data = cloneDeep(data);
    let needDraw = false;
    let needLoadFont = false;
    Object.keys(data).forEach(key=>{
      const value = data[key] ?? this.defaultData[key];
      if (JSON.stringify(this.data[key] !== JSON.stringify(value))) {
        this.data[key] = value;
        if (["language","font"].includes(key)) {
          needLoadFont = true;
        }
        needDraw = true;
      }
    });
    if (needDraw) {
      this.initDraw();
    }
    if (needLoadFont) {
      this.loadFont();
    }
  }

  loadFont(){
    document.fonts.ready.finally(()=>{
      this.key++;
      this.initDraw();
    })
  }

  initDraw(){}

  initData(data:IYGOCard={}){
    this.setData(Object.assign(this.defaultData,data));
  }

  initLeafer() {
    this.leafer = new Leafer({
      view:this.view,
      width:this.cardWidth,
      height:this.cardHeight,
      usePartRender:false,
      hittable:false
    });
  }

  listenImageStatus(imageLeaf:Image){
    imageLeaf.on(ImageEvent.LOAD, () => {
      this.drawImageStatus(imageLeaf, ImageEvent.LOAD);
    });
    imageLeaf.on(ImageEvent.LOADED, () => {
      this.drawImageStatus(imageLeaf, ImageEvent.LOADED);
    });
    imageLeaf.on(ImageEvent.ERROR, () => {
      this.drawImageStatus(imageLeaf, ImageEvent.ERROR);
    });

  }

  drawImageStatus(imageLeaf:Image,status:string){
    const { url ,width, height ,x ,y ,zIndex } = imageLeaf;
    if (!this.imageStatusLeaf) {
      this.imageStatusLeaf = new Image();
      this.leafer?.add(this.imageStatusLeaf);
    }
    let statusUrl = "";
    if (status === ImageEvent.LOAD) {
      statusUrl = loaderIcon;

    }else if (status === ImageEvent.ERROR) {
      statusUrl = imageIcon;

    }

    this.imageStatusLeaf.set({
      url:statusUrl,
      width:120,
      height:120,
      around:'center',
      x:(x??0)+(width??0)/2,
      y:(y??0)+(height??0)/2,
      zIndex:(zIndex??0)+1,
      visible:[ImageEvent.LOAD,ImageEvent.ERROR].includes(status) &&url!==""
    })

    if (status ==ImageEvent.LOAD) {
      this.imageStatusEvent = this.leafer?.on_(AnimateEvent.FRAME,()=>{
        this.imageStatusLeaf?.rotateOf({x:0,y:0},3);
      });
    }else {
      this.imageStatusLeaf.rotateOf({x:0,y:0},0-(this.imageStatusLeaf.rotation??0));
      if (this.imageStatusEvent!=undefined) {
        this.leafer?.off_(this.imageStatusEvent);
      }
      
    }

    
  }

  updateScale() {
    if (this.leafer!=null) {
      this.leafer.width = this.cardWidth * (this.data.scale??0) / devicePixelRatio;
      this.leafer.height = this.cardHeight * (this.data.scale??0) / devicePixelRatio;
      this.leafer.scaleX = (this.data.scale??0) / devicePixelRatio;
      this.leafer.scaleY = (this.data.scale??0) / devicePixelRatio;
    }
    
  }

}
