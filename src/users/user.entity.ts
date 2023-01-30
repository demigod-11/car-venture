import {AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    private logInsert(){
        console.log('Inserted User with id', this.id)

    }

    @AfterUpdate()
    private logUpdate(){
        console.log('Updated User with id', this.id)

    }

    @AfterRemove()
    private logRemove(){
        console.log('Updated User with id', this.id)

    }
}