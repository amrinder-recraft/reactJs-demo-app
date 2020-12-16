export const mergeState = (toMergeObj, updaterFunction) =>
  data =>
    updaterFunction({ ...toMergeObj, ...data })