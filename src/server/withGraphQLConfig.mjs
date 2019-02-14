/**
 * A higher-order function to decorate a Next.js custom config in
 * `next.config.js` for [`graphql-react`](https://npm.im/graphql-react), that
 * excludes server only `graphql-react/lib/ssr` imports from the client bundle.
 * @see [Next.js custom config docs](https://nextjs.org/docs/#custom-configuration).
 * @see [`graphql-react` `ssr` docs](https://github.com/jaydenseric/graphql-react#function-ssr).
 * @kind function
 * @name withGraphQLConfig
 * @param {Object} config Next.js custom config.
 * @returns {Object} Next.js custom config.
 * @example <caption>A custom config.</caption>
 * In `next.config.js`:
 *
 * ```js
 * const { withGraphQLConfig } = require('next-graphql-react/server')
 *
 * module.exports = withGraphQLConfig({
 *   // Custom config…
 * })
 * ```
 */
export const withGraphQLConfig = ({
  webpack = config => config,
  ...config
} = {}) => ({
  ...config,
  webpack(config, options) {
    if (!options.isServer)
      config.resolve.alias['graphql-react/lib/ssr$'] = '../universal/ssrAlias'
    return webpack(config, options)
  }
})