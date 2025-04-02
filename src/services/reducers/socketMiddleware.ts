import { Middleware } from 'redux';

export const socketMiddleware = (wsActions: {
  wsConnect: string;
  wsDisconnect: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
}): Middleware => {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action as { type: string; payload?: any };

      if (type === wsActions.wsConnect) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = () => dispatch({ type: wsActions.onOpen });
        socket.onerror = () => dispatch({ type: wsActions.onError, payload: 'Ошибка соединения' });
        socket.onclose = () => dispatch({ type: wsActions.onClose });
        socket.onmessage = event => {
          try {
            const data = JSON.parse(event.data);
            dispatch({ type: wsActions.onMessage, payload: data });
          } catch (err) {
            dispatch({ type: wsActions.onError, payload: 'Ошибка парсинга сообщения' });
          }
        };

        if (type === wsActions.wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      return next(action);
    };
  };
};
