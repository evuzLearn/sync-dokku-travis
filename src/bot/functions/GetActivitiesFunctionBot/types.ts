export enum CallbackQuery {
  Key = 'GET_ACTIVITIES',
  GroupedKey = 'GET_ACTIVITIES_GROUPED',
  NextMonth = 'NEXT_MONTH',
  PreviousMonth = 'PREVIOUS_MONTH',
  Empty = 'EMPTY',
}

export enum CallbackQueryDataKeys {
  Option,
  Date,
}
