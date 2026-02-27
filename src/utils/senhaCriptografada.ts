import crypto from "crypto";

export const criaSenhaCriptografada = (senha: string) => {
    const sal = crypto.randomBytes(16).toString("hex");
    const hash = crypto.createHmac("sha256", sal);

    hash.update(senha);
    return hash.digest("hex");
}