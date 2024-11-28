const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OpenWeather API',
      version: '1.0.0',
      description: 'API documentation for OpenWeatherAPI using Swagger',
    },
    servers: [
      {
        url: `${process.env.LINK}`,
      },
    ],
    components: {
      schemas: {
        WeatherResponse: {
          type: 'object',
          properties: {
            country: { type: 'string' },
            city: { type: 'string' },
            current: {
              type: 'object',
              properties: {
                temperature: { type: 'number' },
                feels_like: { type: 'number' },
                humidity: { type: 'number' },
                description: { type: 'string' },
                icon: { type: 'string' },
              },
            },
            forecast: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  date: { type: 'string' },
                  temp: {
                    type: 'object',
                    properties: {
                      high: { type: 'number' },
                      low: { type: 'number' },
                    },
                  },
                  description: { type: 'string' },
                  icon: { type: 'string' },
                  humidity: { type: 'number' },
                  hourly: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        time: { type: 'string' },
                        temp: { type: 'number' },
                        humidity: { type: 'number' },
                        rain: { type: 'number' },
                        snow: { type: 'number' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };