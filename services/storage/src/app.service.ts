import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class AppService {
  async uploadProfile(payload: any): Promise<string> {
    var newpath = path.join(__dirname, `/../public_uploads/${payload.profile.originalname}`);
    const newUpload = await fs.writeFileSync(newpath, new Buffer(payload.profile.buffer.data))
    return 'File uploaded'
  }
  async uploadBanner(payload: any): Promise<string> {
    var newpath = path.join(__dirname, `/../public_uploads/${payload.banner.originalname}`);
    const newUpload = await fs.writeFileSync(newpath, new Buffer(payload.banner.buffer.data))
    return 'File uploaded'
  }
}
