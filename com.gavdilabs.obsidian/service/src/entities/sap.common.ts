export interface ILanguages {
  name: string;
  descr: string;
  code: string;
  texts?: ILanguagesTexts[];
  localized?: ILanguagesTexts;
}

export interface ICountries {
  name: string;
  descr: string;
  code: string;
  texts?: ICountriesTexts[];
  localized?: ICountriesTexts;
}

export interface ICurrencies {
  name: string;
  descr: string;
  code: string;
  symbol: string;
  texts?: ICurrenciesTexts[];
  localized?: ICurrenciesTexts;
}

export interface ILanguagesTexts {
  locale: string;
  name: string;
  descr: string;
  code: string;
}

export interface ICountriesTexts {
  locale: string;
  name: string;
  descr: string;
  code: string;
}

export interface ICurrenciesTexts {
  locale: string;
  name: string;
  descr: string;
  code: string;
}

export enum Entity {
  Languages = "sap.common.Languages",
  Countries = "sap.common.Countries",
  Currencies = "sap.common.Currencies",
  LanguagesTexts = "sap.common.Languages.texts",
  CountriesTexts = "sap.common.Countries.texts",
  CurrenciesTexts = "sap.common.Currencies.texts",
}

export enum SanitizedEntity {
  Languages = "Languages",
  Countries = "Countries",
  Currencies = "Currencies",
  LanguagesTexts = "LanguagesTexts",
  CountriesTexts = "CountriesTexts",
  CurrenciesTexts = "CurrenciesTexts",
}
