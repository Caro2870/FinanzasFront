export class Adapted_cost{
  reason: string;
  id_reason: number;
  value: number;

  constructor(reason: string, id_reason: number, value: number) {
    this.value = value
    this.reason = reason
    this.id_reason = id_reason
  }
}
