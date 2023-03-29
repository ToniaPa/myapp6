const m2s = require("mongoose-to-swagger");
const User = require("./models/user.model");
const Product = require("./models/product.model");

exports.options = {
  definitions: {
    User: m2s(User),
    Product: m2s(Product),
  },
  swagger: "2.0",
  info: {
    version: "1.0.0",
    description: "Products Project Application API",
    title: "Products CRUD API",
  },
  host: "localhost:3000",
  basePath: "/",
  tags: [
    {
      name: "Users",
      description: "API for users",
    },
    {
      name: "Users and Products",
      description: "API for users and their products",
    },
  ],
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/api/user/findall": {
      get: {
        tags: ["Users"],
        summary: "Gets all users from system",
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        },
      },
    },
    "/api/user/findone/{username}": {
      get: {
        tags: ["Users"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of user",
            type: "string",
          },
        ],
        summary: "Gets a user from system",
        responses: {
          200: {
            description: "User find",
            schema: {
              $ref: "#/definitions/User", //περνάμε όλο το schemα που πιθανό θα μπερδέψει τον χρήστη
            },
          },
        },
      },
    },
    "/api/user/create": {
      post: {
        tags: ["Users"],
        description: "Create new user in app",
        parameters: [
          {
            name: "Parameters for user",
            in: "body",
            description: "Users parameters that we will create",
            schema: {
              // "$ref":"#/definitions/User"
              type: "object",
              properties: {
                username: { type: "string" },
                password: { type: "string" },
                name: { type: "string" },
                surname: { type: "string" },
                email: { type: "string" },
                address: {
                  type: "object",
                  properties: {
                    area: { type: "string" },
                    road: { type: "string" },
                  },
                },
                phone: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      number: { type: "string" },
                    },
                  },
                },
              }, //properties -end
              required: ["username", "email"],
            }, //schema - end
          },
        ], //parameters - end
        produces: ["application/json"],
        responses: {
          200: {
            description: "New user is created",
            // "schema": {
            //     "$ref":"#/definitions/User" //περνάμε όλο το schemα που πιθανό θα μπερδέψει τον χρήστη
          },
        },
      }, //post -end
    }, //api -end
    /****/
    "/api/user/update": {
      patch: {
        tags: ["Users"],
        description: "Update user",
        parameters: [
          {
            name: "update user in system",
            in: "body",
            description: "user that we will update",
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                surname: { type: "string" },
                email: { type: "string" },
                address: {
                  type: "object",
                  properties: {
                    area: { type: "string" },
                    road: { type: "string" },
                  },
                },
                phone: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      number: { type: "string" },
                    },
                  },
                },
              },
              required: ["email"],
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          200: {
            description: "Updated User",
          },
        },
      },
    }, //api -end
    "/api/user/delete/{username}": {
      delete: {
        tags: ["Users"],
        description: "Deletes user form the system",
        parameters: [
          {
            name: "username",
            in: "path",
            description: "Username that we will delete",
          },
        ],
        responses: {
          200: {
            description: "Deleted user",
          },
        },
      },
    }, //api -end
    "/api/userproduct/findone/{username}": {
      get: {
        tags: ["Users and products"],
        parameters: [
          {
            name: "username",
            in: "path",
            description: "Find user's products",
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "User and products",
          },
        },
      },
    }, //api -end
  },
};
