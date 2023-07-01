module.exports = {
  parserOptions: {
    ecmaVersion: "latest", // Use the latest ECMAScript version
    sourceType: "module", // Use ECMAScript modules
    // globals: {
    //     React: "writable", // Enable React as a global variable
    // },
  },
  // noInlineConfig: false, // Allow inline configuration
  // reportUnusedDisableDirectives: true, // Report unused ESLint disable directives
  plugins: [
    'prettier' // Include the prettier plugin
  ],
  rules: {
    semi: "error", // Enforce semicolons
    "prefer-const": "error", // Prefer const over let when the variable is not reassigned
    "prettier/prettier": "error", // Include prettier as a rule and indicate issues as errors
    // Add any additional rules you wish to enforce
  },
  settings: {
    // Add any shared settings for rules here
  },
};
