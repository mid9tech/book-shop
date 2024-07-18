import { HttpException, HttpStatus } from '@nestjs/common';

// Function to encode JSON object to encrypted string
export function EncodeToEncryptedString(data: object): string {
  try {
    const encryptedData = encodeURIComponent(JSON.stringify(data));
    return encryptedData;
  } catch (error) {
    throw new HttpException(
      'Internal error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }
}

// Function to decode encrypted string to JSON object
export function DecodeFromEncryptedString(encryptedString: string): object {
  try {
    const decryptedData = JSON.parse(decodeURIComponent(encryptedString));
    return decryptedData;
  } catch (error) {
    throw new HttpException(
      'Internal error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }
}
