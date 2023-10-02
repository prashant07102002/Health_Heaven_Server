const userdataController = (req, res) => {
    try {
        res.send("this is the user data");
    } catch (error) {
        console.log(error);
    }
}
export default {
    userdataController,
}