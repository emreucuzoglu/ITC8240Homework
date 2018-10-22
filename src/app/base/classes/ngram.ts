export class NGram {

  private _text: string;
  private _offsets: number[];
  private _gcd: number;

  constructor(text: string) {
    this._text = text;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get offsets(): number[] {
    return this._offsets;
  }

  set offsets(value: number[]) {
    this._offsets = value;
  }

  get gcd(): number {
    return this._gcd;
  }

  set gcd(value: number) {
    this._gcd = value;
  }
}
