import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from "../owners/owners.service";
import { Owner } from "../owners/entities/owner.entity";

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>, private ownersService: OwnersService) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);
    return this.petsRepository.save(newPet); // INSERT INTO pet (name, type) VALUES (?, ?)
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); // SELECT * FROM pet
  }

  async findOne(id: number): Promise<Pet> {
    return await this.petsRepository.findOneOrFail({
      where: {
        id: id,
      },
    }); // SELECT * FROM pet WHERE id = ?
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  };

}
