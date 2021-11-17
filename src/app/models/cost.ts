export class Cost{
  cost_type: boolean;
  value: number;
  value_type: boolean

  constructor(cost_type: boolean, value: number, value_type: boolean) {
    this.cost_type = cost_type;
    this.value = value
    this.value_type = value_type
  }
}
