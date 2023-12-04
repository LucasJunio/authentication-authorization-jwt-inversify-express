/**
 * @typedef Login
 * @property {string} username Username
 * @property {string} password Password
 */

export class LoginDTO {
  constructor(dto: Partial<LoginDTO> = {}) {
    Object.assign(this, dto);
  }
  username: string;
  password: string;
  token: string;
  role: string;
}
