import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/isAdmin.guard';
import { JwtGuard } from 'src/guards/jwt.guard';

@ApiTags('posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'create a new post' })
  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({ summary: 'get all posts' })
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: 'get one post by id' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @ApiOperation({ summary: 'update post by id' })
  @Patch(':id')
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'delete post by id' })
  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
