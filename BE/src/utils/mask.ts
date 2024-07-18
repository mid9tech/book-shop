import * as bs58 from 'bs58';

export function maskId(id: number, dbType: string): string {
  const combinedString = `${id}:${dbType}`;
  const buffer = Buffer.from(combinedString, 'utf8');
  const masked_id = bs58.encode(buffer);
  return masked_id;
}

export function unmaskId(encoded: string, dbType: string): number {
  const decoded = bs58.decode(encoded);

  const combinedString = String.fromCharCode(...decoded);
  const [idString, dbTypeString] = combinedString.split(':');
  const original_id = parseInt(idString, 10);

  if (dbType !== dbTypeString) {
    throw new Error('Invalid database type!');
  }
  return original_id;
}
