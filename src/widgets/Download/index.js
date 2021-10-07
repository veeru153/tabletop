import React from 'react';
import DownloadPage from './DownloadPage';
import { Download as DownloadIcon } from 'react-feather';

export default {
    type: 'download',
    name: 'Download',
    icon: <DownloadIcon />,
    form: <DownloadPage />,
    el: <div></div>,
}