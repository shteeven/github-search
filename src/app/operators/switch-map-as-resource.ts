import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ResourceStateModel } from '../models/resource-state.model';

function resourceGet<T = any>(
  priorState?: ResourceStateModel<T>
): ResourceStateModel<T> {
  return {
    payload: priorState?.payload,
    loading: true
  };
}

function resourceSuccess<T = any>(resourceData: T): ResourceStateModel<T> {
  return {
    payload: resourceData,
    loading: false
  };
}

function resourceFailure<T = any>(
  error: any,
  priorState?: ResourceStateModel<T>
): ResourceStateModel<T> {
  return {
    payload: priorState?.payload,
    error,
    loading: false
  };
}

export function switchMapAsResource<T, O>(
  project: (value: T, index: number) => Observable<O>
): OperatorFunction<T, ResourceStateModel<O>> {
  let previousResourceValue: ResourceStateModel<O>;

  return (source: Observable<T>) => {
    return source.pipe(
      switchMap((a, i) =>
        project(a, i).pipe(
          map((value) => resourceSuccess(value)),
          tap((value) => (previousResourceValue = value)), // saves previous value in case of errors
          catchError((error) =>
            of(resourceFailure(error, previousResourceValue))
          ),
          startWith(resourceGet(previousResourceValue))
        )
      ),
      startWith(resourceGet())
    );
  };
}
