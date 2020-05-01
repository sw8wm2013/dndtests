
import { Card, Cards } from '../card/card';
import { ListService } from './list.service';

export interface List {
  _id?: number;
  name: string;
  cards?: Array<Card>;
  position_on_board ?: number;
}

// export type CardboardList = ReadonlyArray<List>;

// function withMutations<T>(ts:ReadonlyArray<T>, update: (ts: T[]) => void):
// ReadonlyArray<T>{
//   let lists = ts.slice(0) as Array<T>;
//   update(lists);
//   return lists as ReadonlyArray<T>;
// }

// function updateCards(board: CardboardList, listId: number, f: (cards: Card[]) => void) {
//   const fromListIdx = board.findIndex(b => b._id === listId);
//   if (fromListIdx === -1) {
//       return board;
//   }
//   const list = {
//       ...board[fromListIdx],
//       cards: withMutations(board[fromListIdx].cards, f)
//   };
//   return withMutations(board, ls => {
//       ls.splice(fromListIdx, 1, list);
//   });
// }

// export function insertList(board: CardboardList, list: List, index: number){
//   return withMutations(board, ls => {
//     ls.splice(index, 0, list)
//   });
// }

// export function removeList(board: CardboardList, index: number){
//   return withMutations(board, ls => {
//     ls.splice(index, 1)
//   });
// }

// export function removeCard(board: CardboardList, listId: number, index: number){
//   return updateCards(board, listId, cards => {
//     cards.splice(index, 1)
//   });
// }

// export function insertCard(board: CardboardList, card: Card, listId: number, index: number){
//   return updateCards(board, listId, cards => {
//     cards.splice(index, 0, card)
//   })
// }
