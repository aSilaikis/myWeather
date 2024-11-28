require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerDocs } = require('./swagger');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', weatherRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});