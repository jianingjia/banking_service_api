const userDao = require('../dao/userDao');

const userLoginController = (req, res) => {

    const { clientCardNumber, password } = req.body;

    // Validate request
    if (Object.keys(req.body).length == 0) {
        res.send({
            status: 400,
            message: "Content can not be empty!"
        });
        return;
    }

    if (!clientCardNumber) {
        res.send({
            status: 400,
            message: "Client Card Number can not be empty!"
        });
        return;
    }

    if (clientCardNumber < 1000000000000000 || clientCardNumber > 9999999999999999) {
        res.send({
            status: 400,
            message: "Client card number must be 16 digits!"
        });
        return;
    }

    if (!password) {
        res.send({
            status: 400,
            message: "Password can not be empty!"
        });
        return;
    }

    // function call to user model class with error handling
    try {
        userDao.userLoginDao(clientCardNumber, password, (e, data) => {
            if (data) {
                res.send({
                    status: 200,
                    message: 'Login successful'
                });
                return;
            }
            if (e.kind === 'not_found') {
                res.send({
                    status: 404,
                    message: 'User not found.'
                });
                return;
            }
            if (e.kind === 'unauthorized') {
                res.send({
                    status: 401,
                    message: 'Credential incorrect.'
                });
                return;
            } else {
                res.send({
                    status: 500,
                    message:
                        e.message || 'Some error occurred while logging in.'
                });
                return;
            }
        });
    } catch (e) {
        res.send({
            status: 500,
            message:
                e.message || 'Some error occurred while logging in.'
        });

    }
}

module.exports = {
    userLoginController
}