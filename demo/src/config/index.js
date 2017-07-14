export const dimensionMap = {
	xs: "480px",
	sm: "768px",
	md: "992px",
	lg: "1200px",
	xl: "1600px"
}

export const SIDER_COL_BREAK = "xs" //md
export const SIDER_COL_WIDTH = 80
export const SIDER_WIDTH = 375

export default {
	// whether auto check media query and dispatch by redux or not ?
	reduxMatchMedia: true,
	// map of media query breakpoints
	dimensionMap
}
