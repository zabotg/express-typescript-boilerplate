import { Unauthorized } from "./error";
import sha256 from "crypto-js/sha256";
import { User } from "./types";

const findByCredentialName = async (username: string): Promise<User> => {
    const defaultUser: User = {
        id: "7",
        fullName: "Guilherme Teste 1",
        username: "zabot",
        password:
            "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    };

    console.log(`Find by credential ${username}`);
    return Promise.resolve(defaultUser);
};

const login = async (username: string, password: string): Promise<User> => {
    const user = await findByCredentialName(username);

    const passwordHash = sha256(password).toString();

    if (user.password == passwordHash) return user;

    throw new Unauthorized(
        "Crendentials do not match any existing username and password"
    );
};

export { User };

export default {
    login,
};
