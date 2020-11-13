import {reactive, ComputedRef, Ref, computed, watchEffect, WatchStopHandle} from "vue";

// adapted from https://github.com/foxbenjaminfox/vue-async-computed/issues/104#issuecomment-716191068

enum AsyncStatus {
  ERROR = 'error', SUCCESS = 'success', LOADING = 'loading'
}

interface AsyncAccess<T> extends ComputedRef<T> {
  status: Ref<AsyncStatus>,
  error: Ref<any>,
  retry: () => void
}

export default function asyncComputed<T> (fn: (() => Promise<T>), defaultFn: (() => T)): AsyncAccess<T | undefined> {
  const state = reactive({
    result: undefined as any | undefined,
    status: AsyncStatus.LOADING,
    error: null as any,
    hasEverRun: false
  });
  let hasEverRequested = false;

  let lastRetryCalled: Symbol | null = null
  let stopLast: WatchStopHandle | null = null;

  const run = () => {
    hasEverRequested = true;
    if (stopLast) {
      stopLast();
      stopLast = null;
    }

    stopLast = watchEffect(() => {
      let me = Symbol('run');
      lastRetryCalled = me;
      state.status = AsyncStatus.LOADING
      state.error = null;
      fn().then(value => {
        if (lastRetryCalled === me) {
          state.status = AsyncStatus.SUCCESS
          state.result = value;
          state.error = null;
          state.hasEverRun = true;
        }
      }, error => {
        if (lastRetryCalled === me) {
          state.status = AsyncStatus.ERROR;
          state.error = error;
          state.hasEverRun = true;
        }
      });
    })
  }

  const result = computed<T | undefined>(() => {
    if (!hasEverRequested) {
      run();
    }

    if (state.hasEverRun) {
      return state.result;
    } else {
      return defaultFn();
    }
  });

  Object.defineProperty(result, 'status', {
    value: computed(() => state.status)
  });
  Object.defineProperty(result, 'error', {
    value: computed(() => state.error)
  });
  Object.defineProperty(result, 'run', {
    value: run
  });

	run();

  return result as AsyncAccess<T>;
}
