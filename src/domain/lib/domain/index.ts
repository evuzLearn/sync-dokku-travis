import { ISetConfig, IGetConfig, IGetUseCase } from './interfaces';
import { UseCase } from '../models/UseCase';

export class Domain {
  private useCases: { [e: string]: UseCase };
  private config: { [e: string]: any };

  constructor({ useCases, config = {} }) {
    this.useCases = useCases;
    this.config = config;
  }

  setConfig({ key, config }: ISetConfig) {
    this.config[key] = config;
  }

  getConfig({ key }: IGetConfig) {
    return this.config[key];
  }

  get({ useCase }: IGetUseCase) {
    return this.useCases[useCase];
  }
}
