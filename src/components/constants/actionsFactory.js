import { useCallback } from 'react';

/**
 * Crea una función que genera acciones para despachar con un tipo y carga útil.
 * @module actionsFactory
 * @param {Function} dispatch - La función `dispatch` del hook `useReducer`, utilizada para despachar acciones.
 * @returns {Function} -  La función devuelta permite crear una acción despachada utilizando el tipo especificado.
 * @example
 * import actionTypes from '../constants/actionTypes';
 * const createAction = actionsFactory(dispatch);
 * createAction(actionTypes.CHECK_IMAGE_LOADED),
 *
 */
const actionsFactory = (dispatch) => {
  return (type) => {
    return useCallback(
      (payload) => {
        dispatch({ type, payload });
      },
      [type]
    );
  };
};

export default actionsFactory;
