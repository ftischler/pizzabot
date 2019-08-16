export interface Schneiden {
  stringValue: string;
  kind: string;
}

export interface Lieferzeitpunkt {
  stringValue: string;
  kind: string;
}

export interface Value {
  stringValue: string;
  kind: string;
}

export interface ListValue {
  values: Value[];
}

export interface Belag {
  listValue: ListValue;
  kind: string;
}

export interface Time {
  stringValue: string;
  kind: string;
}

export interface Fields {
  schneiden: Schneiden;
  lieferzeitpunkt: Lieferzeitpunkt;
  belag: Belag;
  time: Time;
}

export interface PizzaParameters {
  fields: Fields;
}
