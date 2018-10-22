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

  constructor(vigenereService: VigenereService) {
    this.vigenereService = vigenereService;
  }

  ngOnInit() {
  }

  calculateNgrams(): void {
    CalculationUtil.calculateNgrams(this.cryptogram);
  }

  generateKey(ngram: NGram) {
    this.possibleKey = this.vigenereService.generateKey(ngram.text, ngram.gcd, this.cryptogram.cipherText);
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

  private sortNGrams(nGrams: Set<NGram>) {
    return Array.from(nGrams)
      .sort((a, b) => {
        return b.offsets.length - a.offsets.length;
      });
  }


}
