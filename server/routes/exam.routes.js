const ExamController = require( '../controllers/exam.controller' );

module.exports = app => {
    app.get( '/api', ExamController.index );
    app.post( '/api/pet', ExamController.create );
    app.get( '/api/findall', ExamController.findAll );
    app.get( '/api/pet/:id', ExamController.getOne );
    app.put( '/api/pet/:id', ExamController.update );
    app.delete( '/api/pet/:id', ExamController.delete );
};