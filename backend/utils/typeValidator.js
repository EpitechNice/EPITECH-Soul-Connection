export function isEmail(email) {
    if (email === undefined)
        return false;

    if (typeof(email) != "string")
        return false;

    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(regex))
        return true;
    return false;
}