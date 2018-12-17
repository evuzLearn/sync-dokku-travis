import { DomainInstance } from './DomainInstance';

export const instance = new DomainInstance();

export const getDomain = () => {
  if (!instance.domain) {
    instance.init();
  }
  return instance.domain;
};
