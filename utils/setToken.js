//for setting token (cookie)
export const setToken = async (statusCode, message, photographer, res) => {
    let roleEncryption = "";
    const token = await photographer.getJWTToken();
    const expires = new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000);
    const sameSite = 'none';
    const domain = process.env.HOST;
    const path = "/";

    if (photographer.role === "Admin") {
        roleEncryption = "10102" + "1100" + "2101";
    } else {
        roleEncryption = "10102" + "0110" + "2101";
    }

    res.status(statusCode).cookie("token", token, { expires, sameSite }).json({
        success: true,
        message,
        photographer: {
            _id: photographer._id,
            username: photographer.username,
            avatar: photographer.avatar,
            authenticationNo: roleEncryption,
        },
        // photographer: {
        //     _id: photographer._id,
        //     fullname: photographer.fullname,
        //     username: photographer.username,
        //     avatar: photographer.avatar,
        //     email: photographer.email,
        //     role: photographer.role,
        //     phone: photographer.phone,
        //     posts: photographer.posts
        // },
        cookie: {
            val: `token=${token}; expires=${expires.toUTCString()}; path=${path}; domain=${domain}; samesite=${sameSite} `
        }
    });
};