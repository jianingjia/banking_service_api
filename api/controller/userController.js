const user = require('../model/user');

const userLoginController = (req, res) => {

    const { clientCardNumber, password } = req.body;

    // Validate request
    if (Object.keys(req.body).length == 0) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    if (!clientCardNumber) {
        res.status(400).send({
            message: "Client Card Number can not be empty!"
        });
        return;
    }

    if (clientCardNumber < 1000000000000000 || clientCardNumber > 9999999999999999) {
        res.status(400).send({
            message: "Client card number must be 16 digits!"
        });
        return;
    }

    if (!password) {
        res.status(400).send({
            message: "Password can not be empty!"
        });
        return;
    }

    // function call to user model class with error handling
    try {
        user.userLogin(clientCardNumber, password, (e, data) => {
            if (data) {
                res.status(200).send({
                    message: 'Login successful'
                });
                return;
            }
            if (e.kind === 'not_found') {
                res.status(404).send({
                    message: 'User not found.'
                });
                return;
            }
            if (e.kind === 'unauthorized') {
                res.status(401).send({
                    message: 'Credential incorrect.'
                });
                return;
            } else {
                res.status(500).send({
                    message:
                        e.message || 'Some error occurred while logging in.'
                });
                return;
            }
        });
    } catch (e) {
        res.status(500).send({
            message:
                e.message || 'Some error occurred while logging in.'
        });

    }
}

module.exports = {
    userLoginController}