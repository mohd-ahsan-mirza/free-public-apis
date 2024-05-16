import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { ExchangeRateService } from '../services/exchangeRate/exchangeRate';

export class APIService {
    private app: express.Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 3000; // Change this to your desired port
    }

    public async start(): Promise<void> {
        this.app.listen(this.port, async () => {
            console.log(`API service is running on port ${this.port}`);

            if (process.env['EXCHANGE_RATE_API_HOST']) {

                //https://www.frankfurter.app/docs/
                const exchangeRate = new ExchangeRateService(process.env['EXCHANGE_RATE_API_HOST'])

                const latestCadExchangeRate = await exchangeRate.getExchangeRate('CAD')
                console.debug('Latest USD to CAD: ' + latestCadExchangeRate)

                const latestCadExchangeRateBeginningOfYear = await exchangeRate.getExchangeRate('CAD', 'USD', '2024-01-01')
                console.debug('USD to CAD on 2024-01-01: ' + latestCadExchangeRateBeginningOfYear)

                const latestCadExchangeRateFromEuro = await exchangeRate.getExchangeRate('CAD', 'EUR')
                console.debug('EURO to CAD: ' + latestCadExchangeRateFromEuro)

                const allExchangeRates = await exchangeRate.getAllLatestExchangeRates()
                console.debug(allExchangeRates)

                const exchangeRates = await exchangeRate.getExchangeRates(['USD', 'CAD', 'EUR'], 'GBP')
                console.debug('GBP to ' + JSON.stringify(exchangeRates))

                const convertedAmount = await exchangeRate.convertAmount('CAD', 10.50)
                console.debug('USD to CAD: ' + convertedAmount)

                const convertedAmountBeginingOfYear = await exchangeRate.convertAmount('CAD', 10.50, 'USD', '2024-01-01')
                console.debug('USD to CAD on 2024-01-01: ' + convertedAmountBeginingOfYear)

                const pctExchangeRateChangeJPY = await exchangeRate.getPctExchangeRateChange('JPY', '2020-01-01', '2024-05-01')
                console.debug(pctExchangeRateChangeJPY)

                const pctExchangeRateChangeJPYFromCad = await exchangeRate.getPctExchangeRateChange('JPY', '2020-01-01', '2024-05-01', 'CAD')
                console.debug(pctExchangeRateChangeJPYFromCad)

                const pctExchangeRateChangeCadToEuro = await exchangeRate.getPctExchangeRateChange('EUR', '2020-01-01', '2024-05-01', 'CAD')
                console.debug(pctExchangeRateChangeCadToEuro)
            }
        });
    }
}
