
router.get('/eligible', UserService.allowUser, (req, res, next) => {
    const username = req.headers['username'];
    console.log(username);
    
    CourseController.getEligibleCourse(username, (status, payload) => {
        res.status(status).json(payload);
    });
});


module.exports = router;