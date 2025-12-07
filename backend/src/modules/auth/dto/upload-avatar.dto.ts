import { IsString } from 'class-validator';

export class UploadAvatarDto {
  @IsString()
  filename!: string;

  @IsString()
  contentType!: string;

  @IsString()
  base64!: string; // base64 encoded file content (no data: prefix)
}
