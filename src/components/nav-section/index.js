// import { matchPath } from 'react-router-dom';

// ----------------------------------------------------------------------

export { default as NavSectionVertical } from './vertical';

export function isExternalLink(path) {
  return path.includes('http');
}

export function getActive(path, pathname, asPath) {
  return pathname === path || asPath === path;
}
