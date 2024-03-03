
function firstRightName(username) {
    let name;


    if (username.includes('@')) {
        name = username.slice(0, username.indexOf('@'));
    } else {
        name = username;
    }

    return name[0].toUpperCase() + name.slice(1);;
}

export default firstRightName;
