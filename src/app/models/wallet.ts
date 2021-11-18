export class Wallet{
  currency_type: boolean;
  description: string;
  name: string;
  tir: number;
  total_value: number;

  constructor(currency_type: boolean, description: string, name: string, tir: number,
  total_value: number) {
    this.currency_type = currency_type;
    this.description = description;
    this.name = name;
    this.tir = tir
    this.total_value = total_value
  }
}
