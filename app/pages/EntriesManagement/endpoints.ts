import request, { ResponseError } from 'utils/request';

export function getEntriesList({ page = 1, search, limit = 10 }): Promise<{} | { err: ResponseError }> {
  return request.GET({
    endpoint: 'activity/entries',
    params: { page, limit, ...(search && { search }) }
  });
}

export function postEntryFeedback({ id, status }): Promise<{} | { err: ResponseError }> {
  return request.POST({
    endpoint: `activity/approve-or-reject/${id}`,
    body: { status }
  });
}
