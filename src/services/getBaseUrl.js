let env = process.env.NODE_ENV
let baseUrl = ""
baseUrl = env==="development"?"http://localhost:7001/":"http://api.techgrow.top/"
export default baseUrl