const express = require('express');
const { getWeather } = require('../controllers/weatherController');
const { validateWeatherParams } = require('../middleware/validation');

const router = express.Router();

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get weather data
 *     description: Get current weather data for a specified city or coordinates.
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Name of the city to get weather for
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         description: Latitude coordinate
 *       - in: query
 *         name: lon
 *         schema:
 *           type: number
 *         description: Longitude coordinate
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeatherResponse'
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: Location not found
 *       500:
 *         description: Server error
 */
router.get('/weather', validateWeatherParams, getWeather);

module.exports = router;