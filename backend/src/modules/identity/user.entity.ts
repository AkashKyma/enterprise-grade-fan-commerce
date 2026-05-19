import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ nullable: true })
  email!: string | null;

  @Index({ unique: true })
  @Column({ nullable: true })
  phone!: string | null;

  @Index({ unique: true, nullable: true })
  @Column({ nullable: true })
  membershipId!: string | null;

  @Column({ default: 'customer' })
  role!: 'customer' | 'admin' | 'operator';

  @Column('jsonb', { default: {} })
  profile!: Record<string, any>;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
