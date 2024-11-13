/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const NavbarLink = ({ active, children, ...props }) => {
    const classes = active
        ? 'w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white block px-3 py-2 rounded-md'
        : 'w-full hover:text-green-600 hover:bg-gray-100 active:bg-gray-200 block px-3 py-2 rounded-md';

    return (
        <li>
            <button {...props} className={classes}>
                <span className="font-medium text-sm">{children}</span>
            </button>
        </li>
    );
};

NavbarLink.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default NavbarLink