const Router = require('express').Router();
const ReportContoller = require('../controllers/reportController/reportController');

Router.get('/overall', ReportContoller.overallReport);
Router.get('/month-revenue', ReportContoller.getMonthlyRevenue);
Router.get('/top-selling', ReportContoller.getTopSellingProducts);

module.exports = Router;
