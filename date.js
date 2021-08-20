//jshint esversion:6

exports.getDate = ()=>{    
    const tody = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    return tody.toLocaleDateString("en-US", options);
}
exports.getDateShort = ()=>{    
    const tody = new Date();
    const options = {
        weekday: "short",
        day: "numeric",
        month: "short"
    }
    return tody.toLocaleDateString("en-US", options);
}