import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './models/project.model';
import { FilesService } from 'src/file/file.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    private readonly fileService: FilesService,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    image: any,
  ): Promise<Project> {
    try {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const project = await this.projectRepository.create({
        ...createProjectDto,
        image: image_name,
      });
      return project;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      const projects = await this.projectRepository.findAll();
      if (!projects.length) {
        throw new BadRequestException('Projects list is empty!');
      }
      return projects;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: number): Promise<Project> {
    try {
      const project = await this.projectRepository.findByPk(id);
      if (!project) {
        throw new BadRequestException('Project not found!');
      }
      return project;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
    image?: any,
  ): Promise<Project> {
    try {
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
        if (!project[1].length) {
          throw new BadRequestException('Project not found!');
        }
        return project[1][0];
      }
      const project = await this.projectRepository.update(updateProjectDto, {
        where: { id },
        returning: true,
      });
      if (!project[1].length) {
        throw new BadRequestException('Project not found!');
      }
      return project[1][0];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const project = await this.projectRepository.findByPk(id);
      if (!project) {
        throw new BadRequestException('Project not found!');
      }
      await this.projectRepository.destroy({ where: { id } });
      return { message: 'Project is deleted succesfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
