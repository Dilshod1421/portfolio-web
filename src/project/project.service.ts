import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './models/project.model';
import { FilesService } from 'src/file/file.service';
import { TitleProjectDto } from './dto/title-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    private readonly fileService: FilesService,
  ) {}

  async create(createProjectDto: CreateProjectDto, image: any) {
    let image_name: string;
    try {
      image_name = await this.fileService.createFile(image);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    const new_project = await this.projectRepository.create({
      ...createProjectDto,
      image: image_name,
    });
    return new_project;
  }

  async findAll() {
    const projects = await this.projectRepository.findAll();
    return projects;
  }

  async findById(id: number) {
    const project = await this.projectRepository.findByPk(id);
    return project;
  }

  async findByTitle(titleProjectDto: TitleProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { title: titleProjectDto.title },
    });
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto, image?: any) {
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const project = await this.projectRepository.update(
        { ...updateProjectDto, image: image_name },
        { where: { id }, returning: true },
      );
      return project[1][0];
    }
    const project = await this.projectRepository.update(updateProjectDto, {
      where: { id },
      returning: true,
    });
    return project[1][0];
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOne({ where: { id } });
    await this.projectRepository.destroy({ where: { id } });
    return {message: 'Project is deleted succesfully', project};
  }
}
