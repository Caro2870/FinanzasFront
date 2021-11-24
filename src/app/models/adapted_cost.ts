export class Adapted_cost{
  reason: string;
  id_reason: number;
  value: number;
  value_expressed_in: boolean;

  constructor(reason: string, id_reason: number, value: number, value_expressed_in: boolean) {
    this.value = value
    this.reason = reason
    this.id_reason = id_reason
    this.value_expressed_in = value_expressed_in
  }
}
