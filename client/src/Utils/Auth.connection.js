import axios from "axios";

export class Authentication {
  constructor(url) {
    this.url = url;
  }

  async auto_login(token) {
    try {
      const response = await axios.post(
        this.url + "/" + "login.php",
        {},
        {
          headers: {
            Authorization : token
          },
        }
      );
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async login(user_data) {
    if (typeof user_data === "object" && Object.keys(user_data).length > 1) {
      try {
        const response = await axios.post(this.url + "/" +"login.php", user_data);
        return response;
      } catch (error) {
        return error;
      }
    } else
      throw new Error("[TRY-LOGIN] La informacion del usuario no es valida");
  }

  async register(user_data) {
    if (typeof user_data === "object" && Object.keys(user_data).length > 1) {
      try {
        const response = await axios.post(
          this.url + "/" + "register.php",
          user_data
        );
        return response.data;
      } catch (error) {
        return error.message;
      }
    } else
      throw new Error("[TRY-REGISTER] La informacion del usuario no es valida");
  }
}
