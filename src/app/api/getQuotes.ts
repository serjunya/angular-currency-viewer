export interface QuotesData {
  CNY: number;
  EUR: number;
  GBP: number;
  JPY: number;
  TRY: number;
  USD: number;
}

export const getQuotes = async (): Promise<QuotesData> => {
  return fetch('https://api.freecurrencyapi.com/v1/latest?apikey=ooYbE2pIIPF0HIeOzl4zvtFrdI1tYilcl5sHSS8J&currencies=USD%2CEUR%2CGBP%2CCNY%2CJPY%2CTRY&base_currency=RUB')
    .then(res => res.json())
    .then(res => {
      const converted: QuotesData = {
        CNY: +(1 / res.data.CNY).toFixed(2),
        EUR: +(1 / res.data.EUR).toFixed(2),
        GBP: +(1 / res.data.GBP).toFixed(2),
        JPY: +(1 / res.data.JPY).toFixed(2),
        TRY: +(1 / res.data.TRY).toFixed(2),
        USD: +(1 / res.data.USD).toFixed(2)
      }
      return converted;
    });
}
