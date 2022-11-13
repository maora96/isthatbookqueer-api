import { ArrayMinSize, IsNotEmpty } from 'class-validator';

export class FavoritesDTO {
  @IsNotEmpty({ message: 'Favorites can not be empty' })
  @ArrayMinSize(1, {
    message: 'Favorites must have at least one element.',
  })
  favorites: string[];
}
