import { HttpParams } from '@angular/common/http';
import { PageRequest } from '../models/page';

export class RestUtil {
  public static buildParamsFromPageRequest(filter: Partial<PageRequest>): HttpParams {
    const {pageIndex, pageSize, sort, direction} = filter;
    // using let and reassigning params, because httpParams is immutable, so .set() returns new object.
    let params = new HttpParams();
    if (pageIndex != null) {
      params = params.set('page', String(pageIndex));
    }
    if (pageSize != null) {
      params = params.set('size', String(pageSize));
    }
    if (sort != null) {
      params = params.set('sort', sort + ',' + direction ?? '');
    }
    return params;
  }
}
