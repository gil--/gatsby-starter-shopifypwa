import React from 'react'
import CMS from 'netlify-cms'
//import 'netlify-cms/dist/cms.css'

// Import Custom Widgets
import * as ColorWidget from 'netlify-cms-widget-color';
import * as UrlWidget from './url-widget.js';

// Register Custom Widgets w/ Netlify CMS
CMS.registerWidget("color", ColorWidget.Control);
CMS.registerWidget("url", UrlWidget.Control);