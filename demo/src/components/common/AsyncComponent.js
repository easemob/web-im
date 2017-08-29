import React from "react"
import { I18n } from "react-redux-i18n"
import Loadable from "react-loadable"
import NProgress from "nprogress"

export default function MyLoadable(opts) {
    return Loadable(
        Object.assign(
            {
                loading: MyLoadingComponent,
                delay: 200,
                timeout: 5000,
                render(loaded, props) {
                    NProgress.done()
                    let Component = loaded.default
                    return <Component {...props} />
                }
            },
            opts
        )
    )
}

function MyLoadingComponent(props) {
    NProgress.start()
    if (props.isLoading) {
        // While our other component is loading...
        if (props.timedOut) {
            // In case we've timed out loading our other component.
            return (
                <div>
                    {I18n.t("LoadTimeout")}
                </div>
            )
        } else if (props.pastDelay) {
            // Display a loading screen after a set delay.
            NProgress.inc()
            // return <div>Loading...</div>
            return null
        } else {
            NProgress.done()
            // Don't flash "Loading..." when we don't need to.
            return null
        }
    } else if (props.error) {
        NProgress.done()
        // If we aren't loading, maybe
        return (
            <div>
                {I18n.t("loadFailded")}
            </div>
        )
    } else {
        NProgress.done()
        // This case shouldn't happen... but we'll return null anyways.
        return null
    }
}

// Loadable.Map({
//   loader: {
//     Component: () => import('./my-component'),
//     translations: () => fetch('./foo-translations.json').then(res => res.json()),
//   },
//   render(loaded, props) {
//     let Component = loaded.Component.default;
//     let translations = loaded.translations;
//     return <Component {...props} translations={translations}/>;
//   }
// });
