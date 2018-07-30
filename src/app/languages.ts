import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languages'
})
export class Languages implements PipeTransform {
  transform(value: string): string {
    let result: string = value;

    switch (value) {
      case "en":
        result = "English"
        break;
      case "es":
        result = "Spanish"
        break;
      case "it":
      result = "Italian"
      break;
      case "fr":
        result = "French"
        break;
      case "gr":
      result = "German"
      break;
      case "ja":
      result = "Japanese"
      break;
      case "hi":
      result = "Hindue"
      break;
      default:
      result = value;
      break;
    }
    return result;
  }
}