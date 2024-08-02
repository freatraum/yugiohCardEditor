import { IObject } from "@leafer/interface/types";


export type LanguagesType = 'sc' | 'tc' | 'jp' | 'kr' | 'en' | 'astral';
export type FontType = "\""|"custom1"|"custom2";
export type AlignType = "left"|"center"|"right";
export type GradientPresetType = "silver"|"gold"|"red"|"white"|"black"|"blue"|"green";
export type CardType = "monster" | "spell" | "trap" | "pendulum";
export type AttributeType = "dark" | "light" | "earth" | "water" | "fire" | "wind" | "divine" | "\"";
export type IconType = "equip" | "filed" | "quick-play" | "ritual" |"continuous" | "counter";
export type MonsterCardType = "normal" | "effect" | "ritual" | "fusion" | "synchro" | "xyz" | "link" |"token" ;
export type PendulumCardType = "normal-pendulum" | "effect-pendulum" | "fusion-pendulum" | "xyz-pendulum" | "ritual-pendulum" | "synchro-pendulum";
export type LinkArrows = [1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, ...Array<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>]|[];
export type CopyrightType = "sc"|"jp"|"en";
export type LaserType = "laser1"|"laser2"|"laser3"|"laser4";
export type RareType = "dt" |"ur" | "gr" | "hr" | "ser" | "gser" | "pser";



export interface IYGOCard {
  [key:string]:LanguagesType|FontType|undefined|string|AlignType|boolean|number|LinkArrows|IObject;
  language?:LanguagesType;
  font?:FontType;
  name?:string;
  color?:string;
  align?:AlignType;
  gradient?:boolean;
  gradientColor1?:string;
  gradientColor2?:string;
  gradientColor3?:string;
  gradientPreset?:GradientPresetType;
  type?:CardType;
  icon?:IconType;
  image?:string;
  cardType?:MonsterCardType;
  pendulumType?:PendulumCardType;
  level?:number;
  attribute?:AttributeType;
  rank?:number;
  pendulumScale?:number;
  pendulumDescription?:string;
  atkBar?:boolean;
  atk?:number;
  def?:number;
  arrowList?:LinkArrows;
  description?:string;
  firstLineCompress?:boolean;
  descriptionAlign?:boolean;
  descriptionZoom?:number;
  descriptionWeight?:number;
  package?:string;
  password?:string;
  copyright?:CopyrightType;
  laser?:LaserType;
  rare?:RareType;
  twentieth?:boolean;
  radius?:boolean;
  scale?:number;
  resourcePath?:string;
  view?:string | IObject | undefined;
} 

