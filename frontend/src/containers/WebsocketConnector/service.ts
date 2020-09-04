import io from 'socket.io-client';

export const connectWebsocket = () => io({ query: { token: localStorage.getItem('accessToken') } });

