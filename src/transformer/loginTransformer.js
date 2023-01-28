const transform = (tokenDetails, tokenExpiry) => {
    let returnData = {
        'access_token': tokenDetails.access_token,
        'refresh_token': tokenDetails.refresh_token,
        'expires_in': tokenExpiry,
        "token_type": "Bearer"
    };
    return returnData;
};