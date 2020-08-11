import React from 'react';
import { Icon } from 'react-icons-kit'
import { spinner3 } from 'react-icons-kit/icomoon/spinner3'

const Loading = () => {
    return (
        <div className="loader">
            <div className="flex-center flex-column">
                <div className="card rounded-0 border-0 shadow">
                    <div className="flex-center flex-column text-center">
                        <Icon icon={spinner3} size={25} className="spin" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;