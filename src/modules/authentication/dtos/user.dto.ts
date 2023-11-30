/**
 * @typedef User
 * @property {number} id Id
 * @property {string} username Username
 * @property {string} password Password
 */

export class UserDTO {
    constructor(dto: Partial<UserDTO> = {}) {
      Object.assign(this, dto);
    }
    id: number;
    username: string;
    password: string;
  }
  