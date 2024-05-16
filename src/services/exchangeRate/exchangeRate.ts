// const host = 'api.frankfurter.app';
import { Currency, ExchangeRates, Rates } from "../../types/exchangeRate";

export class ExchangeRateService {
    host: string

    constructor(host: string) {
        this.host = host
    }

    async getExchangeRate(targetCurrency: Currency, baseCurrency: Currency = 'USD', date: string = 'latest'): Promise<number | null> {
        try {
            const response = await fetch(`https://${this.host}/${date}?from=${baseCurrency}&to=${targetCurrency}`);
            const data = await response.json();
            const result = data as ExchangeRates;
            return result.rates[targetCurrency] || null;
        } catch (e) {
            console.debug(e);
            return null;
        }
    }

    async getAllLatestExchangeRates(baseCurrency: Currency = 'USD', date: string = 'latest'): Promise<{ [currency in Currency]: number } | null> {
        try {
            const response = await fetch(`https://${this.host}/${date}?from=${baseCurrency}`);
            const data = await response.json();
            const result = data as ExchangeRates;
            return result.rates || null;
        } catch (e) {
            console.debug(e);
            return null;
        }
    }

    async getExchangeRates(targetCurrencies: Currency[], baseCurrency: Currency = 'USD', date: string = 'latest'): Promise<{ [currency in Currency]: number } | null> {
        try {
            const response = await fetch(`https://${this.host}/${date}?from=${baseCurrency}&to=${targetCurrencies.join(',')}`);
            const data = await response.json();
            const result = data as ExchangeRates;
            return result.rates || null;
        } catch (e) {
            console.debug(e);
            return null;
        }
    }

    async convertAmount(targetCurrency: Currency, amount: Number, baseCurrency: Currency = 'USD', date: string = 'latest'): Promise<number | null> {
        try {
            const response = await fetch(`https://${this.host}/${date}?amount=${amount}&from=${baseCurrency}&to=${targetCurrency}`);
            const data = await response.json();
            const result = data as ExchangeRates;
            return result.rates[targetCurrency] || null;
        } catch (e) {
            console.debug(e);
            return null;
        }
    }

    async getPctExchangeRateChange(targetCurrency: Currency, startDate: string, endDate: string, baseCurrency: Currency = 'USD'): Promise<number | null> {
        try {
            const response = await fetch(`https://${this.host}/${startDate}..${endDate}?from=${baseCurrency}&to=${targetCurrency}`);
            const data = await response.json();
            const result = data as ExchangeRates;


            const rates = Object.values(result.rates)
            const startRateObj = rates[0] as unknown as Rates
            const endRateObj = rates[rates.length - 1] as unknown as Rates
            const startRate = startRateObj[targetCurrency]
            const endRate = endRateObj[targetCurrency]

            return parseFloat((((endRate - startRate) / startRate) * 100).toFixed(2)) || null;
        } catch (e) {
            console.debug(e);
            return null;
        }
    }
}