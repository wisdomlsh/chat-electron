// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import {
    createIntl,
    IntlCache,
} from '/Users/lishuo/Desktop/lishuo/chat-electron/node_modules/.pnpm/react-intl@3.12.1_react@18.3.1/node_modules/react-intl';

type OptionalIntlConfig = Omit<Parameters<typeof createIntl>[0], 'locale' | 'defaultLocale'>;
export interface IRuntimeConfig {
    locale?: {
      getLocale?: () => string;
      cache?: IntlCache;
    } & OptionalIntlConfig;
}
