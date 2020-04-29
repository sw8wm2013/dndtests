import { Card } from '../card/card';

export class List {
  _id?: number;
  name: string;
  position: number;
  cards?: Card[];
}
