export class ToggleFavorite {
  static readonly type = '[Scale search] Toggle favorite';
  constructor(public readonly scale: string) {}
}

export class ToggleShowFavorites {
  static readonly type = '[Scale search] Toggle show favorites';
}
