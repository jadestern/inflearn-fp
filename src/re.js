import { clear } from './fx';
import {
  _curry,
  _curryr,
  _each,
  _filter,
  _get,
  _go,
  _map,
  _pipe,
  _reduce,
  log,
  _keys,
  _identity,
  _pluck,
  _reject,
  _compact,
  _values,
  _find,
  _find_index,
  _negate,
  _some,
  _every,
} from './_';

clear();

const users = [
  { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 32 },
  { id: 4, name: 'PJ', age: 27 },
  { id: 5, name: 'HA', age: 25 },
  { id: 6, name: 'JE', age: 26 },
  { id: 7, name: 'JI', age: 31 },
  { id: 8, name: 'MP', age: 23 },
];

log(_every([false, 1]));
