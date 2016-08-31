const SHOW = '@@DVA_LOADING/SHOW';
const HIDE = '@@DVA_LOADING/HIDE';
const NAMESPACE = 'loading';

function createLoading(opts = {}) {
  const namespace = opts.namespace || NAMESPACE;
  const initialState = {
    global: false,
    models: {},
  };
  let globalCount = 0;

  const extraReducers = {
    [namespace](state = initialState, { type, payload }) {
      switch (type) {
        case SHOW:
          return {
            ...state,
            global: globalCount > 0,
            models: { ...state.models, [payload]:true },
          };
        case HIDE:
          return {
            ...state,
            global: globalCount > 0,
            models: { ...state.models, [payload]:false }
          };
        default:
          return state;
      }
    },
  };

  function onEffect(effect, { put }, model) {
    return function*(...args) {
      globalCount = globalCount + 1;
      yield put({ type: SHOW, payload: model.namespace });
      yield effect(...args);
      globalCount = globalCount - 1;
      yield put({ type: HIDE, payload: model.namespace });
    };
  }

  return {
    extraReducers,
    onEffect,
  }
}

export default createLoading;
