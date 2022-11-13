import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { CreateBookDTO } from './dtos/create-book.dto';
import { EditBookDTO } from './dtos/edit-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
  ) {}

  create(bookDTO: CreateBookDTO) {
    const book = this.booksRepository.create({ ...bookDTO });

    return this.booksRepository.save(book);
  }

  async edit(id: string, editBookDto: EditBookDTO) {
    const book = await this.booksRepository.findOne({
      where: { id: parseInt(id) },
    });

    console.log(book);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.title = editBookDto.title ?? book.title;
    book.author = editBookDto.author ?? book.author;
    book.genres = editBookDto.genres ?? book.genres;
    book.cover = editBookDto.cover ?? book.cover;
    book.description = editBookDto.description ?? book.description;
    book.is_queer = editBookDto.is_queer ?? book.is_queer;
    book.queer_data = editBookDto.queer_data ?? book.queer_data;
    book.approved = editBookDto.approved ?? book.approved;

    return this.booksRepository.save(book);
  }

  async changeApproval(id: string, approved: boolean) {
    const book = await this.booksRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.approved = approved;
    return this.booksRepository.save(book);
  }

  async findOne(id: string) {
    const book = await this.booksRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async remove(id: string) {
    const book = await this.booksRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return this.booksRepository.remove(book);
  }

  async findMany() {
    const books = this.booksRepository.find();
    return books;
  }

  async findSearchedBooks(search: string) {
    const books = this.booksRepository
      .createQueryBuilder('book')
      .select()
      .where('LOWER(book.title) like :search', {
        search: `%${search.toLowerCase()}%`,
      })
      .orWhere('LOWER(book.author) like :search', {
        search: `%${search.toLowerCase()}%`,
      })
      .andWhere('book.approved = :approved', { approved: true })
      .getMany();

    if (!books) {
      throw new NotFoundException('Books not found');
    }

    return books;
  }

  async findOneRandom() {
    const book = await this.booksRepository
      .createQueryBuilder('book')
      .select()
      .orderBy('RANDOM()')
      .where('book.approved = :approved', { approved: true })
      .getOne();

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async findFavorites(ids: string[]) {
    const books = await this.booksRepository.find({ where: { id: In(ids) } });

    if (!books) {
      throw new NotFoundException('Books not found');
    }

    return books;
  }
}
