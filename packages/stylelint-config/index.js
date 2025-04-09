module.exports = {
  "extends": "stylelint-config-standard",
  "plugins": [
    "stylelint-declaration-strict-value",
    "stylelint-no-unsupported-browser-features",
    "./custom-plugins/no-redeclare-mint-primitive-vars.js",
    "./custom-plugins/no-redeclare-mint-semantic-vars.js",
    "./custom-plugins/no-redeclare-mint-util.js",
    "./custom-plugins/no-usage-mint-primitive-vars.js",
    "./custom-plugins/use-mint-util-over-vars.js",


  ],
  "rules": {
    "declaration-no-important": [true, { "severity": "warning" }],
    "rule-empty-line-before": ["always", { "severity": "warning" }],
    "selector-id-pattern": null,
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    "keyframes-name-pattern": null,
    "color-hex-case": ["upper", { "severity": "warning" }],
    "scale-unlimited/declaration-strict-value": [
      ["/color$/", "z-index", "background"], { "severity": "warning" }
    ],
    "plugin/no-unsupported-browser-features": [true, {
      "browsers": ["> 2%"],
      "ignore": ["rem"],
      "ignorePartialSupport": true,
      "severity": "warning"
    }]
  }
}
