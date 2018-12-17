import { ISetConfig, IGetUseCase, IGetConfig, IDomain } from './interfaces';

export class Domain<T> {
  private useCases: T;
  private config: { [e: string]: any };

  constructor({ useCases, config = {} }: IDomain<T>) {
    this.useCases = useCases;
    this.config = config;
  }

  setConfig({ key, config }: ISetConfig) {
    this.config[key] = config;
  }

  getConfig({ key }: IGetConfig) {
    return this.config[key];
  }

  get<K extends keyof T>({ useCase }: IGetUseCase<T, K>): T[K] {
    return this.useCases[useCase];
  }
}
