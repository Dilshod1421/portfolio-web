import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { resolve, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const file_name = v4() + '.jpg';
      const file_path = resolve(__dirname, '..', 'static');
      if (!existsSync(file_path)) {
        mkdirSync(file_path, { recursive: true });
      }
      writeFileSync(join(file_path, file_name), file.buffer);
      return file_name;
    } catch (error) {
      throw new HttpException(
        'Error saving image!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
