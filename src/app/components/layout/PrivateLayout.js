import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { c } from 'ttag';
import { Route, Link } from 'react-router-dom';
import { Sidebar, AppsSidebar, MainAreaContext, StorageSpaceStatus } from 'react-components';

import PrivateHeader from './PrivateHeader';
import { getPages } from '../../pages';

const PrivateLayout = ({ children }) => {
    const mainAreaRef = useRef();
    const list = getPages().map(({ text, route: link, icon }) => ({ text, link, icon }));
    return (
        <div className="flex flex-nowrap no-scroll">
            <AppsSidebar
                items={[
                    <StorageSpaceStatus key="storage">
                        <Link to="/settings/subscription" className="pm-button pm-button--primary">
                            {c('Action').t`Upgrade`}
                        </Link>
                    </StorageSpaceStatus>
                ]}
            />
            <div className="content flex-item-fluid reset4print">
                <PrivateHeader />
                <div className="flex flex-nowrap">
                    <Route path="/:path" render={() => <Sidebar list={list} />} />
                    <div className="main flex-item-fluid main-area" ref={mainAreaRef}>
                        <div className="flex flex-reverse">
                            <MainAreaContext.Provider value={mainAreaRef}>{children}</MainAreaContext.Provider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PrivateLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default PrivateLayout;