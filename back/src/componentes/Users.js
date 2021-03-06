import admin from '../firebase-service';


export const createUser = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
    } = req.body;

    const user = await admin.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
    });

    return res.send(user);
}