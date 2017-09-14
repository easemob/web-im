
const _WIDTH = window.screen.availWidth > 350 ? 350 : window.screen.availWidth
export default {
    // whether auto check media query and dispatch by redux or not ?
    reduxMatchMedia: true,
    // map of media query breakpoints
    dimensionMap: {
        xs: "480px",
        sm: "768px",
        md: "992px",
        lg: "1200px",
        xl: "1600px"
    },
    name: "Web IM",
    logo: "",
    SIDER_COL_BREAK: "sm", //md
    SIDER_COL_WIDTH: 80,
    SIDER_WIDTH: 350,
    RIGHT_SIDER_WIDTH: _WIDTH,
    imgType: {
        gif: 1,
        bmp: 1,
        jpg: 1,
        png: 1
    },
    
    PAGE_NUM: 20
}
