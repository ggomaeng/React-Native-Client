import { combineReducers } from 'redux'

import authentication from './modules/authentication';
import activeFooterTab from './modules/activeFooterTab';
import flashNotification from './modules/flashNotification';
import settings from './modules/settings';
import users from './modules/users';
import scores from './modules/scores';
import posts from './modules/posts';
import products from './modules/products';
import brands from './modules/brands';
import tags from './modules/tags';
import images from './modules/images';
import streamFeed from './modules/streamFeed';
import collections from './modules/collections';

export default combineReducers({
	authentication,
	activeFooterTab,
	flashNotification,
	settings,
	users,
	scores,
	posts,
	products,
	brands,
	tags,
	images,
	streamFeed,
  collections
})
