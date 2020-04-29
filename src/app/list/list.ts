import { Card } from '../card/card';

export class List {
  _id?: number;
  name: string;
  cards?: Card[];
  position_on_board ?: number;
}
