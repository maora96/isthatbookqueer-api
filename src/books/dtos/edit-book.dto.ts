import {
  IsString,
  IsOptional,
  IsNotEmpty,
  ArrayMinSize,
  IsBoolean,
} from 'class-validator';

export class EditBookDTO {
  @IsString({ message: 'Title must be a string.' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'Author must be a string.' })
  @IsOptional()
  author?: string;

  @IsString({ message: 'Series must be a string.' })
  @IsOptional()
  series?: string;

  //   @IsNotEmpty({ message: 'The field genres is necessary.' })
  //   @ArrayMinSize(1, {
  //     message: 'Genres must have at least one element.',
  //   })
  @IsString({ message: 'Genres must be a string.' })
  @IsOptional()
  genres?: string;

  @IsString({ message: 'Cover must be a string.' })
  @IsOptional()
  cover?: string;

  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  description?: string;

  @IsBoolean({ message: 'Is_queer must be a boolean.' })
  @IsOptional()
  is_queer?: boolean;

  @IsString({ message: 'Queer_data must be a string.' })
  @IsOptional()
  queer_data?: string;

  @IsBoolean({ message: 'Approved must be a boolean.' })
  @IsOptional()
  approved?: boolean;
}
