import {Cryptogram} from '../../classes/cryptogram';
import {NGram} from '../../classes/ngram';

export class CalculationUtil {

  public static readonly ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor() {
  }

  public static calculateNgrams(cryptogram: Cryptogram): void {
    cryptogram.bigrams = CalculationUtil.calculateBigrams(cryptogram.cipherText);
    cryptogram.trigrams = CalculationUtil.calculateTrigrams(cryptogram.cipherText);
  }

  public static frequencyAnalysis(cryptogram: Cryptogram, keyLength: number) {
    cryptogram.letterCounts = CalculationUtil.calculateLetters(cryptogram.cipherText, keyLength);
    cryptogram.frequencies = CalculationUtil.calculateFrequencies(cryptogram.letterCounts);
    cryptogram.indexOfCoincidence = CalculationUtil.calculateIndexOfCoincidence(cryptogram.letterCounts);
  }

  private static calculateLetters(cipherText: string, keyLength: number): Map<string, number>[] {
    return CalculationUtil.sortLetters(CalculationUtil.countLetters(cipherText, keyLength));
  }

  private static countLetters(cipherText: string, keyLength: number): Map<string, number>[] {
    const result = [];

    for (let i = 0; i < keyLength; i++) {
      result[i] = new Map<string, number>();
    }

    for (let i = 0; i < cipherText.length; i++) {
      const tmpNumber = result[i % keyLength].get(cipherText[i]);
      result[i % keyLength].set(cipherText[i], isNaN(tmpNumber) ? 1 : tmpNumber + 1);
    }

    return result;
  }

  private static sortLetters(letterCounts: Map<string, number>[]): Map<string, number>[] {
    const result = [];
    for (let i = 0; i < letterCounts.length; i++) {
      result[i] = new Map<string, number>(Array.from(letterCounts[i])
        .sort((a: [string, number], b: [string, number]) => {
          return b['1'] - a['1'];
        }));
    }

    return result;
  }

  private static calculateFrequencies(letterCounts: Map<string, number>[]): Map<string, number>[] {
    const result = [];

    for (let i = 0; i < letterCounts.length; i++) {
      const frequencies = new Map<string, number>(letterCounts[i]);

      const textLength = this.findTextLength(frequencies);
      frequencies.forEach((value: number, key: string) => frequencies.set(key, value / textLength));
      result[i] = frequencies;
    }

    return result;
  }

  private static findTextLength(map: Map<string, number>) {
    let textLength = 0;
    for (const length of map.values()) {
      textLength += length;
    }
    return textLength;
  }

  private static calculateIndexOfCoincidence(letterCounts: Map<string, number>[]): number[] {
    const result = [];
    for (let i = 0; i < letterCounts.length; i++) {
      let indexOfCoincidence = 0;
      const textLength = this.findTextLength(letterCounts[i]);

      Array.from(letterCounts[i])
        .map(item => item['1'])
        .filter(value => value > 1)
        .forEach(value => indexOfCoincidence += value * (value - 1));
      result[i] = indexOfCoincidence / textLength * (textLength - 1);
    }
    return result;
  }

  private static calculateBigrams(cipherText: string): Set<NGram> {
    return CalculationUtil.addNGram(cipherText, 2);
  }

  private static calculateTrigrams(cipherText: string): Set<NGram> {
    return CalculationUtil.addNGram(cipherText, 3);
  }

  private static addNGram(cipherText: string, length: number): Set<NGram> {
    const tmpMap = new Map<string, NGram>();
    for (let i = 0; i < cipherText.length - (length - 1); i++) {
      let key = '';
      for (let j = 0; j < length; j++) {
        key += cipherText[i + j];
      }

      const tmpNgram = new NGram(key);

      if (!tmpMap.has(key)) {
        const offsets = CalculationUtil.findOffsets(key, cipherText, i + length);
        if (offsets.length > 1) {
          tmpNgram.offsets = offsets;
          tmpNgram.gcd = CalculationUtil.findGcd(offsets);
          tmpMap.set(key, tmpNgram);
        }
      }
    }

    return new Set<NGram>(tmpMap.values());
  }

  private static findGcd(offsets: number[]): number {
    const numbers = Array.from(offsets);
    for (let i = 1; i < numbers.length; i++) {
      numbers[0] = this.findGcdOfTwoNumbers(numbers[0], numbers[i]);
    }
    return numbers[0];
  }

  private static findGcdOfTwoNumbers(first: number, second: number): number {
    if (first < 0) {
      first = Math.abs(first);
    }
    if (second < 0) {
      second = Math.abs(second);
    }
    if (second > first) {
      const temp = first;
      first = second;
      second = temp;
    }

    while (true) {
      first %= second;
      if (first === 0) {
        return second;
      }
      second %= first;
      if (second === 0) {
        return first;
      }
    }
  }

  private static findOffsets(key: string, cipherText: string, startIndex: number): number[] {
    let tmpIndex = startIndex;
    let foundAt: number;
    const offsets: number[] = [];

    while ((foundAt = cipherText.indexOf(key, tmpIndex)) > -1) {
      offsets.push(foundAt + key.length - tmpIndex);
      tmpIndex = foundAt + key.length;
    }

    return offsets;
  }

}
