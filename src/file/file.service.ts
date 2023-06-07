import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const file_name = uuid.v4() + '.jpg';
      const file_path = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(file_path)) {
        fs.mkdirSync(file_path, { recursive: true });
      }
      fs.writeFileSync(path.join(file_path, file_name), file.buffer);
      return file_name;
    } catch (error) {
      throw new HttpException(
        'Faylni yozishda xatolik!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
