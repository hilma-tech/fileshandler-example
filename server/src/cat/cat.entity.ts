import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from '@hilma/auth-nest';

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: "image_path", length: 50 })
    imagePath: string;
    
    @Column({name: "user_id"})
    userId: string;

    @ManyToOne(type => User)
    @JoinColumn({name: "user_id"})
    user: User;
}