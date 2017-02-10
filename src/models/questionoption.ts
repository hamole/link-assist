/**
 * Created by hamish on 7/2/17.
 */
export class QuestionOption {
  order: number;
  transKey: string;
  cssClass: string;
  color: string;
  icon: string;
  constructor(order: number, transKey: string, color: string,cssClass: string, icon: string) {
    this.order = order;
    this.transKey = transKey;
    this.cssClass = cssClass;
    this.color = color;
    this.icon = icon;
  }
}


