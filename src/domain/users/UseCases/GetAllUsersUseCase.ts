import { IGetAllUsersUseCase } from "./interfaces";

export class GetAllUsersUseCase {
  private service;
  
  constructor({ service }: IGetAllUsersUseCase) {
    this.service = service;
  }

  execute() {
    return this.service.execute();
  }
}
