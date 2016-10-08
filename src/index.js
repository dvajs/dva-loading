const SHOW = '@@DVA_LOADING/SHOW';
const HIDE = '@@DVA_LOADING/HIDE';
const NAMESPACE = 'loading';

function createLoading(opts = {}) {
  const namespace = opts.namespace || NAMESPACE;
  const initialState = {
    global: false,
    models: {},
  };

  const extraReducers = {
    [namespace](state = initialState, { type, payload }) {
      switch (type) {
        case SHOW:
          return {
            ...state,
            global: true,
            models: { ...state.models, [payload]:true },
          };
        case HIDE:
          const models = { ...state.models, [payload]:false };
          const global = Object.keys(models).some(namespace => {
            return models[namespace];
          });
          return {
            ...state,
            global,
            models,
          };
        default:
          return state;
      }
    },
  };

  function onEffect(effect, { put }, model) {
    return function*(...args) {
      yield put({ type: SHOW, payload: model.namespace });
      yield effect(...args);
      yield put({ type: HIDE, payload: model.namespace });
    };
  }

  return {
    extraReducers,
    onEffect,
  };
}

export default createLoading;
