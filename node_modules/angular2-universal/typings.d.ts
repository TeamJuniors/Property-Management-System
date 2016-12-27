export * from './browser/browser';

// fix conflict with ts
export {
  UniversalModule,
  isBrowser,
  isNode,
  platformUniversalDynamic,
  ZoneStore
} from './browser/browser';

export * from './node/node';
