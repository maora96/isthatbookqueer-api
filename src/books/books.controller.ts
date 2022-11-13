import {
  Body,
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  UseGuards,
  Param,
  Query,
  Session,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { BooksService } from './books.service';
import { ChangeApprovalDTO } from './dtos/change-approval.dto';
import { CreateBookDTO } from './dtos/create-book.dto';
import { EditBookDTO } from './dtos/edit-book.dto';
import { FavoritesDTO } from './dtos/favorites.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async createBook(@Body() body: CreateBookDTO) {
    const book = await this.booksService.create(body);
    return book;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async editBook(
    @Param('id') id: string,
    @Body() body: EditBookDTO,
    @Session() session: any,
  ) {
    console.log(session.userId);
    console.log('hello?');
    const book = await this.booksService.edit(id, body);
    console.log('uh');

    return book;
  }

  @Patch('approval/:id')
  @UseGuards(AuthGuard)
  async changeApproval(
    @Param('id') id: string,
    @Body() body: ChangeApprovalDTO,
  ) {
    const book = await this.booksService.edit(id, body);

    return book;
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    const book = await this.booksService.findOne(id);
    return book;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteBook(@Param('id') id: string) {
    const book = await this.booksService.remove(id);
    return book;
  }

  @Get()
  getSearchedBooks(@Query('search') search: string) {
    if (!search) {
      return this.booksService.findMany();
    }
    return this.booksService.findSearchedBooks(search);
  }

  @Get('random')
  async getRandomBook() {
    return await this.booksService.findOneRandom();
  }

  @Post('favorites')
  async getFavorites(@Body() body: FavoritesDTO) {
    return await this.booksService.findFavorites(body.favorites);
  }
}
