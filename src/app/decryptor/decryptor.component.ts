import {Component, OnInit} from '@angular/core';
import {Cryptogram} from '../base/classes/cryptogram';
import {CalculationUtil} from '../base/services/utils/calculation-util';
import {NGram} from '../base/classes/ngram';
import {VigenereService} from '../base/services/ciphers/vigenere.service';


@Component({
  selector: 'app-decryptor',
  templateUrl: './decryptor.component.html',
  styleUrls: ['./decryptor.component.css'],
})
export class DecryptorComponent implements OnInit {

  private vigenereService: VigenereService;

  private cryptogram: Cryptogram = new Cryptogram();
  private plainText: string;
  private possibleKey: string;
  private possibleKeyLength: number;

  constructor(vigenereService: VigenereService) {
    this.vigenereService = vigenereService;
  }

  ngOnInit() {
  }

  calculateNgrams(): void {
    CalculationUtil.calculateNgrams(this.cryptogram);
  }

  frequencyAnalysis(): void {
    if (!isNaN(this.possibleKeyLength)) {
      CalculationUtil.frequencyAnalysis(this.cryptogram, this.possibleKeyLength);
    }
  }

  generateKeyByLength() {
    this.possibleKey = this.vigenereService.generateKeyByLength(this.possibleKeyLength, this.cryptogram);
  }

  generateKeyByTrigram(ngram: NGram) {
    this.possibleKey = this.vigenereService.generateKeyByNgram(ngram.text, ngram.gcd, this.cryptogram);
    this.possibleKeyLength = this.possibleKey.length;
  }

  changeCharInPossibleKey(index: number, letter: string) {
    const char = this.vigenereService.getMatchingKeyToValue(letter, 'E');
    this.possibleKey = this.replaceAt(index, char);
  }

  decrypt() {
    this.plainText = this.vigenereService.decrypt(this.cryptogram.cipherText, this.possibleKey);
  }

  getBigrams() {
    return this.cryptogram.bigrams != null ? this.sortNGrams(this.cryptogram.bigrams) : null;
  }

  getTrigrams() {
    return this.cryptogram.trigrams != null ? this.sortNGrams(this.cryptogram.trigrams) : null;
  }

  getFrequencies() {
    return this.sortMapNullSafe(this.cryptogram.frequencies);
  }

  getLetterCounts() {
    return this.sortMapNullSafe(this.cryptogram.letterCounts);
  }

  private sortMapNullSafe(map: Map<string, number>[]) {
    if (map == null) {
      return null;
    }

    const result = [];

    for (let i = 0; i < map.length; i++) {
      result[i] = Array.from(map[i])
        .sort((a: [string, number], b: [string, number]) => b['1'] - a['1']);
    }

    return result;
  }

  private replaceAt(index: number, replace: string) {
    return this.possibleKey.substr(0, index) + replace + this.possibleKey.substr(index + replace.length);
  }

  private sortNGrams(nGrams: Set<NGram>) {
    return Array.from(nGrams)
      .sort((a, b) => {
        return b.offsets.length - a.offsets.length;
      });
  }


}
