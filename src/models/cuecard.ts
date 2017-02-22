/**
 * Created by Hamish on 22/02/2017.
 */
import { CueCardCategory } from './cuecardcategory';

export class CueCard {
  key: string;
  englishName: string;
  imageSrc: string;
  category: CueCardCategory;
  constructor(key: string, englishName: string, category: CueCardCategory ) {
    this.key = key;
    this.englishName = englishName;
    this.category = category;
    this.imageSrc = `assets/images/cuecards/${this.key}.jpg`;
  }
}


