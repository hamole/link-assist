/**
 * Created by hamish on 7/2/17.
 */
import { QuestionOption } from './questionoption';
import { QuestionCategory } from './questioncategory';

export class Question {
  key: string;
  englishName: string;
  imageSrc: string;
  category: QuestionCategory;
  options: QuestionOption[];
  constructor(key: string, englishName: string, category: QuestionCategory,options: QuestionOption[] ) {
    this.key = key;
    this.englishName = englishName;
    this.category = category;
    this.options = options;
    this.imageSrc = `assets/images/${this.key}.jpg`;
  }
}


