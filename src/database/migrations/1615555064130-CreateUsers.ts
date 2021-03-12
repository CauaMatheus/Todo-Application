import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1615555064130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: '_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'pro',
            type: 'boolean',
          },
          {
            name: 'confirmed',
            type: 'boolean',
          },
          {
            name: 'friends',
            type: 'array',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },

        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('users');
  }
}
