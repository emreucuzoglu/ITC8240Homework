export interface ICipher {

  encrypt(text: string, key: string): string;

  decrypt(text: string, key: string): string;

}
