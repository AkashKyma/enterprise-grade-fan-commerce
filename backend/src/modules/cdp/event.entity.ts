import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Index() @Column() userId!: string;
  @Index() @Column() type!: string;
  @Column('jsonb', { default: {} }) payload!: Record<string, any>;
  @CreateDateColumn() ts!: Date;
}
