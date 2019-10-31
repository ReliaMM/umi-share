import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { ListItemDataType } from './data.d';
import { queryFakeList } from './service';
import { queryCascader } from '../list/service';
import { CascaderListData } from '../list/data.d';
export interface StateType {
  list: ListItemDataType[];
  opt: CascaderListData;
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
  };
  reducers: {
    queryList: Reducer<StateType>;
    getOpt: Reducer<StateOptionType>;
  };
}

const Model: ModelType = {
  namespace: 'bookmarksCard',

  state: {
    list: [],
    opt: {
      list: [],
      pagination: {},
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: response
      });
    },
    *cascader({ payload }, { call, put }) {
      const response = yield call(queryCascader, payload);
      yield put({
        type: 'getOpt',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
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
