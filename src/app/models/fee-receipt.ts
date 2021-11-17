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

  constructor(currency_type: boolean, delivered_value: number, dias: number, discount: number,
  discount_rate: number, issue_date: string, net_worth: number, payment_date: string, received_value: number,
  retention: number, tasa_efectiva_a_dias: number, tcea: number, tea: number, total_final_costs: number,
  total_starting_costs: number, valor_neto: number) {
    this.currency_type = currency_type;
    this.delivered_value = delivered_value;
    this.dias = dias;
    this.discount = discount;
    this.discount_rate = discount_rate;
    this.issue_date = issue_date;
    this.net_worth = net_worth;
    this.payment_date = payment_date;
    this.received_value = received_value;
    this.retention = retention;
    this.tasa_efectiva_a_dias = tasa_efectiva_a_dias;
    this.tcea = tcea;
    this.tea = tea;
    this.total_final_costs = total_final_costs;
    this.total_starting_costs = total_starting_costs;
    this.valor_neto = valor_neto;
  }
}
