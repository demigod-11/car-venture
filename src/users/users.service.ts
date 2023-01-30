import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo:Repository<User>){

    }

    public create(email:string, password:string){
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }

    public async findOne(id:number){
        return this.repo.findOneBy({id});
    }

    public find(email:string){
        return this.repo.find({where:{email}});
    }

    public async update(id:number, attrs: Partial<User>){
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException (`Invalid ID ${id}`);
        }
        Object.assign(user, attrs);
        return this.repo.save(user);

    }

    public async remove(id:number){
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException(`Invalid ID ${id}`);
        }  

        return this.repo.remove(user);

    }
}
