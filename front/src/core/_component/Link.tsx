import React from "react";

const Link = ({ className, style, href, children } : { className: any, style: any, href: any, children: any }) => {

    const onClick = (event: { metaKey: any; ctrlKey: any; preventDefault: () => void; }) => {
        // if ctrl or meta key are held on click, allow default behavior of opening link in new tab
        if (event.metaKey || event.ctrlKey) {
            return;
        }

        // prevent full page reload
        event.preventDefault();
        // update url
        window.history.pushState({}, "", href);

        // communicate to Routes that URL has changed
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    const styleObj = Object.assign({
        textDecoration: 'none',
    }, style)
    return (
        <a className={className} style={styleObj} href={href} onClick={onClick}>
            {children}
        </a>
    );
};

export default Link;
