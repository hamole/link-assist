/**
 * Created by hamish on 7/2/17.
 */
import { QuestionOption } from './questionoption';

export class Question {
  key: string;
  englishName: string;
  imageSrc: string;
  options: QuestionOption[];
  constructor(key: string, englishName: string, options: QuestionOption[] ) {
    this.key = key;
    this.englishName = englishName;
    this.options = options;
    this.imageSrc = `assets/images/${this.key}.jpg`;
  }
}


