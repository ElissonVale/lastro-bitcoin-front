import * as local from './env' 

const env = {
    ENVIROMENT: local.default.ENVIROMENT,

    API_URL: local.default.API_URL,
    API_KEY: local.default.API_KEY,

    // CRYPTOGRAPH INFORMATION
    SECRET_KEY: local.default.SECRET_KEY,
    SECRET_VECTOR: local.default.SECRET_VECTOR,

    // PALET OF COLORS
    COLORS: {
        BLACK: "#000000",
        WHITE: "#FFFFFF",
        RED: "#C14D45",
        GREEN: "#009751",
        BLUE: "#184149",
        GRAY: "#525B5F",
        DEFAULT: "#2D3138",

        ICONS: "#FFFFFF",
        MENU: "rgba(20,20,20,.9)",
        TRANSPARENT: "rgba(18,41,49, .8)"
    }
};

export default env;