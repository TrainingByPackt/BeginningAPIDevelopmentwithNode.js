const Joi = require('joi');
const Knex = require('../db');

module.exports = [
  {
    method: 'GET',
    path: '/todo',
    handler: async (request, reply) => {
      const userId = request.auth.credentials.id;
      const todos = await Knex('todo')
        .where('user_id', userId);
      return reply(todos);
    },
  },
  {
    method: 'GET',
    path: '/todo/{id}',
    handler: async (request, reply) => {
      const id = request.params.id;
      const userId = request.auth.credentials.id;
      const [ todo ] = await Knex('todo').where({
        id: id,
        user_id: userId
      });
      if (todo) return reply(todo);
      return reply({ message: 'Not found' }).code(404);
    },
  },
  {
    method: 'POST',
    path: '/todo',
    handler: async (request, reply) => {
      const todo = request.payload;
      todo.user_id = request.auth.credentials.id;
      // using array-destructuring here since the
      // returned result is an array with 1 element
      const [ todoId ] = await Knex('todo')
        .returning('id')
        .insert(todo);
      return reply({ message: 'created', todo_id: todoId });
    },
    config: {
      validate: {
        payload: {
          title: Joi.string().required(),
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/todo/{id}/item',
    handler: async (request, reply) => {
      const todoItem = request.payload;
      todoItem.todo_id = request.params.id;
      const [ id ] = await Knex('todo_item')
        .insert(todoItem);
      return reply({ message: 'created', id: id });
    },
    config: {
      validate: {
        payload: {
          text: Joi.string().required(),
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/todo/{id}/item',
    handler: async (request, reply) => {
      const todoId = request.params.id;
      // check if the user owns the todo
      const [ todo ] = await Knex('todo')
        .where({
          id: todoId,
          user_id: request.auth.credentials.id,
        });
      if (!todo) {
        return reply({ message: 'Not authorized' }).code(401);
      }
      const items = await Knex('todo_item')
        .where('todo_id', todoId);
      return reply(items);
    },
  },
  {
    method: 'PATCH',
    path: '/todo/{id}',
    handler: async (request, reply) => {
      const todoId = request.params.id;
      const title = request.payload.title;
      const patched = await Knex('todo')
        .update({ title: title })
        .where('id', todoId);
      return reply({ message: 'patched' });
    },
    config: {
      validate: {
        payload: {
          title: Joi.string().required(),
        }
      }
    }
  },
  {
    method: 'PATCH',
    path: '/todo/{todo_id}/item/{id}',
    handler: async (request, reply) => {
      const itemId = request.params.id;
      const item = request.payload;
      const patched = await Knex('todo_item')
        .update(item)
        .where('id', itemId);
      return reply({ message: 'patched' });
    },
    config: {
      validate: {
        payload: {
          text: Joi.string(),
          done: Joi.boolean(),
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/todo/{id}',
    handler: async (request, reply) => {
      const id = request.params.id;
      const deleted = await Knex('todo')
        .where('id', id)
        .delete();
      return reply({ message: 'deleted' });
    },
  },
  {
    method: 'DELETE',
    path: '/todo/{todoId}/item/{id}',
    handler: async (request, reply) => {
      const id = request.params.id;
      const deleted = await Knex('todo_item')
        .where('id', id)
        .delete();
      return reply({ message: 'deleted' });
    },
  },
];
