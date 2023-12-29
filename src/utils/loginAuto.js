

export function setExpire(key, value, expire) {
    let obj = {
        data: value,
        time: Date.now(),
        expire: expire
    };
    localStorage.setItem(key, JSON.stringify(obj));

}
export function getExpire(key) {
    let val = localStorage.getItem(key);
    if (!val) {
        return val;
    } else {
        val = JSON.parse(val);
        if (Date.now() - val.time > val.expire) {
            localStorage.removeItem(key);
            return null;
        }
        return val.data;
    }

}