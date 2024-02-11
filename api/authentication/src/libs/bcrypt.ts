import * as bcrypto from 'bcrypt';

export function encodeSha256(data: string) {
  const salt = bcrypto.genSaltSync(Number(process.env.SALT_ROUNDS));
  return bcrypto.hashSync(data, salt);
}
