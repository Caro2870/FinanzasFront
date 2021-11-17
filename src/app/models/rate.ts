export class Rate{
  capitalization: number;
  discount_date: string;
  percentage: number;
  rate_term: number;
  rate_type: boolean;

  constructor(capitalization: number, discount_date: string,
  percentage: number, rate_term: number, rate_type: boolean) {
    this.capitalization = capitalization;
    this.discount_date = discount_date;
    this.percentage = percentage;
    this.rate_term = rate_term;
    this.rate_type = rate_type;
  }
}
