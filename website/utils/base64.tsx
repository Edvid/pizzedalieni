import { ObjectValues } from './objectValues';

const base64Type = {};
export type base64 = string & ObjectValues<typeof base64Type>;

export function ensureBase64(str: string): str is base64 {
  return /^[a-zA-Z\d\+\/=]*$/.test(str);
}
