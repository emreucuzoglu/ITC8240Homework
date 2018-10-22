import {NGram} from './ngram';

export class Cryptogram {

  private _cipherText: string;
  private _trigrams: Set<NGram>;
  private _bigrams: Set<NGram>;
  private _letterCounts: Map<string, number>[];
  private _frequencies: Map<string, number>[];
  private _indexOfCoincidence: number[];

  constructor() {
  }


  get cipherText(): string {
    return this._cipherText;
  }

  set cipherText(value: string) {
    this._cipherText = value;
  }

  get trigrams(): Set<NGram> {
    return this._trigrams;
  }

  set trigrams(value: Set<NGram>) {
    this._trigrams = value;
  }

  get bigrams(): Set<NGram> {
    return this._bigrams;
  }

  set bigrams(value: Set<NGram>) {
    this._bigrams = value;
  }

  get letterCounts(): Map<string, number>[] {
    return this._letterCounts;
  }

  set letterCounts(value: Map<string, number>[]) {
    this._letterCounts = value;
  }

  get frequencies(): Map<string, number>[] {
    return this._frequencies;
  }

  set frequencies(value: Map<string, number>[]) {
    this._frequencies = value;
  }

  get indexOfCoincidence(): number[] {
    return this._indexOfCoincidence;
  }

  set indexOfCoincidence(value: number[]) {
    this._indexOfCoincidence = value;
  }
}
