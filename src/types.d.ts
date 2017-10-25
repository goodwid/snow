interface SnowConfig {
  widget: {
    $: WidgetAtr
  };
}

interface WidgetAtr {
    id: string,
    version: string,
    xmlns: string,
    'xmlns:cdv': string
}
