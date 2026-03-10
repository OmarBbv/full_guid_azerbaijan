import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogRepo: Repository<BlogPost>,
  ) { }

  // ─── Create ────────────────────────────────────────────────────────────────

  async create(dto: CreateBlogPostDto): Promise<BlogPost> {
    const language = dto.language ?? 'az';

    const existing = await this.blogRepo.findOne({
      where: { slug: dto.slug, language },
    });
    if (existing) {
      throw new ConflictException(
        `Bu dildə (${language}) "${dto.slug}" slug artıq istifadəlidir.`,
      );
    }

    const post = this.blogRepo.create({
      title: dto.title,
      slug: dto.slug,
      language,
      excerpt: dto.excerpt,
      content_html: dto.content_html ?? null,
      category: dto.category ?? null,
      category_label: dto.category_label ?? null,
      category_color: dto.category_color ?? null,
      cover_image_url: dto.cover_image_url ?? null,
      author_name: dto.author_name ?? null,
      author_avatar_url: dto.author_avatar_url ?? null,
      read_time_minutes: dto.read_time_minutes ?? null,
      published_at: dto.published_at ? new Date(dto.published_at) : null,
      is_featured: dto.is_featured ?? false,
      is_pinned: dto.is_pinned ?? false,
      is_published: dto.is_published ?? true,
    });

    return this.blogRepo.save(post);
  }

  // ─── Read ──────────────────────────────────────────────────────────────────

  async findAll(params?: {
    language?: string;
    category?: string;
    search?: string;
    featured?: string;
    published?: string;
  }): Promise<BlogPost[]> {
    const where: FindOptionsWhere<BlogPost> = {};

    if (params?.language) {
      where.language = params.language;
    }
    if (params?.category) {
      where.category = params.category;
    }
    if (params?.featured === 'true') {
      where.is_featured = true;
    }
    if (params?.published === 'true') {
      where.is_published = true;
    }

    const qb = this.blogRepo
      .createQueryBuilder('post')
      .where(where)
      .orderBy('post.published_at', 'DESC', 'NULLS LAST')
      .addOrderBy('post.created_at', 'DESC');

    if (params?.search) {
      qb.andWhere(
        '(post.title ILIKE :q OR post.excerpt ILIKE :q OR post.content_html ILIKE :q)',
        { q: `%${params.search}%` },
      );
    }

    return qb.getMany();
  }

  async findOneById(id: string): Promise<BlogPost> {
    const post = await this.blogRepo.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Blog post with ID "${id}" tapılmadı.`);
    }
    return post;
  }

  async findOneBySlug(slug: string, language?: string): Promise<BlogPost> {
    const where: FindOptionsWhere<BlogPost> = { slug };
    if (language) {
      where.language = language;
    }
    const post = await this.blogRepo.findOne({ where });
    if (!post) {
      throw new NotFoundException(`"${slug}" slug üçün blog yazısı tapılmadı.`);
    }
    return post;
  }

  // ─── Update ────────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateBlogPostDto): Promise<BlogPost> {
    const post = await this.findOneById(id);

    if (dto.slug && dto.slug !== post.slug) {
      const language = dto.language ?? post.language;
      const exists = await this.blogRepo.findOne({
        where: { slug: dto.slug, language, id: undefined },
      });
      if (exists) {
        throw new ConflictException(
          `Bu dildə (${language}) "${dto.slug}" slug artıq istifadəlidir.`,
        );
      }
    }

    if (dto.published_at) {
      (dto as any).published_at = new Date(dto.published_at);
    }

    Object.assign(post, dto);
    return this.blogRepo.save(post);
  }

  // ─── Delete ────────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const post = await this.findOneById(id);
    await this.blogRepo.remove(post);
  }

  async uploadCover(id: string, file: Express.Multer.File): Promise<BlogPost> {
    const post = await this.findOneById(id);

    // In local development with disk storage, we store the filename
    // The static file middleware should serve it
    post.cover_image_url = `/uploads/${file.filename}`;

    return this.blogRepo.save(post);
  }
}

