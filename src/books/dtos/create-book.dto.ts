import {
  IsString,
  IsOptional,
  IsNotEmpty,
  ArrayMinSize,
  IsBoolean,
} from 'class-validator';

export class CreateBookDTO {
  @IsString({ message: 'Title must be a string.' })
  title: string;

  @IsString({ message: 'Author must be a string.' })
  author: string;

  @IsString({ message: 'Series must be a string.' })
  @IsOptional()
  series: string;

  //   @IsNotEmpty({ message: 'The field genres is necessary.' })
  //   @ArrayMinSize(1, {
  //     message: 'Genres must have at least one element.',
  //   })
  @IsString({ message: 'Genres must be a string.' })
  genres: string;

  @IsString({ message: 'Cover must be a string.' })
  cover: string;

  @IsString({ message: 'Description must be a string.' })
  description: string;

  @IsBoolean({ message: 'Is_queer must be a boolean.' })
  is_queer: boolean;

  @IsString({ message: 'Queer_data must be a string.' })
  @IsOptional()
  queer_data: string;
}
