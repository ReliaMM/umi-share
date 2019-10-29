import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addRule, queryRule, removeRule, updateRule } from './service';
import { queryRule as queryType } from '../type/service';
import { TableListData as TypeTableListData } from '../type/data.d';
import { StateOptionType } from '../type/model';
import { TableListData } from './data.d';

export interface TagDataState {
  data: TableListData;
}

export interface TagState {
  data: TableListData;
  opt: TypeTableListData;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: TagState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: TagState;
  effects: {
    option: Effect;
    fetch: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<TagDataState>;
    getOpt: Reducer<StateOptionType>;
  };
}

const Model: ModelType = {
  namespace: 'bookmarksTag',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    opt: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *option({ payload }, { call, put }) {
      const response = yield call(queryType, payload);
      yield put({
        type: 'getOpt',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    getOpt(state, action) {
      return {
        ...state,
        opt: action.payload,
      };
    }
  },
};

export default Model;
