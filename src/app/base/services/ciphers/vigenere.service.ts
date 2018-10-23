import {Injectable} from '@angular/core';
import {ICipher} from './Icipher';
import {CalculationUtil} from '../utils/calculation-util';
import {Cryptogram} from '../../classes/cryptogram';

@Injectable({
  providedIn: 'root'
})
export class VigenereService implements ICipher {

  constructor() {
  }

  generateKeyByLength(keyLength: number, cryptogram: Cryptogram): string {
    CalculationUtil.frequencyAnalysis(cryptogram, keyLength);
    let key = '';

    for (let i = key.length; i < keyLength; i++) {
      key += this.getMatchingKeyToValue(Array.from(cryptogram.frequencies[i])[0]['0'], 'E');
    }

    return key;
  }

  generateKeyByNgram(ngram: string, keyLength: number, cryptogram: Cryptogram): string {
    let key = this.generateKnownPartAssumingTHE(ngram);
    CalculationUtil.frequencyAnalysis(cryptogram, keyLength);

    for (let i = key.length; i < keyLength; i++) {
      key += this.getMatchingKeyToValue(Array.from(cryptogram.frequencies[i])[0]['0'], 'E');
    }

    return key;
  }

  private generateKnownPartAssumingTHE(ngram: string) {
    let key = '';
    for (let i = 0; i < ngram.length; i++) {
      let tmpValue = 'T';
      switch (i) {
        case 1:
          tmpValue = 'H';
          break;
        case 2:
          tmpValue = 'E';
          break;
        default:
      }
      key += this.getMatchingKeyToValue(ngram[i], tmpValue);
    }
    return key;
  }

  public getMatchingKeyToValue(key: string, value: string): string {
    const keyIndex = CalculationUtil.ALPHABET.indexOf(key);
    const valueIndex = CalculationUtil.ALPHABET.indexOf(value);
    const index = keyIndex - valueIndex < 0 ? keyIndex - valueIndex + CalculationUtil.ALPHABET.length : keyIndex - valueIndex;
    return CalculationUtil.ALPHABET.charAt(index);
  }

  private initKeyMatrix(key: string): string[][] {
    const result = [];
    for (let i = 0; i < key.length; i++) {
      const tmpIndex = CalculationUtil.ALPHABET.indexOf(key[i]);
      const prefix = CalculationUtil.ALPHABET.slice(tmpIndex, CalculationUtil.ALPHABET.length);
      const suffix = CalculationUtil.ALPHABET.slice(0, tmpIndex);
      result[i] = prefix + suffix;
    }

    return result;
  }

  decrypt(text: string, key: string): string {
    let result = '';
    const keyMatrix = this.initKeyMatrix(key);

    for (let i = 0; i < text.length; i++) {
      const keyIndex = i % keyMatrix.length;
      const keyAlphabet = keyMatrix[keyIndex];

      result += CalculationUtil.ALPHABET[keyAlphabet.indexOf(text[i])];
    }

    return result;
  }

  encrypt(text: string, key: string): string {
    return '';
  }
}
