export class Cost{
  cost_type: boolean;
  id: number;
  value: number;
  value_type: boolean

  constructor(cost_type: boolean, id: number, value: number, value_type: boolean) {
    this.cost_type = cost_type;
    this.id = id
    this.value = value
    this.value_type = value_type
  }
}
