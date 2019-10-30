import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addRule, queryCascader, queryRule, removeRule, updateRule } from './service';

import { TableListData, CascaderListData } from './data.d';

export interface StateType {
  data: TableListData;
  opt: CascaderListData;
}
export interface StateList {
  data: TableListData;
}
export interface StateOptionType {
  opt: CascaderListData;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    cascader: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateList>;
    getOpt: Reducer<StateOptionType>;
  };
}

const Model: ModelType = {
  namespace: 'bookmarksList',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    opt: {
      list: [],
      pagination: {},
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *cascader({ payload }, { call, put }) {
      const response = yield call(queryCascader, payload);
      yield put({
        type: 'getOpt',
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
