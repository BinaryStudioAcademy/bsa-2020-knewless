import { callApi } from '@helpers/api.helper';

export const saveWatchTime = async (watchTime: number, fraction: number, lectureId: string) => {
  await callApi({
    type: 'POST',
    endpoint: '/api/watch_history',
    requestData: { secondsWatched: watchTime, fractionWatched: fraction, lectureId }
  });
};
