export class Card {
  _id?: number;
  currentList: number;
  title: string;
  description ?: string;
  position_on_board?: number;
  isCopy ?: boolean;
}

export type Cards = ReadonlyArray<Card>;
