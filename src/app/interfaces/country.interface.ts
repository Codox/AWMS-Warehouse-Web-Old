export interface Country {
  name: string;
  nativeName: string;
  emoji: string;
  callingCode: string;
  capital: string;
  currency: string;
  languages: string[];
  alpha: {
    '2': string;
  };
}
