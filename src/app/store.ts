
import { DraggedItem, SortableAction, SortableEvents } from '@angular-skyhook/sortable';



import { List, CardboardList, insertList, removeList, insertCard, removeCard } from './list/list';
import { Card } from './card/card';


export enum ActionTypes {
  SortList   = "[Kanban] SortList",
  SortCard   = "[Kanban] SortCard",
  AddCard    = "[Kanban] AddCard",
  RemoveCard = "[Kanban] RemoveCard",
  Spill      = "[Kanban] Spill",
}


export type SortList = SortableAction<ActionTypes.SortList, List>;
export type SortCard = SortableAction<ActionTypes.SortCard, Card>;

export class AddCard {
  readonly type = ActionTypes.AddCard;
  constructor(public listId: number, public title: string) {}
}

export class RemoveCard {
  readonly type = ActionTypes.RemoveCard;
  constructor(public item: DraggedItem<Card>){}
}

export class Spill {
  readonly type = ActionTypes.Spill;
  constructor(public item: DraggedItem<Card>){}
}

type Actions = SortList | SortCard | AddCard | RemoveCard | Spill;

export class BoardState {
  board: CardboardList;
  draggingBoard: CardboardList | null;
  cardInFlight: DraggedItem<Card> | null;
  listInFlight: DraggedItem<List> | null;
  nextId: number;
  spilledCard: boolean;
  isCopying: boolean;
  shouldCopy: boolean;
}

export const initialState = {
  board: null, //add in getting board logic,
  draggingBoard: null,
  cardInFlight: null,
  listInFlight: null,
  nextId: 1000,
  spilledCard: false,
  isCopying: false,
  shouldCopy: false,
}

const resetDrag = (state: BoardState): BoardState => ({
  ...state,
  draggingBoard: null,
  cardInFlight: null,
  listInFlight: null,
  isCopying: false,
  spilledCard: false
});

export const CARD_ID_WHEN_COPYING = Symbol("CLONED_CARD") as any;
const cloneCard = (card: Card, nextId: any) => ({...card, id: nextId});

const copyOrInstercard = (state: BoardState, clonedCard: Card): BoardState => {
  let {board, nextId } = state;
  if(state.cardInFlight) {
    const { data, hover } = state.cardInFlight;
    if(state.isCopying){
      nextId++;
      board = state.spilledCard
              ? state.board
              : insertCard(state.board, clonedCard, hover.listId, hover.index);
    } else {
      const either = state.draggingBoard || state.board;
      board = state.spilledCard
            ? either
            : insertCard(either, data, hover.listId, hover.index)
    }
  }
  return {...resetDrag(state), board, nextId};
};

export function listReducer(state: BoardState, action: SortList){
  const currentBoard = state.draggingBoard || state.board;
  const { data, index, listId, hover } = action.item;
  switch(action.event){
    case SortableEvents.BeginDrag: {
      return {
        ...state,
        draggingBoard: removeList(state.board, index),
        listInFlight: action.item,
      };
    }
    case SortableEvents.Hover: {
      return { ...state, listInFlight: action.item}
    }
    case SortableEvents.Drop: {
      return {
        ...resetDrag(state),
        board: insertList(currentBoard, data, hover.index),
      }
    }
    case SortableEvents.EndDrag: {
      return resetDrag(state);
    }
    default: return state;
  }
}

export function cardReducer(state: BoardState, action: SortCard){
  const { data, index, listId, hover } = action.item;
  state = { ...state, spilledCard: false};
  switch(action.event){
    case SortableEvents.BeginDrag: {
      return {
        ...state,
        draggingBoard: removeCard(state.board, listId, index),
        cardInFlight:action.item,
        isCopying: state.shouldCopy && listId === 1,
      };
    }
    case SortableEvents.Hover: {
      return {...state, cardInFlight: action.item};
    }
    case SortableEvents.Drop: {
      return copyOrInstercard(state, cloneCard(state.cardInFlight.data, state.nextId));
    }
    case SortableEvents.EndDrag: {
      return resetDrag(state);
    }
    default: return state;
  }
}

export function reducer(state: BoardState = initialState, action: Actions): BoardState {
  const currentBoard = state.draggingBoard || state.board;

  switch (action.type) {
      case ActionTypes.SortList: {
          return listReducer(state, action);
      }

      case ActionTypes.SortCard: {
          return cardReducer(state, action);
      }

      case ActionTypes.AddCard: {
        const list = currentBoard.find(x => x._id === action.listId);
        const card: Card = { _id: state.nextId, title: action.title, currentList: list._id };
        const index = list.cards.length;
        return {
            ...resetDrag(state),
            board: insertCard(state.board, card, action.listId, index),
            nextId: state.nextId + 1,
        };
      }

      case ActionTypes.RemoveCard: {
          const { listId, index } = action.item;
          return {
              ...resetDrag(state),
              board: removeCard(state.board, listId, index),
          };
      }

      case ActionTypes.Spill: {
          return { ...state, spilledCard: true, cardInFlight: action.item }
      }

      default:
          return state;
  }
}

