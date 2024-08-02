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

export class YugiohCard extends Card {
  cardLeaf: Image | null;
  nameLeaf: IUI |null;
  attributeLeaf: null | Image;
  levelLeaf: null | Group;
  rankLeaf: null | Group;
  spellTrapLeaf: null | Group;
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

  drawLevel() {
    if (!this.levelLeaf) {
      this.levelLeaf = new Group();
      for (let i = 0; i < 13; i++) {
        const level = new Image();
        this.levelLeaf.add(level);
      }
      this.leafer?.add(this.levelLeaf);
    }

    const levelUrl = `${this.baseImage}/level.png`;
    const levelWidth = 88;
    const right = (this.data.level??0) < 13 ? 147 : 101;
    this.levelLeaf.children.forEach((level, index) => {
      level.set({
        url: levelUrl,
        x: this.cardWidth - right - index * (levelWidth + 4),
        y: 247,
        around: { x: 1, y: 0 },
        visible: index < (this.data.level??0),
      });
    });

    this.levelLeaf.set({
      visible: this.showLevel,
      zIndex: 10,
    });
  }

  drawRank() {
    if (!this.rankLeaf) {
      this.rankLeaf = new Group();
      for (let i = 0; i < 13; i++) {
        const rank = new Image();
        this.rankLeaf.add(rank);
      }
      this.leafer?.add(this.rankLeaf);
    }

    const rankUrl = `${this.baseImage}/rank.png`;
    const rankWidth = 88;
    const left = (this.data.rank??0) < 13 ? 147 : 101;
    this.rankLeaf.children.forEach((rank, index) => {
      rank.set({
        url: rankUrl,
        x: left + index * (rankWidth + 4),
        y: 247,
        visible: index < (this.data.rank??0),
      });
    });

    this.rankLeaf.set({
      visible: this.showRank,
      zIndex: 10,
    });
  }

  drawSpellTrap() {
    if (!this.spellTrapLeaf) {
      this.spellTrapLeaf = new Group();

      const rightText = new CompressText();
      const spellTrapIcon = new Image();
      const leftText = new CompressText();

      this.spellTrapLeaf.add(rightText);
      this.spellTrapLeaf.add(spellTrapIcon);
      this.spellTrapLeaf.add(leftText);

      this.leafer?.add(this.spellTrapLeaf);
    }

    const { spellTrap } = this.style;
    const { icon } = spellTrap as StyleObject;

    const iconUrl = this.data.icon ? `${this.baseImage}/icon-${this.data.icon}.png` : '';
    const iconWidth = this.data.icon ? 72 : 0;
    const leftBracket = ['en', 'kr'].includes(this.data.language??"") ? '[' : '【';
    const rightBracket = ['en', 'kr'].includes(this.data.language??"") ? ']' : '】';
    const letterSpacing = (spellTrap as StyleObject).letterSpacing as number || 0;
    const wordSpacing = (spellTrap as StyleObject).wordSpacing || 0;

    const rightText = this.spellTrapLeaf.children[0];
    const spellTrapIcon = this.spellTrapLeaf.children[1];
    const leftText = this.spellTrapLeaf.children[2];

    rightText.set({
      text: rightBracket,
      fontFamily: (spellTrap as StyleObject).fontFamily as string,
      fontSize: (spellTrap as StyleObject).fontSize as number,
      letterSpacing,
      wordSpacing,
      scaleY: (spellTrap as StyleObject).scaleY as number || 1,
      y: (spellTrap as StyleObject).top as number,
      key: this.key,
    });
    const rightBounds = rightText.noBounds;
    rightText.x = this.cardWidth - ((spellTrap as StyleObject).right as number) - rightBounds.width;

    spellTrapIcon.set({
      url: iconUrl,
      x: rightText.x - (this.data.icon ? (icon.marginRight || 0) : 0) - iconWidth,
      y: spellTrap.top + (icon.marginTop || 0),
    });

    leftText.set({
      text: leftBracket + this.spellTrapName,
      fontFamily: spellTrap.fontFamily,
      fontSize: spellTrap.fontSize,
      letterSpacing,
      wordSpacing,
      scaleY: spellTrap.scaleY || 1,
      rtFontSize: spellTrap.rtFontSize,
      rtTop: spellTrap.rtTop,
      rtFontScaleX: spellTrap.rtFontScaleX || 1,
      y: spellTrap.top,
      key: this.key,
    });
    const leftBounds = leftText.bounds;
    leftText.x = spellTrapIcon.x - (this.data.icon ? (icon.marginLeft || 0) : 0) - leftBounds.width;

    this.spellTrapLeaf.set({
      visible: ['spell', 'trap'].includes(this.data.type),
      zIndex: 10,
    });
  }

  get showRank() {
    let show = false;
    if (this.data.type === 'monster') {
      show = this.data.cardType === 'xyz';
    } else if (this.data.type === 'pendulum') {
      show = this.data.pendulumType === 'xyz-pendulum';
    }
    return show;
  }

  get showEffect() {
    return ['monster', 'pendulum'].includes(this.data.type??"") && this.data.monsterType;
  }

  get showLevel() {
    let show = false;
    if (this.data.type === 'monster') {
      show = ['normal', 'effect', 'ritual', 'fusion', 'synchro', 'token'].includes(this.data.cardType??"");
    } else if (this.data.type === 'pendulum') {
      show = ['normal-pendulum', 'effect-pendulum', 'ritual-pendulum', 'fusion-pendulum', 'synchro-pendulum'].includes(this.data.pendulumType);
    }
    return show;
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