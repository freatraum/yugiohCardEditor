import { Card } from "../card";
import { Group, Image, Text } from 'leafer-ui';
import { CompressText } from 'leafer-compress-text';
import { numberToFull, StyleObject } from "../../index";
import scStyle from "./style/sc-style";
import tcStyle from "./style/tc-style";
import jpStyle from "./style/jp-style";
import krStyle from "./style/kr-style";
import enStyle from "./style/en-style";
import custom1Style from "./style/custom1-style";
import custom2Style from "./style/custom2-style";
import astralStyle from "./style/astral-style";
import { IYGOCard } from "../card/interface";
import { IUI } from "@leafer-ui/interface";
import { CSSProperties } from "react";

export class YugiohCard extends Card {
  cardLeaf: Image | null;
  nameLeaf: IUI |null;
  attributeLeaf: null | Image;
  levelLeaf: null;
  rankLeaf: null;
  spellTrapLeaf: null;
  imageLeaf: null;
  maskLeaf: null;
  pendulumLeaf: null;
  pendulumDescriptionLeaf: null;
  packageLeaf: null;
  linkArrowLeaf: null;
  effectLeaf: null;
  descriptionLeaf: null;
  atkDefLinkLeaf: null;
  passwordLeaf: null;
  copyrightLeaf: null;
  laserLeaf: null;
  rareLeaf: null;
  attributeRareLeaf: null;
  twentiethLeaf: null;
  constructor(data:IYGOCard){
    super(data);
    this.cardLeaf = null;
    this.nameLeaf = null;
    this.attributeLeaf = null;
    this.levelLeaf = null;
    this.rankLeaf = null;
    this.spellTrapLeaf = null;
    this.imageLeaf = null;
    this.maskLeaf = null;
    this.pendulumLeaf = null;
    this.pendulumDescriptionLeaf = null;
    this.packageLeaf = null;
    this.linkArrowLeaf = null;
    this.effectLeaf = null;
    this.descriptionLeaf = null;
    this.atkDefLinkLeaf = null;
    this.passwordLeaf = null;
    this.copyrightLeaf = null;
    this.laserLeaf = null;
    this.rareLeaf = null;
    this.attributeRareLeaf = null;
    this.twentiethLeaf = null;
    this.cardWidth = 1394;
    this.cardHeight = 2031;

    this.defaultData = {
      language: 'sc',
      font: '',
      name: '',
      color: '',
      align: 'left',
      gradient: false,
      gradientColor1: '#999999',
      gradientColor2: '#ffffff',
      gradientPreset: 'silver',
      type: 'monster',
      attribute: 'dark',
      icon: '',
      image: '',
      cardType: 'normal',
      pendulumType: 'normal-pendulum',
      level: 0,
      rank: 0,
      pendulumScale: 0,
      pendulumDescription: '',
      monsterType: '',
      atkBar: true,
      atk: 0,
      def: 0,
      arrowList: [],
      description: '',
      firstLineCompress: false,
      descriptionAlign: false,
      descriptionZoom: 1,
      descriptionWeight: 0,
      package: '',
      password: '',
      copyright: '',
      laser: '',
      rare: '',
      twentieth: false,
      radius: true,
      scale: 1,
    };

    this.initLeafer();
    this.initData(data);
  }

  initDraw(): void {
      
  }

  drawCard(){
    if (!this.cardLeaf) {
      this.cardLeaf = new Image();
      this.leafer?.add(this.cardLeaf);
    }

    this.cardLeaf.set({
      url:this.cardUrl,
      cornerRadius:this.data.radius?24:0,
      zIndex:0
    })
  }

  drawName() {
    const { name } = this.style;
    if (!this.nameLeaf) {
      this.nameLeaf = new CompressText();
      this.leafer?.add(this.nameLeaf!);
    }
    this.nameLeaf?.set({
      text: this.data.name,
      fontFamily: (name as StyleObject).fontFamily as string,
      fontSize: (name as StyleObject).fontSize as number,
      letterSpacing: (name as StyleObject).letterSpacing as number || 0,
      wordSpacing: (name as StyleObject).wordSpacing || 0,
      textAlign: this.data.align || 'left',
      color: this.data.color || this.autoNameColor,
      gradient: this.data.gradient,
      gradientColor1: this.data.gradientColor1,
      gradientColor2: this.data.gradientColor2,
      rtFontSize: (name as StyleObject).rtFontSize,
      rtTop: (name as StyleObject).rtTop,
      rtColor: this.autoNameColor,
      width: this.showAttribute ? 1033 : 1161,
      height: 200,
      x: 116,
      y: (name as StyleObject).top as number,
      key: this.key,
      zIndex: 10,
    })
  }

  drawAttribute(){
    if (!this.attributeLeaf) {
      this.attributeLeaf = new Image();
      this.leafer?.add(this.attributeLeaf);
    }
    this.attributeLeaf.set({
      url:this.attributeUrl,
      x:1163,
      y:96,
      visible:this.showAttribute,
      zIndex:10
    })
  }

  get attributeUrl() {
    let suffix = '';
    if (this.data.language === 'jp') {
      suffix = '-jp';
    } else if (this.data.language === 'kr') {
      suffix = '-kr';
    } else if (this.data.language === 'en') {
      suffix = '-en';
    } else if (this.data.language === 'astral') {
      suffix = '-astral';
    }
    if (['monster', 'pendulum'].includes(this.data.type??"")) {
      if (!this.data.attribute) {
        return '';
      }
      return `${this.baseImage}/attribute-${this.data.attribute}${suffix}.png`;
    } else {
      return `${this.baseImage}/attribute-${this.data.type}${suffix}.png`;
    }
  }

  get cardUrl() {
    if (this.data.type === 'monster') {
      return `${this.baseImage}/card-${this.data.cardType}.png`;
    } else if (this.data.type === 'pendulum') {
      return `${this.baseImage}/card-${this.data.pendulumType}.png`;
    } else {
      return `${this.baseImage}/card-${this.data.type}.png`;
    }
  }

  get baseImage() {
    return `${this.resourcePath}/yugioh/image`;
  }

  get style() {
    let style:StyleObject = {};
    if (this.data.font) {
      if (this.data.font === 'custom1') {
        style = custom1Style;
      } else if (this.data.font === 'custom2') {
        style = custom2Style;
      }
    } else {
      if (this.data.language === 'sc') {
        style = scStyle;
      } else if (this.data.language === 'tc') {
        style = tcStyle;
      } else if (this.data.language === 'jp') {
        style = jpStyle;
      } else if (this.data.language === 'kr') {
        style = krStyle;
      } else if (this.data.language === 'en') {
        style = enStyle;
      } else if (this.data.language === 'astral') {
        style = astralStyle;
      }
    }
    return style;
  }

  get autoNameColor() {
    let color = 'black';
    // 自动颜色
    if ((this.data.type === 'monster' && ['xyz', 'link'].includes(this.data.cardType??"")) || ['spell', 'trap'].includes(this.data.type??"") ||
      (this.data.type === 'pendulum' && ['xyz-pendulum', 'link-pendulum'].includes(this.data.pendulumType??""))) {
      color = 'white';
    }
    return color;
  }

  get showAttribute() {
    if (['monster', 'pendulum'].includes(this.data.type??"")) {
      return !!this.data.attribute;
    }
    return true;
  }



  
}