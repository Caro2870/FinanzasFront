export class FeeReceipt{
  currency_type: boolean;
  delivered_value: number;
  dias: number;
  discount: number;
  discount_rate: number;
  issue_date: string;
  net_worth: number;
  payment_date: string;
  received_value: number;
  retention: number;
  tasa_efectiva_a_dias: number;
  tcea: number;
  tea: number;
  total_final_costs: number;
  total_starting_costs: number;
  valor_neto: number;

  constructor(currency_type: boolean, issue_date: string,
              net_worth: number, payment_date: string,
              retention: number, total_final_costs: number, total_starting_costs: number) {
    this.currency_type = currency_type;
    this.delivered_value = 0;
    this.dias = 0;
    this.discount = 0;
    this.discount_rate = 0;
    this.issue_date = issue_date;
    this.net_worth = net_worth;
    this.payment_date = payment_date;
    this.received_value = 0;
    this.retention = retention;
    this.tasa_efectiva_a_dias = 0;
    this.tcea = 0;
    this.tea = 0;
    this.total_final_costs = total_final_costs;
    this.total_starting_costs = total_starting_costs;
    this.valor_neto = 0;
  }
}
