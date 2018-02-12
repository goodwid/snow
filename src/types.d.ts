interface SnowConfig {
  widget: {
    $: WidgetAtr;
    name: string;
  };
}

interface WidgetAtr {
    id: string,
    version: string,
    xmlns: string,
    'xmlns:cdv': string
}

declare module '*.json';
