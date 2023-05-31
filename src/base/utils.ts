import {Like} from 'typeorm';

export const searchQuery = (value = '') => Like(`%${value}%`);
