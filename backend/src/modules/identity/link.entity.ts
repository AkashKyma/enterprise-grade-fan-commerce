import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('account_links')
export class AccountLink {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column() provider!: string;
  @Column() providerId!: string;
  @Column('jsonb', { default: {} }) meta!: Record<string, any>;
  @CreateDateColumn() linkedAt!: Date;
}
