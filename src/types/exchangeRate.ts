export type Currency = 'AUD' | 'BGN' | 'BRL' | 'CAD' | 'CHF' | 'CNY' | 'CZK' | 'DKK' | 'EUR' | 'GBP' | 'HKD' | 'HUF' | 'IDR' | 'ILS' | 'INR' | 'ISK' | 'JPY' | 'KRW' | 'MXN' | 'MYR' | 'NOK' | 'NZD' | 'PHP' | 'PLN' | 'RON' | 'SEK' | 'SGD' | 'THB' | 'TRY' | 'USD' | 'ZAR';

export type Rates = {
    [key in Currency]: number;
};

export interface ExchangeRates {
    amount: number;
    base: Currency;
    date: Date;
    rates: Rates
}
