import generateLoginURL from "../utils/generateLoginURL";

export class GoogleAuth {
  static async login() {
    window.location.href = generateLoginURL();
  }
}
