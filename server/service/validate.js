export const ValidateData = (data) => {
    return Object.keys(data).filter(key => !data[key]);
}
// ------------ auth ------------
export const ValidateRegister = (user) => {
    const {username, password, email, phone} = user;
    return ValidateData({username, password, email, phone})
}

export const ValidateLogin = (user) => {
    const {email, password} = user;
    return ValidateData({email, password})
}

export const ValidateProfile = (user) => {
    const {username, phone} = user;
    return ValidateData({username, phone})
}

export const ValidateChangePassword = (user) => {
    const {oldPassword, newPassword} = user;
    return ValidateData({oldPassword, newPassword})
}
// ----------- banner ------------
export const ValidateBanner = (banner) => {
    const {name, detail} = banner;
    return ValidateData({name, detail})
}

export const ValidateUpdateBanner = (banner) => {
    const {name, detail, oldImage} = banner;
    return ValidateData({name, detail, oldImage})
}

// --------- category ------------
export const ValidateCategory = (category) => {
    const {name, oldImage} = category;
    return ValidateData({name, oldImage});
}
// ---------- book --------------
export const ValidateBook = (book) => {
    const {name, detail, amount, order_price, sale_price} = book;
    return ValidateData({name, detail, amount, order_price, sale_price});
}
export const ValidateUpdateBook = (book) => {
    const {name, detail, amount, order_price, sale_price, oldImage} = book;
    return ValidateData({name, detail, amount, order_price, sale_price, oldImage});
}

