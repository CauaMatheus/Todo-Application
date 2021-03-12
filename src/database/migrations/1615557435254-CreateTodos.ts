import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTodos1615557435254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'todos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'boolean',
          },
          {
            name: 'deadline',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
        ],
        foreignKeys: [
          {
            name: 'fkuser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('todos');
  }
}
