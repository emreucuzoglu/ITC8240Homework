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

  private _cryptogram: Cryptogram = new Cryptogram();
  private _plainText: string;
  private _possibleKey: string;
  private _possibleKeyLength: number;

  constructor(vigenereService: VigenereService) {
    this.vigenereService = vigenereService;
  }

  ngOnInit() {
  }

  calculateNgrams(): void {
    CalculationUtil.calculateNgrams(this._cryptogram);
  }

  frequencyAnalysis(): void {
    if (!isNaN(this._possibleKeyLength)) {
      CalculationUtil.frequencyAnalysis(this._cryptogram, this._possibleKeyLength);
    }
  }

  generateKeyByLength() {
    this._possibleKey = this.vigenereService.generateKeyByLength(this._possibleKeyLength, this._cryptogram);
  }

  generateKeyByTrigram(ngram: NGram) {
    this._possibleKey = this.vigenereService.generateKeyByNgram(ngram.text, ngram.gcd, this._cryptogram);
    this._possibleKeyLength = this._possibleKey.length;
  }

  changeCharInPossibleKey(index: number, letter: string) {
    const char = this.vigenereService.getMatchingKeyToValue(letter, 'E');
    this._possibleKey = this.replaceAt(index, char);
  }

  decrypt() {
    this._plainText = this.vigenereService.decrypt(this._cryptogram.cipherText, this._possibleKey);
  }

  getBigrams() {
    return this._cryptogram.bigrams != null ? this.sortNGrams(this._cryptogram.bigrams) : null;
  }

  getTrigrams() {
    return this._cryptogram.trigrams != null ? this.sortNGrams(this._cryptogram.trigrams) : null;
  }

  getFrequencies() {
    return this.sortMapNullSafe(this._cryptogram.frequencies);
  }

  getLetterCounts() {
    return this.sortMapNullSafe(this._cryptogram.letterCounts);
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
    return this._possibleKey.substr(0, index) + replace + this._possibleKey.substr(index + replace.length);
  }

  private sortNGrams(nGrams: Set<NGram>) {
    return Array.from(nGrams)
      .sort((a, b) => {
        return b.offsets.length - a.offsets.length;
      });
  }


  get cryptogram(): Cryptogram {
    return this._cryptogram;
  }

  set cryptogram(value: Cryptogram) {
    this._cryptogram = value;
  }

  get possibleKey(): string {
    return this._possibleKey;
  }

  set possibleKey(value: string) {
    this._possibleKey = value;
  }

  get possibleKeyLength(): number {
    return this._possibleKeyLength;
  }

  set possibleKeyLength(value: number) {
    this._possibleKeyLength = value;
  }

  get plainText(): string {
    return this._plainText;
  }

  set plainText(value: string) {
    this._plainText = value;
  }
}
